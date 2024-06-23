/*
  Warnings:

  - The values [Often] on the enum `PerceivedStressScaleOptions` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PerceivedStressScaleOptions_new" AS ENUM ('Never', 'Almost_never', 'Sometimes', 'Fairly_often', 'Very_often');
ALTER TABLE "PerceivedStressScale" ALTER COLUMN "upsetUnexpectedly" TYPE "PerceivedStressScaleOptions_new" USING ("upsetUnexpectedly"::text::"PerceivedStressScaleOptions_new");
ALTER TABLE "PerceivedStressScale" ALTER COLUMN "unableControlImportant" TYPE "PerceivedStressScaleOptions_new" USING ("unableControlImportant"::text::"PerceivedStressScaleOptions_new");
ALTER TABLE "PerceivedStressScale" ALTER COLUMN "nervousAndStressed" TYPE "PerceivedStressScaleOptions_new" USING ("nervousAndStressed"::text::"PerceivedStressScaleOptions_new");
ALTER TABLE "PerceivedStressScale" ALTER COLUMN "handleProblemsConfidently" TYPE "PerceivedStressScaleOptions_new" USING ("handleProblemsConfidently"::text::"PerceivedStressScaleOptions_new");
ALTER TABLE "PerceivedStressScale" ALTER COLUMN "thingsGoingWay" TYPE "PerceivedStressScaleOptions_new" USING ("thingsGoingWay"::text::"PerceivedStressScaleOptions_new");
ALTER TABLE "PerceivedStressScale" ALTER COLUMN "copeInability" TYPE "PerceivedStressScaleOptions_new" USING ("copeInability"::text::"PerceivedStressScaleOptions_new");
ALTER TABLE "PerceivedStressScale" ALTER COLUMN "controlIrritations" TYPE "PerceivedStressScaleOptions_new" USING ("controlIrritations"::text::"PerceivedStressScaleOptions_new");
ALTER TABLE "PerceivedStressScale" ALTER COLUMN "onTopOfThings" TYPE "PerceivedStressScaleOptions_new" USING ("onTopOfThings"::text::"PerceivedStressScaleOptions_new");
ALTER TABLE "PerceivedStressScale" ALTER COLUMN "angeredOutsideControl" TYPE "PerceivedStressScaleOptions_new" USING ("angeredOutsideControl"::text::"PerceivedStressScaleOptions_new");
ALTER TABLE "PerceivedStressScale" ALTER COLUMN "difficultiesPilingUp" TYPE "PerceivedStressScaleOptions_new" USING ("difficultiesPilingUp"::text::"PerceivedStressScaleOptions_new");
ALTER TYPE "PerceivedStressScaleOptions" RENAME TO "PerceivedStressScaleOptions_old";
ALTER TYPE "PerceivedStressScaleOptions_new" RENAME TO "PerceivedStressScaleOptions";
DROP TYPE "PerceivedStressScaleOptions_old";
COMMIT;
