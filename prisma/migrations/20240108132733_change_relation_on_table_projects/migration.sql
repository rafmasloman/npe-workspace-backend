/*
  Warnings:

  - You are about to drop the column `memberId` on the `project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_memberId_fkey`;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `memberId`;

-- CreateTable
CREATE TABLE `_MemberToProject` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_MemberToProject_AB_unique`(`A`, `B`),
    INDEX `_MemberToProject_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MemberToProject` ADD CONSTRAINT `_MemberToProject_A_fkey` FOREIGN KEY (`A`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MemberToProject` ADD CONSTRAINT `_MemberToProject_B_fkey` FOREIGN KEY (`B`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
