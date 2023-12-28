/*
  Warnings:

  - You are about to drop the column `role` on the `client` table. All the data in the column will be lost.
  - The values [CLIENT] on the enum `Member_role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `clientId` on the `user` table. All the data in the column will be lost.
  - The values [CLIENT] on the enum `Member_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_clientId_fkey`;

-- AlterTable
ALTER TABLE `client` DROP COLUMN `role`;

-- AlterTable
ALTER TABLE `member` MODIFY `role` ENUM('ADMIN', 'STAFF', 'PROJECT_MANAGER') NOT NULL DEFAULT 'STAFF';

-- AlterTable
ALTER TABLE `project` MODIFY `clientId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `clientId`,
    MODIFY `role` ENUM('ADMIN', 'STAFF', 'PROJECT_MANAGER') NOT NULL DEFAULT 'ADMIN';

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
