import { z } from "zod";

export const MarriedEnum = z.enum([
    "Married",
    "Unmarried"
]);

export const YesNoEnum = z.enum([
    "Yes",
    "No"
]);

export const RaceEnum = z.enum([
    "American_Indian",
    "Black",
    "White_European",
    "Hawaiian",
    "North_African",
    "Middle_Eastern"
]);

export const NumMonthsPregnantTwentyWeeksEnum = z.enum([
    "None",
    "Number_of_pregnancies",
    "Unknown"
]);

export const NumMonthsPregnantEnum = z.enum([
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
    'Sixth',
    'Seventh',
    'Eighth_Ninth',
    'Unknown',
    'No_medical_care'
]);

export const CurrentPregnancyInfoEnum = z.enum([
    "Weight_loss",
    "Nausea",
    "Gestational_Diabetes",
    "Twins",
    "Fetal_Growth_Restriction",
    "High_Blood_Pressure",
    "None_Apply"
]);

export const PreviousPregnancyInfoEnum = z.enum([
    "GDM",
    "Preterm_delivery",
    "Early_term_delivery",
    "Five_pounds_or_less",
    "Died_after_5_months_PG",
    "Preeclampsia",
    "Died_before_one_month",
    "Miscarriage",
    "Birth_defects",
    "Nine_pounds_at_birth",
    "None_Apply",
]);

export const TimesTakenMultivitaminEnum = z.enum([
    "Less_than_once_per_week",
    "Specify_number_of_times",
    "Eight_or_more_times",
    "Unknown"
]);

export const YesNoUnknownEnum = z.enum(["Yes", "No", "Unknown"]);

export const CigarettesEnum = z.enum([
    "Do_not_smoke",
    "Specified_number",
    "Ninety_seven_or_more",
    "Smoked_but_quantity_unknown",
    "Unknown_or_refused"
]);

export const HouseholdSmokingEnum = z.enum([
    "Someone_else",
    "No_one_else",
    "Unknown"
]);

export const AlcoholBeforePregnancyEnum = z.enum([
    "Did_not_drink",
    "Specified_number",
    "Twenty_one_or_more",
    "Drank_but_quantity_unknown",
    "Unknown_or_refused"
]);

export const SubstanceUseEnum = z.enum([
    "Illegal_substance",
    "Abusing_prescription",
    "Marijuana",
    "None"
])

export const PregnancyTypeEnum = z.enum([
    "Same_pregnancy",
    "Different_pregnancy"
]);

export const NotBreastfedDesiredLengthReasonsEnum = z.enum([
    "Difficult_latching",
    "Baby_not_satisfied",
    "Baby_not_gaining_weight",
    "Sore_nipples",
    "Not_producing_milk",
    "Too_many_household_duties",
    "Right_time_to_stop",
    "Sick_or_medical_reasons",
    "Work",
    "School",
    "Lack_of_support",
    "Baby_illness",
    "Doctor_recommended",
    "Other"
]);

export const BreastfeedingMethodEnum = z.enum([
    "Nurse",
    "Pump_and_nurse",
    "Pump_only",
    "Formula_and_milk",
    "Dont_want_to",
    "Dont_know",
    "Other"
]);

export const BreastfeedingMedicalConcernsEnum = z.enum([
    "Breast_surgery",
    "Hypothyroidism",
    "Diabetes",
    "Depression",
    "HIV",
    "No_concerns"
]);

export const NumPerDayEnum = z.enum([
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five_or_more"
]);

export const AppetiteEnum = z.enum([
    "Good",
    "Fair",
    "Poor"
]);

export const EverydayFoodEnum = z.enum([
    "Milk",
    "Sweet_beverages",
    "Snacks",
    "Whole_grains",
    "Fruits_and_vegetables"
]);

export const HighRiskFoodEnum = z.enum([
    "Unpasteurized_drink",
    "Soft_cheese",
    "Raw_meat",
    "Raw_sprouts",
    "Refrigerated_pate",
    "Hot_dogs",
    "Michigan_fish",
    "None_apply"
]);

