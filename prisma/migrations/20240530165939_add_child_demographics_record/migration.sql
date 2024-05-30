-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Female', 'Male');

-- CreateEnum
CREATE TYPE "ChildLivingWith" AS ENUM ('Mother', 'Father', 'Grandparents', 'Siblings', 'Foster_Family', 'Other');

-- CreateEnum
CREATE TYPE "YesNo" AS ENUM ('Yes', 'No');

-- CreateEnum
CREATE TYPE "childProtectiveService" AS ENUM ('Currently', 'Previously', 'Never');

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
    "caseworker" TEXT NOT NULL,
    "caseworkerPhoneNumber" TEXT NOT NULL,
    "importantInformation" TEXT NOT NULL,

    CONSTRAINT "ChildDemographicsRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChildDemographicsRecord" ADD CONSTRAINT "ChildDemographicsRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
