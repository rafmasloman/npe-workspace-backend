/*
  Warnings:

  - A unique constraint covering the columns `[memberId,projectId]` on the table `Payroll` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Payroll_memberId_projectId_key` ON `Payroll`(`memberId`, `projectId`);
