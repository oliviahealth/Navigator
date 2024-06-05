/*
  Warnings:

  - You are about to drop the column `telephone` on the `EnrollmentFormEmergencyContact` table. All the data in the column will be lost.
  - Added the required column `phone` to the `EnrollmentFormEmergencyContact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EnrollmentFormEmergencyContact" DROP COLUMN "telephone",
ADD COLUMN     "phone" TEXT NOT NULL;
