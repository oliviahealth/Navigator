/*
  Warnings:

  - You are about to drop the column `howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObt` on the `FoodSecurity` table. All the data in the column will be lost.
  - Added the required column `formCompletionLanaguage` to the `SocialSupportForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodSecurity" DROP COLUMN "howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObt",
ADD COLUMN     "howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood" TEXT;

-- AlterTable
ALTER TABLE "SocialSupportForm" ADD COLUMN     "formCompletionLanaguage" TEXT NOT NULL;
