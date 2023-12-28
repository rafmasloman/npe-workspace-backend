-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_memberId_fkey`;

-- AlterTable
ALTER TABLE `project` MODIFY `memberId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
