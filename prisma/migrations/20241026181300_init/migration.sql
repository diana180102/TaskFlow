/*
  Warnings:

  - You are about to drop the column `username` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fullName]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Users_username_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "username",
ADD COLUMN     "fullName" VARCHAR(80);

-- CreateIndex
CREATE UNIQUE INDEX "Users_fullName_key" ON "Users"("fullName");
