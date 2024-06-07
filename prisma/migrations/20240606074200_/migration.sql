/*
  Warnings:

  - The `supportServicesOther` column on the `ReferralsAndServices` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `foodNutritionOther` column on the `ReferralsAndServices` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `healthcareOther` column on the `ReferralsAndServices` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `substanceUseTreatmentOther` column on the `ReferralsAndServices` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `childRelatedOther` column on the `ReferralsAndServices` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `legalAssistanceOther` column on the `ReferralsAndServices` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `naloxone` to the `ReferralsAndServices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportationToTreatment` to the `ReferralsAndServices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReferralsAndServices" ADD COLUMN     "naloxone" JSONB NOT NULL,
ADD COLUMN     "transportationToTreatment" JSONB NOT NULL,
DROP COLUMN "supportServicesOther",
ADD COLUMN     "supportServicesOther" JSONB[],
DROP COLUMN "foodNutritionOther",
ADD COLUMN     "foodNutritionOther" JSONB[],
DROP COLUMN "healthcareOther",
ADD COLUMN     "healthcareOther" JSONB[],
DROP COLUMN "substanceUseTreatmentOther",
ADD COLUMN     "substanceUseTreatmentOther" JSONB[],
DROP COLUMN "childRelatedOther",
ADD COLUMN     "childRelatedOther" JSONB[],
DROP COLUMN "legalAssistanceOther",
ADD COLUMN     "legalAssistanceOther" JSONB[],
ALTER COLUMN "additionalNotes" SET DATA TYPE TEXT;
