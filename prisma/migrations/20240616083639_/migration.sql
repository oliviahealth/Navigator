/*
  Warnings:

  - Made the column `hispanicLatino` on table `NutritionHistoryAndAssessment` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `hivBloodTest` on the `NutritionHistoryAndAssessment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "NutritionHistoryAndAssessment" ALTER COLUMN "hispanicLatino" SET NOT NULL,
DROP COLUMN "hivBloodTest",
ADD COLUMN     "hivBloodTest" "YesNo" NOT NULL;
