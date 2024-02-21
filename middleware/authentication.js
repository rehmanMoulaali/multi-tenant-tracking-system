const CustomError = require('../errors');
const { getFeatureByPathAndActionService } = require('../services/FeatureServices');
const { isTokenValid } = require('../services/jwtService');
const { getRoleFeatureAssociationService } = require('../services/roleServices');


/**
* Authenticates a user by checking if the token is valid.
* If the token is valid, it adds the user's information to the request object.
*
* @param {object} req The request object.
* @param {object} res The response object.
* @param {function} next The next function in the middleware chain.
*/
const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  try {
    if (!token) { // if token is not present it will throw an error
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
      }
    const { name,id,email,organizationId,roleId} = isTokenValid({ token });
    req.user = { name,id,email,organizationId,roleId};
    console.log(req.user, "at middleware");
    next();
  } catch (error) {
    next(new CustomError.UnauthenticatedError('Authentication Invalid'));
  }
};

/**
* Middleware to authorize user permissions for a given request.
*
* @param {Object} req Express request object.
* @param {Object} res Express response object.
* @param {Function} next Express next function.
*/
const authorizePermissions = async (req, res, next) => {
 try {
   // Get the path and action from the request.
   const path = req.originalUrl;
   const action = req.method;

   // Log the path and action.
   console.log(path, action);

   // Get the feature associated with the path and action.
   const feature = await getFeatureByPathAndActionService(path + "/", action);

   // If no feature is found, throw a BadRequestError.
   if (!feature) {
     throw new CustomError.BadRequestError(`No feature is found for ${path} and ${action}`);
   }

   // Get the role feature association for the user's role and the feature.
   const roleFeatureAssociation = await getRoleFeatureAssociationService(req.user.roleId, feature.id);

   // If no role feature association is found, throw an UnauthorizedError.
   if (!roleFeatureAssociation) {
     throw new CustomError.UnauthorizedError(`User with ${req.user.email} is not authorized to access the service`);
   }

   // Call the next middleware.
   next();
 } catch (error) {
   // Pass the error to the next middleware.
   next(error);
 }
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};