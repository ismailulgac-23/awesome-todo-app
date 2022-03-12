/*
  Warnings:

  - Added the required column `todoType` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Todo` ADD COLUMN `todoType` VARCHAR(191) NOT NULL;
