-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_milestoneId_fkey`;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_milestoneId_fkey` FOREIGN KEY (`milestoneId`) REFERENCES `Milestone`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
