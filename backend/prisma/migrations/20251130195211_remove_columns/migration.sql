/*
  Warnings:

  - You are about to drop the column `learningLanguage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nativeLanguage` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "learningLanguage",
DROP COLUMN "location",
DROP COLUMN "nativeLanguage";
