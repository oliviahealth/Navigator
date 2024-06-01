/*
  Warnings:

  - You are about to drop the `EmergencyContact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmergencyContact" DROP CONSTRAINT "EmergencyContact_enrollmentFormId_fkey";

-- DropTable
DROP TABLE "EmergencyContact";

-- CreateTable
CREATE TABLE "EnrollmentFormEmergencyContact" (
    "id" TEXT NOT NULL,
    "enrollmentFormId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "EnrollmentFormEmergencyContact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EnrollmentFormEmergencyContact" ADD CONSTRAINT "EnrollmentFormEmergencyContact_enrollmentFormId_fkey" FOREIGN KEY ("enrollmentFormId") REFERENCES "EnrollmentForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
