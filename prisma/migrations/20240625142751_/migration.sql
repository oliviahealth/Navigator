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

-- CreateEnum
CREATE TYPE "ChildrenNeedsStatus" AS ENUM ('Yes', 'No', 'Pending');

-- CreateEnum
CREATE TYPE "MarriedEnum" AS ENUM ('Married', 'Unmarried');

-- CreateEnum
CREATE TYPE "NutritionHistoryAndAssessmentRace" AS ENUM ('American_Indian', 'Black', 'White_European', 'Hawaiian', 'North_African', 'Middle_Eastern');

-- CreateEnum
CREATE TYPE "NumMonthsPregnantTwentyWeeks" AS ENUM ('None', 'Number_of_pregnancies', 'Unknown');

-- CreateEnum
CREATE TYPE "NumMonthsPregnant" AS ENUM ('First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth_Ninth', 'Unknown', 'No_medical_care');

-- CreateEnum
CREATE TYPE "CurrentPregnancyInfo" AS ENUM ('Weight_loss', 'Nausea', 'Gestational_Diabetes', 'Twins', 'Fetal_Growth_Restriction', 'High_Blood_Pressure', 'None_Apply');

-- CreateEnum
CREATE TYPE "PreviousPregnancyInfo" AS ENUM ('GDM', 'Preterm_delivery', 'Early_term_delivery', 'Five_pounds_or_less', 'Died_after_5_months_PG', 'Preeclampsia', 'Died_before_one_month', 'Miscarriage', 'Birth_defects', 'Nine_pounds_at_birth', 'None_Apply');

-- CreateEnum
CREATE TYPE "TimesTakenMultivitamin" AS ENUM ('Less_than_once_per_week', 'Specify_number_of_times', 'Eight_or_more_times', 'Unknown');

-- CreateEnum
CREATE TYPE "YesNoUnknown" AS ENUM ('Yes', 'No', 'Unknown');

-- CreateEnum
CREATE TYPE "Cigarettes" AS ENUM ('Do_not_smoke', 'Specified_number', 'Ninety_seven_or_more', 'Smoked_but_quantity_unknown', 'Unknown_or_refused');

-- CreateEnum
CREATE TYPE "HouseholdSmoking" AS ENUM ('Someone_else', 'No_one_else', 'Unknown');

-- CreateEnum
CREATE TYPE "AlcoholBeforePregnancy" AS ENUM ('Did_not_drink', 'Specified_number', 'Twenty_one_or_more', 'Drank_but_quantity_unknown', 'Unknown_or_refused');

-- CreateEnum
CREATE TYPE "SubstanceUse" AS ENUM ('Illegal_substance', 'Abusing_prescription', 'Marijuana', 'None');

-- CreateEnum
CREATE TYPE "PregnancyType" AS ENUM ('Same_pregnancy', 'Different_pregnancy');

-- CreateEnum
CREATE TYPE "NotBreastfedDesiredLengthReasons" AS ENUM ('Difficult_latching', 'Baby_not_satisfied', 'Baby_not_gaining_weight', 'Sore_nipples', 'Not_producing_milk', 'Too_many_household_duties', 'Right_time_to_stop', 'Sick_or_medical_reasons', 'Work', 'School', 'Lack_of_support', 'Baby_illness', 'Doctor_recommended', 'Other');

-- CreateEnum
CREATE TYPE "BreastfeedingMethod" AS ENUM ('Nurse', 'Pump_and_nurse', 'Pump_only', 'Formula_and_milk', 'Dont_want_to', 'Dont_know', 'Other');

-- CreateEnum
CREATE TYPE "BreastfeedingMedicalConcerns" AS ENUM ('Breast_surgery', 'Hypothyroidism', 'Diabetes', 'Depression', 'HIV', 'No_concerns');

-- CreateEnum
CREATE TYPE "NumPerDay" AS ENUM ('zero', 'one', 'two', 'three', 'four', 'five_or_more');

-- CreateEnum
CREATE TYPE "Appetite" AS ENUM ('Good', 'Fair', 'Poor');

-- CreateEnum
CREATE TYPE "EverydayFood" AS ENUM ('Milk', 'Sweet_beverages', 'Snacks', 'Whole_grains', 'Fruits_and_vegetables');

-- CreateEnum
CREATE TYPE "HighRiskFood" AS ENUM ('Unpasteurized_drink', 'Soft_cheese', 'Raw_meat', 'Raw_sprouts', 'Refrigerated_pate', 'Hot_dogs', 'Michigan_fish', 'None_apply');

