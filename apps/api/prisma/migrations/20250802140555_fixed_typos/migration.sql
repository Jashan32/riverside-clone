/*
  Warnings:

  - You are about to drop the column `prifilePic` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "prifilePic",
ADD COLUMN     "profilePic" TEXT;
