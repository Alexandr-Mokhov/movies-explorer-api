const movieModel = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const { OK_STATUS, CREATED_STATUS, MESSAGE_FORBIDDEN_ERROR } = require('../constants');

const getMovies = (req, res, next) => {
  movieModel.find({})
    .then((movies) => res.status(OK_STATUS).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;
  movieModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(CREATED_STATUS).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  movieModel.findById(movieId)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return movieModel
          .deleteOne({ _id: movieId })
          .orFail()
          .then((movieDelete) => res.status(OK_STATUS).send(movieDelete))
          .catch(next);
      }
      return Promise.reject(new ForbiddenError(MESSAGE_FORBIDDEN_ERROR));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
