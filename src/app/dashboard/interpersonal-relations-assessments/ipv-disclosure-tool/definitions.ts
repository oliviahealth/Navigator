import { z } from "zod";

export const YesNoEnum = z.enum(['Yes', 'No']);

export const IPVScreeningInputsSchema = z.object({
    dateTaken: z.union([z.date(), z.string().min(1, "Date taken is required")]),
    ipvScreeningDate: z.union([z.date(), z.string()]).nullable(),
    screeningToolUsed: z.string().nullable(),
    totalScore: z.string().regex(/^\d+$/, 'Total score must be a numeric string').nullable(),
    ipvDisclosure: YesNoEnum.nullable(),
    ipvDisclosureDate: z.union([z.date(), z.string()]).nullable(),
    notes: z.string().nullable(),
});

export type IIPVScreeningInputs = z.infer<typeof IPVScreeningInputsSchema>;

export const IPVScreeningResponseSchema = IPVScreeningInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});

export type IIPVScreeningResponse = z.infer<typeof IPVScreeningResponseSchema>;