document.addEventListener('click', async (e) => {
  if (e.target.id === 'loginBtn') {
    e.preventDefault();
    const response = await fetch('/login');
    const data = await response.text();
    document.body.innerHTML = data;
  }

  if (e.target.id === 'regBtn') {
    e.preventDefault();
    const response = await fetch('/registration');
    window.location = '/registration';
  }

  if (e.target.id === 'logoutBtn') {
    e.preventDefault();
    const response = await fetch('/logout');
    window.location('/');
  }

  // if (e.target.id === 'profileBtn') {
  //   e.preventDefault()
  //   const response = await fetch('/')
  //   const data = await response.text()
  //   document.body.innerHTML = data
  // }
});
