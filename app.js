const express = require('express');
const path = require('path');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');

const app = express();

const PORT = 3000;

// подключаем HBS
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.redirect('/cards');
});

app.get('/registration', (req, res) => {
  res.render('users/registration');
});

app.get('/login', (req, res) => {
  res.render('users/login');
});

app.get('/logout', (req, res) => {
  // destroy session
  // clear cookie
  res.redirect('/cards');
});

// Routes
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
