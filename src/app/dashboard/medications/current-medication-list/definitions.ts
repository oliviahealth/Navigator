import { z } from 'zod';

export const CurrentMedicationListInputsSchema = z.object({
    currentMedicationList: z.array(
        z.object({
            name: z.string().min(1, 'Name is required'),
            dose: z.string().min(1, 'Dose is required'),
            prescriber: z.string().min(1, 'Prescriber is required'),
            notes: z.string().nullish(),
        })
    ),
    notes: z.string().nullish(),
    label: z.string().min(1, "Label required."),
    staffNotes: z.string().min(1, "Staff notes required.")
});
export type ICurrentMedicationListInputs = z.infer<typeof CurrentMedicationListInputsSchema>;

export const CurrentMedicationListResponseSchema = CurrentMedicationListInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});

export type ICurrentMedicationListFormResponse = z.infer<typeof CurrentMedicationListResponseSchema>;