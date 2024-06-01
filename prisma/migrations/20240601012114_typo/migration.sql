/*
  Warnings:

  - You are about to drop the column `listChildrentNotLivingWithPatient` on the `CurrentLivingArrangement` table. All the data in the column will be lost.
  - Added the required column `listChildrenNotLivingWithPatient` to the `CurrentLivingArrangement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CurrentLivingArrangement" DROP COLUMN "listChildrentNotLivingWithPatient",
ADD COLUMN     "listChildrenNotLivingWithPatient" JSONB NOT NULL;
