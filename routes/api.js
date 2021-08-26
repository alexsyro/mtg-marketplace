const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User, Card, UserCard } = require('../db/models');

const { Router } = express;

const router = Router();

// Shows all cards on sale
router.get('/cards', async (req, res) => {
  try {
    const products = await UserCard.findAll({ raw: true });
    const promisesCards = await products.map(async (prod) => {
      const card = await Card.findOne({
        where: {
          id: prod.CardId,
        },
      });
      return card;
    });
    const cards = await Promise.all(promisesCards);
    res.render('cards/index', { cards, session: req.sessions });
  } catch (error) {
    console.log(error);
    const message = 'Нет связи с БД, не удалось создать запись';
    res.status(500).render('cards/error', { error, message, session: req.sessions });
  }
});

// Add new card
router.post('/cards', async (req, res) => {
  const { name, type, quality, price, img, isFoil } = req.body;
  const card = {
    name,
    type,
    quality,
    price,
    img,
    isFoil,
  };

  try {
    const [cardEntry] = await Card.findOrCreate({ where: { ...card }, defaults: card });
    const product = await UserCard.create({
      CardId: card.id,
      UserId: req.session.user.id,
      city: req.session.user.city,
    });
    res.render('/cards', { session: req.session });
  } catch (error) {
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
    req.session = {};
    if (isNew) {
      console.log('SESSION', req.session);
      req.session.user = user;
      req.session.isAutorized = true;
      res.render('users/profile', { user });
      // cart storing in the session if exists
    } else {
      // show that user or password is not unique
      req.session.isAutorized = false;
      res.json({ message: 'Почта или пароль не являются уникальными' });
    }
  } catch (error) {
    // req.session.isAutorized = false;
    const message = 'Нет связи с БД, не удалось создать запись';
    res.status(500).render('users/error', { error, message, session: req.sessions });
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
    req.session = {};
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
    res.status(500).render('users/error', { error, message, session: req.sessions });
  }
});

module.exports = router;
