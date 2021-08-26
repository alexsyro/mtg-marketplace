const express = require('express');
// подключаем мультер
const multer = require('multer');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/api/cards/');
});

router.post('/new', (req, res) => {
  // app.post('/profile', upload.single('avatar'), function (req, res, next) {
  //   // req.file - файл `avatar`
  //   // req.body сохранит текстовые поля, если они будут
  // })
});

router.get('/:id', (req, res) => {

});

module.exports = router;
