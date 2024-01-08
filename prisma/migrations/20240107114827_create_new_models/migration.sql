/*
  Warnings:

  - You are about to drop the `platformsonprojects` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `platform` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `platformsonprojects` DROP FOREIGN KEY `PlatformsOnProjects_platformId_fkey`;

-- DropForeignKey
ALTER TABLE `platformsonprojects` DROP FOREIGN KEY `PlatformsOnProjects_projectId_fkey`;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `platform` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `platformsonprojects`;
