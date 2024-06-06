import { z } from "zod";

export const YesNoEnum = z.enum(["Yes", "No"]);

export const ParentConcernsEnum = z.enum(["Yes", "No", "Did_not_ask"]);

export const ReasonsEnum = z.enum(["Injury", "Other"]);

export const CareVisitsList = z.object({
    visitDate: z.union([z.date(), z.string().min(1, "Visit date is required")]),
    reason: ReasonsEnum.nullable().refine(val => val, { message: "Health insurance required" }),
    otherReason: z.string().nullable()
});

export const EncounterEntrySchema = z.object({
    dateOfVisit: z.union([z.date(), z.string().min(1, "Date of visit is required")]),
    staff: z.string().min(1, "Staff name required."),
    healthInsurance: YesNoEnum.nullable().refine(val => val, { message: "Health insurance required" }),
    parentConcerns: ParentConcernsEnum.nullable(),
    careVisits: YesNoEnum.nullable(),
    careVisitsList: z.array(CareVisitsList).nullable(),
    wellchildVisits: YesNoEnum.nullable(),
    wellchildVisitsList: z.string()
});
export type IEncounterEntry = z.infer<typeof EncounterEntrySchema>;

export const EncounterFormInputsSchema = z.object({
    participantName: z.string().min(1, "Participant name is required."),
    caseId: z.string().min(1, "Case ID is required."),
    monthYear: z.string().min(1, "Month/Year required."),
    encounterEntries: z.array(EncounterEntrySchema),
});
export type IEncounterFormInputs = z.infer<typeof EncounterFormInputsSchema>;

export const EncounterFormResponseSchema = EncounterFormInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IEncounterFormResponse = z.infer<typeof EncounterFormResponseSchema>;