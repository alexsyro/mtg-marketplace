const express = require('express');
const { UserCard } = require('../db/models');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('cart/index');
});

router.put('/', async (req, res) => {
  const allCookies = req.cookies;
  if (!allCookies.cart) {
    const userCardId = req.body;
    const buyingCard = await UserCard.findOne({
      where: {
        id: userCardId,
      },
    });
    const cart = [buyingCard];
    res.cookie('cart', cart);
  } else {
    const userCardId = req.body;
    const buyingCard = await UserCard.findOne({
      where: {
        id: userCardId,
      },
    });
    const { cart } = allCookies;
    cart.push(buyingCard);
    res.cookie('cart', cart);
  }
  res.status(200).end();
});

module.exports = router;
