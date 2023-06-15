const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const config = require('./config');
const router = require('./routes/index');
const handleErrors = require('./utils/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
mongoose.connect(config.mongodbLink);
app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode, message } = handleErrors(err);
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`Работает на порту ${config.port}`));
