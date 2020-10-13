const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
  // mongoDB에서 favorite 숫자 가져오기
  Favorite.find({ "movieId": req.body.movieId })
    .exec((err, info) => {
      if (err) return res.status(400).send(err);
      // 가져온 숫자를 프론트에 보내주기
      res.status(200).json({ success: true, favoriteNumber: info.length })
    });
});

router.post('/favorited', (req, res) => {
  // favorite 리스트에 넣었는지 DB에서 정보를 가져오기
  Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
    .exec((err, info) => {
      if (err) return res.status(400).send(err);
      // 가져온 정보를 프론트에 보내주기
      let result = false;
      if (info.length !== 0) {
        result = true;
      };
      res.status(200).json({ success: true, favorited: result })
    });
});

router.post('/removeFromFavorite', (req, res) => {
  Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, doc });
    });
});

router.post('/addToFavorite', (req, res) => {
  const favorite = new Favorite(req.body);
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post('/getFavoritedMoive', (req, res) => {
  Favorite.find({ 'userFrom': req.body.userFrom })
    .exec((err, favorites) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, favorites });
    });
});

router.post('/RemoveFromFavorite', (req, res) => {
  Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true });
    });
});

module.exports = router;