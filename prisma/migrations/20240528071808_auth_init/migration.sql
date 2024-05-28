/*
  Warnings:

  - The `guardianDate` column on the `MediaAppearance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `participantDate` on the `MediaAppearance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AppointmentEntry" DROP CONSTRAINT "AppointmentEntry_appointmentLogId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentLog" DROP CONSTRAINT "AppointmentLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "CommunicationEntry" DROP CONSTRAINT "CommunicationEntry_communicationLogId_fkey";

-- DropForeignKey
ALTER TABLE "CommunicationLog" DROP CONSTRAINT "CommunicationLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "EmergencyContact" DROP CONSTRAINT "EmergencyContact_enrollmentFormId_fkey";

-- DropForeignKey
ALTER TABLE "EnrollmentForm" DROP CONSTRAINT "EnrollmentForm_userId_fkey";

-- DropForeignKey
ALTER TABLE "MediaAppearance" DROP CONSTRAINT "MediaAppearance_userId_fkey";

-- AlterTable
ALTER TABLE "AppointmentLog" ALTER COLUMN "dateModified" DROP DEFAULT;

-- AlterTable
ALTER TABLE "CommunicationLog" ALTER COLUMN "dateModified" DROP DEFAULT;

-- AlterTable
ALTER TABLE "EnrollmentForm" ALTER COLUMN "dateModified" DROP DEFAULT;

-- AlterTable
ALTER TABLE "MediaAppearance" DROP COLUMN "participantDate",
ADD COLUMN     "participantDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "guardianDate",
ADD COLUMN     "guardianDate" TIMESTAMP(3),
ALTER COLUMN "dateModified" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "dateModified" DROP DEFAULT;

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
ALTER TABLE "MediaAppearance" ADD CONSTRAINT "MediaAppearance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
