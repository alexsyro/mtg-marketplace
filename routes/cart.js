const express = require('express');
const { UserCard } = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  if (req.session.isAutorized) {
    // console.log(req.session.cart);
    const { cart } = req.session;
    // console.log(JSON.parse(cart));
    const cardsPromises = cart.map(async (el) => {
      const card = await UserCard.findOne({
        where: {
          id: Number(el),
        },
      });
      return card;
    });
    const cards = await Promise.all(cardsPromises);
    // console.log('!!!!!!!', cards);
    res.render('cart/index', { cards });
  } else if (req.cookies.cart) {
    // console.log(req.session.cart);
    const cart = JSON.parse(req.cookies.cart);
    const cardsPromises = cart.map(async (el) => {
      const card = await UserCard.findOne({
        where: {
          id: Number(el),
        },
      });
      return card;
    });
    const cards = await Promise.all(cardsPromises);
    // console.log('!!!!!!!', cards);
    res.render('cart/index', { cards });
  } else {
    res.render('cart/index');
  }
});

router.put('/', async (req, res) => {
  const allCookies = req.cookies;
  const { userCardId } = req.body;
  console.log('allCookies', allCookies);
  if (req.session.isAutorized) {
    if (!req.session.cart) {
      req.session.cart = [];
      req.session.cart.push(userCardId);
      res.status(200).send({ number: req.session.cart.length });
    } else if (req.session.cart.find((el) => el === userCardId)) {
      res.status(200).send({ number: req.session.cart.length });
    } else {
      req.session.cart.push(userCardId);
      res.status(200).send({ number: req.session.cart.length });
    }
    console.log('!!!!!!!!!!', req.session.cart);
  } else if (!allCookies.cart) {
    const arrOfCart = [];
    arrOfCart.push(userCardId);
    // console.log(arrOfCart);
    // console.log('arrOfCart', JSON.stringify(arrOfCart));
    res.cookie('cart', JSON.stringify(arrOfCart));
    res.status(200).send({ number: arrOfCart.length });
  } else {
    const arrOfCart = await JSON.parse(allCookies.cart);
    if (arrOfCart.find((el) => el === userCardId)) {
      res.cookie('cart', JSON.stringify(arrOfCart));
      res.status(200).send({ number: arrOfCart.length });
    } else {
      // console.log('arrOfCart!!!!!!!!!!!!!!', arrOfCart);
      arrOfCart.push(userCardId);
      // console.log('arrOfCart', JSON.stringify(arrOfCart));
      res.cookie('cart', JSON.stringify(arrOfCart));
      res.status(200).send({ number: arrOfCart.length });
    }
  }
});

router.put('/order', async (req, res) => {
  if (req.session.isAutorized) {
    console.log(req.session.cart);
    const cards = [];
    for (let i = 0; i < req.session.cart.length; i += 1) {
      if (req.session.cart.length) {
        const element = Number(req.session.cart[i]);
        const card = await UserCard.findOne({
          where: {
            id: element,
          },
        });
        console.log('CAAAAARD', card);
        card.status = 'sold';
        cards.push(card.CardName);
        card.save();
        req.session.cart.splice(i, 1);
        i = 0;
      }
    }
    console.log(cards);
    res.render('cart/complete', { cards, session: req.session });
  } else {
    res.render('users/login', { session: req.session });
  }
});

module.exports = router;
