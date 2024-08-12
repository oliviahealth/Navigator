import { z } from 'zod';

export const YesNoEnum = z.enum(["Yes", "No"]);

export const MentalHealthHistoryInputsSchema = z.object({
    mentalHealthHistory: z.array(
        z.object({
            diagnosis: z.string().min(1, 'Diagnosis required.'),
            date: z.union([z.date(), z.string().min(1, "Date of diagnosis required.")]),
            provider: z.string().min(1, 'Provider required.'),
            providerPhone: z.string().min(1, 'Provider phone required.')
        })
    ),
    takingMedication: YesNoEnum,
    medicationDetails: z.string().nullable(),
    notes: z.string().nullish(),
    label: z.string().min(1, "Label required."),
    staffNotes: z.string().min(1, "Staff notes required.")
});
export type IMentalHealthHistoryInputs = z.infer<typeof MentalHealthHistoryInputsSchema>;

export const MentalHealthHistoryResponseSchema = MentalHealthHistoryInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});

export type IMentalHealthHistoryResponse = z.infer<typeof MentalHealthHistoryResponseSchema>;