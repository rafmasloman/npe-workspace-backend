-- AlterTable
ALTER TABLE `member` MODIFY `role` ENUM('ADMIN', 'CLIENT', 'STAFF', 'PROJECT_MANAGER') NOT NULL DEFAULT 'STAFF';