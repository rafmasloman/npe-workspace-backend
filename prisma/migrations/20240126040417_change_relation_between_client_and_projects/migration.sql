/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Project_clientId_key` ON `Project`(`clientId`);
