import { z } from "zod";

export const YesNoEnum = z.enum(["Yes", "No"]);
export const YesNoDidNotAskEnum = z.enum(["Yes", "No", "Did not ask"]);
export const WellChildVisitsEnum = z.enum([
  "Newborn", "3 - 7 days old", "2 - 4 weeks old", "2 - 3 months old", "4 - 5 months old",
  "6 - 7 months old", "9 - 10 months old", "12 - 13 months old", "15 - 16 months old",
  "18 - 19 months old", "2 - 2.5 years old", "3 - 3.5 years old", "4 - 4.5 years old"
]);
export const InjuryOtherReasonEnum = z.enum(["Injury", "Other Reason"]);

const ErVisitSchema = z.object({
  erVisitDate: z.union([z.date(), z.string().min(1, "ER Visit Date required")]),
  erVisitReason: InjuryOtherReasonEnum.nullable(),
});

const VisitsCompletedSchema = z.object({
  childName: z.string().min(1, "Child name is required"),
  wellChildVisits: z.array(WellChildVisitsEnum),
});

export const HousingSecurityHomeVisitInputsSchema = z.object({
  participantName: z.string().min(1, "Participant name is required"),
  caseId: z.string().min(1, "CaseID is required"),
  dateOfVisit: z.union([z.date(), z.string().min(1, "Date of Visit is required")]),
  staffName: z.string().min(1, "Staff name is required"),
  haveHealhInsurance: YesNoEnum,
  childConcerns: YesNoDidNotAskEnum,
  takenChildToEr: YesNoEnum,
  erVisits: z.array(ErVisitSchema).optional(),
  visitsCompleted: z.array(VisitsCompletedSchema).optional(),
});
export type IHousingSecurityHomeVisitInputs = z.infer<typeof HousingSecurityHomeVisitInputsSchema>;

export const HousingSecurityHomeVisitResponseSchema = HousingSecurityHomeVisitInputsSchema.extend({
  id: z.string(),
  userId: z.string(),
  dateCreated: z.date(),
  dateModified: z.date()
});
export type IHousingSecurityHomeVisitResponse = z.infer<typeof HousingSecurityHomeVisitResponseSchema>;
