-- CreateEnum
CREATE TYPE "YesNo" AS ENUM ('Yes', 'No');

-- CreateEnum
CREATE TYPE "CommunicationMethod" AS ENUM ('Phone', 'Mail', 'In_Person', 'Video_Call', 'Other');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Female', 'Male');

-- CreateEnum
CREATE TYPE "Ethnicity" AS ENUM ('Hispanic_or_Latinx', 'Not_Hispanic_or_Latinx');

-- CreateEnum
CREATE TYPE "Race" AS ENUM ('American_Indian_Alaska_Native', 'Asian', 'Black_or_African_American', 'Native_Hawaiian_or_Pacific_Islander', 'White', 'More_than_one_race_not_specified', 'Declined_to_identify');

-- CreateEnum
CREATE TYPE "PregnancyStatusAtEnrollment" AS ENUM ('Pregnant', 'Not_Pregnant', 'NA_Male_Participiant');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('Married', 'Not_married_but_living_together', 'Never_married_and_not_living_with_partner', 'Separated_or_Divorced', 'Widowed');

-- CreateEnum
CREATE TYPE "LgbtqiPlus" AS ENUM ('LGBTQI', 'Non_LGBTQI');

-- CreateEnum
CREATE TYPE "Insurance" AS ENUM ('Employer_insurance', 'Self_pay', 'Dual_Eligibile_Medicaid_Medicare', 'Medicaid_CHIP_only', 'Medicare_only', 'Medicare_plus_supplemental', 'TriCARE', 'Other_third_party_privately_insured', 'Uninsured');

-- CreateEnum
CREATE TYPE "LivingArrangements" AS ENUM ('Rent_Own_a_Home', 'Living_with_Relatives_or_Friends', 'Residential_Treatment_Center', 'Correctional_Facility', 'Emergency_Shelter', 'Homeless', 'Other');

-- CreateEnum
CREATE TYPE "ParticipantRecordForOthersInvolvedMaritalStatus" AS ENUM ('Single', 'Married', 'Divorced', 'Widowed', 'Separated');

-- CreateEnum
CREATE TYPE "DeliveryMode" AS ENUM ('Vaginal', 'Cesarean');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Female', 'Male');

-- CreateEnum
CREATE TYPE "ChildLivingWith" AS ENUM ('Mother', 'Father', 'Grandparents', 'Siblings', 'Foster_Family', 'Other');

