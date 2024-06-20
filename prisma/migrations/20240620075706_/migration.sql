-- AlterTable
ALTER TABLE "MedicalServicesSubstanceUse" ALTER COLUMN "medications" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SubstanceUseHistory" ALTER COLUMN "date_used_mat" SET DATA TYPE TEXT;
