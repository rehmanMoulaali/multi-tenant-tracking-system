const CustomError = require('../errors');
const { isTokenValid } = require('../services/jwtService');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

 

  try {
    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
      }
    const { name,id,email,organizationId,roleId} = isTokenValid({ token });
    req.user = { name,id,email,organizationId,roleId};
    next();
  } catch (error) {
    next(new CustomError.UnauthenticatedError('Authentication Invalid'));
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};