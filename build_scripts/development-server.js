import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';


const port = 3000;
const app = express();
const compiler = webpack(config);
const log = console.log;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', (req, res) => {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {
      id: 1, firstName: 'Bob', lastName: 'Smith', email: 'bob@gmail.com',
    },
    {
      id: 1, firstName: 'Tammy', lastName: 'Norton', email: 'tnorton@gmail.com',
    },
    {
      id: 1, firstName: 'Tina', lastName: 'Lee', email: 'lee.tina@gmail.com',
    },
    {
      id: 1, firstName: 'Smith', lastName: 'John', email: 'j.smith@gmail.com',
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