export const DietsAndSupplementsEnum = z.enum([
    "Vegetarian",
    "Low_calorie",
    "Low_carb",
    "Bariatric_surgery",
    "PICA",
    "Vitamin_supplement",
    "Herbal_supplement",
    "Fluoride",
    "None_apply"
]);

export const labelMapping = {
    race: {
        American_Indian: "American Indian or Alaska Native Asian",
        Black: "Black or African American",
        Hawaiian: "Hawaiian or Native Pacific Islander",
        White_European: "White European",
        North_African: "North African",
        Middle_Eastern: "Middle Eastern",
        Asian: "Asian"
    },
    numMonthsPregnantTwentyWeeks: {
        None: "None",
        Number_of_pregnancies: "Number of pregnancies",
        Unknown: "Unknown"
    },
    numMonthsPregnant: {
        First: 'First month',
        Second: 'Second month',
        Third: 'Third month',
        Fourth: 'Fourth month',
        Fifth: 'Fifth month',
        Sixth: 'Sixth month',
        Seventh: 'Seventh month',
        Eighth_Ninth: 'Eighth or Ninth month',
        Unknown: 'Unknown',
        No_medical_care: 'No medical care'
    },
    currentPregnancyInfo: {
        Weight_loss: "Weight loss",
        Nausea: "Nausea and vomiting",
        Gestational_Diabetes: "Gestational Diabetes Mellitus",
        Twins: "Twins or more expected",
        Fetal_Growth_Restriction: "Fetal Growth Restriction",
        High_Blood_Pressure: "High Blood Pressure",
        None_Apply: "None Apply"
    },
    previousPregnancyInfo: {
        GDM: "History of GDM",
        Preterm_delivery: "Preterm Delivery (< 37 weeks)",
        Early_term_delivery: "Early term delivery (37 to < 39 weeks)",
        Five_pounds_or_less: "Infant 5 pounds, 8 ounces or less",
        Died_after_5_months_PG: "Infant died after 5 months of PG",
        Preeclampsia: "History of Preeclampsia",
        Died_before_one_month: "Infant died before 1 month",
        Miscarriage: "Miscarriage",
        Birth_defects: "Congenital/birth defects",
        Nine_pounds_at_birth: "Infant 9 pounds or more at birth",
        None_Apply: "None Apply"
    },
    timesTakenMultivitamin: {
        Less_than_once_per_week: "Less than once per week",
        Specify_number_of_times: "Number of times per week (1 - 7)",
        Eight_or_more_times: "8 or more times",
        Unknown: "Unknown"
    },
    cigarettes: {
        Do_not_smoke: "Do not smoke",
        Specified_number: "Number of Cigarettes per day (1 - 96)",
        Ninety_seven_or_more: "97 or more cigarettes per day",
        Smoked_but_quantity_unknown: "Smoked but quantity unknown",
        Unknown_or_refused: "Unknown or refused"
    },
    householdSmoking: {
        Someone_else: "Yes, someone else smokes inside the home",
        No_one_else: "No, no one else smokes inside the home",
        Unknown: "Unknown"
    },
    alcohol: {
        Did_not_drink: "Did not drink",
        Specified_number: "Number of drinks per week (1 - 20)",
        Twenty_one_or_more: "21 or more drinks per week",
        Drank_but_quantity_unknown: "Drank but quantity unknown",
        Unknown_or_refused: "Unknown or refused"
    },
    substanceUse: {
        Illegal_substance: "Using any illegal substance",
        Abusing_prescription: "Abusing any prescription medications",
        Marijuana: "Using marijuana in any form",
        None: "None"
    },
    pregnancyType: {
        Same_pregnancy: "From same pregnancy (multiples)",
        Different_pregnancy: "From different pregnancies"
    },
    notBreastfedDesiredLengthReasons: {
        Difficult_latching: "My baby had difficulty latching or nursing",
        Baby_not_satisfied: "Breast milk alone did not satisfy my baby",
        Baby_not_gaining_weight: "I thought my baby was not gaining enough weight",
        Sore_nipples: "My nipples were sore, cracked or bleeding or it was too painful",
        Not_producing_milk: "I thought I was not producing enough milk, or my milk dried up",
        Too_many_household_duties: "I had too many other household duties",
        Right_time_to_stop: "I felt it was the right time to stop breastfeeding",
        Sick_or_medical_reasons: "I got sick or I had to stop for medical reasons",
        Work: "I went back to work",
        School: "I went back to school",
        Lack_of_support: "Lack of support",
        Baby_illness: "My baby had an illness or medical condition",
        Doctor_recommended: "Doctor recommended I supplement or wean",
        Other: "Other"
    },
    breastfeedingMethod: {
        Nurse: "I want to nurse my baby from the breast",
        Pump_and_nurse: "I want to pump and nurse from the breast",
        Pump_only: "I want to pump only",
        Formula_and_milk: "I want to provide both formula and breast milk",
        Dont_want_to: "I don't want to breastfeed",
        Dont_know: "I don't know",
        Other: "Other"
    },
    breastfeedingMedicalConcerns: {
        Breast_surgery: "Breast Surgery/Trauma",
        Hypothyroidism: "Hypothyroidism",
        Diabetes: "Diabetes",
        Depression: "Depression",
        HIV: "HIV (Do NOT ask. Only checked if voluntarily shared by client)",
        No_concerns: "No Concerns"
    },
    numPerDay: {
        zero: "0",
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five_or_more: "5 or more"
    },
    everydayFood: {
        Milk: "Milk",
        Sweet_beverages: "Pop or sweetened beverages",
        Snacks: "Sweets or salty snacks",
        Whole_grains: "Whole grains",
        Fruits_and_vegetables: "Fruits and vegetables"
    },
    highRiskFood: {
        Unpasteurized_drink: "Unpasteurized juice or milk",
        Soft_cheese: "Soft cheese",
        Raw_meat: "Raw/undercooked meat, fish, poultry, or eggs",
        Raw_sprouts: "Raw sprouts",
        Refrigerated_pate: "Refrigerated pate/meat spreads",
        Hot_dogs: "Hot dogs/lunchmeats",
        Michigan_fish: "Michigan fish",
        None_apply: "None Apply"
    },
    dietsAndSupplements: {
        Vegetarian: "Vegetarian diet",
        Low_calorie: "Low-calorie/weight loss diet",
        Low_carb: "Low-carbohydrate, high protein diet",
        Bariatric_surgery: "Bariatric surgery",
        PICA: "PICA",
        Vitamin_supplement: "Vitamin/mineral/Iodine supplement daily",
        Herbal_supplement: "Herbal supplement remedies/teas",
        Fluoride: "Fluoride",
        None_apply: "None apply"
    }
};

