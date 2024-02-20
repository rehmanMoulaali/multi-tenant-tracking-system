const prisma = require("../db/db.config.js");

/**
* Creates a role for an organization.
*
* @param {string} name The name of the role.
* @param {number} organizationId The ID of the organization.
* @returns {prisma.roles} The created role.
*/
async function createRoleForOrganizationService(name, organizationId) {
   const role = await prisma.roles.create({
       data: {
           name: name,
           organization: {
               connect: {
                   id: organizationId,
               },
           },
       },
   });
   return role;
}

/**
* Updates the organization ID of a role.
*
* @param {number} roleId The ID of the role to update.
* @param {number} organizationId The ID of the organization to assign the role to.
* @returns {Promise<prisma.roles>} The updated role.
*/
async function updateRoleOrganizationService(roleId, organizationId) {
   const updatedRole = await prisma.roles.update({
       where: {
           id: Number(roleId)
       },
       data: {
           organizationId: Number(organizationId)
       }
   });
   return updatedRole;
}

/**
* Gets all roles from the database, including the organization they belong to.
*
* @returns {Promise<Array<prisma.roles>>} An array of roles.
*/
async function getAllRolesService(){
   const roles=await prisma.roles.findMany({
       include:{
           organization:true
       }
   });
   return roles;
}

/**
* Fetches a role from the database by its ID, including its associated features.
*
* @param {number} id The ID of the role to fetch.
* @returns {Promise<prisma.roles>} The role with the given ID, or null if not found.
*/
async function getRoleByIdService(id) {
   const role = await prisma.roles.findUnique({
       where: {
           id: Number(id),
       },
       include: {
           features: {
               select: {
                   feature: {
                       select: {
                           api_path: true,
                           action: true,
                       },
                   },
               },
           },
       },
   });
   return role;
}

/**
* Get all roles for an organization.
*
* @param {number} organizationId The ID of the organization.
* @returns {Promise<Array<prisma.roles>>} An array of roles.
*/
async function getAllRolesForOrganizationService(organizationId){
   const roles=await prisma.roles.findMany({
       where:{
           organizationId:Number(organizationId)
       }
   });
   return roles;
}

/**
* Assigns a feature to a role.
*
* @param {number} roleId The ID of the role to assign the feature to.
* @param {number} featureId The ID of the feature to assign to the role.
* @returns {Promise<prisma.roleFeatures>} The created role feature.
*/
async function assignFeatureToRoleService(roleId, featureId) {
   const roleFeature = await prisma.roleFeatures.create({
       data: {
           roleId: roleId,
           featureId: featureId
       }
   });
   return roleFeature;
}

/**
* Get all features for a given role.
*
* @param {number} roleId The ID of the role.
* @returns {Promise<Array<prisma.roleFeatures>>} An array of objects containing the features for the role.
*/
async function getFeaturesForRoleService(roleId){
   const roleFeature= await prisma.roleFeatures.findMany({
       where:{
           roleId:Number(roleId)
       },
       include:{
           feature:true
       }
   })
   return roleFeature;
}

/**
* Removes a feature from a role.
*
* @param {number} roleId The ID of the role.
* @param {number} featureId The ID of the feature.
* @returns {Promise<prisma.roleFeatures>} The deleted role feature.
*/
async function removeFeatureFromRoleService(roleId, featureId) {
   const roleFeature = prisma.roleFeatures.delete({
       where: {
           roleId_featureId: {
               roleId: Number(roleId),
               featureId: Number(featureId),
           },
       },
   });
   return roleFeature;
}

/**
* Deletes a role.
*
* @param {number} roleId The ID of the role.
* @returns {Promise<prisma.roleFeatures>} The deleted role.
*/async function deleteRoleService(roleId){ 

    const deletedRole= await prisma.roles.delete({
        where:{
            id:Number(roleId)
        }
    })
    return deletedRole;
}

/**
* Gets a single role feature association from the database.
*
* @param {number} roleId The ID of the role.
* @param {number} featureId The ID of the feature.
* @returns {Promise<prima.roleFeatures>} The role feature association.
*/
async function getRoleFeatureAssociationService(roleId, featureId) {
   return await prisma.roleFeatures.findUnique({
       where: {
           roleId_featureId: {
               roleId: roleId,
               featureId: featureId
           }
       }
   })
}

module.exports={
    createRoleForOrganizationService,
    updateRoleOrganizationService,
    getAllRolesService,
    getRoleByIdService,
    getAllRolesForOrganizationService,
    assignFeatureToRoleService,
    getFeaturesForRoleService,
    removeFeatureFromRoleService,
    deleteRoleService,
    getRoleFeatureAssociationService
}