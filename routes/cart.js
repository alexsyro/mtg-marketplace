const express = require('express');
const nodemailer = require('nodemailer');
const { Order, Card, User } = require('../db/models');

const router = express.Router();

// Middleware которая проверяет, является ли пользователь авторизованным.
// Если нет - кидает на страницу авторизации
function isAutorized(req, res, next) {
  if (req.session && req.session.isAutorized) {
    next();
  } else {
    res.render('users/login');
  }
}

// Создаёт список заказов на основе содержимого корзины
async function getOrdersFromCart(cart) {
  let cartArray;
  if (cart instanceof Array) {
    cartArray = cart;
  } else {
    cartArray = cart.match(/\d+/gi);
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

// Отправка Email с деталями заказа
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

// Нажимаем на кнопку корзина
router.get('/', async (req, res) => {
  let cart;
  if (req.session.isAutorized) {
    cart = req.session.cart;
  } else {
    // Проверка, что куки с корзиной в принципе существуют
    cart = req.cookies.cart ? await JSON.parse(req.cookies.cart) : [];
  }
  if (cart && cart.length > 0) {
    const orderInCart = await getOrdersFromCart(cart);
    res.render('cart/index', { orders: orderInCart, session: req.session });
  } else {
    res.render('cart/index', { session: req.session });
  }
});

// Помещаем товар в корзину
router.put('/', async (req, res) => {
  // TODO: проверять момент перехода между авторизацией и корзиной.
  // Когда авторизовваемся, нужно копировать содержимое корзины в сессию и удалять куку
  const { orderId } = req.body;
  if (req.session.isAutorized) {
    res.clearCookie('cart');
    // Если корзина ещё не создана, то создаём и храним в сессии
    if (!req.session.cart || !req.session.cart.length) {
      req.session.cart = [];
      req.session.cart.push(orderId);
      res.status(200).json({ cardIsEmpty: false });
    } else {
      // Если в корзине уже есть элемент, то мы его не добавляем
      if (req.session.cart.includes(orderId) === false) {
        req.session.cart.push(orderId);
      }
      res.status(200).json({ cardIsEmpty: false });
    }
  } else if (!req.cookies.cart) {
    // Если корзина ещё не создана, то создаём и храним в cookie
    const cartContent = [];
    cartContent.push(orderId);
    res.cookie('cart', JSON.stringify(cartContent));
    res.status(200).json({ cardIsEmpty: false });
  } else {
    // Если создана, то проверяем, если такой элемент уже в корзине и, если нет, то добавляем
    const cartContent = await JSON.parse(req.cookies.cart);
    if (cartContent.find((el) => el === orderId)) {
      res.status(200).json({ cardIsEmpty: false });
    } else {
      cartContent.push(orderId);
      res.cookie('cart', JSON.stringify(cartContent));
      res.status(200).json({ cardIsEmpty: false });
    }
  }
});

// Оформление заказа. В случае, если не авторизован, кидает на страницу авторизации
router.put('/order', isAutorized, async (req, res) => {
  const numberOfCards = req.body.number;
  const cards = [];
  const orderInCart = await getOrdersFromCart(req.session.cart);
  orderInCart.forEach((order, index) => {
    order.number -= Number(numberOfCards[index]);
    if (order.number === 0) {
      order.status = 'SOLD';
    }
    order.save();
    cards.push({ name: order.Card.name, number: numberOfCards[index] });
  });
  sendDataToMail(cards, req.session.user.email);
  req.session.cart = [];
  res.render('cart/complete', { cards, session: req.session });
});

// Удаление товаров из корзины
router.delete('/order', async (req, res) => {
  let cart;
  let isCookieCart;
  const { id } = req.body;
  if (req.session.isAutorized) {
    res.clearCookie('cart');
    isCookieCart = false;
    cart = req.session.cart;
  } else {
    isCookieCart = true;
    cart = JSON.parse(res.cookies.cart);
  }
  console.log(':::::::BEFORE::::::::::', cart, id, typeof id, typeof cart, req.session.cart);
  cart = cart.filter((order) => {
    console.log(order, typeof order, order === id);
    if (order !== id) {
      return true;
    }
    return false;
  });
  console.log(':::::::AFTER::::::::::', cart, id);
  if (isCookieCart) {
    res.cookie('cart', JSON.stringify(cart));
  } else {
    console.log('SESS AFTER', req.session.cart);
    req.session.cart = cart;
    console.log('SESS AFTER', req.session.cart);
  }

  res.redirect('cart/index');
});

module.exports = router;
