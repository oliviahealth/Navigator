import { z } from "zod";

export const YesNoEnum = z.enum(['Yes', 'No']);

export const IPVScreeningInputsSchema = z.object({
  dateTaken: z.string().min(1, "Date taken is required"),
  ipvScreeningDate: z.string().min(1, "IPV Screening Date is required"),
  screeningToolUsed: z.string().min(1, "Screening Tool Used is required"),
  totalScore: z.string().regex(/^\d+$/, 'Total score must be a numeric string'),
  ipvDisclosure: YesNoEnum,
  ipvDisclosureDate: z.string().min(1, "IPV Disclosure Date is required"),
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