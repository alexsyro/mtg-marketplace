const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('cards/index');
});

router.get('/new', (req, res) => {
  
});

router.get('/:id', (req, res) => {

});

module.exports = router;
