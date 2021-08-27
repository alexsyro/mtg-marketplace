document.addEventListener('click', async (e) => {
  if (e.target.className === 'buyBtn') {
    e.preventDefault();
    const userCardId = e.target.id;
    // console.log(userCardId);
    const response = await fetch('/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userCardId }),
    });
    const buyingCardsNumber = await response.json();
    // console.log(buyingCardsNumber);
    const cartBtn = document.getElementById('cart');
    // console.log(cartDiv);
    cartBtn.value = `Купить ${buyingCardsNumber.number}`;
  }

  if (e.target.id === 'cart') {
    window.location = '/cart';
  }
});
