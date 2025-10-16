-- DropForeignKey
ALTER TABLE "Edits" DROP CONSTRAINT "Edits_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Exports" DROP CONSTRAINT "Exports_projectId_fkey";

-- DropForeignKey
ALTER TABLE "MadeForYou" DROP CONSTRAINT "MadeForYou_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Recordings" DROP CONSTRAINT "Recordings_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_creatorId_fkey";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "timeZone" TEXT NOT NULL DEFAULT 'Asia/Calcutta';

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recordings" ADD CONSTRAINT "Recordings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MadeForYou" ADD CONSTRAINT "MadeForYou_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edits" ADD CONSTRAINT "Edits_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exports" ADD CONSTRAINT "Exports_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
