const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, NotFoundError,BadRequestError } = require("../errors");
const {
    createRoleForOrganizationService,
    updateRoleOrganizationService,
    getAllRolesService,
    getRoleByIdService,
    getAllRolesForOrganizationService,
    assignFeatureToRoleService,
    getFeaturesForRoleService,
    removeFeatureFromRoleService,
    deleteRoleService
} = require('../services/roleServices');
const { roles } = require("../db/db.config");

/**
* Creates a new role for an organization.
*
* @param {Request} req The request object.
* @param {Response} res The response object.
* @param {NextFunction} next The next function in the middleware chain.
*/
async function createRoleForOrganization(req,res,next){
    try {
        const {name,organizationId} = req.body;
        if(!name || !organizationId){
            throw new CustomAPIError("require both organization id and name");
        }
        const role = await createRoleForOrganizationService(name,organizationId);
        if(!role){
            throw new CustomAPIError("something went wroing pleasem try later")
        }
        res.status(StatusCodes.CREATED).json({role});
        
    } catch (error) {
        next(error);
    }
     
}

/**
 * 
 * to update or assign new organization to the role
 */

async function updateRoleOrganization(req,res,next){
    try {
        const {roleId,organizationId} = req.body;
        const role = await updateRoleOrganizationService(roleId,organizationId);
        if(!role){
            throw new CustomAPIError("Please check your role id and organization id and try again");
        }
        return res.status(StatusCodes.OK).json({role});
    } catch (error) {
        next(error)
    }
}

/**
* Get all roles.
*
* @param {Object} req The request object.
* @param {Object} res The response object.
* @param {Function} next The next function.
*/
async function getAllRoles(req,res,next){
    try {
        const roles = await getAllRolesService();
        res.status(StatusCodes.OK).json({roles});        
    } catch (error) {
        next(error);
    }
}

/**
* Gets a role by its ID.
*
* @param {Request} req The request object.
* @param {Response} res The response object.
* @param {NextFunction} next The next function in the middleware chain.
*/
async function getRoleById(req,res,next){
    try {
        const roleId=req.params.id;
        const role=await getRoleByIdService(roleId);
        if(!role){
            throw new NotFoundError(`no role found for id ${roleId}`);
        }
        res.status(StatusCodes.OK).json({role});
    } catch (error) {
        next(error);
    }
}

/**
* Gets all roles for an organization.
*
* @param {Object} req The request object.
* @param {Object} res The response object.
* @param {Function} next The next function.
*/
async function getAllRolesForOrganization(req,res,next){
    try {
        const {organizationId} = req.params;
        const roles = await getAllRolesForOrganizationService(organizationId);
        res.status(StatusCodes.OK).json({roles});
    } catch (error) {
        next(next);
    }
}


async function assignFeatureToRole(req,res,next){
    try {
        const {roleId,featureId} = req.body;
        const roleFeature = await assignFeatureToRoleService(roleId,featureId);
        if(!roleFeature){
            throw new CustomAPIError("Please ensure roleId and featureId is valid");
        }
        res.status(StatusCodes.OK).json({roleFeature});
    } catch (error) {
        next(error);
    }
}

async function getFeaturesForRole(req,res,next){
    try {
        const {roleId} = req.params;
        const features = await getFeaturesForRoleService(roleId);
        res.status(StatusCodes.OK).json({features});
    } catch (error) {
        next(error);
    }
}

async function removeFeatureFromRole(req,res,next){
    try {
        const {roleId, featureId} = req.body;
        const roleFeature = await removeFeatureFromRoleService(roleId,featureId);
        if(!roleFeature){
            throw new CustomAPIError("please insure roleId and featureId is valid");
        }
        res.status(StatusCodes.OK).json({roleFeature});
    } catch (error) {
        next(error);
    }
}

async function deleteRoleById(req,res,next){
    try {
        const {roleId} = req.params;
        const role = await deleteRoleService(roleId);
        if(!role){
            throw new CustomAPIError("please ensure valid roleId");
        }
        res.status(StatusCodes.OK).json({role});
    } catch (error) {
        next(error);
    }
}


module.exports={
    createRoleForOrganization,
    assignFeatureToRole,
    removeFeatureFromRole,
    getAllRoles,
    getRoleById,
    getAllRolesForOrganization,
    getFeaturesForRole,
    deleteRoleById,
    updateRoleOrganization
}