document.addEventListener('click', async (e) => {
  const userCardId = e.target.id;
  const response = await fetch('/cart', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userCardId }),
  });

  const { buyingCardsNumber } = await response.json();
  const cadrtDiv = document.getElementById('cart');
  cadrtDiv.innerText = buyingCardsNumber.toString();
});
