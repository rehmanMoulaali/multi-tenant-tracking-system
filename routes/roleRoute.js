const { Router } = require("express");
const {
    createRoleForOrganization,
    assignFeatureToRole,
    removeFeatureFromRole,
    getAllRoles,
    getAllRolesForOrganization,
    getFeaturesForRole,
    deleteRoleById,
    updateRoleOrganization
} = require('../controller/roleController');

const roleRouter=Router();

roleRouter.post('/',createRoleForOrganization);
roleRouter.get('/',getAllRoles);
roleRouter.get('/organization/:organizationId',getAllRolesForOrganization);
roleRouter.get('/features/:roleId',getFeaturesForRole);
roleRouter.patch('/organization',updateRoleOrganization);
roleRouter.post('/feature',assignFeatureToRole);
roleRouter.delete('/feature',removeFeatureFromRole);
roleRouter.delete('/:roleId',deleteRoleById);

module.exports=roleRouter;