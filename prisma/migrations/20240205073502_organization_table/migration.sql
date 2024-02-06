/*
  Warnings:

  - Added the required column `contatc` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `organization` ADD COLUMN `contatc` VARCHAR(191) NOT NULL;
