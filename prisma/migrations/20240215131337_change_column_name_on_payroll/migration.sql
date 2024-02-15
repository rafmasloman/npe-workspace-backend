/*
  Warnings:

  - You are about to drop the column `bankProvider` on the `payroll` table. All the data in the column will be lost.
  - Added the required column `transactionProvider` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payroll` DROP COLUMN `bankProvider`,
    ADD COLUMN `transactionProvider` ENUM('BRI', 'BNI', 'BSI', 'BCA', 'Mandiri', 'Gopay', 'Dana', 'Ovo') NOT NULL;
