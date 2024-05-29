import { z } from "zod";

export const GenderEnum = z.enum([
    "Male",
    "Female"
]);
export const EthnicityEnum = z.enum([
    "Hispanic_or_Latinx",
    "Not_Hispanic_or_Latinx"
]);
export const RaceEnum = z.enum([
    "American_Indian_Alaska_Native",
    "Asian",
    "Black_or_African_American",
    "Native_Hawaiian_or_Pacific_Islander",
    "White",
    "More_than_one_race_not_specified",
    "Declined_to_identify"
]);
export const PregnancyStatusAtEnrollmentEnum = z.enum([
    "Pregnant",
    "Not_Pregnant",
    "NA_Male_Participiant"
]);
export const MaritalStatusEnum = z.enum([
    "Married",
    "Not_married_but_living_together",
    "Never_married_and_not_living_with_partner",
    "Separated_or_Divorced",
    "Widowed"
]);
export const LgbtqiPlusEnum = z.enum(["LGBTQI", "Non_LGBTQI"]);
export const InsuranceEnum = z.enum([
    "Employer_insurance",
    "Self_pay",
    "Dual_Eligibile_Medicaid_Medicare",
    "Medicaid_CHIP_only",
    "Medicare_only",
    "Medicare_plus_supplemental",
    "TriCARE",
    "Other_third_party_privately_insured",
    "Uninsured"
]);
export const PriorityPopulationCharacteristicsEnum = z.enum(["Yes", "No"]);

export const labelMapping = {
    race: {
        American_Indian_Alaska_Native: "American Indian/Alaska Native",
        Asian: "Asian",
        Black_or_African_American: "Black or African American",
        Native_Hawaiian_or_Pacific_Islander: "Native Hawaiian or Pacific Islander",
        White: "White",
        More_than_one_race_not_specified: "More than one race - not specified",
        Declined_to_identify: "Declined to identify"
    },
    ethnicity: {
        Hispanic_or_Latinx: "Hispanic or Latino/a",
        Not_Hispanic_or_Latinx: "Not Hispanic or Latino/a"
    },
    pregnancyStatusAtEnrollment: {
        Pregnant: "Pregnant",
        Not_Pregnant: "Not Pregnant",
        NA_Male_Participiant: "N/A (Male Participant)"
    },
    maritalStatus: {
        Married: "Married",
        Not_married_but_living_together: "Not married but living together",
        Never_married_and_not_living_with_partner: "Never married and not living with partner",
        Separated_or_Divorced: "Separated or Divorced",
        Widowed: "Widowed"
    },
    lgbtqiPlus: {
        LGBTQI: "LGBTQI+",
        Non_LGBTQI: "Non-LGBTQI+"
    },
    insurance: {
        Employer_insurance: "Employer insurance",
        Self_pay: "Self pay",
        Dual_Eligibile_Medicaid_Medicare: "Dual Eligible Medicaid Medicare",
        Medicaid_CHIP_only: "Medicaid CHIP Only",
        Medicare_only: "Medicare only",
        Medicare_plus_supplemental: "Medicare plus supplemental",
        TriCARE: "TriCARE",
        Other_third_party_privately_insured: "Other third party privately insured",
        Uninsured: "Uninsured"
    }
};

export const ParticipantDemographicsFormInputsSchema = z.object({
    programStartDate: z.union([z.date(), z.string().min(1, "Date of Birth is required")]),
    caseId: z.string().min(1, "CaseID is required"),
    homeVisitorAssigned: z.string().min(1, "Home Visitor Assigned is required"),
    participantName: z.string().min(1, "Participant name is required"),
    participantDateOfBirth: z.union([z.date(), z.string().min(1, "Date of Birth is required")]),
    participantAddress: z.string().min(1, "Address is required"),
    participantZipCode: z.string().min(1, "Zip Code is required"),
    participantPhoneNumber: z.string().min(1, "Phone Number is required"),
    gender: GenderEnum.refine(val => val, { message: "Gender is required" }),
    ethnicity: EthnicityEnum.refine(val => val, { message: "Ethnicity is required" }),
    race: RaceEnum.refine(val => val, { message: "Race is required" }),
    primaryLanguage: z.string().min(1, "Primary Language is required"),
    pregnancyStatusAtEnrollment: PregnancyStatusAtEnrollmentEnum.refine(val => val, { message: "Pregnancy Status is required" }),
    maritalStatus: MaritalStatusEnum.refine(val => val, { message: "Marital Status is required" }),
    lgbtqiPlus: LgbtqiPlusEnum.refine(val => val, { message: "LGBTQI+ is required" }),
    insurance: InsuranceEnum.refine(val => val, { message: "Insurance is required" }),
    childAbuse: z.enum(["Yes", "No"]).refine(val => val, { message: "Child abuse information is required" }),
    substanceAbuse: z.enum(["Yes", "No"]).refine(val => val, { message: "Substance abuse information is required" }),
    tobaccoUse: z.enum(["Yes", "No"]).refine(val => val, { message: "Tobacco use information is required" }),
    lowStudentAchievement: z.enum(["Yes", "No"]).refine(val => val, { message: "Low student achievement information is required" }),
    developmentalDelay: z.enum(["Yes", "No"]).refine(val => val, { message: "Developmental delay information is required" }),
    USArmedForces: z.enum(["Yes", "No"]).refine(val => val, { message: "US Armed Forces information is required" }),
    reenrollmentWithGap: z.enum(["Yes", "No"]).refine(val => val, { message: "Reenrollment with gap in service information is required" }),
    transferFromAnotherSite: z.enum(["Yes", "No"]).refine(val => val, { message: "Transfer from another site information is required" }),
})
export type IParticipantDemographicsFormInputs = z.infer<typeof ParticipantDemographicsFormInputsSchema>

export const ParticipantDemographicsFormResponseSchema = ParticipantDemographicsFormInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IParticipantDemographicsFormResponse = z.infer<typeof ParticipantDemographicsFormResponseSchema>;