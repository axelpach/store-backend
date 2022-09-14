// console.log('my app');
const express = require('express');
const routerApi = require('./routes');

const { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/error.handlers');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Running on port: ' + port);
});
