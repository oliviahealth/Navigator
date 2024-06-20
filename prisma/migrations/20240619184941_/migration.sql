/*
  Warnings:

  - You are about to drop the column `erVisitSpecified` on the `HousingSecurityHomeVisitForm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HousingSecurityHomeVisitForm" DROP COLUMN "erVisitSpecified",
ADD COLUMN     "erVisitSpecific" JSONB;
