const prisma = require("../db/db.config.js");
const bcrypt = require('bcryptjs');
const {CustomAPIError,ResourceNotFound,UnauthenticatedError,UnauthorizedError} = require("../errors/index.js");

/**
 * Creates a new Vehicle record in the Vehicles table and returns the created Vehicle object.
 * @param {string} device_id - The device ID of the vehicle.
 * @param {string} name - The name of the vehicle.
 * @param {string} organizationId - The ID of the organization that the vehicle belongs to.
 * @returns {Promise<Vehicle>} - The created Vehicle object.
 */
async function createNewVehiclesService(device_id, name, organizationId) {
    const vehicle = await prisma.vehicle.create({
        data: {
            device_id: device_id,
            name: name,
            organization: {
                connect: { id: organizationId }
            }
        }
    })
    // Return the created Vehicle object
    return vehicle;
}

// This service will update the location on the vehicle i.e. longitude and latitude 
/**
 * Updates the location of a vehicle in the database.
 * @param {number} vehicleId The ID of the vehicle to update.
 * @param {number} newLongitude The new longitude of the vehicle.
 * @param {number} newLatitude The new latitude of the vehicle.
 * @returns {Promise<Vehicle>} The updated vehicle.
 */
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
    await prisma.locationData.create({
        data:{
            latitude:newLatitude,
            longitude:newLongitude,
            vehicle:{
                connect:{
                    id:vehicleId
                }
            }
        }
    })
    return updatedVehicle;
}



/**
 * Fetches all vehicles associated with an organization.
 * @param {string} organizationId The ID of the organization.
 * @return {Promise<Array<Vehicle>>} A promise that resolves to an array of vehicles.
 */
async function getOrganizationVehiclesService(organizationId){
    const organizationVehicles= await prisma.vehicle.findMany({
        where:{organizationId:organizationId}
    });
    return organizationVehicles;
}

/**
 * Fetch a vehicle by its ID and ensure it belongs to the specified organization.
 *
 * @param {string} vehicleId The ID of the vehicle to fetch.
 * @param {string} organizationId The ID of the organization the vehicle should belong to.
 * @returns {Promise<Vehicle>} The fetched vehicle.
 */
async function getVehicleByIdService(vehicleId, organizationId) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
  });

  // Validate if the returned vehicle belongs to the specified organization
  if (vehicle.organizationId !== organizationId) {
    throw new UnauthorizedError("You can't access the vehicles from other organization");
  }

  return vehicle;
}

/**
 * Get all vehicles from the database.
 *
 * @returns {Promise<Prisma.Vehicle[]>} All vehicles.
 */
async function getAllVehiclesService(){
    const vehicles=await prisma.vehicle.findMany();
    return vehicles // This will return all the records with all the feilds
}

/**
 * Updates a vehicle service.
 * @param {number} id The ID of the vehicle service to update.
 * @param {string} vehicleId The ID of the vehicle to which the service belongs.
 * @param {string} name The name of the vehicle service.
 * @param {number} userOrganizationId The ID of the user's organization.
 * @returns {Promise<Vehicle>} The updated vehicle service.
 */
async function updateVehicleService(id,vehicleId,name,userOrganizationId){ // for uppdating the location we use updateVehicle location service
    getVehicleById(id,userOrganizationId); // to ensure that the user who is using this service and vehicle for which operation is getting performed belongs to the same organization
    const updatedVehicle=await prisma.vehicle.update({ 
        where:{id:id},
        data:{
            device_id:vehicleId,
            name:name
        }
    });
    return updatedVehicle;
}


/**
 * Deletes a vehicle by ID.
 *
 * @param {number} vehicleId The ID of the vehicle to delete.
 * @param {number} organizationId The ID of the organization that owns the vehicle.
 * @returns {Promise<Vehicle>} The deleted vehicle.
 */
async function deleteVehicleService(vehicleId, organizationId) {  
    await getVehicleById(id, organizationId);//this will ensure that user who is accessing this service and svehicle belongs to same organization
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