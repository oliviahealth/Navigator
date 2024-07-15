import { z } from "zod"

export const SupportSystemsInputsSchema = z.object({
    currentSupportSystem: z.string().min(1, "Current support system required."),
    strengths: z.string().min(1, "Strengths required."),
    areasForImprovement: z.string().min(1, "Areas for improvement required."),
    goals: z.string().min(1, "Goals required."),
});
export type ISupportSystemInputs = z.infer<typeof SupportSystemsInputsSchema>;

export const SupportSystemsResponseSchema = SupportSystemsInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type ISupportSystemsResponse = z.infer<typeof SupportSystemsResponseSchema>