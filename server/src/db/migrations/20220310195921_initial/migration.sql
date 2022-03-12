-- CreateTable
CREATE TABLE `User` (
    `userID` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `profileURL` VARCHAR(191) NOT NULL DEFAULT 'u-6947845987546.png',

    UNIQUE INDEX `User_userID_key`(`userID`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroupMember` (
    `ID` VARCHAR(191) NOT NULL,
    `groupMemberID` VARCHAR(191) NOT NULL,
    `groupID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `GroupMember_ID_key`(`ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Group` (
    `groupID` VARCHAR(191) NOT NULL,
    `createdAt` INTEGER NOT NULL,

    UNIQUE INDEX `Group_groupID_key`(`groupID`),
    PRIMARY KEY (`groupID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Todo` (
    `todoID` VARCHAR(191) NOT NULL,
    `todoText` TEXT NOT NULL,
    `todoCreatorID` VARCHAR(191) NOT NULL,
    `groupID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Todo_todoID_key`(`todoID`),
    PRIMARY KEY (`todoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GroupMember` ADD CONSTRAINT `GroupMember_groupID_fkey` FOREIGN KEY (`groupID`) REFERENCES `Group`(`groupID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_todoCreatorID_fkey` FOREIGN KEY (`todoCreatorID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_groupID_fkey` FOREIGN KEY (`groupID`) REFERENCES `Group`(`groupID`) ON DELETE RESTRICT ON UPDATE CASCADE;
