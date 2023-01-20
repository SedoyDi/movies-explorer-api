const router = require('express').Router();
const { validatUser } = require('../middlewares/validation');

const {
  patchUser, getUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);

router.patch('/me', validatUser, patchUser);

module.exports = router;
