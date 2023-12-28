/*
  Warnings:

  - You are about to drop the `_membertoproject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectId` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_membertoproject` DROP FOREIGN KEY `_MemberToProject_A_fkey`;

-- DropForeignKey
ALTER TABLE `_membertoproject` DROP FOREIGN KEY `_MemberToProject_B_fkey`;

-- AlterTable
ALTER TABLE `payroll` ADD COLUMN `projectId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_membertoproject`;

-- AddForeignKey
ALTER TABLE `Payroll` ADD CONSTRAINT `Payroll_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
