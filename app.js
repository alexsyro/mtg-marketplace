const express = require('express');
const path = require('path');

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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
