/*
  Warnings:

  - You are about to drop the column `howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObt` on the `FoodSecurity` table. All the data in the column will be lost.
  - Added the required column `label` to the `SocialSupportForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffNotes` to the `SocialSupportForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodSecurity" DROP COLUMN "howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObt",
ADD COLUMN     "howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood" TEXT;

-- AlterTable
ALTER TABLE "SocialSupportForm" ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "staffNotes" TEXT NOT NULL;
