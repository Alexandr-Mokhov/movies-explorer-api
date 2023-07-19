const mongoose = require('mongoose');
const validator = require('validator');
const { MESSAGE_INVALID_EMAIL } = require('../constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: MESSAGE_INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    minlength: 4,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Александр',
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
