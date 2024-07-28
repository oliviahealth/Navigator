/*
  Warnings:

  - Added the required column `label` to the `EnrollmentForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffNotes` to the `EnrollmentForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EnrollmentForm" ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "staffNotes" TEXT NOT NULL;
