/*
  Warnings:

  - You are about to drop the column `contat` on the `organization` table. All the data in the column will be lost.
  - Added the required column `contact` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `organization` DROP COLUMN `contat`,
    ADD COLUMN `contact` VARCHAR(191) NOT NULL;
