/*
  Warnings:

  - You are about to drop the column `url` on the `Recordings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recordings" DROP COLUMN "url",
ADD COLUMN     "tracks" TEXT[];
