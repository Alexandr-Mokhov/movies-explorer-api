const { NODE_ENV, NOMGODB_LINK_PRODUCTION } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const config = require('./config');
const router = require('./routes/index');
const handleErrors = require('./utils/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimit');
const { corsMiddlewares } = require('./middlewares/corsMiddlewares');

const app = express();
app.use(corsMiddlewares);
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
mongoose.connect(NODE_ENV === 'production' ? NOMGODB_LINK_PRODUCTION : config.mongodbLink);
app.use(express.json());
app.use(router);
app.use(errorLogger);
app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => handleErrors(err, res));

// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`Работает на порту ${config.port}`));
