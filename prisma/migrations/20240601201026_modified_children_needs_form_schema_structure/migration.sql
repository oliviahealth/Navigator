/*
  Warnings:

  - Changed the type of `breastPump` on the `ChildrenNeedsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `breastfeedingSupport` on the `ChildrenNeedsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `carSeat` on the `ChildrenNeedsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `childcare` on the `ChildrenNeedsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `clothing` on the `ChildrenNeedsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bed` on the `ChildrenNeedsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `diapers` on the `ChildrenNeedsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `infantFormula` on the `ChildrenNeedsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `infantStroller` on the `ChildrenNeedsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `schoolSupplies` on the `ChildrenNeedsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `specializedMedEquipment` on the `ChildrenNeedsForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ChildrenNeedsStatus" AS ENUM ('Yes', 'No', 'Pending');

-- AlterTable
ALTER TABLE "ChildrenNeedsForm" ADD COLUMN     "bedNotes" TEXT,
ADD COLUMN     "breastPumpNotes" TEXT,
ADD COLUMN     "breastfeedingSupportNotes" TEXT,
ADD COLUMN     "carSeatNotes" TEXT,
ADD COLUMN     "childcareNotes" TEXT,
ADD COLUMN     "clothingNotes" TEXT,
ADD COLUMN     "diapersNotes" TEXT,
ADD COLUMN     "infantFormulaNotes" TEXT,
ADD COLUMN     "infantStrollerNotes" TEXT,
ADD COLUMN     "schoolSuppliesNotes" TEXT,
ADD COLUMN     "specializedMedEquipmentNotes" TEXT,
DROP COLUMN "breastPump",
ADD COLUMN     "breastPump" "ChildrenNeedsStatus" NOT NULL,
DROP COLUMN "breastfeedingSupport",
ADD COLUMN     "breastfeedingSupport" "ChildrenNeedsStatus" NOT NULL,
DROP COLUMN "carSeat",
ADD COLUMN     "carSeat" "ChildrenNeedsStatus" NOT NULL,
DROP COLUMN "childcare",
ADD COLUMN     "childcare" "ChildrenNeedsStatus" NOT NULL,
DROP COLUMN "clothing",
ADD COLUMN     "clothing" "ChildrenNeedsStatus" NOT NULL,
DROP COLUMN "bed",
ADD COLUMN     "bed" "ChildrenNeedsStatus" NOT NULL,
DROP COLUMN "diapers",
ADD COLUMN     "diapers" "ChildrenNeedsStatus" NOT NULL,
DROP COLUMN "infantFormula",
ADD COLUMN     "infantFormula" "ChildrenNeedsStatus" NOT NULL,
DROP COLUMN "infantStroller",
ADD COLUMN     "infantStroller" "ChildrenNeedsStatus" NOT NULL,
DROP COLUMN "schoolSupplies",
ADD COLUMN     "schoolSupplies" "ChildrenNeedsStatus" NOT NULL,
DROP COLUMN "specializedMedEquipment",
ADD COLUMN     "specializedMedEquipment" "ChildrenNeedsStatus" NOT NULL;

-- DropEnum
DROP TYPE "ChildrenNeeds";
