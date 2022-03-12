/*
  Warnings:

  - Added the required column `groupCreatorId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupName` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Group` ADD COLUMN `groupCreatorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `groupName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Group` ADD CONSTRAINT `Group_groupCreatorId_fkey` FOREIGN KEY (`groupCreatorId`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;
