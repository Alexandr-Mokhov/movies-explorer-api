const AuthorisationError = require('../errors/AuthorisationError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictingRequestError = require('../errors/ConflictingRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const {
  messageConflictingRequestError,
  messageNotFoundResource,
  messageBadRequestError,
  messageInternalServerError,
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
    sendError(new ConflictingRequestError(messageConflictingRequestError));
  }

  if (err.name === 'DocumentNotFoundError') {
    sendError(new NotFoundError(messageNotFoundResource));
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    sendError(new BadRequestError(messageBadRequestError));
  }

  return res.status(statusCode).send({
    message: statusCode === 500 ? messageInternalServerError : message,
  });
}

module.exports = handleErrors;
