/*
  Warnings:

  - You are about to drop the column `ableToStopUsingDrugs` on the `SmokingTobaccoPregnancy` table. All the data in the column will be lost.
  - You are about to drop the column `abuseMoreThanOneDrug` on the `SmokingTobaccoPregnancy` table. All the data in the column will be lost.
  - You are about to drop the column `drugsOtherThanMedicines` on the `SmokingTobaccoPregnancy` table. All the data in the column will be lost.
  - You are about to drop the column `guiltFromDrugUse` on the `SmokingTobaccoPregnancy` table. All the data in the column will be lost.
  - You are about to drop the column `haveBlackoutsFlashbacksFromDrugs` on the `SmokingTobaccoPregnancy` table. All the data in the column will be lost.
  - You are about to drop the column `illegalActivitiesToObtainDrugs` on the `SmokingTobaccoPregnancy` table. All the data in the column will be lost.
  - You are about to drop the column `medicalProblemsFromUsage` on the `SmokingTobaccoPregnancy` table. All the data in the column will be lost.
  - You are about to drop the column `neglectedFamily` on the `SmokingTobaccoPregnancy` table. All the data in the column will be lost.
  - You are about to drop the column `spouseParentsComplainAboutUsage` on the `SmokingTobaccoPregnancy` table. All the data in the column will be lost.
  - You are about to drop the column `tobaccoUseScreeningAndDocumentation` on the `SmokingTobaccoPregnancy` table. All the data in the column will be lost.
  - You are about to drop the column `withdrawalsWhenStoppedDrugs` on the `SmokingTobaccoPregnancy` table. All the data in the column will be lost.
  - Added the required column `smokingStatus` to the `SmokingTobaccoPregnancy` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SmokingStatus" AS ENUM ('NEVER', 'NOT_BEFORE_AND_NOT_NOW', 'NOT_AFTER_AND_NOT_NOW', 'NOT_DURING_AND_NOT_NOW', 'NOT_DURING_AND_NOW');

-- AlterTable
ALTER TABLE "SmokingTobaccoPregnancy" DROP COLUMN "ableToStopUsingDrugs",
DROP COLUMN "abuseMoreThanOneDrug",
DROP COLUMN "drugsOtherThanMedicines",
DROP COLUMN "guiltFromDrugUse",
DROP COLUMN "haveBlackoutsFlashbacksFromDrugs",
DROP COLUMN "illegalActivitiesToObtainDrugs",
DROP COLUMN "medicalProblemsFromUsage",
DROP COLUMN "neglectedFamily",
DROP COLUMN "spouseParentsComplainAboutUsage",
DROP COLUMN "tobaccoUseScreeningAndDocumentation",
DROP COLUMN "withdrawalsWhenStoppedDrugs",
ADD COLUMN     "smokingStatus" "SmokingStatus" NOT NULL;
