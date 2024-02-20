// model Organization{
//     id Int @id @default(autoincrement())
//     name String 
//     domain String
//     address String
//     city String
//     state String
//     country String
//     pincode String
//     contact String
// contactName String
//   contactPhone String
//   contactEmail String
//   contactDesignation String
//   contactDepartment String
//   organizationStatus OrganizationStatus
//     createdAt DateTime  @default(now())
//     updatedAt DateTime  @updatedAt
//     @@unique([domain,pincode])
//   }

const prisma = require("../db/db.config.js");

/**

    Creates a new organization service.
    @param {string} name Name of the organization
    @param {string} domain Domain of the organization
    @param {string} address Address of the organization
    @param {string} city City of the organization
    @param {string} state State of the organization
    @param {string} country Country of the organization
    @param {string} pincode Pincode of the organization
    @param {string} contactName Contact name of the organization
    @param {string} contactPhone Contact phone number of the organization
    @param {string} contactEmail Contact email of the organization
    @param {string} contactDesignation Contact designation of the organization
    @param {string} contactDepartment Contact department of the organization
    @param {string} organizationStatus Organization status of the organization
    @returns {Promise<organization>}
*/
async function createOrganizationService(name,domain,address,city,state,country,pincode,contactName,contactPhone,contactEmail,contactDesignation,contactDepartment,organizationStatus){
    const organization=await prisma.organization.create({
        data:{
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
        }
    });
    return organization    
}



/**
 * Gets all organizations from the database.
 * @returns {Promise<Organization[]>} All organizations.
 */
async function getAllOrganizationsService(){
    const organizations=await prisma.organization.findMany();
    return organizations;
}

/**
 * Gets an organization by its ID.
 * @param {number} id The ID of the organization to get.
 * @returns {Promise<Organization>} The organization with the given ID.
 */
async function getOrganizationByIdService(id){

    return await prisma.organization.findUnique({
        where:{
            id:Number(id)
        }
    })
}

/**
 * Gets an organization by its domain.
 * @param {string} domain The domain of the organization.
 * @returns {Promise<Organization[]>} A list of organizations that match the domain.
 */
async function getOrganizationByDomainService(domain){
    return await prisma.organization.findMany({
        where:{
            domain:domain
        }
    })
}

/**
 *   Updates an organization in the database.
 *  @param {string} name The name of the organization.
 *  @param {string} domain The domain of the organization.
 *  @param {string} address The address of the organization.
 *  @param {string} city The city of the organization.
 *  @param {string} state The state of the organization.
 *  @param {string} country The country of the organization.
 *  @param {string} pincode The pincode of the organization.
 *  @param {string} contactName The contact name of the organization.
 *  @param {string} contactPhone The contact phone number of the organization.
 *  @param {string} contactEmail The contact email address of the organization.
 *  @param {string} contactDesignation The contact designation of the organization.
 *  @param {string} contactDepartment The contact department of the organization.
 *  @param {string} organizationStatus The status of the organization.
 *  @returns {Promise<Organization>} The updated organization.
 */

async function updateOrganizationService(name,domain,address,city,state,country,pincode,contactName,contactPhone,contactEmail,contactDesignation,contactDepartment,organizationStatus){
    const updatedOrganization=await prisma.organization.update({
        where:{
            id:Number(id) 
        },
        data:{
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
        }
    });
    return updatedOrganization;
}

/**
 *  Deletes an organization by its id.
 * @param {number} id - The id of the organization to delete.
 *  @returns {Promise<Organization>} The deleted organization.
 */
async function deleteOrganizationService(id){
    const deletedOrganization=await prisma.organization.delete({
        where:{
            id:Number(id)
        }
    })
    return deletedOrganization;
}


module.exports={
    createOrganizationService,
    getAllOrganizationsService,
    getOrganizationByIdService,
    getOrganizationByDomainService,
    updateOrganizationService,
    deleteOrganizationService
}