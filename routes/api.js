const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { Op } = require('sequelize');
const Text = require('../Tools/Text');
const { User, Card, Order, sequelize } = require('../db/models');

const { Router } = express;

const router = Router();

const imageStorage = multer.diskStorage({
  destination: path.join(__dirname, '../static/img/cards'),
  filename(req, file, cb) {
    cb(null, `${Text.MakePath(req.body.name, file.originalname)}`);
  },
});
const upload = multer({ storage: imageStorage });

// router.get('/cards/new', async (req, res) => {
//   const cards = await Card.findAll({ raw: true });
//   const cardTypes = new Set(Array.from(cards).map((card) => card.type));
//   res.render('cards/new', { cardTypes, session: req.session });
// });

// Search cards by filter
router.get('/search', async (req, res) => {
  const userId = req.session.user ? req.session.user.id : 0;
  const { name, type, quality, isFoil, city } = req.query;
  const fullProduct = await Order.findAll({
    where: {
      UserId: {
        [Op.not]: userId,
      },
      quality: { [Op.iRegexp]: quality },
      isFoil: Boolean(isFoil),
      status: 'FOR SALE',
    },
    include: [
      {
        model: Card,
        as: 'Card',
        where: {
          [Op.or]: [
            {
              name: { [Op.iRegexp]: name },
            },
            {
              description: { [Op.iRegexp]: name },
            },
            {
              subtype: { [Op.iRegexp]: name },
            },
          ],
          type: { [Op.iRegexp]: type },
        },
      },
      {
        model: User,
        where: {
          city: { [Op.iRegexp]: city },
        },
      },
    ],
    order: [sequelize.literal('"Card".name')],
  });
  res.render('cards/search', { fullProduct, session: req.session });
});

// Shows all cards on sale
router.get('/cards', async (req, res) => {
  const userId = req.session.user ? req.session.user.id : 0;
  try {
    const orders = await Order.findAll({
      where: {
        UserId: {
          [Op.not]: userId,
        },
        status: 'FOR SALE',
      },
      include: {
        model: Card,
      },
    });
    const cities = new Set(Array.from(orders).map((order) => order.city));
    res.render('cards/gallery', { cities, orders, session: req.session });
  } catch (error) {
    console.log(error);
    const message = 'Нет связи с БД, не удалось создать запись';
    res.status(500).render('cards/error', { error, message, session: req.session });
  }
});

// Show selected card
router.get('/cards/:cardId', async (req, res) => {
  const userId = req.session.user ? req.session.user.id : 0;
  const { cardId } = req.params;
  const card = await Card.findOne({
    where: {
      id: cardId,
    },
  });
  const sellers = await Order.findAll({
    where: {
      UserId: {
        [Op.not]: userId,
      },
      CardId: cardId,
    },
    include: {
      model: User,
    },
  });
  res.render('cards/show', { card, sellers, session: req.session });
});

// Add new card
router.post('/cards', upload.single('card'), async (req, res) => {
  const { description, name, type, subtype, quality, isFoil, price, number, rarity } = req.body;
  const img = `/img/cards/${Text.MakePath(name, req.file.originalname)}`;
  const card = {
    description,
    name: name.trim(),
    type,
    subtype,
    rarity,
    img,
  };
  try {
    const [cardEntry] = await Card.findOrCreate({ where: card, defaults: card });
    await Order.create({
      UserId: req.session.user.id,
      CardId: cardEntry.id,
      number,
      price,
      quality,
      isFoil: isFoil || false,
      status: 'FOR SALE',
    });
    res.redirect('/api/cards');
  } catch (error) {
    console.log(error);
    const message = 'Нет связи с БД, не удалось создать запись';
    res.status(500).render('cards/error', { error, message, session: req.session });
  }
});

// New user registration
router.post('/users/new', async (req, res) => {
  const { fullName, login, email, password, city, phone } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const inputUser = {
      fullName,
      login,
      email,
      password: hashed,
      city,
      phone,
    };
    const [user, isNew] = await User.findOrCreate({
      where: {
        [Op.or]: [{ login }, { email }],
      },
      defaults: inputUser,
    });
    if (isNew) {
      const sessionUser = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        login: user.login,
        city: user.city,
      };
      req.session.user = sessionUser;
      req.session.isAutorized = true;
      res.render('users/profile', { user, session: req.session });
      // cart storing in the session if exists
    } else {
      // show that user or password is not unique
      req.session.isAutorized = false;
      res.json({ message: 'Почта или пароль не являются уникальными' });
    }
  } catch (error) {
    // req.session.isAutorized = false;
    const message = 'Нет связи с БД, не удалось создать запись';
    res.status(500).render('users/error', { error, message, session: req.session });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { emailLogin, password } = req.body;
  try {
    const user = await User.findOne(
      {
        where: {
          [Op.or]: [{ email: emailLogin }, { login: emailLogin }],
        },
      },
      { raw: true },
    );
    if (user) {
      const isCorrectPass = await bcrypt.compare(password, user.password);
      console.log('is correctpass:', isCorrectPass);
      if (isCorrectPass) {
        req.session.isAutorized = true;
        const sessionUser = {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          login: user.login,
          city: user.city,
        };
        req.session.user = sessionUser;
        if (req.cookies.cart) {
          req.session.cart = req.cookies.cart.match(/\d+/gi);
        }
        const orders = await Order.findAll({
          where: {
            UserId: user.id,
          },
          include: Card,
        });
        res.render('users/profile', { orders, session: req.session });
      }
    } else {
      // show that user or password is not unique
      req.session.isAutorized = false;
      res.json({ message: 'Логин, пароль или почта не найдены' });
    }
  } catch (error) {
    const message = 'Нет связи с БД, не удалось создать запись';
    res.status(500).render('users/error', { error, message, session: req.session });
  }
});

router.get('/profile', async (req, res) => {
  const { id } = req.session.user;
  const orders = await Order.findAll({
    where: {
      UserId: id,
    },
    include: Card,
  });
  res.render('users/profile', { orders, session: req.session });
});

module.exports = router;
