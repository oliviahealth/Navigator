import { z } from 'zod';

const CurrentMedicationListInputsSchema = z.object({
    currentMedicationList: z.array(
        z.object({
            name: z.string().min(1, 'Name is required'),
            dose: z.string().min(1, 'Dose is required'),
            prescriber: z.string().min(1, 'Prescriber is required'),
            notes: z.string().optional(),
        })
    ),
    notes: z.string().optional(),
});

export type ICurrentMedicationListInputs = z.infer<typeof CurrentMedicationListInputsSchema>;

export const CurrentMedicationListResponseSchema = CurrentMedicationListInputsSchema.extend({
    id: z.string(),
});

export type ICurrentMedicationListFormResponse = z.infer<typeof CurrentMedicationListResponseSchema>;