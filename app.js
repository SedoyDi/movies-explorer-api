require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const mainErrorHandler = require('./middlewares/mainErrorHandler');
const apiRequestLimiter = require('./middlewares/apiRequestLimiter');

const { PORT = 3000, DB_ADRESS = 'mongodb://localhost:27017/moviesdb' } = process.env;
const app = express();

app.use(helmet());
app.use(requestLogger);
app.use(apiRequestLimiter);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_ADRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('connected'))
  .catch((err) => console.log(`Ошибка ${err.name}: ${err.message}`));

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(mainErrorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
