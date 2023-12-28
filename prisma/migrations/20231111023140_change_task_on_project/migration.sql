-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_taskId_fkey`;

-- AlterTable
ALTER TABLE `project` MODIFY `taskId` INTEGER NULL,
    MODIFY `image` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
