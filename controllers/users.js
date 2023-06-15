const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { OK_STATUS, CREATED_STATUS } = require('../statusCodes');
const AuthorisationError = require('../errors/AuthorisationError');
const { devSecret } = require('../config');

const getUser = (req, res, next) => {
  const { _id } = req.user;
  userModel.findById(_id)
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { email, name } = req.body;
  userModel.findByIdAndUpdate(_id, { email, name }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => userModel.create({
      email: req.body.email,
      name: req.body.name,
      password: hash,
    }))
    .then((user) => {
      res.status(CREATED_STATUS).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  userModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorisationError('Неправильные почта или пароль.'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorisationError('Неправильные почта или пароль.'));
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : devSecret,
            { expiresIn: '7d' },
          );
          return res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getUser,
  updateUser,
  createUser,
  login,
};
