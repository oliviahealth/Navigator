-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Female', 'Male');

-- CreateEnum
CREATE TYPE "Ethnicity" AS ENUM ('Hispanic_Or_Latinx', 'Not_Hispanic_Or_Latinx');

-- CreateEnum
CREATE TYPE "Race" AS ENUM ('American_Indian_Alaska_Native', 'Asian', 'Black_or_African_American', 'Native_Hawaiian_or_Pacific_Islander', 'White', 'More_than_one_race_not_specified', 'Declined_to_identify');

-- CreateEnum
CREATE TYPE "PregnancyStatusAtEnrollment" AS ENUM ('Pregnant', 'Not_Pregnant', 'NA_Male_Participiant');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('Married', 'Not_Married_But_Living_Together', 'Never_Married_And_Not_Living_With_Partner', 'Separated_or_Divorced', 'Widowed');

-- CreateEnum
CREATE TYPE "LgbtqiPlus" AS ENUM ('lgbtqi', 'nonlgbtqi');

-- CreateEnum
CREATE TYPE "Insurance" AS ENUM ('Employer_Insurance', 'Self_Pay', 'Dual_Eligibile_Medicaid_Medicare', 'Medicaid_CHIP_only', 'Medicare_only', 'Medicare_plus_supplemental', 'TriCARE', 'Other_third_party_privately_insured', 'Uninsured');

-- CreateEnum
CREATE TYPE "PriorityPopulationCharacteristics" AS ENUM ('Yes', 'No');

-- CreateTable
CREATE TABLE "ParticipantRecordDemographics" (
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

    CONSTRAINT "ParticipantRecordDemographics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParticipantRecordDemographics" ADD CONSTRAINT "ParticipantRecordDemographics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
