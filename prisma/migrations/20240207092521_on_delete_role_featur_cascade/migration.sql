-- DropForeignKey
ALTER TABLE `rolefeatures` DROP FOREIGN KEY `RoleFeatures_featureId_fkey`;

-- DropForeignKey
ALTER TABLE `rolefeatures` DROP FOREIGN KEY `RoleFeatures_roleId_fkey`;

-- AddForeignKey
ALTER TABLE `RoleFeatures` ADD CONSTRAINT `RoleFeatures_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleFeatures` ADD CONSTRAINT `RoleFeatures_featureId_fkey` FOREIGN KEY (`featureId`) REFERENCES `Features`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
