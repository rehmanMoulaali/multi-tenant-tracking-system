const { StatusCodes } = require('http-status-codes');

/**
* Middleware to handle errors.
*
* @param {Error} err Express error object.
* @param {Object} req Express request object.
* @param {Object} res Express response object.
* @param {Function} next Express next function.
*/
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log('Error:', err);

  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Something went wrong.';

  if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
    console.error(err); // Log internal server errors
  }
  res.status(statusCode).json({ error: message });
};

module.exports = errorHandlerMiddleware;
