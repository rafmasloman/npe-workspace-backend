/*
  Warnings:

  - You are about to drop the column `role` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_password_key` ON `user`;

-- AlterTable
ALTER TABLE `member` DROP COLUMN `role`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `memberId`;
