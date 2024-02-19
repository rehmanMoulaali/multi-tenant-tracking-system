const {Router} = require('express');
const {
    createUser,
    getAllUsers,
    getAllUsersByOrganization,
    getUserByUserId,
    assignRoleToUser,
    updatePasswordForUser,
    updateUser,
    deleteUser
} = require('../controller/userController');
const { authenticateUser,authorizePermissions } = require('../middleware/authentication');

const userRouter= Router();

userRouter.post('/',authenticateUser,authorizePermissions,createUser);
userRouter.get('/',getAllUsers);
userRouter.get('/organization/:organizationId',getAllUsersByOrganization);
userRouter.get('/:id',getUserByUserId);
userRouter.patch('/role',assignRoleToUser);
userRouter.patch('/password',updatePasswordForUser);
userRouter.put('/',updateUser);
userRouter.delete('/:id',deleteUser);

module.exports= userRouter;