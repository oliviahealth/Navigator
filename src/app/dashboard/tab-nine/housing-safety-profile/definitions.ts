import { z } from "zod";

export const TimeframeEnum = z.enum(["Enrollment", "Update"]);
export const InsuranceTypeEnum = z.enum(["Medicaid or Texas Kidcare", "Private Insurance", "Tri-Care", "No insurance", "Other insurance"]);
export const EducationLevelEnum = z.enum(["HS diploma/GED", "Some college/training", "Technical training/certification", "Associate's degree", "Bachelor's degree or higher"]);
export const EmploymentStatusEnum = z.enum(["Employed full-time", "Employed part-time", "Not employed currently"]);
export const YesNoEnum = z.enum(["Yes", "No"]);
export const HousingStatusEnum = z.enum([
  "Owns or shares own home",
  "Rents or shares rented home",
  "Lives in public housing",
  "Lives with parent/family member",
  "Some other arrangement",
  "Sharing housing",
  "Lives in a shelter"
]);

export const HouseholdHousingSafetyProfileInputsSchema = z.object({
  participantName: z.string().min(1, "Participant name is required"),
  caseId: z.string().min(1, "Case ID is required"),
  dateCompleted: z.union([z.date(), z.string().min(1, "Date Completed is required")]),
  staffName: z.string().min(1, "Staff name is required"),
  timeframe: z.array(TimeframeEnum).min(1, "Timeframe is required"),
  insuranceType: InsuranceTypeEnum,
  otherInsurance: z.string().optional().nullable(),
  highSchoolDiploma: YesNoEnum,
  highestEducation: EducationLevelEnum.optional().nullable(),
  currentlyEnrolled: YesNoEnum,
  middleHighSchoolGED: z.boolean().optional().nullable(),
  employmentStatus: EmploymentStatusEnum,
  usesTobacco: YesNoEnum,
  tobaccoCessationServices: YesNoEnum.optional().nullable(),
  currentlyPregnant: YesNoEnum.optional().nullable(),
  wantPregnant: YesNoEnum.optional().nullable(),
  yearlyHouseholdIncome: z.number().optional().nullable(),
  incomeUndeterminedReason: z.string().nullable(),
  otherIncomeUndeterminedReason: z.string().optional().nullable(),
  dependentsCount: z.number().int().min(1, "Number of dependents must be at least 1"),
  housingStatus: HousingStatusEnum
});

export type IHouseholdHousingSafetyProfileInputs = z.infer<typeof HouseholdHousingSafetyProfileInputsSchema>;

export const HouseholdHousingSafetyProfileResponseSchema = HouseholdHousingSafetyProfileInputsSchema.extend({
  id: z.string(),
  userId: z.string(),
  dateCreated: z.date(),
  dateModified: z.date()
});

export type IHouseholdHousingSafetyProfileResponse = z.infer<typeof HouseholdHousingSafetyProfileResponseSchema>;
