const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoudError');
const IncorrectReqvestError = require('../errors/incorrectReqvestError');
const AccessError = require('../errors/accessError');
const {
  validationError,
  filmNotFound,
  cannotDelete,
  deletedMovie,
} = require('../utils/eroorMessage');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.status(200).send({ data: movie }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(201).send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectReqvestError(validationError));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(filmNotFound);
      }
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new AccessError(cannotDelete);
      }
      return movie.remove()
        .then(() => res.status(200).send({ message: deletedMovie }));
    })
    .catch(next);
};
