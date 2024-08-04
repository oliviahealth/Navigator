/*
  Warnings:

  - Changed the type of `timeframe` on the `EdinburgPostnatalDepressionScale` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EPDS_Timeframe" AS ENUM ('Prenatal', 'Postnatal');

-- CreateEnum
CREATE TYPE "FollowUpAction" AS ENUM ('Provide_support', 'Rescreen', 'Refer_to_early_steps', 'Refer_to_agency', 'No_further_action');

-- CreateEnum
CREATE TYPE "IPVStatus" AS ENUM ('Never', 'Rarely', 'Sometimes', 'Fairly', 'Often', 'Frequently');

-- CreateEnum
CREATE TYPE "BriefChildWellnessUpdateTimeframe" AS ENUM ('Enrollment', 'Update');

-- CreateEnum
CREATE TYPE "HealthInsurance" AS ENUM ('Medicaid_or_Kidcare', 'Private', 'Tricare', 'None', 'Other');

-- CreateEnum
CREATE TYPE "MedicalCare" AS ENUM ('Doctor_office', 'Hospital_emergency_room', 'Hospital_clinic', 'Qualified_health_center', 'Retail_or_Minute_clinic', 'None', 'Other');

-- CreateEnum
CREATE TYPE "ReadingFrequency" AS ENUM ('Some_days', 'Everyday');

-- CreateEnum
CREATE TYPE "ResponseAnswers" AS ENUM ('Very_strongly_disagree', 'Strongly_disagree', 'Disagree', 'Neither_agree_nor_disagree', 'Strongly_agree', 'Very_strongly_agree');

-- CreateEnum
CREATE TYPE "InfancyQuestionnaireTimeframe" AS ENUM ('Birth_to_one_month', 'Two_to_three_months', 'Six_to_seven_months', 'Ten_to_eleven_months');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('Some_days', 'Everyday');

-- CreateEnum
CREATE TYPE "Yes" AS ENUM ('Yes');

-- AlterTable
ALTER TABLE "EdinburgPostnatalDepressionScale" DROP COLUMN "timeframe",
ADD COLUMN     "timeframe" "EPDS_Timeframe" NOT NULL;

-- DropEnum
DROP TYPE "Timeframe";

-- CreateTable
CREATE TABLE "ASQ3" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "participantName" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "dateCompleted" TIMESTAMP(3) NOT NULL,
    "staffName" TEXT NOT NULL,
    "childName" TEXT NOT NULL,
    "questionnaireUsed" TEXT NOT NULL,
    "ageAdjusted" "YesNo" NOT NULL,
    "communicationScore" TEXT,
    "communicationScoreNotRecorded" "YesNo" NOT NULL,
    "grossMotorScore" TEXT,
    "grossMotorScoreNotRecorded" "YesNo" NOT NULL,
    "fineMotorScore" TEXT,
    "fineMotorScoreNotRecorded" "YesNo" NOT NULL,
    "problemSolvingScore" TEXT,
    "problemSolvingScoreNotRecorded" "YesNo" NOT NULL,
    "personalSocialScore" TEXT,
    "personalSocialScoreNotRecorded" "YesNo" NOT NULL,
    "followUpAction" "FollowUpAction"[],
    "describeActivitiesProvided" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ASQ3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntimatePartnerViolenceForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "physicallyHurt" "IPVStatus" NOT NULL,
    "insultOrTalkDown" "IPVStatus" NOT NULL,
    "threatenWithHarm" "IPVStatus" NOT NULL,
    "screamOrCurse" "IPVStatus" NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntimatePartnerViolenceForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BriefChildWellnessUpdate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "childName" TEXT NOT NULL,
    "dateCompleted" TIMESTAMP(3) NOT NULL,
    "timeframe" "BriefChildWellnessUpdateTimeframe" NOT NULL,
    "healthInsurance" "HealthInsurance" NOT NULL,
    "otherHealthInsurance" TEXT,
    "medicalCare" "MedicalCare" NOT NULL,
    "otherMedicalCare" TEXT,
    "hasDentalCare" "YesNo" NOT NULL,
    "readingFrequency" "ReadingFrequency" NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BriefChildWellnessUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryHistoryInformationForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "participantName" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "dateCompleted" TIMESTAMP(3) NOT NULL,
    "staffName" TEXT NOT NULL,
    "deliveries" JSONB[],
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryHistoryInformationForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialSupportForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "specialPersonInNeed" "ResponseAnswers" NOT NULL,
    "specialPersonJoysSorrows" "ResponseAnswers" NOT NULL,
    "familyHelp" "ResponseAnswers" NOT NULL,
    "emotionalHelp" "ResponseAnswers" NOT NULL,
    "specialPersonForComfort" "ResponseAnswers" NOT NULL,
    "friendsHelp" "ResponseAnswers" NOT NULL,
    "canCountOnFriends" "ResponseAnswers" NOT NULL,
    "talkToFamilyAboutProblems" "ResponseAnswers" NOT NULL,
    "friendsJoysSorrows" "ResponseAnswers" NOT NULL,
    "specialPersonToTalkFeelings" "ResponseAnswers" NOT NULL,
    "familyHelpsDecisions" "ResponseAnswers" NOT NULL,
    "talkToFriendsAboutProblems" "ResponseAnswers" NOT NULL,
    "specialPersonInitials" TEXT,
    "specialPersonRelationship" TEXT,
    "comments" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialSupportForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IPVScreening" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateTaken" TIMESTAMP(3) NOT NULL,
    "ipvScreeningDate" TIMESTAMP(3) NOT NULL,
    "screeningToolUsed" TEXT NOT NULL,
    "totalScore" TEXT NOT NULL,
    "ipvDisclosure" "YesNo" NOT NULL,
    "ipvDisclosureDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IPVScreening_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfancyQuestionnaire" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "participantName" TEXT NOT NULL,
    "dateCompleted" TIMESTAMP(3) NOT NULL,
    "childName" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "staffName" TEXT NOT NULL,
    "timeframe" "InfancyQuestionnaireTimeframe" NOT NULL,
    "sleepOnBack" "YesNo" NOT NULL,
    "sleepAlone" "YesNo" NOT NULL,
    "sleepWithoutSoftBedding" "YesNo" NOT NULL,
    "storytellingFrequency" "Frequency" NOT NULL,
    "isBiologicalMother" "YesNo" NOT NULL,
    "attendedPostpartumVisit" "YesNo",
    "postpartumVisitDate" TIMESTAMP(3),
    "hadBreastMilk" "YesNo",
    "breastMilkAtTwoMonths" "YesNo",
    "breastMilkAtSixMonths" "YesNo",
    "motherCouldNotBreastfeed" "Yes",
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InfancyQuestionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TargetChildRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "participantName" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "dateCompleted" TIMESTAMP(3) NOT NULL,
    "staffName" TEXT NOT NULL,
    "childName" TEXT NOT NULL,
    "childDateOfBirth" TIMESTAMP(3) NOT NULL,
    "childEnrollmentDate" TIMESTAMP(3) NOT NULL,
    "childSSN" TEXT,
    "gestationalAgeAtBirth" TEXT NOT NULL,
    "childGender" "Gender" NOT NULL,
    "childEthnicity" "Ethnicity" NOT NULL,
    "childRace" "Race"[],
    "isBiologicalMother" "YesNo" NOT NULL,
    "wellChildVisitsCompleted" TEXT[],
    "healthInsurance" "HealthInsurance",
    "otherHealthInsurance" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TargetChildRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodSecurity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "worryHouseholdWithoutFood" TEXT NOT NULL,
    "howOftenWorryHouseholdWithoutFood" TEXT NOT NULL,
    "pastFourWeeksFamilyDidNotEatPreferredFoodResources" TEXT NOT NULL,
    "howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResources" TEXT NOT NULL,
    "pastFourWeeksFamilyDidNotEatPreferredFoodVariety" TEXT NOT NULL,
    "howOftenPastFourWeeksFamilyDidNotEatPreferredFoodVariety" TEXT NOT NULL,
    "pastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood" TEXT NOT NULL,
    "howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodSecurity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ASQ3" ADD CONSTRAINT "ASQ3_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntimatePartnerViolenceForm" ADD CONSTRAINT "IntimatePartnerViolenceForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BriefChildWellnessUpdate" ADD CONSTRAINT "BriefChildWellnessUpdate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryHistoryInformationForm" ADD CONSTRAINT "DeliveryHistoryInformationForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialSupportForm" ADD CONSTRAINT "SocialSupportForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IPVScreening" ADD CONSTRAINT "IPVScreening_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfancyQuestionnaire" ADD CONSTRAINT "InfancyQuestionnaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TargetChildRecord" ADD CONSTRAINT "TargetChildRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodSecurity" ADD CONSTRAINT "FoodSecurity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
