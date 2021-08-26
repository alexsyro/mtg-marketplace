document.addEventListener('click', async (e) => {
  if (e.target.id === 'loginBtn') {
    e.preventDefault();
    const response = await fetch('/login');
    const data = await response.text();
    document.body.innerHTML = data;

    const nextURL = 'http://localhost:3000/login';
    const nextTitle = '';
    const nextState = {};
    window.history.replaceState(nextState, nextTitle, nextURL);
  }

  if (e.target.id === 'regBtn') {
    e.preventDefault();
    const response = await fetch('/registration');
    const data = await response.text();
    document.body.innerHTML = data;

    const nextURL = 'http://localhost:3000/registration';
    const nextTitle = '';
    const nextState = {};
    window.history.replaceState(nextState, nextTitle, nextURL);
  }

  if (e.target.id === 'logoutBtn') {
    e.preventDefault();
    const response = await fetch('/logout');
    window.location('/');
  }

  if (e.target.id === 'addCard') {
    const response = await fetch('/api/cards/new');
    const data = await response.text();
    document.body.innerHTML = data;
  }
});
