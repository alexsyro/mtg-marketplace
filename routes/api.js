const express = require('express');
const { Op } = require('sequelize');
const { User, Card, UserCard } = require('../db/models');

const { Router } = express;

const router = Router();

// Shows all cards on sale
router.get('/cards', async (req, res) => {
  try {
    const cards = await UserCard.findAll({ raw: true });
    res.render('cards/index', { cards, session: req.sessions });
  } catch (error) {
    const message = 'Нет связи с БД, не удалось создать запись';
    res.status(500).render('cards/error', { error, message, session: req.sessions });
  }
});
// Add new card
router.post('/cards/', async (req, res) => {
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
  const { nickname, email, password, city, phone } = req.body;
  try {
    // const isUniqueLogin = await User.checkUnique('login', nickname);
    // const isUniqueEmail = await User.checkUnique('email', email);
    const inputUser = {
      nickname,
      email,
      password,
      city,
      phone,
    };
    const [user, isNew] = await User.findOrCreate({
      where: {
        [Op.or]: [{ nickname }, { email }],
      },
      defaults: inputUser,
    });

    if (isNew) {
      req.session = {};
      req.session.user = user;
      req.session.isAutorized = true;
      res.render(`users/${user.nickname}`);
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

module.exports = router;
