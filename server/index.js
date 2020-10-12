const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const port = 5000;

// application/x-www-form-urlencoded 파일을 갖고온다
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 파일을 갖고온다
app.use(bodyParser.json());
// 쿠키파서
app.use(cookieParser());

const mongoose = require('mongoose');

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB 연결'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/api/hello', (req, res) => {
    res.send('잘 받으셨나요?');
});

app.post('/api/users/register', (req, res) => {
    // 회원 가입에 필요한 정보를 클라이언트에서 받아와 데이터베이스에 넣어준다
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, });
    });
});

app.post('/api/users/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, userInfo) => {
        // 요청한 이메일이 데이터베이스의 이메일과 일치하는지 확인
        if (!userInfo) {
            return res.json({
                loginSuccess: false,
                message: "해당하는 유저가 없습니다"
            });
        };

        // 요청한 이메일의 비밀번호가 데이터베이스의 비밀번호와 일치하는지 확인
        userInfo.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                console.log("yes");
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다"
                });
            };

            // 이메일, 비밀번호가 일치하면 토큰을 생성
            userInfo.generateToken((err, userInfo) => {
                console.log(userInfo);
                if (err) return res.status(400).send(err);

                // 쿠키에 토큰을 저장
                res.cookie("x_auth", userInfo.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: userInfo._id });
            });
        })
    })
});

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: "" },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({ success: true });
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});