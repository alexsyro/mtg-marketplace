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
    const cartDiv = document.getElementById('cart');
    // console.log(cartDiv);
    cartDiv.innerText = buyingCardsNumber.number.toString();
  }
});
