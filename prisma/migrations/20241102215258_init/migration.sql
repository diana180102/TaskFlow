/*
  Warnings:

  - You are about to drop the column `profileImageId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profileImageId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileImageId",
ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "Image";
