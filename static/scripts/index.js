document.addEventListener('click', async (e) => {
  if (e.target.id === 'loginBtn') {
    e.preventDefault();
    const response = await fetch('/login');
    const data = await response.text();
    document.body.innerHTML = data;

    const nextURL = '/login';
    const nextTitle = '';
    const nextState = {};
    window.history.replaceState(nextState, nextTitle, nextURL);
  }

  if (e.target.id === 'regBtn') {
    e.preventDefault();
    const response = await fetch('/registration');
    const data = await response.text();
    document.body.innerHTML = data;
    window.location = '/users/profile';
    // const nextURL = 'http://localhost:3000/registration';
    // const nextTitle = '';
    // const nextState = {};
    // window.history.replaceState(nextState, nextTitle, nextURL);
  }

  if (e.target.id === 'logoutBtn') {
    e.preventDefault();
    const response = await fetch('/logout');
    window.location = '/';
  }

  if (e.target.id === 'addCardBtn') {
    const response = await fetch('/api/cards/new');
    const data = await response.text();
    document.body.innerHTML = data;
  }

  if (e.target.id === 'searchBtn') {
    const CardName = document.getElementById('cardNameInput').value || '.';
    const CardType = document.getElementById('cardType').value;
    const quality = document.getElementById('cardQuality').value;
    const isFoil = document.getElementById('cardFoil').value;
    const city = document.getElementById('townSelect').value;
    window.location = `/api/search?CardName=${CardName}&CardType=${CardType}&quality=${quality}&isFoil=${isFoil}&city=${city}`;
  }
});
