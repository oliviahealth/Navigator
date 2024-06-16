/*
  Warnings:

  - You are about to drop the column `pregnancyInfo` on the `NutritionHistoryAndAssessment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NutritionHistoryAndAssessment" DROP COLUMN "pregnancyInfo",
ADD COLUMN     "currentPregnancyInfo" "CurrentPregnancyInfo"[];