-- CreateEnum
CREATE TYPE "DietsAndSupplements" AS ENUM ('Vegetarian', 'Low_calorie', 'Low_carb', 'Bariatric_surgery', 'PICA', 'Vitamin_supplement', 'Herbal_supplement', 'Fluoride', 'None_apply');

-- CreateEnum
CREATE TYPE "ChurchAttendance" AS ENUM ('Never', 'Once_a_year', 'Few_times_a_year', 'Few_times_a_month', 'Once_a_week', 'More_than_once_a_week');

-- CreateEnum
CREATE TYPE "TimeSpentReligiously" AS ENUM ('Rarely_or_never', 'Once_a_month', 'Once_a_week', 'Few_times_a_week', 'Once_a_day', 'More_than_once_a_day');

-- CreateEnum
CREATE TYPE "TruthLevel" AS ENUM ('Definitely_not_true', 'Somewhat_not_true', 'Neutral', 'Somewhat_true', 'Definitely_true');

-- CreateEnum
CREATE TYPE "IPVStatus" AS ENUM ('Never', 'Rarely', 'Sometimes', 'Fairly', 'Often', 'Frequently');

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
CREATE TABLE "AppointmentLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "appointmentEntries" JSONB[],
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentLog_pkey" PRIMARY KEY ("id")
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
    "emergencyContacts" JSONB[],
    "clientName" TEXT NOT NULL,
    "clientDate" TIMESTAMP(3) NOT NULL,
    "guardianName" TEXT,
    "guardianDate" TEXT,
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
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParticipantDemographicsForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
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
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChildDemographicsRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportSystemsForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentSupportSystem" TEXT NOT NULL,
    "strengths" TEXT NOT NULL,
    "areasForImprovement" TEXT NOT NULL,
    "goals" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportSystemsForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentLivingArrangement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "listPeopleLivingWithPatient" JSONB NOT NULL,
    "listChildrenNotLivingWithPatient" JSONB NOT NULL,
    "notes" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrentLivingArrangement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChildrenNeedsForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "breastPump" "ChildrenNeedsStatus" NOT NULL,
    "breastPumpNotes" TEXT,
    "breastfeedingSupport" "ChildrenNeedsStatus" NOT NULL,
    "breastfeedingSupportNotes" TEXT,
    "carSeat" "ChildrenNeedsStatus" NOT NULL,
    "carSeatNotes" TEXT,
    "childcare" "ChildrenNeedsStatus" NOT NULL,
    "childcareNotes" TEXT,
    "clothing" "ChildrenNeedsStatus" NOT NULL,
    "clothingNotes" TEXT,
    "bed" "ChildrenNeedsStatus" NOT NULL,
    "bedNotes" TEXT,
    "diapers" "ChildrenNeedsStatus" NOT NULL,
    "diapersNotes" TEXT,
    "infantFormula" "ChildrenNeedsStatus" NOT NULL,
    "infantFormulaNotes" TEXT,
    "infantStroller" "ChildrenNeedsStatus" NOT NULL,
    "infantStrollerNotes" TEXT,
    "schoolSupplies" "ChildrenNeedsStatus" NOT NULL,
    "schoolSuppliesNotes" TEXT,
    "specializedMedEquipment" "ChildrenNeedsStatus" NOT NULL,
    "specializedMedEquipmentNotes" TEXT,
    "other" JSONB NOT NULL,
    "notes" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChildrenNeedsForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralsAndServices" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentingClasses" JSONB NOT NULL,
    "transportationServices" JSONB NOT NULL,
    "ssiDisability" JSONB NOT NULL,
    "temporaryAssistanceForNeedyFamilies" JSONB NOT NULL,
    "personalSafety" JSONB NOT NULL,
    "homeVisitationProgram" JSONB NOT NULL,
    "housingAssistance" JSONB NOT NULL,
    "healthyStartProgram" JSONB NOT NULL,
    "employmentServices" JSONB NOT NULL,
    "supportServicesOther" JSONB[],
    "breastfeedingSupport" JSONB NOT NULL,
    "localFoodPantries" JSONB NOT NULL,
    "snap" JSONB NOT NULL,
    "womenInfantsAndChildren" JSONB NOT NULL,
    "foodNutritionOther" JSONB[],
    "healthInsuranceEnrollment" JSONB NOT NULL,
    "prenatalHealthcare" JSONB NOT NULL,
    "familyPlanning" JSONB NOT NULL,
    "primaryCare" JSONB NOT NULL,
    "mentalHealthCounseling" JSONB NOT NULL,
    "smokingCessation" JSONB NOT NULL,
    "healthcareOther" JSONB[],
    "residential" JSONB NOT NULL,
    "outpatient" JSONB NOT NULL,
    "caringForTwoProgram" JSONB NOT NULL,
    "theCradlesProgram" JSONB NOT NULL,
    "recoverySupportServices" JSONB NOT NULL,
    "naloxone" JSONB NOT NULL,
    "medicationAssistedTreatment" JSONB NOT NULL,
    "transportationToTreatment" JSONB NOT NULL,
    "substanceUseTreatmentOther" JSONB[],
    "earlyChildhoodIntervention" JSONB NOT NULL,
    "earlyHeadStart" JSONB NOT NULL,
    "nciChildcareSubsidy" JSONB NOT NULL,
    "pediatricianPrimaryCare" JSONB NOT NULL,
    "safeSleepEducation" JSONB NOT NULL,
    "childRelatedOther" JSONB[],
    "childProtectiveService" JSONB NOT NULL,
    "legalAid" JSONB NOT NULL,
    "specialtyCourt" JSONB NOT NULL,
    "legalAssistanceOther" JSONB[],
    "additionalNotes" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferralsAndServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentalMedicalHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gestationalAge" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "plannedModeDelivery" "DeliveryMode" NOT NULL,
    "actualModeDelivery" "DeliveryMode" NOT NULL,
    "attendedPostpartumVisit" "YesNo" NOT NULL,
    "postpartumVisitLocation" TEXT,
    "postpartumVisitDate" TIMESTAMP(3),
    "totalNumPregnancies" TEXT NOT NULL,
    "numChildrenWithMother" TEXT NOT NULL,
    "priorPregnancyDates" TEXT NOT NULL,
    "priorPregnancyOutcomes" TEXT NOT NULL,
    "gravida" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "preterm" TEXT NOT NULL,
    "abortions" TEXT NOT NULL,
    "living" TEXT NOT NULL,
    "priorComplications" TEXT,
    "ongoingMedicalProblems" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParentalMedicalHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EncounterForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "participantName" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "monthYear" TEXT NOT NULL,
    "encounterEntries" JSONB[],
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EncounterForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentMedicationList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentMedicationList" JSONB[],
    "notes" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrentMedicationList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionHistoryAndAssessment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "todaysDate" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "gradesCompleted" TEXT NOT NULL,
    "currentlyMarried" "MarriedEnum" NOT NULL,
    "hispanicLatino" "YesNo",
    "race" "NutritionHistoryAndAssessmentRace"[] DEFAULT ARRAY[]::"NutritionHistoryAndAssessmentRace"[],
    "lastMenstrualPeriod" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "weightBeforePregnancy" TEXT NOT NULL,
    "numPregnancies" TEXT NOT NULL,
    "numLiveBabies" TEXT NOT NULL,
    "timesPregnantTwentyWeeks" "NumMonthsPregnantTwentyWeeks" NOT NULL,
    "numPregnanciesTwentyWeeks" TEXT,
    "numMonthsPregnant" "NumMonthsPregnant" NOT NULL,
    "currentPregnancyInfo" "CurrentPregnancyInfo"[],
    "timesSeenHealthProvider" TEXT NOT NULL,
    "hivBloodTest" "YesNo" NOT NULL,
    "previousPregnancyInfo" "PreviousPregnancyInfo"[],
    "takesMedication" "YesNo" NOT NULL,
    "medications" TEXT,
    "hasSideEffects" "YesNo" NOT NULL,
    "sideEffects" TEXT,
    "hasDentalProblems" "YesNo" NOT NULL,
    "dentalProblems" TEXT,
    "timesTakenMultivitaminOptions" "TimesTakenMultivitamin" NOT NULL,
    "specifiedTimesTakenMultivitamin" TEXT,
    "hasTakenVitaminsMinerals" "YesNoUnknown" NOT NULL,
    "cigarettesBeforePregnancy" "Cigarettes" NOT NULL,
    "specifiedNumCigarettesBeforePregnancy" TEXT,
    "cigarettesSmokedNow" "Cigarettes" NOT NULL,
    "specifiedNumCigarettesSmokedNow" TEXT,
    "householdSmoking" "HouseholdSmoking" NOT NULL,
    "alcoholBeforePregnancy" "AlcoholBeforePregnancy" NOT NULL,
    "specifiedNumDrinks" TEXT,
    "alcoholDuringPregnancy" "YesNo" NOT NULL,
    "substanceUse" "SubstanceUse"[],
    "disabilityLimitingFeedingDecisions" "YesNo" NOT NULL,
    "hasBreastfed" "YesNo" NOT NULL,
    "currentlyBreastfeeding" "YesNo" NOT NULL,
    "babyLessThanOneYear" "YesNo" NOT NULL,
    "infantId" TEXT NOT NULL,
    "breastfeedingMultipleChildren" "YesNo" NOT NULL,
    "pregnancyType" "PregnancyType",
    "breastfedDesiredLength" "YesNo" NOT NULL,
    "notBreastfedDesiredLengthReasons" "NotBreastfedDesiredLengthReasons"[] DEFAULT ARRAY[]::"NotBreastfedDesiredLengthReasons"[],
    "notBreastfedDesiredLengthReasonsOther" TEXT,
    "heardAboutBreastfeeding" TEXT NOT NULL,
    "breastfeedingMethod" "BreastfeedingMethod" NOT NULL,
    "breastfeedingMethodOther" TEXT,
    "breastfeedingGoal" TEXT NOT NULL,
    "moreInformationInterest" "YesNo" NOT NULL,
    "breastfeedingMedicalConcerns" "BreastfeedingMedicalConcerns"[],
    "numMealsPerDay" "NumPerDay" NOT NULL,
    "numSnacksPerDay" "NumPerDay" NOT NULL,
    "milkPerDay" "NumPerDay" NOT NULL,
    "appetite" "Appetite" NOT NULL,
    "hasSpecialDiet" "YesNo" NOT NULL,
    "specialDietType" TEXT,
    "fastFoodPerWeek" "NumPerDay" NOT NULL,
    "hasFoodAllergies" "YesNo" NOT NULL,
    "foodAllergiesType" TEXT,
    "consumeEveryday" "EverydayFood"[],
    "milkType" TEXT,
    "highRiskFood" "HighRiskFood"[],
    "dietsAndSupplements" "DietsAndSupplements"[],
    "vitaminSupplementsType" TEXT,
    "herbalSupplementsType" TEXT,
    "staffNotes" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NutritionHistoryAndAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DukeUniversityReligionIndex" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "churchAttendance" "ChurchAttendance" NOT NULL,
    "timeSpentReligiously" "TimeSpentReligiously" NOT NULL,
    "divineExperience" "TruthLevel" NOT NULL,
    "beliefLifeInfluence" "TruthLevel" NOT NULL,
    "religiousIntegrationEffort" "TruthLevel" NOT NULL,

    CONSTRAINT "DukeUniversityReligionIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentalHealthHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mentalHealthHistory" JSONB NOT NULL,
    "takingMedication" "YesNo" NOT NULL,
    "medicationDetails" TEXT,
    "notes" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MentalHealthHistory_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CommunicationEntry" ADD CONSTRAINT "CommunicationEntry_communicationLogId_fkey" FOREIGN KEY ("communicationLogId") REFERENCES "CommunicationLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationLog" ADD CONSTRAINT "CommunicationLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentLog" ADD CONSTRAINT "AppointmentLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentForm" ADD CONSTRAINT "EnrollmentForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAppearanceForm" ADD CONSTRAINT "MediaAppearanceForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantDemographicsForm" ADD CONSTRAINT "ParticipantDemographicsForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantRecordForOthersInvolvedEntry" ADD CONSTRAINT "ParticipantRecordForOthersInvolvedEntry_participantRecordF_fkey" FOREIGN KEY ("participantRecordForOthersInvolvedFormId") REFERENCES "ParticipantRecordForOthersInvolvedForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantRecordForOthersInvolvedForm" ADD CONSTRAINT "ParticipantRecordForOthersInvolvedForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildDemographicsRecord" ADD CONSTRAINT "ChildDemographicsRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportSystemsForm" ADD CONSTRAINT "SupportSystemsForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentLivingArrangement" ADD CONSTRAINT "CurrentLivingArrangement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildrenNeedsForm" ADD CONSTRAINT "ChildrenNeedsForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralsAndServices" ADD CONSTRAINT "ReferralsAndServices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentalMedicalHistory" ADD CONSTRAINT "ParentalMedicalHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EncounterForm" ADD CONSTRAINT "EncounterForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentMedicationList" ADD CONSTRAINT "CurrentMedicationList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionHistoryAndAssessment" ADD CONSTRAINT "NutritionHistoryAndAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DukeUniversityReligionIndex" ADD CONSTRAINT "DukeUniversityReligionIndex_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentalHealthHistory" ADD CONSTRAINT "MentalHealthHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
