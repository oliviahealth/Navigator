/*
  Warnings:

  - You are about to drop the column `answerToTen` on the `EdinburgPostnatalDepressionScale` table. All the data in the column will be lost.
  - You are about to drop the column `unhappiness` on the `EdinburgPostnatalDepressionScale` table. All the data in the column will be lost.
  - Added the required column `difficultySleeping` to the `EdinburgPostnatalDepressionScale` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DifficultySleeping" AS ENUM ('Yes_mostly', 'Yes_sometimes', 'Not_often', 'Not_at_all');

-- AlterTable
ALTER TABLE "EdinburgPostnatalDepressionScale" DROP COLUMN "answerToTen",
DROP COLUMN "unhappiness",
ADD COLUMN     "difficultySleeping" "DifficultySleeping" NOT NULL;

-- DropEnum
DROP TYPE "Unhappiness";
