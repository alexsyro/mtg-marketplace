const cartBtn = document.getElementById('cart-button');
let isEmptyCart;
if (isEmptyCart) {
  cartBtn.setAttribute('class', 'cart-button-empty');
} else {
  cartBtn.setAttribute('class', 'cart-button');
}

document.addEventListener('click', async (e) => {
  // Добавить в корзину
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
    // Переходим в корзину
    window.location = '/cart';
  }

  if (e.target.id === 'OrderBtn') {
    // Нажимаем оформить заказ
    const numbers = Array.from(document.getElementsByClassName('number-of-cards')).map((el) => el.value);
    const response = await fetch('/cart/order', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number: numbers }),
    });
    document.body.innerHTML = await response.text();
  }

  if (e.target.className === 'removeBtn') {
    // Удаляем элементы из корзины
    const { id } = e.target;
    const response = await fetch('/cart/order', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    // const responseHTML = await response.text();
    // console.log(responseHTML);
    if (!document.getElementsByClassName('number-of-cards')) {
      isEmptyCart = true;
    }
    window.location = '/cart';
  }

  if (isEmptyCart) {
    cartBtn.setAttribute('class', 'cart-button-empty');
  } else {
    cartBtn.setAttribute('class', 'cart-button');
  }
});
