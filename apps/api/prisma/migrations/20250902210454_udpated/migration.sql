/*
  Warnings:

  - Changed the type of `tracks` on the `Recordings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Recordings" DROP COLUMN "tracks",
ADD COLUMN     "tracks" JSONB NOT NULL;
