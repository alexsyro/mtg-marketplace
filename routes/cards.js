const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/api/cards/');
});

router.get('/:id', (req, res) => {});

module.exports = router;
