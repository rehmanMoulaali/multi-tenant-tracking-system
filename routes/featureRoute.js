const { Router } = require("express");
const { createFeature,
        getAllFeatures,
        getFeatureById,
        updateFeature, 
        deleteFeatureById} = require("../controller/featureController");

const featureRouter=Router();

featureRouter.post('/',createFeature);
featureRouter.get('/',getAllFeatures);
featureRouter.get('/:id',getFeatureById);
featureRouter.put('/:id',updateFeature);
featureRouter.delete('/:id',deleteFeatureById);

module.exports=featureRouter;


