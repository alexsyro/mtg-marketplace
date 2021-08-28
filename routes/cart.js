const express = require('express');
// const { Json } = require('sequelize/types/lib/utils');
const nodemailer = require('nodemailer');
const { Order, Card, User } = require('../db/models');

function isAutorized(req, res, next) {
  if (req.session && req.session.isAutorized) {
    next();
  } else {
    res.render('users/login');
  }
}

async function getOrdersFromCart(cart) {
  let cartArray;
  if (typeof cart === 'string') {
    cartArray = cart.match(/\d+/gi);
  } else {
    cartArray = cart;
  }
  const orders = cartArray.map(async (orderId) => {
    const order = await Order.findOne({
      where: {
        id: Number(orderId),
      },
      include: [Card, User],
    });
    return order;
  });
  return Promise.all(orders);
}

async function sendDataToMail(orderedCards, email) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL_LOGIN,
      pass: process.env.SMTP_EMAIL_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: 'MTG-Market', // sender address
    to: `${email}`, // list of receivers
    subject: 'Заказ Magic карт', // Subject line
    text: `Вы заказали следующие карты:
        ${orderedCards.join(',')}`, // plain text body
    html: `<b>Вы заказали следующие карты: ${orderedCards.join(',')}</b>`, // html body
  });
}
const router = express.Router();

router.get('/', async (req, res) => {
  if (req.session.isAutorized) {
    const { cart } = req.session;
    const orderInCart = await getOrdersFromCart(cart);
    res.render('cart/index', { orderInCart });
  } else if (req.cookies.cart) {
    const orderInCart = await getOrdersFromCart(req.cookies.cart);
    res.render('cart/index', { orderInCart });
  } else {
    res.render('cart/index');
  }
});

router.put('/', async (req, res) => {
  const allCookies = req.cookies;
  const { orderId } = req.body;
  if (req.session.isAutorized) {
    if (!req.session.cart) {
      req.session.cart = [];
      req.session.cart.push(orderId);
      res.status(200).json({ cardIsEmpty: false });
    } else {
      if (req.session.cart.include(orderId) === false) {
        req.session.cart.push(orderId);
      }
      res.status(200).json({ cardIsEmpty: false });
    }
  } else if (!allCookies.cart) {
    const arrOfCart = [];
    arrOfCart.push(orderId);
    res.cookie('cart', JSON.stringify(arrOfCart));
    res.status(200).json({ cardIsEmpty: false });
  } else {
    const arrOfCart = await JSON.parse(allCookies.cart);
    if (arrOfCart.find((el) => el === orderId)) {
      res.cookie('cart', JSON.stringify(arrOfCart));
      res.status(200).json({ cardIsEmpty: false });
    } else {
      arrOfCart.push(orderId);
      res.cookie('cart', JSON.stringify(arrOfCart));
      res.status(200).json({ cardIsEmpty: false });
    }
  }
});

router.put('/order', isAutorized, async (req, res) => {
  // console.log(req.session.cart);
  const cards = [];
  const orderInCart = await getOrdersFromCart(req.session.cart);
  orderInCart.forEach((order) => {
    order.status = 'SOLD';
    cards.push({ Название: order.Card.name, Количество: order.number });
    order.save();
  });
  sendDataToMail(cards, req.session.user.email);
  req.session.cart = [];
  res.render('cart/complete', { orderInCart, session: req.session });
});

router.delete('/order', (req, res) => {
  const { id } = req.body;
  req.session.cart = req.session.cart.filter((el) => el !== id);
  res.render('cart', { session: req.session });
});

module.exports = router;
