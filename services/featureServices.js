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

async function createFeatureService(name,description,api_path,action){
    const feature=await Feature.create({
        data:{
            name,
            description,
            api_path,
            action 
        }
    })
    return feature;
}

async function getAllFeaturesService(){
    return await Feature.findMany();
}

async function getFeatureByIdService(featureId){
    return await Feature.findUnique({
        where:{
            id:Number(featureId)
        }
    })
}

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

async function deleteFeatureByIdService(featureId){
    return await Feature.delete({
        where:{
            id:Number(featureId)
        }
    })
}

async function getFeatureByPathAndActionService(path,action){
    return await Feature.findFirst({
        where:{
            api_path:path,
            action:action
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