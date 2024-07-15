import {z} from "zod";


const peopleLivingWithPatient = z.object({
    name: z.string().min(1, "Name is required."),
    dateOfBirth:  z.union([z.date(), z.string().min(1, "Date of birth is required")]),
    relation: z.string().min(1, "Relation is required."),
});

const childrenNotLivingWithPatient = z.object({
    name: z.string().min(1, "Name is required"),
    dateOfBirth: z.union([z.date(), z.string().min(1, "Date of birth is required")]),
    caregiver: z.string().min(1, "Caregiver is required"),
    caregiverContact: z.string().min(1, "Caregiver contact is required"),
});

export const CurrentLivingArrangementInputsSchema = z.object({
    listPeopleLivingWithPatient: z.array(peopleLivingWithPatient),
    listChildrenNotLivingWithPatient: z.array(childrenNotLivingWithPatient),
    notes: z.string().nullable()
});
export type ICurrentLivingArrangementInputs = z.infer<typeof CurrentLivingArrangementInputsSchema>

export const CurrentLivingArrangementResponseSchema = CurrentLivingArrangementInputsSchema.extend({
    userId: z.string(),
    id: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
})
export type ICurrentLivingArrangementResponse = z.infer<typeof CurrentLivingArrangementResponseSchema>