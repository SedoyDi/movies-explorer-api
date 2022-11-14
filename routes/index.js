const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { authValidation, regValidation } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const AuthError = require('../errors/authError');
const { neededAutorisation } = require('../utils/eroorMessage');

router.post('/signin', authValidation, login);
router.post('/signup', regValidation, createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/', (req, res, next) => {
  next(new AuthError(neededAutorisation));
});

module.exports = router;
