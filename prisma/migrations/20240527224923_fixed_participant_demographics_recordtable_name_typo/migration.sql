/*
  Warnings:

  - You are about to drop the `ParticipantRecordDemographics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ParticipantRecordDemographics" DROP CONSTRAINT "ParticipantRecordDemographics_userId_fkey";

-- DropTable
DROP TABLE "ParticipantRecordDemographics";

-- CreateTable
CREATE TABLE "ParticipantDemographicsRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "programStartDate" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "homeVisitorAssignment" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "ethnicity" "Ethnicity" NOT NULL,
    "race" "Race" NOT NULL,
    "primaryLanguage" TEXT NOT NULL,
    "pregnancyStatusAtEnrollment" "PregnancyStatusAtEnrollment" NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "lgbtqiPlus" "LgbtqiPlus" NOT NULL,
    "insurance" "Insurance" NOT NULL,
    "childAbuse" "PriorityPopulationCharacteristics" NOT NULL,
    "substanceAbuse" "PriorityPopulationCharacteristics" NOT NULL,
    "tobaccoUse" "PriorityPopulationCharacteristics" NOT NULL,
    "lowStudentAchievement" "PriorityPopulationCharacteristics" NOT NULL,
    "developmentalDelay" "PriorityPopulationCharacteristics" NOT NULL,
    "USArmedForces" "PriorityPopulationCharacteristics" NOT NULL,
    "reenrollmentWithGap" "PriorityPopulationCharacteristics" NOT NULL,
    "transferFromAnotherSite" "PriorityPopulationCharacteristics" NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParticipantDemographicsRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParticipantDemographicsRecord" ADD CONSTRAINT "ParticipantDemographicsRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
