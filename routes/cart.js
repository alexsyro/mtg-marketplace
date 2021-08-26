const express = require('express');
const { Json } = require('sequelize/types/lib/utils');
const { UserCard } = require('../db/models');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('cart/index');
});

router.put('/', (req, res) => {
  const allCookies = req.cookies();
  const userCardId = req.body;
  if (!allCookies.cart) {
    const arrOfCart = [userCardId];
    res.cookie('cart', JSON.stringify(arrOfCart));
    res.status(200).end();
  } else {
    const arrOfCart = allCookies.cart.json();
    arrOfCart.push(userCardId);
    res.cookie('cart', JSON.stringify(arrOfCart));
    res.status(200).end();
  }
});
module.exports = router;
