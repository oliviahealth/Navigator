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
CREATE TYPE "CurrentlyPreviouslyNever" AS ENUM ('Currently', 'Previously', 'Never');

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
CREATE TYPE "Laugh" AS ENUM ('As_much_as_always', 'Not_quite_so_much', 'Definitely_not_so_much', 'Not_at_all');

-- CreateEnum
CREATE TYPE "Enjoyment" AS ENUM ('As_much_as_ever', 'Rather_less', 'Definitely_less', 'Hardly');

-- CreateEnum
CREATE TYPE "SelfBlame" AS ENUM ('Yes_mostly', 'Yes_some', 'Not_often', 'Never');

-- CreateEnum
CREATE TYPE "Anxiety" AS ENUM ('Not_at_all', 'Hardly_ever', 'Yes_sometimes', 'Yes_often');

-- CreateEnum
CREATE TYPE "Scared" AS ENUM ('Yes_a_lot', 'Yes_sometimes', 'Not_much', 'Not_at_all');

-- CreateEnum
CREATE TYPE "CopeInability" AS ENUM ('Yes_mostly_have_not', 'Yes_sometimes_have_not', 'No_mostly_have', 'No_always_have');

-- CreateEnum
CREATE TYPE "DifficultySleeping" AS ENUM ('Yes_mostly', 'Yes_sometimes', 'Not_often', 'Not_at_all');

-- CreateEnum
CREATE TYPE "Sadness" AS ENUM ('Yes_mostly', 'Yes_often', 'Not_often', 'Not_at_all');

-- CreateEnum
CREATE TYPE "Crying" AS ENUM ('Yes_mostly', 'Yes_often', 'Occasionally', 'Never');

-- CreateEnum
CREATE TYPE "SelfHarmThoughts" AS ENUM ('Yes_often', 'Sometimes', 'Hardly_ever', 'Never');

-- CreateEnum
CREATE TYPE "EPDS_Timeframe" AS ENUM ('Prenatal', 'Postnatal');

-- CreateEnum
CREATE TYPE "SmokingStatus" AS ENUM ('NEVER', 'NOT_BEFORE_AND_NOT_NOW', 'NOT_AFTER_AND_NOT_NOW', 'NOT_DURING_AND_NOT_NOW', 'NOT_DURING_AND_NOW');

-- CreateEnum
CREATE TYPE "YesNoDidNotAsk" AS ENUM ('Yes', 'No', 'Did_Not_Ask');

-- CreateEnum
CREATE TYPE "PerceivedStressScaleOptions" AS ENUM ('Never', 'Almost_never', 'Sometimes', 'Fairly_often', 'Very_often');

