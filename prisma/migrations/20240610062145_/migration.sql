/*
  Warnings:

  - Changed the type of `tobaccoUseScreeningAndDocumentation` on the `SmokingTobaccoPregnancy` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SmokingTobaccoPregnancy" DROP COLUMN "tobaccoUseScreeningAndDocumentation",
ADD COLUMN     "tobaccoUseScreeningAndDocumentation" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TobaccoUseScreeningAndDocumentation";
