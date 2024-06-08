/*
  Warnings:

  - Made the column `attendedPostpartumVisit` on table `ParentalMedicalHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ParentalMedicalHistory" ALTER COLUMN "attendedPostpartumVisit" SET NOT NULL,
ALTER COLUMN "postpartumVisitDate" DROP NOT NULL,
ALTER COLUMN "priorComplications" DROP NOT NULL;