-- CreateEnum
CREATE TYPE "childProtectiveService" AS ENUM ('Currently', 'Previously', 'Never');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunicationEntry" (
    "id" TEXT NOT NULL,
    "communicationLogId" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "method" "CommunicationMethod" NOT NULL,
    "organizationPerson" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "notes" TEXT,
    "followUpNeeded" "YesNo" NOT NULL,

    CONSTRAINT "CommunicationEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunicationLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunicationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentEntry" (
    "id" TEXT NOT NULL,
    "appointmentLogId" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "who" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "AppointmentEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" TEXT NOT NULL,
    "enrollmentFormId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnrollmentForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "homePhone" TEXT NOT NULL,
    "cellPhone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientDate" TIMESTAMP(3) NOT NULL,
    "guardianName" TEXT NOT NULL,
    "guardianDate" TEXT NOT NULL,
    "gcMomsName" TEXT NOT NULL,
    "gcMomsDate" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EnrollmentForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaAppearanceForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "participantName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "participantDate" TIMESTAMP(3) NOT NULL,
    "guardianName" TEXT,
    "guardianDate" TIMESTAMP(3),
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaAppearanceForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantDemographicsForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "programStartDate" TIMESTAMP(3) NOT NULL,
    "caseId" TEXT NOT NULL,
    "homeVisitorAssigned" TEXT NOT NULL,
    "participantName" TEXT NOT NULL,
    "participantDateOfBirth" TIMESTAMP(3) NOT NULL,
    "participantAddress" TEXT NOT NULL,
    "participantZipCode" TEXT NOT NULL,
    "participantPhoneNumber" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "ethnicity" "Ethnicity" NOT NULL,
    "race" "Race" NOT NULL,
    "primaryLanguage" TEXT NOT NULL,
    "pregnancyStatusAtEnrollment" "PregnancyStatusAtEnrollment" NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "lgbtqiPlus" "LgbtqiPlus" NOT NULL,
    "insurance" "Insurance" NOT NULL,
    "childAbuse" "YesNo" NOT NULL,
    "substanceAbuse" "YesNo" NOT NULL,
    "tobaccoUse" "YesNo" NOT NULL,
    "lowStudentAchievement" "YesNo" NOT NULL,
    "developmentalDelay" "YesNo" NOT NULL,
    "USArmedForces" "YesNo" NOT NULL,
    "reenrollmentWithGap" "YesNo" NOT NULL,
    "transferFromAnotherSite" "YesNo" NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParticipantDemographicsForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
<<<<<<<< HEAD:prisma/migrations/20240603054709_/migration.sql
CREATE TABLE "CurrentLivingArrangement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "listPeopleLivingWithPatient" JSONB NOT NULL,
    "listChildrenNotLivingWithPatient" JSONB NOT NULL,
    "notes" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrentLivingArrangement_pkey" PRIMARY KEY ("id")
========
CREATE TABLE "ParticipantRecordForOthersInvolvedEntry" (
    "id" TEXT NOT NULL,
    "participantRecordForOthersInvolvedFormId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "currentLivingArrangement" "LivingArrangements" NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "primaryPhoneNumber" TEXT NOT NULL,
    "emergencyContact" TEXT NOT NULL,
    "emergencyContactPhone" TEXT NOT NULL,
    "emergencyContactRelationship" TEXT NOT NULL,
    "maritalStatus" "ParticipantRecordForOthersInvolvedMaritalStatus" NOT NULL,
    "insurancePlan" TEXT NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "gestationalAge" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "plannedModeDelivery" "DeliveryMode" NOT NULL,
    "actualModeDelivery" "DeliveryMode" NOT NULL,
    "attendedPostpartumVisit" TEXT NOT NULL,
    "postpartumVisitLocation" TEXT,
    "postpartumVisitDate" TIMESTAMP(3),
    "totalNumPregnancies" TEXT NOT NULL,
    "numLiveBirths" TEXT NOT NULL,
    "numChildrenWithMother" TEXT NOT NULL,
    "priorComplications" TEXT,
    "ongoingMedicalProblems" TEXT NOT NULL,

    CONSTRAINT "ParticipantRecordForOthersInvolvedEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantRecordForOthersInvolvedForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParticipantRecordForOthersInvolvedForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChildDemographicsRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "childName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "sex" "Sex" NOT NULL,
    "childLivingWith" "ChildLivingWith"[],
    "childLivingWithOther" TEXT,
    "parentOneName" TEXT NOT NULL,
    "parentOneInvolvedInLife" "YesNo" NOT NULL,
    "parentTwoName" TEXT NOT NULL,
    "parentTwoInvolvedInLife" "YesNo" NOT NULL,
    "insurancePlan" TEXT NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "primaryCareProvider" TEXT NOT NULL,
    "primaryCareProviderPhone" TEXT NOT NULL,
    "birthWeight" TEXT NOT NULL,
    "gestationalAgeAtBirth" TEXT NOT NULL,
    "nicuStay" "YesNo" NOT NULL,
    "nicuStayLength" TEXT,
    "prenatalDrugExposure" "YesNo" NOT NULL,
    "prenatalDrug" TEXT,
    "medicalComplicationsAtBirth" TEXT NOT NULL,
    "ongoingMedicalIssues" TEXT NOT NULL,
    "ongoingMedications" TEXT NOT NULL,
    "healthConcerns" TEXT NOT NULL,
    "difficultiesServicesReceived" TEXT NOT NULL,
    "lactationConsultant" "YesNo" NOT NULL,
    "legalSystemInvolvement" "YesNo" NOT NULL,
    "childProtectiveService" "childProtectiveService" NOT NULL,
    "caseworker" TEXT,
    "caseworkerPhoneNumber" TEXT,
    "importantInformation" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChildDemographicsRecord_pkey" PRIMARY KEY ("id")
>>>>>>>> main:prisma/migrations/20240602235630_/migration.sql
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CommunicationEntry" ADD CONSTRAINT "CommunicationEntry_communicationLogId_fkey" FOREIGN KEY ("communicationLogId") REFERENCES "CommunicationLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationLog" ADD CONSTRAINT "CommunicationLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentEntry" ADD CONSTRAINT "AppointmentEntry_appointmentLogId_fkey" FOREIGN KEY ("appointmentLogId") REFERENCES "AppointmentLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentLog" ADD CONSTRAINT "AppointmentLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_enrollmentFormId_fkey" FOREIGN KEY ("enrollmentFormId") REFERENCES "EnrollmentForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentForm" ADD CONSTRAINT "EnrollmentForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAppearanceForm" ADD CONSTRAINT "MediaAppearanceForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantDemographicsForm" ADD CONSTRAINT "ParticipantDemographicsForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
<<<<<<<< HEAD:prisma/migrations/20240603054709_/migration.sql
ALTER TABLE "CurrentLivingArrangement" ADD CONSTRAINT "CurrentLivingArrangement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
========
ALTER TABLE "ParticipantRecordForOthersInvolvedEntry" ADD CONSTRAINT "ParticipantRecordForOthersInvolvedEntry_participantRecordF_fkey" FOREIGN KEY ("participantRecordForOthersInvolvedFormId") REFERENCES "ParticipantRecordForOthersInvolvedForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantRecordForOthersInvolvedForm" ADD CONSTRAINT "ParticipantRecordForOthersInvolvedForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildDemographicsRecord" ADD CONSTRAINT "ChildDemographicsRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
>>>>>>>> main:prisma/migrations/20240602235630_/migration.sql
