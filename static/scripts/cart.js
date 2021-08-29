const cartBtn = document.getElementById('cart-button');
let isEmptyCart;
if (isEmptyCart) {
  cartBtn.setAttribute('class', 'cart-button-empty');
} else {
  cartBtn.setAttribute('class', 'cart-button');
}

document.addEventListener('click', async (e) => {
  if (e.target.className === 'buyBtn') {
    e.preventDefault();
    const orderId = e.target.id;
    const response = await fetch('/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId }),
    });
    const responseJson = await response.json();
    const { isCartEmpty } = responseJson;
    isEmptyCart = isCartEmpty;
  }

  if (e.target.id === 'cart-button') {
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
    // const responseHTML = await response.text();
    // console.log(responseHTML);
    isEmptyCart = true;
    window.location = '/cart';
  }
  if (isEmptyCart) {
    cartBtn.setAttribute('class', 'cart-button-empty');
  } else {
    cartBtn.setAttribute('class', 'cart-button');
  }
});
