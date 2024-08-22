/*
  Warnings:

  - The `guardianDate` column on the `EnrollmentForm` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObt` on the `FoodSecurity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EnrollmentForm" DROP COLUMN "guardianDate",
ADD COLUMN     "guardianDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "FoodSecurity" DROP COLUMN "howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObt",
ADD COLUMN     "howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood" TEXT;
