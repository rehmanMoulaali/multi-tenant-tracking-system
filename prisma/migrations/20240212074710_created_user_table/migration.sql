/*
  Warnings:

  - You are about to drop the `_rolestouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_rolestouser` DROP FOREIGN KEY `_RolesToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_rolestouser` DROP FOREIGN KEY `_RolesToUser_B_fkey`;

-- DropTable
DROP TABLE `_rolestouser`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
