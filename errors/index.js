const CustomAPIError = require('./Custom-api');
const NotFoundError = require('./not-found');
const BadRequestError = require('./bad-request');
const ResourceNotFound=require('./resource-not-fond');
const UnauthenticatedError = require('./unauthenticated');

module.exports = {
  CustomAPIError,
  NotFoundError,
  BadRequestError,
  ResourceNotFound,
  UnauthenticatedError
};