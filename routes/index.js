const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('/*', (req, res, next) => next(new NotFoundError('Страница не найдена!!!')));

module.exports = router;
