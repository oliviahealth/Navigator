/*
  Warnings:

  - You are about to drop the column `actualModeDelivery` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `anticipatedDeliveryDate` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `attendedPostpartumVisit` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `county` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `currentLivingArrangement` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `effectiveDate` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyContact` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyContactPhone` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyContactRelationship` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `gestationalAge` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `insurancePlan` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `maritalStatus` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `numChildrenWithMother` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `numLiveBirths` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `ongoingMedicalProblems` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `phoneType` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `plannedModeDelivery` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `postpartumVisitDate` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `postpartumVisitLocation` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `primaryPhoneNumber` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `priorComplications` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `streetAddress` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `subscriberId` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `totalNumPregnancies` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `ParticipantRecordForOthersInvolvedForm` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DeliveryMode" AS ENUM ('Vaginal', 'Cesarean');

-- AlterTable
ALTER TABLE "ParticipantRecordForOthersInvolvedForm" DROP COLUMN "actualModeDelivery",
DROP COLUMN "anticipatedDeliveryDate",
DROP COLUMN "attendedPostpartumVisit",
DROP COLUMN "city",
DROP COLUMN "county",
DROP COLUMN "currentLivingArrangement",
DROP COLUMN "dateOfBirth",
DROP COLUMN "effectiveDate",
DROP COLUMN "emergencyContact",
DROP COLUMN "emergencyContactPhone",
DROP COLUMN "emergencyContactRelationship",
DROP COLUMN "gestationalAge",
DROP COLUMN "groupId",
DROP COLUMN "insurancePlan",
DROP COLUMN "maritalStatus",
DROP COLUMN "name",
DROP COLUMN "numChildrenWithMother",
DROP COLUMN "numLiveBirths",
DROP COLUMN "ongoingMedicalProblems",
DROP COLUMN "phoneType",
DROP COLUMN "plannedModeDelivery",
DROP COLUMN "postpartumVisitDate",
DROP COLUMN "postpartumVisitLocation",
DROP COLUMN "primaryPhoneNumber",
DROP COLUMN "priorComplications",
DROP COLUMN "state",
DROP COLUMN "streetAddress",
DROP COLUMN "subscriberId",
DROP COLUMN "totalNumPregnancies",
DROP COLUMN "zipCode";

-- DropEnum
DROP TYPE "PhoneType";

-- DropEnum
DROP TYPE "deliveryMode";

-- CreateTable
CREATE TABLE "ParticipantRecordForOthersInvolvedEntry" (
    "id" TEXT NOT NULL,
    "participantRecordForOthersInvolvedFormId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "currentLivingArrangement" "LivingArrangements" NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "primaryPhoneNumber" TEXT NOT NULL,
    "emergencyContact" TEXT NOT NULL,
    "emergencyContactPhone" TEXT NOT NULL,
    "emergencyContactRelationship" TEXT NOT NULL,
    "maritalStatus" "ParticipantRecordForOthersInvolvedMaritalStatus" NOT NULL,
    "insurancePlan" TEXT NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "gestationalAge" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "plannedModeDelivery" "DeliveryMode" NOT NULL,
    "actualModeDelivery" "DeliveryMode" NOT NULL,
    "attendedPostpartumVisit" TEXT NOT NULL,
    "postpartumVisitLocation" TEXT,
    "postpartumVisitDate" TIMESTAMP(3),
    "totalNumPregnancies" TEXT NOT NULL,
    "numLiveBirths" TEXT NOT NULL,
    "numChildrenWithMother" TEXT NOT NULL,
    "priorComplications" TEXT NOT NULL,
    "ongoingMedicalProblems" TEXT NOT NULL,

    CONSTRAINT "ParticipantRecordForOthersInvolvedEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParticipantRecordForOthersInvolvedEntry" ADD CONSTRAINT "ParticipantRecordForOthersInvolvedEntry_participantRecordF_fkey" FOREIGN KEY ("participantRecordForOthersInvolvedFormId") REFERENCES "ParticipantRecordForOthersInvolvedForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
