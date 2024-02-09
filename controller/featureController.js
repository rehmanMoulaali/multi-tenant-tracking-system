const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, NotFoundError } = require("../errors");
const { createFeatureService,
        getAllFeaturesService,
        getFeatureByIdService,
        updateFeatureService,
        deleteFeatureByIdService} = require("../services/FeatureServices");

async function createFeature(req,res,next){
    const {name,description,api_path,action}=req.body;
    try {
        const feature=await createFeatureService(name,description,api_path,action);
        if(!feature){
            throw new CustomAPIError("something went wrong try later");
        }
        res.status(StatusCodes.CREATED).json({
            feature,
            message:"created feature successfully"
        });
    } catch (error) {
        next(error);
    }
}

async function getAllFeatures(req,res,next){
    try {
        const features= await getAllFeaturesService();
        res.status(StatusCodes.OK).json({features});

    } catch (error) {
        next(error)
    }
}

async function getFeatureById(req,res,next){
    const featureId=req.params.id;
    try {
        const feature=await getFeatureByIdService(featureId);
        if(!feature){
            throw new NotFoundError(`no feature found with id:${featureId}`)
        }
        res.status(StatusCodes.OK).json({feature});
    } catch (error) {
        next(error);
    }
}

async function updateFeature(req,res,next){
    const {name,description,api_path,action}=req.body;
    const featureId = req.params.id;
    try {
        const feature= await updateFeatureService(featureId,name,description,api_path,action);
        if(!feature){
            throw new NotFoundError(`no feature found with id:${featureId}`)
        }
        res.status(StatusCodes.OK).json({feature,message:"updated sucessfully"});
    } catch (error) {
        next(error)
    }
}

async function deleteFeatureById(req,res,next){
    const featureId=req.params.id;
    try {
        const feature=await deleteFeatureByIdService(featureId);
        if(!feature){
            throw new NotFoundError(`no feature found with id:${featureId}`)
        }
        res.status(StatusCodes.OK).json({feature,message:"deleted sucessfully"});
    } catch (error) {
        next(error)
    }
}

module.exports={
    createFeature,
    getAllFeatures,
    getFeatureById,
    updateFeature,
    deleteFeatureById
}