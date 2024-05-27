import { z } from "zod";

export const raceEnum = z.enum([
    "American Indian/Alaska Native",
    "Asian",
    "Black or African American",
    "Native Hawaiian or Pacific Islander",
    "White", "More than one race - not specified",
    "Declined to identify"
]);
export const pregnancyStatusAtEnrollmentEnum = z.enum([
    "Pregnant",
    "Not Pregnant",
    "N/A (male participant)"
]);
export const maritalStatusEnum = z.enum([
    "Married",
    "Not married but living together",
    "Never married and not living with partner",
    "Separated or Divorced",
    "Widowed"
]);
export const insuranceEnum = z.enum([
    "Employer Insurance",
    "Self-pay",
    "Dual Eligibile: Medicaid & Medicare",
    "Medicaid/CHIP only",
    "Medicare only",
    "Medicare plus supplemental",
    "TriCARE",
    "Other third party (privately insured)",
    "Uninsured"
]);
export const ParticipantDemographicsRecordInputsSchema = z.object({
    programStartDate: z.string().min(1, "Program Start Date is required"),
    caseId: z.string().min(1, "CaseID is required"),
    homeVisitorAssigned: z.string().min(1, "Home Visitor Assigned is required"),
    name: z.string().min(1, "Participant name is required"),
    dateOfBirth: z.union([z.date(), z.string().min(1, "Date of Birth is required")]),
    address: z.string().min(1, "Address is required"),
    zipCode: z.string().min(1, "Zip Code is required"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    gender: z.enum(["Female", "Male"]).nullable().refine(val => val, { message: "Gender is required" }),
    ethnicity: z.enum(["Hispanic or Latino/a", "Not Hispanic or Latino/a"]).nullable().refine(val => val, { message: "Ethnicity is required" }),
    race: raceEnum.nullable().refine(val => val, { message: "Race is required" }),
    primaryLanguage: z.string().min(1, "Primary Language is required"),
    pregnancyStatusAtEnrollment: pregnancyStatusAtEnrollmentEnum.nullable().refine(val => val, { message: "Pregnancy Status is required" }),
    maritalStatus: maritalStatusEnum.nullable().refine(val => val, { message: "Marital Status is required" }),
    lgbtqiPlus: z.enum(["LGBTQI+", "Non-LGBTQI+"]).nullable().refine(val => val, { message: "LGBTQI+ is required" }),
    insurance: insuranceEnum.nullable().refine(val => val, { message: "Insurance is required" }),
    childAbuse: z.enum(["Yes", "No"]).nullable().refine(val => val, { message: "Child abuse information is required" }),
    substanceAbuse: z.enum(["Yes", "No"]).nullable().refine(val => val, { message: "Substance abuse information is required" }),
    tobaccoUse: z.enum(["Yes", "No"]).nullable().refine(val => val, { message: "Tobacco use information is required" }),
    lowStudentAchievement: z.enum(["Yes", "No"]).nullable().refine(val => val, { message: "Low student achievement information is required" }),
    developmentalDelay: z.enum(["Yes", "No"]).nullable().refine(val => val, { message: "Developmental delay information is required" }),
    USArmedForces: z.enum(["Yes", "No"]).nullable().refine(val => val, { message: "US Armed Forces information is required" }),
    reenrollmentWithGap: z.enum(["Yes", "No"]).nullable().refine(val => val, { message: "Reenrollment with gap in service information is required" }),
    transferFromAnotherSite: z.enum(["Yes", "No"]).nullable().refine(val => val, { message: "Transfer from another site information is required" }),
})
export type IParticipantDemographicsRecordInputs = z.infer<typeof ParticipantDemographicsRecordInputsSchema>

export const ParticipantDemographicsRecordResponseSchema = ParticipantDemographicsRecordInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IParticipantDemographicsRecordResponse = z.infer<typeof ParticipantDemographicsRecordResponseSchema>;