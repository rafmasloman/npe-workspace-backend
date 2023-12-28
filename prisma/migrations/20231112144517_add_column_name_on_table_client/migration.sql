/*
  Warnings:

  - Added the required column `name` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `name` VARCHAR(100) NOT NULL;
