/*
  Warnings:

  - You are about to drop the column `groupCreatorId` on the `Group` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Group` DROP FOREIGN KEY `Group_groupCreatorId_fkey`;

-- AlterTable
ALTER TABLE `Group` DROP COLUMN `groupCreatorId`,
    ADD COLUMN `groupLogo` VARCHAR(191) NOT NULL DEFAULT 'group-logo-439867349.png';
