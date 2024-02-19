const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, NotFoundError,BadRequestError } = require("../errors");
const { createNewVehiclesService,
    getOrganizationVehiclesService,
    getVehicleByIdService,
    getAllVehiclesService,
    updateVehicleLocationService,
    updateVehicleService,
    deleteVehicleService } = require("../services/VehicleServices");


async function createNewVehicles(req,res,next){
    try {
        const {device_id,name}= req.body;
        if(!device_id && !name){
            throw new BadRequestError("please fill all the must feilds");
        }
        const vehicle=await createNewVehiclesService(device_id,name,req.user.organizationId);
        if(!vehicle){
            throw new CustomAPIError("some thing went wrong please contact app owner");
        }
        res.status(StatusCodes.CREATED).json({vehicle});
    } catch (error) {
        next(error);
    }
}

async function getOrganizationVehicles(req,res,next){
    try {
        const organizationVehicles=await getOrganizationVehiclesService(req.user.organizationId);
        res.status(StatusCodes.OK).json({organizationVehicles});
    } catch (error) {
        next(error)
    }
}

async function getVehicleById(req,res,next){
    try {
        const {vehicleId}=req.body
        const vehicle=await getVehicleByIdService(vehicleId,req.user.organizationId);
        if(!vehicle){
            throw new BadRequestError(`no vehicle found with id ${vehicleId}`);
        }
        res.status(StatusCodes.OK).json({vehicle});
    } catch (error) {
        next(error);
    }
}

async function getAllVehicles(req,res,next){
    try {
        const vehicles= await getAllVehiclesService();
        res.status(StatusCodes.OK).json({vehicles});
    } catch (error) {
        next(error);
    }
}

async function updateVehicleLocation(req,res,next){
    try {
        const {vehicleId,longitude,latitude}= req.body;
        if(!vehicleId || !longitude || !latitude){
            throw new BadRequestError("please provide all the mandatory feilds");
        }
        const updatedVehicle= await updateVehicleLocationService(vehicleId,longitude,latitude);
        if(!updatedVehicle){
            throw new CustomAPIError("please ensure that vehicle id is correct");
        }
        res.status(StatusCodes.OK).json({updatedVehicle});
    } catch (error) {
        next(error);
    }
}

async function updateVehicle(req,res,next){
    try {
        const {id,vehicleId,name}=req.body;
        if(!id || vehicleId || name){
            throw new BadRequestError("please provide all the mandatory feilds");
        }
        const updatedVehicle= await updateVehicleService(id,vehicleId,name,req.user.organizationId);
        if(!updatedVehicle){
            throw new CustomAPIError("please ensure you provided proper vehicle id and try again later");
        }
        res.status(StatusCodes.OK).json({updatedVehicle});
    } catch (error) {
        next(error);
    }
}

async function deletedVehicle(req,res,next){
    try {
        const {vehicleId}=req.body;
        if(!vehicleId){
            throw new BadRequestError("please provide all the mendatory feilds");
        }
        const deletedVehicle= await deleteVehicleService(vehicleId,req.user.organizationId);
        if(!deletedVehicle){
            throw new CustomAPIError("please ensure vehicle id is correct and try later");
        }
        res.status.json({deletedVehicle});
    } catch (error) {
        next(error);
    }
}


module.exports={
    createNewVehicles,
    getOrganizationVehicles,
    getVehicleById,
    getAllVehicles,
    updateVehicleLocation,
    updateVehicle,
    deletedVehicle
}