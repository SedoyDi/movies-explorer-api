const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoudError');
const IncorrectReqvestError = require('../errors/incorrectReqvestError');
const AccessError = require('../errors/accessError');
const {
  validationError,
  filmNotFound,
  cannotDelete,
  deletedMovie,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.status(200).send({ data: movie }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((movie) => {
      res.status(201).send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectReqvestError(validationError));
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(filmNotFound);
      }
      if (movie.owner.toString() !== owner) {
        throw new AccessError(cannotDelete);
      } else {
        Movie.findByIdAndDelete(movieId)
          .then(() => res.status(200).send({ message: deletedMovie }))
          .catch(next);
      }
    })
    .catch(next);
};
