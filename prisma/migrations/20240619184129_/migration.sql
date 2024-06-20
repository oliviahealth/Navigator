/*
  Warnings:

  - You are about to drop the column `ErVisits` on the `HousingSecurityHomeVisitForm` table. All the data in the column will be lost.
  - You are about to drop the column `WellChildVisits` on the `HousingSecurityHomeVisitForm` table. All the data in the column will be lost.
  - You are about to drop the column `wellChild` on the `HousingSecurityHomeVisitForm` table. All the data in the column will be lost.
  - Added the required column `wellChildVisits` to the `HousingSecurityHomeVisitForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HousingSecurityHomeVisitForm" DROP COLUMN "ErVisits",
DROP COLUMN "WellChildVisits",
DROP COLUMN "wellChild",
ADD COLUMN     "erVisitSpecified" JSONB,
ADD COLUMN     "wellChildVisits" "YesNo" NOT NULL;
