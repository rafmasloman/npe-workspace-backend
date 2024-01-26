-- DropForeignKey
ALTER TABLE `invoices` DROP FOREIGN KEY `Invoices_clientId_fkey`;

-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `otherInfo` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `Invoices` ADD CONSTRAINT `Invoices_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
