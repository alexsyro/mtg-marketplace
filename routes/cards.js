const express = require('express');
const { Card } = require('../db/models');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/api/cards/');
});
router.get('/new', async (req, res) => {
  const cards = await Card.findAll({ raw: true });
  const cardTypes = new Set(Array.from(cards).map((card) => card.type));
  res.render('cards/new', { cardTypes, session: req.session });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.redirect(`/api/cards/${id}`);
});

module.exports = router;
