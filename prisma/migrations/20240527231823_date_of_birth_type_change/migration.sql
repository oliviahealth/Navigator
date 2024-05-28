/*
  Warnings:

  - Changed the type of `programStartDate` on the `ParticipantDemographicsRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ParticipantDemographicsRecord" DROP COLUMN "programStartDate",
ADD COLUMN     "programStartDate" TIMESTAMP(3) NOT NULL;
