const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

const validateUrl = ((value) => {
  const result = isURL(value);
  if (!result) {
    throw new Error('URL validation err');
  }
  return value;
});

const validatAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validatReg = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validatUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validatIdUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).hex(),
  }),
});

const validatMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(validateUrl),
    trailerLink: Joi.string().custom(validateUrl),
    thumbnail: Joi.string().custom(validateUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validatIdMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validatAuth,
  validatReg,
  validatUser,
  validatIdUser,
  validatMovie,
  validatIdMovie,
};
