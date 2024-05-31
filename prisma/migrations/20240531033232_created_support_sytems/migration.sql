-- CreateTable
CREATE TABLE "SupportSystemsForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentSupportSystem" TEXT NOT NULL,
    "strengths" TEXT NOT NULL,
    "areasForImprovement" TEXT NOT NULL,
    "goals" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupportSystemsForm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SupportSystemsForm" ADD CONSTRAINT "SupportSystemsForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
