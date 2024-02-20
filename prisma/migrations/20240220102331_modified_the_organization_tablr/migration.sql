/*
  Warnings:

  - You are about to drop the column `contact` on the `organization` table. All the data in the column will be lost.
  - Added the required column `contactDepartment` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactDesignation` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactEmail` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactName` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPhone` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `organization` DROP COLUMN `contact`,
    ADD COLUMN `contactDepartment` VARCHAR(191) NOT NULL,
    ADD COLUMN `contactDesignation` VARCHAR(191) NOT NULL,
    ADD COLUMN `contactEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `contactName` VARCHAR(191) NOT NULL,
    ADD COLUMN `contactPhone` VARCHAR(191) NOT NULL,
    ADD COLUMN `organizationStatus` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE';
