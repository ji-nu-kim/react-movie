const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

router.get('/auth', auth, (req, res) => {
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

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({ success: true });
    });
});

router.post('/register', (req, res) => {
  // 회원 가입에 필요한 정보를 클라이언트에서 받아와 데이터베이스에 넣어준다
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    // 요청한 이메일이 데이터베이스의 이메일과 일치하는지 확인
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "해당하는 유저가 없습니다"
      });
    };
    // 요청한 이메일의 비밀번호가 데이터베이스의 비밀번호와 일치하는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다"
        });
      };
      // 이메일, 비밀번호가 일치하면 토큰을 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 쿠키에 토큰을 저장
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

module.exports = router;