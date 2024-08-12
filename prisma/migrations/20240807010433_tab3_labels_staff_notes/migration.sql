/*
  Warnings:

  - Added the required column `label` to the `EncounterForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffNotes` to the `EncounterForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `NutritionHistoryAndAssessment` table without a default value. This is not possible if the table is not empty.
  - Made the column `staffNotes` on table `NutritionHistoryAndAssessment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `label` to the `ParentalMedicalHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffNotes` to the `ParentalMedicalHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EncounterForm" ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "staffNotes" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NutritionHistoryAndAssessment" ADD COLUMN     "label" TEXT NOT NULL,
ALTER COLUMN "staffNotes" SET NOT NULL;

-- AlterTable
ALTER TABLE "ParentalMedicalHistory" ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "staffNotes" TEXT NOT NULL;
