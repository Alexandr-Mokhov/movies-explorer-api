const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
mongoose.connect(config.mongodbLink);

app.listen(config.port, () => console.log(`Работает ${config.port}`));
