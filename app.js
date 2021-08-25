const express = require('express');

const app = express();

const PORT = 3000;

app.set('view engine', 'hbs');

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
