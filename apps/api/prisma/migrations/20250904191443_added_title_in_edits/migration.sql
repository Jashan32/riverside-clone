/*
  Warnings:

  - Added the required column `title` to the `Edits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Edits" ADD COLUMN     "title" TEXT NOT NULL;
