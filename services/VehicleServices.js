const prisma = require("../db/db.config.js");
const bcrypt = require('bcryptjs');
const {CustomAPIError,ResourceNotFound,UnauthenticatedError,UnauthorizedError} = require("../errors/index.js");

async function createNewVehiclesService(device_id,name,organizationId){
    const vehicle = await prisma.vehicle.create({
        data:{
            device_id:device_id,
            name:name,
            organization:{
                connect:{id:organizationId}
            }
        }
    })
    return vehicle;
}

async function updateVehicleLocationService(vehicleId, newLongitude, newLatitude){
    const updatedVehicle=await prisma.vehicle.update({
        where:{
            id:vehicleId
        },
        data:{
            latitude:newLatitude,
            longitude:newLongitude
        }
    });
    return updatedVehicle;
}

async function getOrganizationVehiclesService(organizationId){
    const organizationVehicles= await prisma.vehicle.findMany({
        where:{organizationId:organizationId}
    });
    return organizationVehicles;
}

async function getVehicleByIdService(vehicleId,organizationId){
    const vehicle=await prisma.vehicle.findUnique({
        where:{id:vehicleId}
    });
    if(vehicle.organizationId!==organizationId){
        throw new UnauthorizedError("You can't access the vehicles from other organization");
    }
    return vehicle;
}

async function getAllVehiclesService(){
    return await prisma.vehicle.findMany();
}

async function updateVehicleService(id,vehicleId,name,userOrganizationId){
    getVehicleById(id,userOrganizationId);
    const updatedVehicle=await prisma.vehicle.update({
        where:{id:id},
        data:{
            device_id:vehicleId,
            name:name
        }
    });
    return updatedVehicle;
}

async function deleteVehicleService(vehicleId,organizationId){
    getVehicleById(id,userOrganizationId);
    const deletedVehicle=await prisma.vehicle.delete({
        where:{
            id:vehicleId
        }
    });
    return deletedVehicle;
}

module.exports={
    createNewVehiclesService,
    updateVehicleLocationService,
    getOrganizationVehiclesService,
    getVehicleByIdService,
    getAllVehiclesService,
    updateVehicleService,
    deleteVehicleService
}