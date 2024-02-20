// id Int @id @default(autoincrement())
// name String
// email String @unique 
// password String
// userName String @unique
// organizationId Int        // Foreign key to Organization model
// organization   Organization @relation(fields: [organizationId], references: [id])
// roleId Int
// roles Roles[]

const prisma = require("../db/db.config.js");
const bcrypt = require('bcryptjs');
const {CustomAPIError,ResourceNotFound,UnauthenticatedError} = require("../errors/index.js");


/**
* Creates a new user.
*
* @param {string} name The name of the user.
* @param {string} email The email of the user.
* @param {string} password The password of the user.
* @param {string} userName The username of the user.
* @param {number} organizationId The ID of the organization that the user belongs to.
* @param {number} roleId The ID of the role that the user has.
*
* @returns {Promise<User>} The newly created user.
* @throws {Error} If Organization ID of the user does not match the organization ID of the role
*/
async function createUserService(name, email, password, userName, organizationId, roleId) {
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   console.log(roleId, organizationId);
   if (roleId) {
       const role = await prisma.roles.findUnique({
           where: {
               id: roleId
           },
           select: {
               organizationId: true
           }
       });

       if (organizationId !== role.organizationId) {
           throw new CustomAPIError("Organization ID of the user does not match the organization ID of the role.");
       }
   }
   const user = await prisma.user.create({
       data: {
           name: name,
           email: email,
           password: hashedPassword,
           organization: {
               connect: { id: organizationId }
           },
           userName: userName,
           roles: {
               connect: { id: roleId }
           }
       }
   });
   user.password = "";
   return user;
}

/**
* Gets all users from the database.
*
* @returns {Promise<Array<User>>} An array of user objects.
*/
async function getAllUsersService(){
   const users = await prisma.user.findMany({
       select: {
           id: true,
           name: true,
           email: true,
           userName: true,
           organization:true,
           roles: true,
           createdAt: true,
           updatedAt: true
       }
   });
   return users;
}

/**
* Gets all users associated with a specific organization.
*
* @param {number} organizationId The ID of the organization.
* @returns {Promise<Array<Object>>} An array of user objects.
*/
async function getAllUsersByOrganizationService(organizationId){
   const users = await prisma.user.findMany({
       where: {
           organizationId: Number(organizationId)
       },
       select: {
           id: true,
           name: true,
           email: true,
           userName: true,
           organization:true,
           roles: true,
           createdAt: true,
           updatedAt: true
       }
   });
   return users;
}

/**
* Gets a user by their ID.
*
* @param {number} userId The ID of the user to get.
* @returns {Promise<User>} The user with the given ID.
*/
async function getUserByUserIdService(userId){
   return await prisma.user.findUnique({
       where:{
           id:userId
       }
   });
}

/**
* Assigns a role to a user based on the provided user ID and role ID.
*
* @param {number} userId The ID of the user to assign the role to.
* @param {number} roleId The ID of the role to assign to the user.
* @returns {Promise<User>} The updated user with the assigned role. 
* @throws {Error} If Organization ID of the user does not match the organization ID of the role
*/
async function assignRoleToUserService(userId,roleId){    //This service assign the role to user based on roleId and userId
    const user = await prisma.user.findUnique({ //fetching the user based on id
        where: {
            id: userId
        },
        select: {
            organizationId: true
        }
    });
    // Fetch the role with its organization ID
    const role = await prisma.roles.findUnique({
        where: {
            id: roleId
        },
        select: {
            organizationId: true
        }
    });
    // Check if the organization IDs match
    if (user.organizationId !== role.organizationId) {
        throw new CustomAPIError("Organization ID of the user does not match the organization ID of the role.");
    }
    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            roles: {
                connect: {
                    id: roleId
                }
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            userName: true,
            organization: true,
            roles: true,
    
        }
    });
    return updatedUser;
}



/**
* Updates the password for a user.
*
* @param {number} userId The ID of the user to update.
* @param {string} oldPassword The old password of the user.
* @param {string} newPassword The new password of the user.
* @returns {Promise<object>} The updated user object.
* @throws {Error} If the old password is incorrect.
*/
async function updatePasswordForUserService(userId, oldPassword, newPassword) {
   const user = await prisma.user.findUnique({
       where: {
           id: Number(userId)
       },
       select: {
           password: true
       }
   });

   // Compare the provided old password with the current password hash
   console.log(user);
   const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
   if (!isPasswordValid) {
       throw new Error("Old password is incorrect.");
   }

   // Hash the new password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(newPassword, salt);

   // Update the user's password
   const updatedUser = await prisma.user.update({
       where: {
           id: userId
       },
       data: {
           password: hashedPassword
       },
       select: {
           id: true,
           name: true,
           email: true,
           userName: true,
           organization: true,
           roles: true,

       }
   });

   return updatedUser;
}

/**
* Updates a user in the database.
*
* @param {number} userId The id of the user to update.
* @param {string} name The new name of the user.
* @param {string} email The new email of the user.
* @returns {Promise<User>} The updated user.
*/
async function updateUserService(userId,name,email){
    const updatedUser = await prisma.user.update({
        where:{
            id:userId
        },
        data:{
            name:name,
            email:email
        },
        select: {
            id: true,
            name: true,
            email: true,
            userName: true,
            organization: true,
            roles: true,

        }
    });
    return updatedUser;
}

/**
* Deletes a user from the database.
*
* @param {number} userId The ID of the user to delete.
* @returns {Promise<object>} The deleted user.
*/
async function deleteUserService(userId){
   const deltedUser = await prisma.user.delete({
       where:{
           id:userId
       },
       select: {
           id: true,
           name: true,
           email: true,
           userName: true,
           organization: true,
           roles: true,
       }
   })

   return deltedUser;
}
/**
* Validates a user on login.
*
* @param {string} email The email of the user.
* @param {string} password The password of the user.
* @returns {Promise<object>} The user object with a token.
* @throws {ResourceNotFound} If no user is found with the given email.
* @throws {UnauthenticatedError} If the password is incorrect.
*/
async function validateUserOnLoginService(email,password){
    console.log(email,password,'----------------');
    const user = await prisma.user.findUnique({
        where:{
            email:email,
        },
        select:{
            id: true,
            name: true,
            email:true,
            password:true,
            organization:true,
            roles:true
        }
    });
    if(!user){
        throw new ResourceNotFound(`no user found with the email ${email}`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthenticatedError("please eneter right credentials");
    }
    const tokenuser=createTokenUser(user);

    return tokenuser;
}

/**
* Creates a token user object from a user object.
*
* @param {object} user The user object.
* @returns {object} The token user object.
*/
function createTokenUser(user) {
   return {
       name: user.name,
       id: user.id,
       email: user.email,
       organizationId: user.organization.id,
       roleId: user.roles.id,
   };
}

module.exports={
    createUserService,
    getAllUsersService,
    getAllUsersByOrganizationService,
    getUserByUserIdService,
    assignRoleToUserService,
    updatePasswordForUserService,
    updateUserService,
    deleteUserService,
    validateUserOnLoginService
}