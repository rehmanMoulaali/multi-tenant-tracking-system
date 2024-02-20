-- CreateTable
CREATE TABLE `LocationData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `longitude` DECIMAL(65, 30) NOT NULL DEFAULT 0.0,
    `latitude` DECIMAL(65, 30) NOT NULL DEFAULT 0.0,
    `vehicleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LocationData` ADD CONSTRAINT `LocationData_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
