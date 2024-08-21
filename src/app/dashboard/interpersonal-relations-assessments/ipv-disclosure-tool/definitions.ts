import { z } from "zod";

export const YesNoEnum = z.enum(['Yes', 'No']);

export const IPVScreeningInputsSchema = z.object({
  dateTaken: z.union([z.date(), z.string().min(1, "Date is required")]),
  ipvScreeningDate: z.union([z.date(), z.string().min(1, "Date is required")]),
  screeningToolUsed: z.string().min(1, "Screening Tool Used is required"),
  totalScore: z.string().regex(/^\d+$/, 'Total score must be a numeric string'),
  ipvDisclosure: YesNoEnum,
  ipvDisclosureDate: z.union([z.date(), z.string().min(1, "Date/Time is required")]),
  notes: z.string().min(1, "Notes are required"),
  label: z.string().min(1, "Label is required"),
  staffNotes: z.string().min(1, "Staff notes are required")
});

export type IIPVScreeningInputs = z.infer<typeof IPVScreeningInputsSchema>;

export const IPVScreeningResponseSchema = IPVScreeningInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});

export type IIPVScreeningResponse = z.infer<typeof IPVScreeningResponseSchema>;