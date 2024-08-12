/*
  Warnings:

  - You are about to drop the column `howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObt` on the `FoodSecurity` table. All the data in the column will be lost.
  - You are about to drop the `MultidimensionalScale` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assessmentDate` to the `SocialSupportForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formCompletionStatus` to the `SocialSupportForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participantId` to the `SocialSupportForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phase` to the `SocialSupportForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relation` to the `SocialSupportForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `segment` to the `SocialSupportForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siteID` to the `SocialSupportForm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MultidimensionalScale" DROP CONSTRAINT "MultidimensionalScale_userId_fkey";

-- AlterTable
ALTER TABLE "FoodSecurity" DROP COLUMN "howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObt",
ADD COLUMN     "howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood" TEXT;

-- AlterTable
ALTER TABLE "SocialSupportForm" ADD COLUMN     "assessmentDate" TEXT NOT NULL,
ADD COLUMN     "formCompletionStatus" TEXT NOT NULL,
ADD COLUMN     "participantId" TEXT NOT NULL,
ADD COLUMN     "phase" TEXT NOT NULL,
ADD COLUMN     "relation" TEXT NOT NULL,
ADD COLUMN     "segment" TEXT NOT NULL,
ADD COLUMN     "siteID" TEXT NOT NULL;

-- DropTable
DROP TABLE "MultidimensionalScale";
