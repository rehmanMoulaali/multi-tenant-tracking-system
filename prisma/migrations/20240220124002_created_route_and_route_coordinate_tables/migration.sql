-- CreateTable
CREATE TABLE `Route` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `routeId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `routeType` ENUM('UNI_DIRCTIONAL', 'BI_DIRECTIONAL_SAME_STOPS', 'BI_DIRECTIONAL_DIFFERENT_STOPS') NOT NULL,
    `organizationId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RouteCoordinate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lonlongitude` DECIMAL(65, 30) NOT NULL DEFAULT 0.0,
    `latitude` DECIMAL(65, 30) NOT NULL DEFAULT 0.0,
    `routeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Route` ADD CONSTRAINT `Route_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RouteCoordinate` ADD CONSTRAINT `RouteCoordinate_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
