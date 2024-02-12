const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./Custom-api');

class ResourceNotFound extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = ResourceNotFound;