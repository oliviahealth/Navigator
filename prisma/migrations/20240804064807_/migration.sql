/*
  Warnings:

  - You are about to drop the `NewAssessmentForm` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NewAssessmentForm" DROP CONSTRAINT "NewAssessmentForm_userId_fkey";

-- DropTable
DROP TABLE "NewAssessmentForm";

-- CreateTable
CREATE TABLE "MultidimensionalScale" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assessmentDate" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "participantId" INTEGER NOT NULL,
    "relation" TEXT NOT NULL,
    "formCompletionStatus" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "segment" TEXT NOT NULL,
    "formCompletionLanguage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MultidimensionalScale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MultidimensionalScale" ADD CONSTRAINT "MultidimensionalScale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
