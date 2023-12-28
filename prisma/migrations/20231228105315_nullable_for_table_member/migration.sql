-- DropForeignKey
ALTER TABLE `member` DROP FOREIGN KEY `Member_userId_fkey`;

-- AlterTable
ALTER TABLE `member` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
