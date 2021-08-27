// const e = require('express');
const express = require('express');
// const { Json } = require('sequelize/types/lib/utils');
const nodemailer = require('nodemailer');
const { UserCard } = require('../db/models');

async function main() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'sstoyanov.mt@mail.ru',
      pass: 'Stroyservis910',
    },
  });
  await transporter.sendMail({
    from: '<sstoyanov.mt@mail.ru>', // sender address
    to: 'iti92@mail.ru', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });
}
main().catch(console.error);
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
  // console.log('allCookies', allCookies);
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
    if (arrOfCart.find((el) => el === userCardId) !== -1) {
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
module.exports = router;
