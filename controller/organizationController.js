const { createOrganizationService,
        getAllOrganizationsService,
        getOrganizationByIdService,
        getOrganizationByDomainService,
        updateOrganizationService,
        deleteOrganizationService } = require("../services/organizationServices");

const {StatusCodes}=require('http-status-codes')
const CustomError = require('../errors');


async function createOrganization(req,res){
    const {orgname,domain,address,city,state,country,pincode,contact}=req.body;
    const organization=await createOrganizationService(orgname,domain,address,city,state,country,pincode,contact);
    if(organization){
        return res.status(StatusCodes.CREATED).json({
            organization,
            message:"created organization successfully"
        });
    }
    return res.status(500).json({message:"something went erong please try later"});
}


async function getAllOrganizations(req,res){
    const organizations=await getAllOrganizationsService()
    return res.status(StatusCodes.OK).json({organizations});
}

async function getOrganizationById(req,res,next){
    const organizationId=req.params.id;
    try {
        const organization = await getOrganizationByIdService(organizationId);
        if (!organization) {
            throw new CustomError.NotFoundError(`No organization with id : ${organizationId}`);
        }
        return res.status(StatusCodes.OK).json({ organization });
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
}

async function getOrganizationByDomain(req,res){
    const organizationDomain = req.params.domain; 
    const organizations=await getOrganizationByDomainService(organizationDomain);
    return res.status(StatusCodes.OK).json(
        {
            organizations
        }
    )
}
async function updateOrganization(req,res,next){
    const orgId=req.params.id;
    const {orgname,domain,address,city,state,country,pincode,contact}=req.body;
    try {
        const organization=await updateOrganizationService(orgId,orgname,domain,address,city,state,country,pincode,contact);   
        if(organization){
            return res.status(StatusCodes.OK).json({organization});
        }
        throw new CustomError.NotFoundError(`No organization with id : ${organizationId}`);
    } catch (error) {
        next(error)
    }   
}


async function deleteOrganizationById(req,res){
    const orgId=req.params.id;
    const organization=await deleteOrganizationService(orgId);
    if(organization){
        return res.status(StatusCodes.OK).json({organization});
    }
    return res.status(StatusCodes.NOT_FOUND).json({message:`No organization found with id ${organizationId}`});
    
}

module.exports={
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    getOrganizationByDomain,
    updateOrganization,
    deleteOrganizationById
}