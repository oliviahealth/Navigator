import { z } from "zod";

export const YesNoEnum = z.enum(["Yes", "No"]);
export const YesNoDidNotAskEnum = z.enum(["Yes", "No", "Did Not Ask"]);
export const VisitReasonEnum = z.enum(["Injury", "Other"]);
export const WellChildVisitsEnum = z.enum([
  "Newborn",
  "3-7 days old",
  "2-4 weeks old",
  "2-3 months old",
  "4-5 months old",
  "6-7 months old",
  "9-10 months old",
  "12-13 months old",
  "15-16 months old",
  "18-19 months old",
  "2-2.5 years old",
  "3-3.5 years old",
  "4-4.5 years old",
]);

export const HousingSecurityHomeVisitInputsSchema = z.object({
  participantName: z.string().min(1, "Participant name is required"),
  dateOfVisit: z.union([
    z.date(),
    z.string().min(1, "Date of Visit is required"),
  ]),
  caseId: z.string().min(1, "Case ID is required"),
  staffName: z.string().min(1, "Staff name is required"),
  healthInsurance: YesNoEnum,
  concerns: YesNoDidNotAskEnum,
  erVisit: YesNoEnum,
  erVisitSpecific: z
    .array(
      z.object({
        visitDate: z
          .union([z.date(), z.string().min(1, "Date of Visit is required")])
          .optional(),
        visitReason: VisitReasonEnum.optional(),
      })
    )
    .optional(),
  wellChildVisits: YesNoEnum,
  wellChildVisitsSpecific: z
    .array(
      z.object({
        childName: z.string().min(1, "Required"),
        wellChildVisitsCompleted: z.array(WellChildVisitsEnum).optional(),
      })
    )
    .optional(),
  // Added fields
  otherInsurance: z.string().nullable(), // Allows string or null
  middleHighSchoolGED: z.boolean().nullable(), // Allows boolean or null
  tobaccoCessationServices: YesNoEnum.nullable(), // Allows 'Yes' | 'No' or null
  wantPregnant: YesNoEnum.nullable(), // Allows 'Yes' | 'No' or null
  otherIncomeUndeterminedReason: z.string().nullable(), // Allows string or null,
  label: z.string().min(1, "Label required."),
  staffNotes: z.string().min(1, "Staff notes required."),
});
export type IHousingSecurityHomeVisitInputs = z.infer<
  typeof HousingSecurityHomeVisitInputsSchema
>;

export const HousingSecurityHomeVisitResponseSchema =
  HousingSecurityHomeVisitInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date(),
  });
export type IHousingSecurityHomeVisitResponse = z.infer<
  typeof HousingSecurityHomeVisitResponseSchema
>;
