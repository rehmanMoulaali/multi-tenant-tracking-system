const CustomError = require('../errors');
const { getFeatureByPathAndActionService } = require('../services/FeatureServices');
const { isTokenValid } = require('../services/jwtService');
const { getRoleFeatureAssociationService } = require('../services/roleServices');


const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

 

  try {
    if (!token) {
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

const authorizePermissions = async (req,res,next) => {
  try {
    const path= req.originalUrl;
    const action=req.method; 
    console.log(path,action);
    const feature= await getFeatureByPathAndActionService(path+"/",action);
    console.log(feature);
    if(!feature){
        throw new CustomError.BadRequestError(`no feature is found for ${path} and ${action}`);
    }
    const roleFeatureAssociation=await getRoleFeatureAssociationService(req.user.roleId,feature.id)
    console.log(roleFeatureAssociation);
    if(!roleFeatureAssociation){
        throw new CustomError.UnauthorizedError(`user with ${req.user.email} is not authorized to access the service`);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};