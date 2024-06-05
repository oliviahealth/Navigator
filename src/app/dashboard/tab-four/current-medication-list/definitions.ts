// zod schema

import {z} from "zod";

const Medications = z.object({
    name: z.string().min(1, 'Name is required'),
    dose: z.string().min(1, 'Dose is required'),
    prescriber: z.string().min(1, 'Prescriber is required'),
    notes: z.string().min(1, 'Notes is required'),
});

const CurrentMedicationListInputsSchema = z.object({
    currentMedicationList: z.array(Medications)
})
export type ICurrentMedicationInputs = z.infer<typeof CurrentMedicationListInputsSchema>;

// change variable names
export const ParticipantDemographicsFormResponseSchema = ParticipantDemographicsFormInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IParticipantDemographicsFormResponse = z.infer<typeof ParticipantDemographicsFormResponseSchema>;