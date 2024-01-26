-- CreateTable
CREATE TABLE `_MemberToMilestone` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MemberToMilestone_AB_unique`(`A`, `B`),
    INDEX `_MemberToMilestone_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MemberToMilestone` ADD CONSTRAINT `_MemberToMilestone_A_fkey` FOREIGN KEY (`A`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MemberToMilestone` ADD CONSTRAINT `_MemberToMilestone_B_fkey` FOREIGN KEY (`B`) REFERENCES `Milestone`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
