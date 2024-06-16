import { z } from "zod";

export const HousingSecurityHomeVisitInputsSchema = z.object({
    participantName: z.string().min(1, "Participant name is required"),
    caseId: z.string().min(1, "CaseID is required"),
    dateOfVisit: z.union([z.date(), z.string().min(1, "Date of Visit is required")]),
    staffName: z.string().min(1, "Staff name is required"),
});
export type IHousingSecurityHomeVisitInputs = z.infer<typeof HousingSecurityHomeVisitInputsSchema>

export const HousingSecurityHomeVisitResponseSchema = HousingSecurityHomeVisitInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IHousingSecurityHomeVisitResponse = z.infer<typeof HousingSecurityHomeVisitResponseSchema>; 