/*
  Warnings:

  - You are about to drop the column `payment` on the `payroll` table. All the data in the column will be lost.
  - Added the required column `paymentMethod` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payroll` DROP COLUMN `payment`,
    ADD COLUMN `paymentMethod` VARCHAR(191) NOT NULL;
