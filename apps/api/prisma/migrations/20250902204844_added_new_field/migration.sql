-- CreateTable
CREATE TABLE "MadeForYou" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" INTEGER,
    "creatorId" INTEGER NOT NULL,

    CONSTRAINT "MadeForYou_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edits" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" INTEGER,
    "creatorId" INTEGER NOT NULL,

    CONSTRAINT "Edits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exports" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" INTEGER,
    "creatorId" INTEGER NOT NULL,

    CONSTRAINT "Exports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MadeForYou" ADD CONSTRAINT "MadeForYou_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MadeForYou" ADD CONSTRAINT "MadeForYou_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MadeForYou" ADD CONSTRAINT "MadeForYou_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edits" ADD CONSTRAINT "Edits_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edits" ADD CONSTRAINT "Edits_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edits" ADD CONSTRAINT "Edits_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exports" ADD CONSTRAINT "Exports_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exports" ADD CONSTRAINT "Exports_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exports" ADD CONSTRAINT "Exports_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
