const { StatusCodes } = require('http-status-codes');

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
