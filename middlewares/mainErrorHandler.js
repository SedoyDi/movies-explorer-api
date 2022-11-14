const {
  serverError,
} = require('../utils/eroorMessage');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? serverError
        : message,
    });
  next();
};
