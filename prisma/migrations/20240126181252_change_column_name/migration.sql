/*
  Warnings:

  - You are about to drop the column `orderNumber` on the `invoices` table. All the data in the column will be lost.
  - The required column `orderId` was added to the `Invoices` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `invoices` DROP COLUMN `orderNumber`,
    ADD COLUMN `orderId` VARCHAR(191) NOT NULL;
