/*
  Warnings:

  - Changed the type of `followUpNeeded` on the `CommunicationEntry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `childAbuse` on the `ParticipantDemographicsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `substanceAbuse` on the `ParticipantDemographicsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tobaccoUse` on the `ParticipantDemographicsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `lowStudentAchievement` on the `ParticipantDemographicsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `developmentalDelay` on the `ParticipantDemographicsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `USArmedForces` on the `ParticipantDemographicsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `reenrollmentWithGap` on the `ParticipantDemographicsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `transferFromAnotherSite` on the `ParticipantDemographicsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "AppointmentEntry" DROP CONSTRAINT "AppointmentEntry_appointmentLogId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentLog" DROP CONSTRAINT "AppointmentLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "ChildDemographicsRecord" DROP CONSTRAINT "ChildDemographicsRecord_userId_fkey";

-- DropForeignKey
ALTER TABLE "CommunicationEntry" DROP CONSTRAINT "CommunicationEntry_communicationLogId_fkey";

-- DropForeignKey
ALTER TABLE "CommunicationLog" DROP CONSTRAINT "CommunicationLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "EmergencyContact" DROP CONSTRAINT "EmergencyContact_enrollmentFormId_fkey";

-- DropForeignKey
ALTER TABLE "EnrollmentForm" DROP CONSTRAINT "EnrollmentForm_userId_fkey";

-- DropForeignKey
ALTER TABLE "MediaAppearanceForm" DROP CONSTRAINT "MediaAppearanceForm_userId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantDemographicsForm" DROP CONSTRAINT "ParticipantDemographicsForm_userId_fkey";

-- AlterTable
ALTER TABLE "ChildDemographicsRecord" ALTER COLUMN "caseworker" DROP NOT NULL,
ALTER COLUMN "caseworkerPhoneNumber" DROP NOT NULL,
ALTER COLUMN "importantInformation" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CommunicationEntry" DROP COLUMN "followUpNeeded",
ADD COLUMN     "followUpNeeded" "YesNo" NOT NULL;

-- AlterTable
ALTER TABLE "ParticipantDemographicsForm" DROP COLUMN "childAbuse",
ADD COLUMN     "childAbuse" "YesNo" NOT NULL,
DROP COLUMN "substanceAbuse",
ADD COLUMN     "substanceAbuse" "YesNo" NOT NULL,
DROP COLUMN "tobaccoUse",
ADD COLUMN     "tobaccoUse" "YesNo" NOT NULL,
DROP COLUMN "lowStudentAchievement",
ADD COLUMN     "lowStudentAchievement" "YesNo" NOT NULL,
DROP COLUMN "developmentalDelay",
ADD COLUMN     "developmentalDelay" "YesNo" NOT NULL,
DROP COLUMN "USArmedForces",
ADD COLUMN     "USArmedForces" "YesNo" NOT NULL,
DROP COLUMN "reenrollmentWithGap",
ADD COLUMN     "reenrollmentWithGap" "YesNo" NOT NULL,
DROP COLUMN "transferFromAnotherSite",
ADD COLUMN     "transferFromAnotherSite" "YesNo" NOT NULL;

-- DropEnum
DROP TYPE "FollowUpNeeded";

-- DropEnum
DROP TYPE "PriorityPopulationCharacteristics";

-- AddForeignKey
ALTER TABLE "CommunicationEntry" ADD CONSTRAINT "CommunicationEntry_communicationLogId_fkey" FOREIGN KEY ("communicationLogId") REFERENCES "CommunicationLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationLog" ADD CONSTRAINT "CommunicationLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentEntry" ADD CONSTRAINT "AppointmentEntry_appointmentLogId_fkey" FOREIGN KEY ("appointmentLogId") REFERENCES "AppointmentLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentLog" ADD CONSTRAINT "AppointmentLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_enrollmentFormId_fkey" FOREIGN KEY ("enrollmentFormId") REFERENCES "EnrollmentForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentForm" ADD CONSTRAINT "EnrollmentForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAppearanceForm" ADD CONSTRAINT "MediaAppearanceForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantDemographicsForm" ADD CONSTRAINT "ParticipantDemographicsForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildDemographicsRecord" ADD CONSTRAINT "ChildDemographicsRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
