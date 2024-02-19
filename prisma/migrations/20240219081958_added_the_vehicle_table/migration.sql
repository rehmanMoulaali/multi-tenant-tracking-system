/*
  Warnings:

  - A unique constraint covering the columns `[api_path,action]` on the table `Features` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `device_id` VARCHAR(191) NOT NULL,
    `longitude` DECIMAL(65, 30) NOT NULL DEFAULT 0.0,
    `latitude` DECIMAL(65, 30) NOT NULL DEFAULT 0.0,
    `organizationId` INTEGER NOT NULL,
    `heatbeat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Features_api_path_action_key` ON `Features`(`api_path`, `action`);

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
