/*
  Warnings:

  - Changed the type of `dateOfBirth` on the `ParticipantDemographicsRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ParticipantDemographicsRecord" DROP COLUMN "dateOfBirth",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL;
