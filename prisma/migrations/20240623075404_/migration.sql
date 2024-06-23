/*
  Warnings:

  - Added the required column `dateModified` to the `TenBsPostpartumAppointmentAssesment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TenBsPostpartumAppointmentAssesment" ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateModified" TIMESTAMP(3) NOT NULL;
