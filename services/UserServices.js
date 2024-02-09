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
const CustomAPIError = require("../errors/Custom-api.js");


async function createUserService(name,email,password,userName,organizationId,userName,roleId){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
     if(roleId){
        const role = await prisma.role.findUnique({
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
    user.password="";
    return user;
}

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

async function getAllUsersByOrganizationService(organizationId){
    const users = await prisma.user.findMany({
        where: {
            organizationId: organizationId
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

async function assignRoleToUserService(userId,roleId){
    // Fetch the user's organization ID
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            organizationId: true
        }
    });

    // Fetch the role with its organization ID
    const role = await prisma.role.findUnique({
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

async function updatePasswordForUserService(userId,oldPassword,newPassword){
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            password: true
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

    // Compare the provided old password with the current password hash
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

module.exports={
    createUserService,
    getAllUsersService,
    getAllUsersByOrganizationService,
    assignRoleToUserService,
    updatePasswordForUserService,
    updateUserService,
    deleteUserService
}