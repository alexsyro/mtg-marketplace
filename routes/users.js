const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('/users/index');
});

router.get('/:id', (req, res) => {
  
});

router.get('/:id/profile', (req, res) => {

});

module.exports = router;
