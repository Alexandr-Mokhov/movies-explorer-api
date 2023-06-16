const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const { registrationValidation, loginValidation } = require('../utils/validation');
const { createUser, login } = require('../controllers/users');
const { messageNotFoundPage } = require('../constants');

router.use('/signup', registrationValidation, createUser);
router.use('/signin', loginValidation, login);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('/*', (req, res, next) => next(new NotFoundError(messageNotFoundPage)));

module.exports = router;
