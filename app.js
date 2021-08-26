const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const apiRouter = require('./routes/api');

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
// Cookier
app.use(cookieParser());

// Session

const sessionConfig = {
  store: new FileStore(),
  name: 'user_sid',
  secret: 'pamagiti',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

// session use
app.use(session(sessionConfig));

app.get('/', (req, res) => {
  res.redirect('/api/cards');
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
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
