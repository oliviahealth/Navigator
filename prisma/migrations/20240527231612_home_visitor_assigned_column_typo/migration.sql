/*
  Warnings:

  - You are about to drop the column `homeVisitorAssignment` on the `ParticipantDemographicsRecord` table. All the data in the column will be lost.
  - Added the required column `homeVisitorAssigned` to the `ParticipantDemographicsRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParticipantDemographicsRecord" DROP COLUMN "homeVisitorAssignment",
ADD COLUMN     "homeVisitorAssigned" TEXT NOT NULL;
