document.addEventListener('click', async (e) => {
  e.preventDefault();
  const userCardId = e.target.id;
  const response = await fetch('/cart', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userCardId }),
  });

  const { buyingCardsNumber } = await response.json();
  const cartDiv = document.getElementById('cart');
  cartDiv.innerText = buyingCardsNumber.toString();
});
