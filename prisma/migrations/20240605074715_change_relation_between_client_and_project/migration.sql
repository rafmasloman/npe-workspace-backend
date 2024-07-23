/*
  Warnings:

  - You are about to drop the column `clientId` on the `project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_clientId_fkey`;

-- AlterTable
ALTER TABLE `client` ADD COLUMN `projectId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `clientId`;

-- CreateIndex
CREATE UNIQUE INDEX `Client_projectId_key` ON `Client`(`projectId`);

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
