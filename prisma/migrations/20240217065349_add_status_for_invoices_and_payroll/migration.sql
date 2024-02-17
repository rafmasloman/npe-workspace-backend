-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `invoiceStatus` ENUM('PAID', 'UNPAID') NOT NULL DEFAULT 'UNPAID';

-- AlterTable
ALTER TABLE `payroll` ADD COLUMN `payrollStatus` ENUM('PAID', 'UNPAID') NOT NULL DEFAULT 'UNPAID';
