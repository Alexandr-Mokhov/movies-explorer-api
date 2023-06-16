const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const AuthorisationError = require('../errors/AuthorisationError');
const { devSecret } = require('../config');
const { messageNotAuthorisation } = require('../constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorisationError(messageNotAuthorisation));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devSecret);
  } catch (e) {
    return next(new AuthorisationError(messageNotAuthorisation));
  }

  req.user = payload;

  return next();
};
