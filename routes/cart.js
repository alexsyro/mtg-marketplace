// const e = require('express');
const express = require('express');
// const { Json } = require('sequelize/types/lib/utils');
// const { UserCard } = require('../db/models');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('cart/index');
});

router.put('/', async (req, res) => {
  const allCookies = req.cookies;
  const { userCardId } = req.body;
  console.log('allCookies', allCookies);
  if (!allCookies.cart) {
    const arrOfCart = [];
    arrOfCart.push(userCardId);
    console.log(arrOfCart);
    // console.log('arrOfCart', JSON.stringify(arrOfCart));
    res.cookie('cart', JSON.stringify(arrOfCart));
    res.status(200).send({ number: arrOfCart.length });
  } else {
    const arrOfCart = await JSON.parse(allCookies.cart);
    // console.log('arrOfCart!!!!!!!!!!!!!!', arrOfCart);
    arrOfCart.push(userCardId);
    // console.log('arrOfCart', JSON.stringify(arrOfCart));

    res.cookie('cart', JSON.stringify(arrOfCart));
    res.status(200).send({ number: arrOfCart.length });
  }
});
module.exports = router;
