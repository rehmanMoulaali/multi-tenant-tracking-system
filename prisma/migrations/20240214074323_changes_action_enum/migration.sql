/*
  Warnings:

  - The values [READ,CREATE,UPDATE] on the enum `Features_action` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `features` MODIFY `action` ENUM('GET', 'POST', 'PUT', 'DELETE', 'PATCH') NOT NULL;
