/*
  Warnings:

  - You are about to drop the `_SessionMembers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sessionName` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SessionMembers" DROP CONSTRAINT "_SessionMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "_SessionMembers" DROP CONSTRAINT "_SessionMembers_B_fkey";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "sessionName" TEXT NOT NULL;

-- DropTable
DROP TABLE "_SessionMembers";

-- CreateTable
CREATE TABLE "SessionInvite" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "invitedUserId" INTEGER,
    "invitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SessionInvite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SessionInvite" ADD CONSTRAINT "SessionInvite_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionInvite" ADD CONSTRAINT "SessionInvite_invitedUserId_fkey" FOREIGN KEY ("invitedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
