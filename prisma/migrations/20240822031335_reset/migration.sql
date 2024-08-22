/*
  Warnings:

  - You are about to drop the column `howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObt` on the `FoodSecurity` table. All the data in the column will be lost.
  - The `date_used_mat` column on the `SubstanceUseHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FoodSecurity" DROP COLUMN "howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObt",
ADD COLUMN     "howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood" TEXT;

-- AlterTable
ALTER TABLE "SubstanceUseHistory" DROP COLUMN "date_used_mat",
ADD COLUMN     "date_used_mat" TIMESTAMP(3);
