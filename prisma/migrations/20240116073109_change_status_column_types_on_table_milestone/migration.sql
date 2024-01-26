/*
  Warnings:

  - You are about to alter the column `status` on the `milestone` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - You are about to alter the column `name` on the `platform` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `milestone` MODIFY `status` ENUM('TODO', 'ON_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'TODO';

-- AlterTable
ALTER TABLE `platform` MODIFY `name` ENUM('WEBSITE', 'MOBILE', 'DESKTOP') NOT NULL;
