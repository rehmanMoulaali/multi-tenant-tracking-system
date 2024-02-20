const prisma = require("../db/db.config.js");
const Feature=prisma.features;

// model Features{
//     id Int @id @default(autoincrement())
//     name String 
//     description String
//     api_path String
//     action Action
//     createdAt DateTime  @default(now())
//     updatedAt DateTime  @updatedAt
//   }

/**
* Creates a new feature service.
*
* @param {string} name The name of the feature service.
* @param {string} description The description of the feature service.
* @param {string} api_path The API path of the feature service.
* @param {string} action The action of the feature service.
*
* @returns {Promise<Feature>} The created feature service.
*/
async function createFeatureService(name, description, api_path, action) {
   const feature = await Feature.create({
       data: {
           name,
           description,
           api_path,
           action
       }
   })
   return feature;
}

/**
* Gets all features from the database.
*
* @returns {Promise<Array<Feature>>} An array of features.
*/
async function getAllFeaturesService(){
   return await Feature.findMany();
}

/**
* Gets a feature by its ID.
*
* @param {number} featureId The ID of the feature to get.
* @returns {Promise<Feature>} The feature with the given ID.
*/
async function getFeatureByIdService(featureId){
   return await Feature.findUnique({
       where:{
           id:Number(featureId)
       }
   })
}

/**
* Updates a feature in the database.
*
* @param {number} featureId The ID of the feature to update.
* @param {string} name The new name of the feature.
* @param {string} description The new description of the feature.
* @param {string} api_path The new API path of the feature.
* @param {string} action The new action of the feature.
* @returns {Promise<Feature>} The updated feature.
*/
async function updateFeatureService(featureId,name,description,api_path,action){
   return await Feature.update({
       where:{
           id:Number(featureId)
       },
       data:{
           name,
           description,
           api_path,
           action
       }
   })
}

/**
* Deletes a feature from the database by its ID.
*
* @param {number} featureId The ID of the feature to delete.
* @returns {Promise<Feature>} The deleted feature.
*/
async function deleteFeatureByIdService(featureId){
    const deletedFeature=await Feature.delete({
        where:{
            id:Number(featureId)
        }
    })
    return deletedFeature; 
}

/**
* Get a feature by its path and action.
*
* @param {string} path The path of the feature.
* @param {string} action The action of the feature.
* @returns {Promise<Feature>} The feature.
*/
async function getFeatureByPathAndActionService(path, action) {
   return await Feature.findFirst({
       where: {
           api_path: path,
           action: action
       }
   })
}


module.exports={
    createFeatureService,
    getAllFeaturesService,
    getFeatureByIdService,
    updateFeatureService,
    deleteFeatureByIdService,
    getFeatureByPathAndActionService
}