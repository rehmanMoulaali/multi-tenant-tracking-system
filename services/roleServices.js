const prisma = require("../db/db.config.js");

async function createRoleForOrganizationService(name,organizationId){
    const role=await prisma.roles.create({
        data:{
            name:name,
            organization:{
                connect:{
                    id:organizationId
                }
            }
        }
    })
    return role;
}

async function updateRoleOrganizationService(roleId,organizationId){
    const updatedRole= await prisma.roles.update({
        where:{
            id:Number(roleId)
        },
        data:{
            organizationId:Number(organizationId)
        }
    });
    return updatedRole;
}

async function getAllRolesService(){
    const roles=await prisma.roles.findMany({
        include:{
            organization:true
        }
    });
    return roles;
}

async function getAllRolesForOrganizationService(organizationId){
    const roles=await prisma.roles.findMany({
        where:{
            organizationId:Number(organizationId)
        }
    });
    return roles;
}

async function assignFeatureToRoleService(roleId,featureId){
    const roleFeature= await prisma.roleFeatures.create({
        data:{
            roleId:roleId,
            featureId:featureId
        }
    });
    return roleFeature;
}

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

async function removeFeatureFromRoleService(roleId,featureId){
    const roleFeature=prisma.roleFeatures.delete({
        where:{
            roleId_featureId: {
                roleId: Number(roleId),
                featureId: Number(featureId)
            }
        }
    });
    return roleFeature;
}

async function deleteRoleService(roleId){
    const role= await prisma.roles.delete({
        where:{
            id:Number(roleId)
        }
    })
    return role;
}

module.exports={
    createRoleForOrganizationService,
    updateRoleOrganizationService,
    getAllRolesService,
    getAllRolesForOrganizationService,
    assignFeatureToRoleService,
    getFeaturesForRoleService,
    removeFeatureFromRoleService,
    deleteRoleService
}