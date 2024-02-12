const {StatusCodes}=require('http-status-codes')
const CustomError = require('../errors');

const {
    createUserService,
    getAllUsersService,
    getAllUsersByOrganizationService,
    getUserByUserIdService,
    assignRoleToUserService,
    updatePasswordForUserService,
    updateUserService,
    deleteUserService
} = require('../services/UserServices');


async function createUser(req,res,next){
    try {
        const {name,email,password,userName,organizationId,roleId} = req.body;
        if(!name || !email || !password || !userName || !organizationId){
            throw new CustomError.BadRequestError("please provide all the must feilds");
        }
        const user = await createUserService(name,email,password,userName,organizationId,roleId);
        if(!user){
            throw new CustomError.CustomAPIError("something went wrong please try later");
        }
        res.status(StatusCodes.CREATED).json({user})
    } catch (error) {
        next(error);
    }
}

async function getAllUsers(req,res,next){
    try {
        const users = await getAllUsersService();
        res.status(StatusCodes.OK).json({users});
    } catch (error) {
        next(error);
    }
}

async function getAllUsersByOrganization(req,res,next){
    try {
        const {organizationId} = req.params;
        const users = await getAllUsersByOrganizationService(organizationId);
        res.status(StatusCodes.OK).json({users})
    } catch (error) {
        next(error)
    }
}

async function getUserByUserId(req,res,next){
    try {
        const {id} = req.params;
        const user  = await getUserByUserIdService(id);
        if(!user){
            throw new CustomError.BadRequestError(`no user with userId: ${id}`);
        }
        res.status(StatusCodes.OK).json({user});
    } catch (error) {
        next(error);
    }
}

async function assignRoleToUser(req,res,next){
    try {
        const {userId,roleId} = req.body;
        if(!userId || !roleId){
            throw new CustomError.BadRequestError('both userId and roleId is require');
        }
        const updatedUser = await assignRoleToUserService(userId,roleId);
        if(!updatedUser){
            throw new CustomError.BadRequestError("please ensure the userId and roleId is valid and try again");
        }
        res.status(StatusCodes.OK).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

async function updatePasswordForUser(req,res,next){
    try {
        const {userId,oldPassword,newPassword} = req.body;
        if(!oldPassword || !newPassword){
            throw new CustomError.BadRequestError("both old and new password is required");
        }
        const updatedUser = await updatePasswordForUserService(userId,oldPassword,newPassword);
        if(!updatedUser){
            throw new CustomError.CustomAPIError("please try later");
        }
        res.status(StatusCodes.OK).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

async function updateUser(req,res,next){
    try {
        const {userId,name,email}=req.body;
        const updatedUser=await updateUserService(userId,name,email);
        if(!updatedUser){
            throw new CustomError.CustomAPIError("somthing went wrong try later");
        }
        res.status(StatusCodes.OK).json({updatedUser});
    } catch (error) {
        next(error);
    }
}

async function deleteUser(req,res,next){
    try {
        const {id}=req.params;
        const deletedUser= await deleteUserService(Number(id));
        if(!deleteUser){
            throw new CustomError.CustomAPIError("something went wring please ensure user Id is correct and try again");
        }
        res.status(StatusCodes.OK).json({deleteUser});
    } catch (error) {
        next(error);
    }
}

module.exports={
    createUser,
    getAllUsers,
    getAllUsersByOrganization,
    getUserByUserId,
    assignRoleToUser,
    updatePasswordForUser,
    updateUser,
    deleteUser
}