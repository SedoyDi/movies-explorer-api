const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { validatAuth, validatReg } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const AuthError = require('../errors/authError');
const { neededAutorisation } = require('../utils/constants');

router.post('/signin', validatAuth, login);
router.post('/signup', validatReg, createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/', (req, res, next) => {
  next(new AuthError(neededAutorisation));
});

module.exports = router;
