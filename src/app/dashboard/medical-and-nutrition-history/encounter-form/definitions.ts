import { z } from "zod";

export const YesNoEnum = z.enum(["Yes", "No"]);

export const ParentConcernsEnum = z.enum(["Yes", "No", "Did_not_ask"]);

export const ReasonsEnum = z.enum(["Injury", "Other"]);

export const careVisitsDatesAndReasons = z.object({
    visitDate: z.union([z.date(), z.string().min(1, "Visit date is required.")]),
    reason: ReasonsEnum.refine(val => val != null, { message: "Reason required." }).nullable(),
    otherReason: z.string().nullable()
});

export const EncounterEntrySchema = z.object({
    dateOfVisit: z.union([z.date(), z.string().min(1, "Date of visit is required")]),
    staff: z.string().min(1, "Staff name required."),
    healthInsurance: YesNoEnum.refine(val => val != null, { message: "Health insurance is required." }).nullable(),
    parentConcerns: ParentConcernsEnum.nullable(),
    careVisits: YesNoEnum.nullable().refine(val => val !== null, { message: "Visits attended required." }).nullable(),
    careVisitsDatesAndReasonsList: z.array(careVisitsDatesAndReasons).nullable(),
    wellchildVisits: YesNoEnum.nullable(),
    wellchildVisitsCompleted: z.string().nullable()
});
export type IEncounterEntry = z.infer<typeof EncounterEntrySchema>;

export const EncounterFormInputsSchema = z.object({
    participantName: z.string().min(1, "Participant name is required."),
    caseId: z.string().min(1, "Case ID is required."),
    monthYear: z.string().min(1, "Month/Year required."),
    encounterEntries: z.array(EncounterEntrySchema),
    label: z.string().min(1, "Label required."),
    staffNotes: z.string().min(1, "Staff notes required.")
});
export type IEncounterFormInputs = z.infer<typeof EncounterFormInputsSchema>;

export const EncounterFormResponseSchema = EncounterFormInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IEncounterFormResponse = z.infer<typeof EncounterFormResponseSchema>;