-- CreateEnum
CREATE TYPE "GADAnswers" AS ENUM ('Not_at_all', 'Several_days', 'More_than_half', 'Everyday');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Not_at_all', 'Somewhat', 'Very', 'Extremely');

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

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunicationLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "communicationEntries" JSONB,
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
CREATE TABLE "ParticipantRecordForOthersInvolvedForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "participantRecordForOthersInvolvedEntries" JSONB NOT NULL,
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
    "childProtectiveService" "CurrentlyPreviouslyNever" NOT NULL,
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
CREATE TABLE "EdinburgPostnatalDepressionScale" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "laugh" "Laugh" NOT NULL,
    "enjoyment" "Enjoyment" NOT NULL,
    "selfBlame" "SelfBlame" NOT NULL,
    "anxiety" "Anxiety" NOT NULL,
    "scared" "Scared" NOT NULL,
    "copeInability" "CopeInability" NOT NULL,
    "difficultySleeping" "DifficultySleeping" NOT NULL,
    "sadness" "Sadness" NOT NULL,
    "crying" "Crying" NOT NULL,
    "selfHarmThoughts" "SelfHarmThoughts" NOT NULL,
    "participantName" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "dateCompleted" TIMESTAMP(3) NOT NULL,
    "staffName" TEXT NOT NULL,
    "timeframe" "EPDS_Timeframe" NOT NULL,
    "totalScore" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "EdinburgPostnatalDepressionScale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmokingTobaccoPregnancy" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "smokingStatus" "SmokingStatus" NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmokingTobaccoPregnancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubstanceUseHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "alcohol_ever_used" "YesNo" NOT NULL,
    "alcohol_used_during_pregnancy" "YesNo",
    "alcohol_date_last_used" TIMESTAMP(3),
    "alcohol_notes" TEXT,
    "benzodiazepines_ever_used" "YesNo" NOT NULL,
    "benzodiazepines_used_during_pregnancy" "YesNo",
    "benzodiazepines_date_last_used" TIMESTAMP(3),
    "benzodiazepines_notes" TEXT,
    "cocaine_ever_used" "YesNo" NOT NULL,
    "cocaine_used_during_pregnancy" "YesNo",
    "cocaine_date_last_used" TIMESTAMP(3),
    "cocaine_notes" TEXT,
    "heroin_ever_used" "YesNo" NOT NULL,
    "heroin_used_during_pregnancy" "YesNo",
    "heroin_date_last_used" TIMESTAMP(3),
    "heroin_notes" TEXT,
    "kush_ever_used" "YesNo" NOT NULL,
    "kush_used_during_pregnancy" "YesNo",
    "kush_date_last_used" TIMESTAMP(3),
    "kush_notes" TEXT,
    "marijuana_ever_used" "YesNo" NOT NULL,
    "marijuana_used_during_pregnancy" "YesNo",
    "marijuana_date_last_used" TIMESTAMP(3),
    "marijuana_notes" TEXT,
    "methamphetamine_ever_used" "YesNo" NOT NULL,
    "methamphetamine_used_during_pregnancy" "YesNo",
    "methamphetamine_date_last_used" TIMESTAMP(3),
    "methamphetamine_notes" TEXT,
    "prescription_drugs_ever_used" "YesNo" NOT NULL,
    "prescription_drugs_used_during_pregnancy" "YesNo",
    "prescription_drugs_date_last_used" TIMESTAMP(3),
    "prescription_drugs_notes" TEXT,
    "tobacco_ever_used" "YesNo" NOT NULL,
    "tobacco_used_during_pregnancy" "YesNo",
    "tobacco_date_last_used" TIMESTAMP(3),
    "tobacco_notes" TEXT,
    "other_drugs" JSONB[],
    "notes" TEXT,
    "mat_engaged" "CurrentlyPreviouslyNever" NOT NULL,
    "date_used_mat" TEXT,
    "medications" JSONB NOT NULL,
    "mat_clinic_name" TEXT,
    "mat_clinic_phone" TEXT,
    "used_addiction_medicine_services" "CurrentlyPreviouslyNever" NOT NULL,
    "date_used_medicine_service" TEXT,
    "addiction_medicine_clinic" TEXT,
    "addiction_medicine_clinic_phone" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubstanceUseHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HousingSecurityHomeVisitForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "participantName" TEXT NOT NULL,
    "dateOfVisit" TIMESTAMP(3) NOT NULL,
    "caseId" TEXT NOT NULL,
    "staffName" TEXT NOT NULL,
    "healthInsurance" "YesNo" NOT NULL,
    "concerns" "YesNoDidNotAsk" NOT NULL,
    "erVisit" "YesNo" NOT NULL,
    "erVisitSpecific" JSONB,
    "wellChildVisits" "YesNo" NOT NULL,
    "wellChildVisitsSpecific" JSONB,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HousingSecurityHomeVisitForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerceivedStressScale" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "upsetUnexpectedly" "PerceivedStressScaleOptions" NOT NULL,
    "unableControlImportant" "PerceivedStressScaleOptions" NOT NULL,
    "nervousAndStressed" "PerceivedStressScaleOptions" NOT NULL,
    "handleProblemsConfidently" "PerceivedStressScaleOptions" NOT NULL,
    "thingsGoingWay" "PerceivedStressScaleOptions" NOT NULL,
    "copeInability" "PerceivedStressScaleOptions" NOT NULL,
    "controlIrritations" "PerceivedStressScaleOptions" NOT NULL,
    "onTopOfThings" "PerceivedStressScaleOptions" NOT NULL,
    "angeredOutsideControl" "PerceivedStressScaleOptions" NOT NULL,
    "difficultiesPilingUp" "PerceivedStressScaleOptions" NOT NULL,
    "totalScore" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PerceivedStressScale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralizedAnxietyDisorder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "feelingNervous" "GADAnswers" NOT NULL,
    "unableToControlWorrying" "GADAnswers" NOT NULL,
    "worryingTooMuch" "GADAnswers" NOT NULL,
    "troubleRelaxing" "GADAnswers" NOT NULL,
    "restlessness" "GADAnswers" NOT NULL,
    "easilyAnnoyed" "GADAnswers" NOT NULL,
    "feelingAfraid" "GADAnswers" NOT NULL,
    "problemsDifficulty" "Difficulty" NOT NULL,
    "totalScore" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneralizedAnxietyDisorder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PregnancySpacingAssesment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hadPregnanciesLessThan12MoApart" TEXT NOT NULL,
    "discussFamilyPlanningInterest" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PregnancySpacingAssesment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenBsPostpartumAppointmentAssesment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "physicalExamBaby" "YesNo" NOT NULL,
    "feedingBaby" "YesNo" NOT NULL,
    "growthAndWeightGainBaby" "YesNo" NOT NULL,
    "assessSupplyLatchMilkTransferPainBreasts" "YesNo" NOT NULL,
    "referLactationConsultantBreasts" "YesNo" NOT NULL,
    "educationCollectionStorageMilkBreasts" "YesNo" NOT NULL,
    "mastisisSignsBreasts" "YesNo" NOT NULL,
    "constipationTreatementBowels" "YesNo" NOT NULL,
    "urinaryIncontinenceBladder" "YesNo" NOT NULL,
    "painBelly" "YesNo" NOT NULL,
    "perinealPainBotton" "YesNo" NOT NULL,
    "hemorrhoidsBottom" "YesNo" NOT NULL,
    "finishedBleeding" "YesNo" NOT NULL,
    "screenBabyBluePostpartumDepression" "YesNo" NOT NULL,
    "EPDStool" "YesNo" NOT NULL,
    "birthControl" "YesNo" NOT NULL,
    "bloodwork" "YesNo" NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenBsPostpartumAppointmentAssesment_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

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

-- AddForeignKey
ALTER TABLE "EdinburgPostnatalDepressionScale" ADD CONSTRAINT "EdinburgPostnatalDepressionScale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmokingTobaccoPregnancy" ADD CONSTRAINT "SmokingTobaccoPregnancy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstanceUseHistory" ADD CONSTRAINT "SubstanceUseHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HousingSecurityHomeVisitForm" ADD CONSTRAINT "HousingSecurityHomeVisitForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerceivedStressScale" ADD CONSTRAINT "PerceivedStressScale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneralizedAnxietyDisorder" ADD CONSTRAINT "GeneralizedAnxietyDisorder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PregnancySpacingAssesment" ADD CONSTRAINT "PregnancySpacingAssesment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenBsPostpartumAppointmentAssesment" ADD CONSTRAINT "TenBsPostpartumAppointmentAssesment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
