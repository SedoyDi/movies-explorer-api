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
const { rateLimiter } = require('./middlewares/rateLimiter');

const {
  MONGO_DB_ADDRESS,
  PORT_NUMBER,
  ALLOWED_CORS,
} = require('./utils/constants');

const app = express();
app.use(cors({
  origin: ALLOWED_CORS,
}));

const { PORT = PORT_NUMBER } = process.env;

mongoose.connect(MONGO_DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('connected'))
  .catch((err) => console.log(`Ошибка ${err.name}: ${err.message}`));

app.use(requestLogger);
app.use(helmet());
app.use(rateLimiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
