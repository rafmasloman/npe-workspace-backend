/*
  Warnings:

  - The required column `orderNumber` was added to the `Invoices` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `orderNumber` VARCHAR(191) NOT NULL;
