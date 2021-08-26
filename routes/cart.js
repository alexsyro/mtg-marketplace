const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('cart/index');
});

router.put('/', (req, res) => {
  const cart = [];
  const addCard = UserCard.find
  res.cookie('cart', cart);

});

module.exports = router;
