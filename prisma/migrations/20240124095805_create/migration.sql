-- CreateTable
CREATE TABLE `Invoices` (
    `id` VARCHAR(191) NOT NULL,
    `invoicesTitle` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Invoices_clientId_key`(`clientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Invoices` ADD CONSTRAINT `Invoices_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
