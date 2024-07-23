/*
  Warnings:

  - You are about to drop the column `transactionProvider` on the `payroll` table. All the data in the column will be lost.
  - You are about to drop the `invoices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `invoices` DROP FOREIGN KEY `Invoices_clientId_fkey`;

-- AlterTable
ALTER TABLE `payroll` DROP COLUMN `transactionProvider`;

-- DropTable
DROP TABLE `invoices`;
