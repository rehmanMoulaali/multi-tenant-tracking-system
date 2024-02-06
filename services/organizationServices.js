// model Organization{
//     id Int @id @default(autoincrement())
//     name String 
//     domain String
//     address String
//     city String
//     state String
//     country String
//     pincode String
//     contact String
//     createdAt DateTime  @default(now())
//     updatedAt DateTime  @updatedAt
//     @@unique([domain,pincode])
//   }

const prisma = require("../db/db.config.js");
async function createOrganizationService(name,domain,address,city,state,country,pincode,contact){
    const organization=await prisma.organization.create({
        data:{
            name,
            domain,
            address,
            city,
            state,
            country,
            pincode,
            contact
        }
    });
    return organization    
}

async function getAllOrganizationsService(){
    return await prisma.organization.findMany();
}
async function getOrganizationByIdService(id){
    return await prisma.organization.findUnique({
        where:{
            id:Number(id)
        }
    })
}
async function getOrganizationByDomainService(domain){
    return await prisma.organization.findMany({
        where:{
            domain:domain
        }
    })
}

async function updateOrganizationService(id,name,domain,address,city,state,country,pincode,contact){
    return await prisma.organization.update({
        where:{
            id:Number(id) 
        },
        data:{
            name,
            domain,
            address,
            city,
            state,
            country,
            pincode,
            contact
        }
    })
}

async function deleteOrganizationService(id){
    return await prisma.organization.delete({
        where:{
            id:Number(id)
        }
    })
}
module.exports={
    createOrganizationService,
    getAllOrganizationsService,
    getOrganizationByIdService,
    getOrganizationByDomainService,
    updateOrganizationService,
    deleteOrganizationService
}