const AuthorisationError = require('../errors/AuthorisationError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictingRequestError = require('../errors/ConflictingRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const {
  MESSAGE_CONFLICTING_REQUEST_ERROR,
  MESSAGE_NOT_FOUND_RESOURCE,
  MESSAGE_BAD_REQUEST_ERROR,
  MESSAGE_INTERNAL_SERVER_ERROR,
} = require('../constants');

function handleErrors(err, res) {
  const { statusCode = 500, message } = err;

  function sendError(error) {
    return res.status(error.statusCode).send({ message: error.message });
  }

  if (err instanceof AuthorisationError
    || err instanceof ForbiddenError
    || err instanceof NotFoundError) {
    return res.status(statusCode).send({ message });
  }

  if (err.code === 11000) {
    sendError(new ConflictingRequestError(MESSAGE_CONFLICTING_REQUEST_ERROR));
  }

  if (err.name === 'DocumentNotFoundError') {
    sendError(new NotFoundError(MESSAGE_NOT_FOUND_RESOURCE));
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    sendError(new BadRequestError(MESSAGE_BAD_REQUEST_ERROR));
  }

  return res.status(statusCode).send({
    message: statusCode === 500 ? MESSAGE_INTERNAL_SERVER_ERROR : message,
  });
}

module.exports = handleErrors;
