/*
  Warnings:

  - You are about to alter the column `status` on the `task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `status` ENUM('TODO', 'ON_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'TODO';
