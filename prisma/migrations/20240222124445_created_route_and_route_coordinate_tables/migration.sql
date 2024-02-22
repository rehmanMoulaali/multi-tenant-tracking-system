/*
  Warnings:

  - Added the required column `order` to the `RouteCoordinate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `routecoordinate` ADD COLUMN `order` INTEGER NOT NULL;
