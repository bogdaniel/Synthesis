const express = require('express');
const path = require('path');
const open = require('open');
const compression = require('compression');


const port = 3000;
const app = express();
const { log } = console;

app.use(compression());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/users', (req, res) => {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {
      id: 1, firstName: 'Bob', lastName: 'Smith', email: 'bob@gmail.com',
    },
    {
      id: 2, firstName: 'Tammy', lastName: 'Norton', email: 'tnorton@gmail.com',
    },
    {
      id: 3, firstName: 'Tina', lastName: 'Lee', email: 'lee.tina@gmail.com',
    },
    {
      id: 4, firstName: 'Smith', lastName: 'John', email: 'j.smith@gmail.com',
    },

  ]);
});


app.listen(port, (err) => {
  if (err) {
    log(err);
  } else {
    open(`http://localhost${port}`);
  }
});
