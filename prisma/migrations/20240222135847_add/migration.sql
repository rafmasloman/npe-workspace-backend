-- DropForeignKey
ALTER TABLE `payroll` DROP FOREIGN KEY `Payroll_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `payroll` DROP FOREIGN KEY `Payroll_projectId_fkey`;

-- AlterTable
ALTER TABLE `payroll` MODIFY `percent` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Payroll` ADD CONSTRAINT `Payroll_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payroll` ADD CONSTRAINT `Payroll_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