export const NutritionHistoryAndAssessmentInputsSchema = z.object({
    todaysDate: z.union([z.date(), z.string().min(1, "Today's date required.")]),
    name: z.string().min(1, "Name required."),
    gradesCompleted: z.string().min(1, "Grades completed required."),
    currentlyMarried: MarriedEnum,
    hispanicLatino: YesNoEnum.nullable(),
    race: z.array(RaceEnum).default([]), // work around for prisma not allowing nullable arrays
    lastMenstrualPeriod: z.union([z.date(), z.string().min(1, "Last menstrual period required.")]),
    dueDate: z.union([z.date(), z.string().min(1, "Baby's due date required.")]),
    weightBeforePregnancy: z.string().min(1, "Weight before pregnancy required."),
    numPregnancies: z.string().min(1, "Number of pregnancies required."),
    numLiveBabies: z.string().min(1, "Number of live babies required."),
    timesPregnantTwentyWeeks: NumMonthsPregnantTwentyWeeksEnum,
    numPregnanciesTwentyWeeks: z.string().nullable(),
    numMonthsPregnant: NumMonthsPregnantEnum,
    currentPregnancyInfo: z.array(CurrentPregnancyInfoEnum).min(1, "Select at least one option."),
    timesSeenHealthProvider: z.string().min(1, "Number of times seen health provider required."),
    hivBloodTest: z.string().min(1, "HIV blood test taken required."),
    previousPregnancyInfo: z.array(PreviousPregnancyInfoEnum).min(1, "Select at least one option."),
    takesMedication: YesNoEnum,
    medications: z.string().nullable(),
    hasSideEffects: YesNoEnum,
    sideEffects: z.string().nullable(),
    hasDentalProblems: YesNoEnum,
    dentalProblems: z.string().nullable(),
    timesTakenMultivitaminOptions: TimesTakenMultivitaminEnum,
    specifiedTimesTakenMultivitamin: z.string().regex(/^\d+$/, 'Must be a number').nullable(),
    hasTakenVitaminsMinerals: YesNoUnknownEnum,
    cigarettesBeforePregnancy: CigarettesEnum,
    specifiedNumCigarettesBeforePregnancy: z.string().regex(/^\d+$/, 'Must be a number').nullable(),
    cigarettesSmokedNow: CigarettesEnum,
    specifiedNumCigarettesSmokedNow: z.string().regex(/^\d+$/, 'Must be a number').nullable(),
    householdSmoking: HouseholdSmokingEnum,
    alcoholBeforePregnancy: AlcoholBeforePregnancyEnum,
    specifiedNumDrinks: z.string().regex(/^\d+$/, 'Must be a number').nullable(),
    alcoholDuringPregnancy: YesNoEnum,
    substanceUse: z.array(SubstanceUseEnum).min(1, "Select at least one option."),
    disabilityLimitingFeedingDecisions: YesNoEnum,
    hasBreastfed: YesNoEnum,
    currentlyBreastfeeding: YesNoEnum,
    babyLessThanOneYear: YesNoEnum,
    infantId: z.string().min(1, "Infant ID required."),
    breastfeedingMultipleChildren: YesNoEnum,
    pregnancyType: PregnancyTypeEnum.nullable(),
    breastfedDesiredLength: YesNoEnum,
    notBreastfedDesiredLengthReasons: z.array(NotBreastfedDesiredLengthReasonsEnum).default([]),  // work around for prisma not allowing nullable arrays
    notBreastfedDesiredLengthReasonsOther: z.string().nullable(),
    heardAboutBreastfeeding: z.string().min(1, "Required."),
    breastfeedingMethod: BreastfeedingMethodEnum,
    breastfeedingMethodOther: z.string().nullable(),
    breastfeedingGoal: z.string().min(1, "Breastfeeding goal required."),
    moreInformationInterest: YesNoEnum,
    breastfeedingMedicalConcerns: z.array(BreastfeedingMedicalConcernsEnum).min(1, "Select at least one option."),
    numMealsPerDay: NumPerDayEnum,
    numSnacksPerDay: NumPerDayEnum,
    milkPerDay: NumPerDayEnum,
    appetite: AppetiteEnum,
    hasSpecialDiet: YesNoEnum,
    specialDietType: z.string().nullable(),
    fastFoodPerWeek: NumPerDayEnum,
    hasFoodAllergies: YesNoEnum,
    foodAllergiesType: z.string().nullable(),
    consumeEveryday: z.array(EverydayFoodEnum).min(1, "Select at least one option."),
    milkType: z.string().nullable(),
    highRiskFood: z.array(HighRiskFoodEnum).min(1, "Select at least one option."),
    dietsAndSupplements: z.array(DietsAndSupplementsEnum).min(1, "Select at least one option."),
    vitaminSupplementsType: z.string().nullable(),
    herbalSupplementsType: z.string().nullable(),
    staffNotes: z.string().nullable()
});
export type INutritionHistoryAndAssessmentInputs = z.infer<typeof NutritionHistoryAndAssessmentInputsSchema>;

export const NutritionHistoryAndAssessmentResponseSchema = NutritionHistoryAndAssessmentInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type INutritionHistoryAndAssessmentResponse = z.infer<typeof NutritionHistoryAndAssessmentResponseSchema>

export const getErrorMessage = (error: any) => {
    if (error && typeof error.message === 'string') {
        return error.message;
    }
    return '';
};