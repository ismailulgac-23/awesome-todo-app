/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `GroupMember` DROP FOREIGN KEY `GroupMember_groupMemberID_fkey`;

-- DropForeignKey
ALTER TABLE `Todo` DROP FOREIGN KEY `Todo_todoCreatorID_fkey`;

-- DropTable
DROP TABLE `Member`;

-- CreateTable
CREATE TABLE `User` (
    `userID` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `profileURL` VARCHAR(191) NOT NULL DEFAULT 'u-6947845987546.png',

    UNIQUE INDEX `User_userID_key`(`userID`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GroupMember` ADD CONSTRAINT `GroupMember_groupMemberID_fkey` FOREIGN KEY (`groupMemberID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_todoCreatorID_fkey` FOREIGN KEY (`todoCreatorID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;
