/*
  Warnings:

  - You are about to drop the column `addiction_medicine_clinic` on the `SubstanceUseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `addiction_medicine_clinic_phone` on the `SubstanceUseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `date_used_medicine_service` on the `SubstanceUseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `mat_clinic_name` on the `SubstanceUseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `mat_clinic_phone` on the `SubstanceUseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `mat_engaged` on the `SubstanceUseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `medications` on the `SubstanceUseHistory` table. All the data in the column will be lost.
  - You are about to drop the column `used_addiction_medicine_services` on the `SubstanceUseHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubstanceUseHistory" DROP COLUMN "addiction_medicine_clinic",
DROP COLUMN "addiction_medicine_clinic_phone",
DROP COLUMN "date_used_medicine_service",
DROP COLUMN "mat_clinic_name",
DROP COLUMN "mat_clinic_phone",
DROP COLUMN "mat_engaged",
DROP COLUMN "medications",
DROP COLUMN "used_addiction_medicine_services";

-- DropEnum
DROP TYPE "MAT_ENGAGED";

-- CreateTable
CREATE TABLE "MedicalServicesSubstanceUse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mat_engaged" TEXT NOT NULL,
    "date_used_mat" TIMESTAMP(3),
    "medications" JSONB NOT NULL,
    "mat_clinic_name" TEXT,
    "mat_clinic_phone" TEXT,
    "used_addiction_medicine_services" TEXT NOT NULL,
    "date_used_medicine_service" TIMESTAMP(3),
    "addiction_medicine_clinic" TEXT,
    "addiction_medicine_clinic_phone" TEXT,
    "addiction_medication_service" TEXT NOT NULL,

    CONSTRAINT "MedicalServicesSubstanceUse_pkey" PRIMARY KEY ("id")
);
