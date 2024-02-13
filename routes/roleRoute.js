const { Router } = require("express");
const {
    createRoleForOrganization,
    assignFeatureToRole,
    removeFeatureFromRole,
    getAllRoles,
    getRoleById,
    getAllRolesForOrganization,
    getFeaturesForRole,
    deleteRoleById,
    updateRoleOrganization
} = require('../controller/roleController');
const { authenticateUser } = require("../middleware/authentication");

const roleRouter=Router();

roleRouter.post('/',authenticateUser,createRoleForOrganization);
roleRouter.get('/',authenticateUser,getAllRoles);
roleRouter.get('/organization/:organizationId',authenticateUser,getAllRolesForOrganization);
roleRouter.get('/features/:roleId',authenticateUser,getFeaturesForRole);
roleRouter.get('/:id',getRoleById);
roleRouter.patch('/organization',authenticateUser,updateRoleOrganization);
roleRouter.post('/feature',authenticateUser,assignFeatureToRole);
roleRouter.delete('/feature',authenticateUser,removeFeatureFromRole);
roleRouter.delete('/:roleId',authenticateUser,deleteRoleById);

module.exports=roleRouter;