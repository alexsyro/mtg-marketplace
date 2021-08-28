document.addEventListener('click', async (e) => {
  if (e.target.className === 'buyBtn') {
    e.preventDefault();
    const orderId = e.target.id;
    // console.log(orderId);
    const response = await fetch('/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId }),
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

  if (e.target.id === 'OrderBtn') {
    const response = await fetch('/cart/order', {
      method: 'PUT',
    });
    document.body.innerHTML = await response.text();
  }
  if (e.target.className === 'removeBtn') {
    console.log(e.target.id);
    const response = await fetch('/cart/order', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: e.target.id }),
    });
    window.location = '/cart';
  }
});
