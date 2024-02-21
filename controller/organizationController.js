const { createOrganizationService,
        getAllOrganizationsService,
        getOrganizationByIdService,
        getOrganizationByDomainService,
        updateOrganizationService,
        deleteOrganizationService } = require("../services/organizationServices");

const {StatusCodes}=require('http-status-codes')
const CustomError = require('../errors');

/**
* Create a new organization.
*
* @param {Request} req The request object.
* @param {Response} res The response object.
*/
async function createOrganization(req,res){
    const {orgname,domain,address,city,state,country,pincode,contactName,contactPhone,contactEmail,contactDesignation,contactDepartment,organizationStatus}=req.body;
    if(!orgname||!domain||!address||!city||!country||!pincode||!contactName || !contactPhone || !contactEmail || !contactDesignation || !contactDepartment ){
        throw new CustomError.BadRequestError("please provide all the feilds");
    }
    const organization=await createOrganizationService(orgname,domain,address,city,state,country,pincode,contactName,contactPhone,contactEmail,contactDesignation,contactDepartment,organizationStatus);
    if(organization){
        return res.status(StatusCodes.CREATED).json({
            organization,
            message:"created organization successfully"
        });
    }
    return res.status(500).json({message:"something went erong please try later"});
}

/**
* Gets all organizations.
*
* @param {Object} req The request object.
* @param {Object} res The response object.
*/
async function getAllOrganizations(req,res){
    const organizations=await getAllOrganizationsService()
    return res.status(StatusCodes.OK).json({organizations});
}

/**
* Gets an organization by its ID.
*
* @param {object} req The request object.
* @param {object} res The response object.
* @param {function} next The next middleware function.
*/
async function getOrganizationById(req,res,next){
    const organizationId=req.params.id;
    try {
        const organization = await getOrganizationByIdService(organizationId);
        if (!organization) {
            throw new CustomError.NotFoundError(`No organization with id : ${organizationId}`);
        }
         res.status(StatusCodes.OK).json({ organization });
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
}

/**
* Gets an organization by its domain.
*
* @param {Object} req The request object.
* @param {Object} res The response object.
*/
async function getOrganizationByDomain(req, res) {
   const organizationDomain = req.params.domain;

   /**
    * Gets an organization by its domain.
    *
    * @param {string} organizationDomain The domain of the organization.
    * @returns {Promise<Organization>} The organization.
    */
   const organizations = await getOrganizationByDomainService(organizationDomain);

   return res.status(StatusCodes.OK).json({
       organizations,
   });
}

/**
* Updates an organization with the given details.
*
* @param {Request} req The request object.
* @param {Response} res The response object.
* @param {NextFunction} next The next function in the middleware chain.
*/
async function updateOrganization(req, res, next) {
   const orgId = req.params.id;
   const {name,domain,address,city,state,country,pincode,contactName,contactPhone,contactEmail,contactDesignation,contactDepartment,organizationStatus } = req.body;

   try {
       const organization = await updateOrganizationService(
           orgId,
           name,
           domain,
           address,
           city,
           state,
           country,
           pincode,
           contactName,
           contactPhone,
           contactEmail,
           contactDesignation,
           contactDepartment,
           organizationStatus
       );

       if (organization) {
           return res.status(StatusCodes.OK).json({ organization });
       }

       throw new CustomError.NotFoundError(`No organization with id : ${organizationId}`);
   } catch (error) {
       next(error);
   }
}

/**
* Delete an organization with the given id.
*
* @param {Request} req The request object.
* @param {Response} res The response object.
* @param {NextFunction} next The next function in the middleware chain.
*/
async function deleteOrganizationById(req,res,next){
    const orgId=req.params.id;
    try {
        const organization=await deleteOrganizationService(orgId);
        if(organization){
            return res.status(StatusCodes.OK).json({organization});
        }
        return res.status(StatusCodes.NOT_FOUND).json({message:`No organization found with id ${organizationId}`});
    } catch (error) {
        next(error)
    }
}

module.exports={
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    getOrganizationByDomain,
    updateOrganization,
    deleteOrganizationById
}