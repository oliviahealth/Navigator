import { z } from "zod";

export const YesNoEnum = z.enum(["Yes", "No"]);
export const YesNoDidNotAskEnum = z.enum(["Yes", "No", "Did Not Ask"]);
export const VisitReasonEnum = z.enum(['Injury', 'Other'])

export const HousingSecurityHomeVisitInputsSchema = z.object({
    participantName: z.string().min(1, "Participant name is required"),
    dateOfVisit: z.union([z.date(), z.string().min(1, "Date of Visit is required")]),
    caseId: z.string().min(1, "Case ID is required"),
    staffName: z.string().min(1, "Staff name is required"),
    healthInsurance: YesNoEnum.refine(val => val, { message: "Required" }),
    concerns: YesNoDidNotAskEnum.refine(val => val, { message: "Required" }),
    erVisit: YesNoEnum.refine(val => val, { message: "Required" }),
    erVisitSpecific: z.array(z.object({
        visitDate: z.union([z.date(), z.string().min(1, "Date of Visit is required")]),
        visitReason: VisitReasonEnum.refine(val => val, { message: "Required" })
    })),
    wellChildVisits: YesNoEnum.refine(val => val, { message: "Required" }),
    wellChildVisitsSpecific: z.array(z.object({
        childName: z.string().min(1, 'Required'),
        wellChildVisitsCompleted: z.array(z.string().nullish())
    }))
});
export type IHousingSecurityHomeVisitInputs = z.infer<typeof HousingSecurityHomeVisitInputsSchema>

export const HousingSecurityHomeVisitResponseSchema = HousingSecurityHomeVisitInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IHousingSecurityHomeVisitResponse = z.infer<typeof HousingSecurityHomeVisitResponseSchema>; 