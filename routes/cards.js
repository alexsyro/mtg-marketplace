const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/api/cards/');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.redirect(`/api/cards/${id}`);
});

module.exports = router;
