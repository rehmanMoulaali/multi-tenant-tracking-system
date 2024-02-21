const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, NotFoundError } = require("../errors");
const { createFeatureService,
        getAllFeaturesService,
        getFeatureByIdService,
        updateFeatureService,
        deleteFeatureByIdService} = require("../services/FeatureServices");

/**
* Creates a new feature.
*
* @param {Request} req The request object.
* @param {Response} res The response object.
* @param {NextFunction} next The next function in the middleware chain.
*/
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

/**
* Get all features.
*
* @param {Object} req The request object.
* @param {Object} res The response object.
* @param {Function} next The next middleware function.
*/
async function getAllFeatures(req,res,next){
    try {
        const features= await getAllFeaturesService();
        res.status(StatusCodes.OK).json({features});

    } catch (error) {
        next(error)
    }
}

/**
* Gets a feature by its ID.
*
* @param {Request} req The request object.
* @param {Response} res The response object.
* @param {NextFunction} next The next function in the middleware chain.
*/
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

/**
* Updates a feature with the given id.
*
* @param {Request} req The request object.
* @param {Response} res The response object.
* @param {NextFunction} next The next function in the middleware chain.
*/
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

/**
* Delete a feature with the given id.
*
* @param {Request} req The request object.
* @param {Response} res The response object.
* @param {NextFunction} next The next function in the middleware chain.
*/
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