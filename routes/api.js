const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { Op } = require('sequelize');
const Text = require('../Tools/Text');
const { User, Card, UserCard } = require('../db/models');

const { Router } = express;

const router = Router();

const imageStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'static/uploads');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: imageStorage });

router.get('/cards/new', (req, res) => {
  res.render('cards/new', { session: req.session });
});

router.get('/cards/:cardId', async (req, res) => {
  const { cardId } = req.params;
  const card = await Card.findOne({
    where: {
      id: cardId,
    },
  });
  const sellers = await UserCard.findAll({
    where: {
      CardId: cardId,
    },
  });
  res.render('cards/show', { card, sellers, session: req.session });
});

// Shows all cards on sale
router.get('/cards', async (req, res) => {
  try {
    const products = await UserCard.findAll({ raw: true });
    const promisesCards = await products.map(async (prod) => {
      const card = await Card.findOne(
        {
          where: {
            id: prod.CardId,
          },
        },
        { raw: true }
      );
      return card;
    });
    const cards = await Promise.all(promisesCards);
    const fullProduct = products.map((prod, index) => ({
      id: cards[index].id,
      type: cards[index].type,
      isFoil: cards[index].isFoil,
      quality: cards[index].quality,
      price: prod.price,
      name: cards[index].name,
      img: cards[index].img,
    }));
    res.render('cards/index', { fullProduct, session: req.session });
  } catch (error) {
    console.log(error);
    const message = 'Нет связи с БД, не удалось создать запись';
    res.status(500).render('cards/error', { error, message, session: req.session });
  }
});

// Add new card
router.post('/cards', upload.single('card'), async (req, res) => {
  console.log(req.body);
  const { name, type, quality, isFoil } = req.body;
  const img = `/uploads/${req.file.originalname}`;
  const card = {
    name,
    type,
    quality,
    img,
    isFoil: isFoil || false,
  };

  try {
    const [cardEntry] = await Card.findOrCreate({ where: { ...card }, defaults: card });
    const product = await UserCard.create({
      CardId: cardEntry.id,
      UserLogin: req.session.user.login,
      city: 'Moscow',
      price: 100,
      status: 'for sale',
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
  const { login, email, password, city, phone } = req.body;
  try {
    // const isUniqueLogin = await User.checkUnique('login', login);
    // const isUniqueEmail = await User.checkUnique('email', email);
    const hashed = await bcrypt.hash(password, 10);
    const inputUser = {
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
      req.session.user = user;
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
  console.log('BODY:', req.body);
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: emailLogin }, { login: emailLogin }],
      },
    });
    if (user) {
      const isCorrectPass = await bcrypt.compare(password, user.password);
      console.log('is correctpass:', isCorrectPass);
      if (isCorrectPass) {
        req.session.isAutorized = true;
        req.session.user = user;
        return res.render('users/profile', { session: req.session });
      }
    }
    // show that user or password is not unique
    req.session.isAutorized = false;
    res.json({ message: 'Логин, пароль или почта не найдены' });
  } catch (error) {
    const message = 'Нет связи с БД, не удалось создать запись';
    res.status(500).render('users/error', { error, message, session: req.session });
  }
});

module.exports = router;
