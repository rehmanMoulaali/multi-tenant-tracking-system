const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, NotFoundError } = require("../errors");
const {
    createRoleForOrganizationService,
    updateRoleOrganizationService,
    getAllRolesService,
    getAllRolesForOrganizationService,
    assignFeatureToRoleService,
    getFeaturesForRoleService,
    removeFeatureFromRoleService,
    deleteRoleService
} = require('../services/roleServices');
const { roles } = require("../db/db.config");

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

async function getAllRoles(req,res,next){
    try {
        const roles = await getAllRolesService();
        res.status(StatusCodes.OK).json({roles});        
    } catch (error) {
        next(error);
    }
}

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
    getAllRolesForOrganization,
    getFeaturesForRole,
    deleteRoleById,
    updateRoleOrganization
}