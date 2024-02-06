const { Router } = require("express");
const { createOrganization,
        getAllOrganizations,
        getOrganizationById,
        getOrganizationByDomain,
        updateOrganization,
        deleteOrganizationById } = require("../controller/organizationController");

const organizationRouter=Router();


organizationRouter.post('/',createOrganization);
organizationRouter.get('/',getAllOrganizations);
organizationRouter.get('/domain/:domain',getOrganizationByDomain); 
organizationRouter.get('/:id',getOrganizationById);
organizationRouter.put('/:id',updateOrganization);
organizationRouter.delete('/:id',deleteOrganizationById);

module.exports=organizationRouter