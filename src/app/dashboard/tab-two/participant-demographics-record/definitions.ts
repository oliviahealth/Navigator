import { z } from "zod";

export const ethnicityEnum = z.enum([
    "Hispanic_Or_Latinx",
    "Not_Hispanic_Or_Latinx"
]);
export const raceEnum = z.enum([
    "American_Indian_Alaska_Native",
    "Asian",
    "Black_or_African_American",
    "Native_Hawaiian_or_Pacific_Islander",
    "White",
    "More_than_one_race_not_specified",
    "Declined_to_identify"
]);
export const pregnancyStatusAtEnrollmentEnum = z.enum([
    "Pregnant",
    "Not_Pregnant",
    "NA_Male_Participiant"
]);
export const maritalStatusEnum = z.enum([
    "Married",
    "Not_Married_But_Living_Together",
    "Never_Married_And_Not_Living_With_Partner",
    "Separated_or_Divorced",
    "Widowed"
]);
export const lgbtqiPlusEnum = z.enum(["lgbtqi", "nonlgbtqi"]);
export const insuranceEnum = z.enum([
    "Employer_Insurance",
    "Self_Pay",
    "Dual_Eligibile_Medicaid_Medicare",
    "Medicaid_CHIP_only",
    "Medicare_only",
    "Medicare_plus_supplemental",
    "TriCARE",
    "Other_third_party_privately_insured",
    "Uninsured"
]);

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
        Hispanic_Or_Latinx: "Hispanic or Latino/a",
        Not_Hispanic_Or_Latinx: "Not Hispanic or Latino/a"
    },
    pregnancyStatusAtEnrollment: {
        Pregnant: "Pregnant",
        Not_Pregnant: "Not Pregnant",
        NA_Male_Participiant: "N/A (Male Participant)"
    },
    maritalStatus: {
        Married: "Married",
        Not_Married_But_Living_Together: "Not Married But Living Together",
        Never_Married_And_Not_Living_With_Partner: "Never Married And Not Living With Partner",
        Separated_or_Divorced: "Separated Or Divorced",
        Widowed: "Widowed"
    },
    lgbtqiPlus: {
        lgbtqi: "LGBTQI+",
        nonlgbtqi: "Non-LGBTQI+"
    },
    insurance: {
        Employer_Insurance: "Employer Insurance",
        Self_Pay: "Self Pay",
        Dual_Eligibile_Medicaid_Medicare: "Dual Eligible Medicaid Medicare",
        Medicaid_CHIP_only: "Medicaid CHIP Only",
        Medicare_only: "Medicare only",
        Medicare_plus_supplemental: "Medicare plus supplemental",
        TriCARE: "TriCARE",
        Other_third_party_privately_insured: "Other third party privately insured",
        Uninsured: "Uninsured"
    }
};

export const ParticipantDemographicsRecordInputsSchema = z.object({
    programStartDate: z.union([z.date(), z.string().min(1, "Date of Birth is required")]),
    caseId: z.string().min(1, "CaseID is required"),
    homeVisitorAssigned: z.string().min(1, "Home Visitor Assigned is required"),
    name: z.string().min(1, "Participant name is required"),
    dateOfBirth: z.union([z.date(), z.string().min(1, "Date of Birth is required")]),
    address: z.string().min(1, "Address is required"),
    zipCode: z.string().min(1, "Zip Code is required"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    gender: z.enum(["Female", "Male"]).refine(val => val, { message: "Gender is required" }),
    ethnicity: ethnicityEnum.refine(val => val, { message: "Ethnicity is required" }),
    race: raceEnum.refine(val => val, { message: "Race is required" }),
    primaryLanguage: z.string().min(1, "Primary Language is required"),
    pregnancyStatusAtEnrollment: pregnancyStatusAtEnrollmentEnum.refine(val => val, { message: "Pregnancy Status is required" }),
    maritalStatus: maritalStatusEnum.refine(val => val, { message: "Marital Status is required" }),
    lgbtqiPlus: lgbtqiPlusEnum.refine(val => val, { message: "LGBTQI+ is required" }),
    insurance: insuranceEnum.refine(val => val, { message: "Insurance is required" }),
    childAbuse: z.enum(["Yes", "No"]).refine(val => val, { message: "Child abuse information is required" }),
    substanceAbuse: z.enum(["Yes", "No"]).refine(val => val, { message: "Substance abuse information is required" }),
    tobaccoUse: z.enum(["Yes", "No"]).refine(val => val, { message: "Tobacco use information is required" }),
    lowStudentAchievement: z.enum(["Yes", "No"]).refine(val => val, { message: "Low student achievement information is required" }),
    developmentalDelay: z.enum(["Yes", "No"]).refine(val => val, { message: "Developmental delay information is required" }),
    USArmedForces: z.enum(["Yes", "No"]).refine(val => val, { message: "US Armed Forces information is required" }),
    reenrollmentWithGap: z.enum(["Yes", "No"]).refine(val => val, { message: "Reenrollment with gap in service information is required" }),
    transferFromAnotherSite: z.enum(["Yes", "No"]).refine(val => val, { message: "Transfer from another site information is required" }),
})
export type IParticipantDemographicsRecordInputs = z.infer<typeof ParticipantDemographicsRecordInputsSchema>

export const ParticipantDemographicsRecordResponseSchema = ParticipantDemographicsRecordInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IParticipantDemographicsRecordResponse = z.infer<typeof ParticipantDemographicsRecordResponseSchema>;