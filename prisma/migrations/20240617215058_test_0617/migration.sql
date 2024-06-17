/*
  Warnings:

  - You are about to drop the column `ErVisits` on the `HousingSecurityHomeVisitForm` table. All the data in the column will be lost.
  - You are about to drop the column `WellChildVisits` on the `HousingSecurityHomeVisitForm` table. All the data in the column will be lost.
  - You are about to drop the column `WellChildVisitsSpecific` on the `HousingSecurityHomeVisitForm` table. All the data in the column will be lost.
  - You are about to drop the column `concerns` on the `HousingSecurityHomeVisitForm` table. All the data in the column will be lost.
  - You are about to drop the column `erVisit` on the `HousingSecurityHomeVisitForm` table. All the data in the column will be lost.
  - You are about to drop the column `healthInsurance` on the `HousingSecurityHomeVisitForm` table. All the data in the column will be lost.
  - You are about to drop the column `wellChild` on the `HousingSecurityHomeVisitForm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HousingSecurityHomeVisitForm" DROP COLUMN "ErVisits",
DROP COLUMN "WellChildVisits",
DROP COLUMN "WellChildVisitsSpecific",
DROP COLUMN "concerns",
DROP COLUMN "erVisit",
DROP COLUMN "healthInsurance",
DROP COLUMN "wellChild";
