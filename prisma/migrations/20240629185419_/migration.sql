/*
  Warnings:

  - You are about to drop the `IPVDisclosureScreeningTool` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IPVDisclosureScreeningTool" DROP CONSTRAINT "IPVDisclosureScreeningTool_userId_fkey";

-- DropTable
DROP TABLE "IPVDisclosureScreeningTool";

-- CreateTable
CREATE TABLE "IPVScreening" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateTaken" TIMESTAMP(3) NOT NULL,
    "ipvScreeningDate" TIMESTAMP(3),
    "screeningToolUsed" TEXT,
    "totalScore" TEXT,
    "ipvDisclosure" TEXT,
    "ipvDisclosureDate" TIMESTAMP(3),
    "notes" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IPVScreening_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IPVScreening_userId_idx" ON "IPVScreening"("userId");

-- AddForeignKey
ALTER TABLE "IPVScreening" ADD CONSTRAINT "IPVScreening_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
