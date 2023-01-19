const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const AuthError = require('../errors/authError');

const {
  emailError,
  fillField,
  lengthFieldMin,
  lengthFieldMax,
  unauthError,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, fillField],
    minlength: [2, lengthFieldMin],
    maxlength: [30, lengthFieldMax],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: emailError,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(unauthError);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(unauthError);
          }
          return user;
        });
    });
};

userSchema.set('toJSON', {
  transform(doc, res) {
    delete res.password;
    return res;
  },
});
module.exports = mongoose.model('user', userSchema);
