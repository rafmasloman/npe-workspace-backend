/*
  Warnings:

  - You are about to drop the column `memberId` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `_projecttotask` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_projecttotask` DROP FOREIGN KEY `_ProjectToTask_A_fkey`;

-- DropForeignKey
ALTER TABLE `_projecttotask` DROP FOREIGN KEY `_ProjectToTask_B_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_memberId_fkey`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `memberId`,
    ADD COLUMN `projectId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_projecttotask`;

-- CreateTable
CREATE TABLE `_MemberToTask` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MemberToTask_AB_unique`(`A`, `B`),
    INDEX `_MemberToTask_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MemberToTask` ADD CONSTRAINT `_MemberToTask_A_fkey` FOREIGN KEY (`A`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MemberToTask` ADD CONSTRAINT `_MemberToTask_B_fkey` FOREIGN KEY (`B`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
