/*
  Warnings:

  - You are about to drop the column `dateTime` on the `AppointmentLog` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `AppointmentLog` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `AppointmentLog` table. All the data in the column will be lost.
  - You are about to drop the column `participant` on the `AppointmentLog` table. All the data in the column will be lost.
  - You are about to drop the column `dateTime` on the `CommunicationLog` table. All the data in the column will be lost.
  - You are about to drop the column `followUpNeeded` on the `CommunicationLog` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `CommunicationLog` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `CommunicationLog` table. All the data in the column will be lost.
  - You are about to drop the column `organizationPerson` on the `CommunicationLog` table. All the data in the column will be lost.
  - You are about to drop the column `purpose` on the `CommunicationLog` table. All the data in the column will be lost.
  - You are about to drop the column `clientSignature` on the `EnrollmentForm` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyContacts` on the `EnrollmentForm` table. All the data in the column will be lost.
  - You are about to drop the column `gcMomsSignature` on the `EnrollmentForm` table. All the data in the column will be lost.
  - You are about to drop the column `guardianSignature` on the `EnrollmentForm` table. All the data in the column will be lost.
  - You are about to drop the column `guardianSignature` on the `MediaAppearance` table. All the data in the column will be lost.
  - You are about to drop the column `participant` on the `MediaAppearance` table. All the data in the column will be lost.
  - You are about to drop the column `participantSignature` on the `MediaAppearance` table. All the data in the column will be lost.
  - Changed the type of `dateOfBirth` on the `EnrollmentForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `participantName` to the `MediaAppearance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CommunicationMethod" AS ENUM ('phone', 'email', 'in_person', 'video_call', 'other');

-- CreateEnum
CREATE TYPE "FollowUpNeeded" AS ENUM ('Yes', 'No');

-- AlterTable
ALTER TABLE "AppointmentLog" DROP COLUMN "dateTime",
DROP COLUMN "location",
DROP COLUMN "notes",
DROP COLUMN "participant";

-- AlterTable
ALTER TABLE "CommunicationLog" DROP COLUMN "dateTime",
DROP COLUMN "followUpNeeded",
DROP COLUMN "method",
DROP COLUMN "notes",
DROP COLUMN "organizationPerson",
DROP COLUMN "purpose";

-- AlterTable
ALTER TABLE "EnrollmentForm" DROP COLUMN "clientSignature",
DROP COLUMN "emergencyContacts",
DROP COLUMN "gcMomsSignature",
DROP COLUMN "guardianSignature",
DROP COLUMN "dateOfBirth",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "MediaAppearance" DROP COLUMN "guardianSignature",
DROP COLUMN "participant",
DROP COLUMN "participantSignature",
ADD COLUMN     "participantName" TEXT NOT NULL,
ALTER COLUMN "guardianName" DROP NOT NULL,
ALTER COLUMN "guardianDate" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CommunicationEntry" (
    "id" TEXT NOT NULL,
    "communicationLogId" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "method" "CommunicationMethod" NOT NULL,
    "organizationPerson" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "followUpNeeded" "FollowUpNeeded" NOT NULL,

    CONSTRAINT "CommunicationEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentEntry" (
    "id" TEXT NOT NULL,
    "appointmentLogId" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "who" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "AppointmentEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" TEXT NOT NULL,
    "enrollmentFormId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommunicationEntry" ADD CONSTRAINT "CommunicationEntry_communicationLogId_fkey" FOREIGN KEY ("communicationLogId") REFERENCES "CommunicationLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentEntry" ADD CONSTRAINT "AppointmentEntry_appointmentLogId_fkey" FOREIGN KEY ("appointmentLogId") REFERENCES "AppointmentLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_enrollmentFormId_fkey" FOREIGN KEY ("enrollmentFormId") REFERENCES "EnrollmentForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
