const router = require('express').Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const {
  validatMovie, validatIdMovie,
} = require('../middlewares/validation');

router.get('/', getMovies);

router.post('/', validatMovie, createMovie);

router.delete('/:movieId', validatIdMovie, deleteMovie);

module.exports = router;
