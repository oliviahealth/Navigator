import { z } from "zod";

export const deliveryModeEnum = z.enum(['Vaginal', 'Cesarean'])

export const YesNoEnum = z.enum(['Yes', 'No']);

export const ParentalMedicalHistoryInputsSchema = z.object({
    gestationalAge: z.string().min(1, 'Gestational age is required'),
    dueDate: z.union([z.date(), z.string().min(1, "Due date is required")]),
    deliveryDate: z.union([z.date(), z.string().min(1, "Delivery date is required")]),
    plannedModeDelivery: deliveryModeEnum.refine(val => val, { message: 'Planned mode of delivery is required' }),
    actualModeDelivery: deliveryModeEnum.refine(val => val, { message: 'Actual mode of delivery is required' }),
    attendedPostpartumVisit: YesNoEnum.refine(val => val, { message: 'Postpartum visit attendance is required' }),
    postpartumVisitLocation: z.string().nullable(),
    postpartumVisitDate: z.union([z.date(), z.string()]).nullable(),
    totalNumPregnancies: z.string().min(0, 'Total number of pregnancies is required').regex(/^\d+$/, 'Total number of pregnancies must be a numeric string'),
    numChildrenWithMother: z.string().min(1, 'Number of children with mother is required').regex(/^\d+$/, 'Number of children living with mother must be a numeric string'),
    priorPregnancyDates: z.string().min(1, "Prior pregnancy dates required."),
    priorPregnancyOutcomes: z.string().min(1, "Prior pregnancy outcomes required."),
    gravida: z.string().min(1, "Gravida required.").regex(/^\d+$/, 'Gravida must be a number.'),
    term: z.string().min(1, "Term required.").regex(/^\d+$/, 'Term must be a number.'),
    preterm: z.string().min(1, "Preterm required.").regex(/^\d+$/, 'Preterm must be a number.'),
    abortions: z.string().min(1, "Number of abortions required.").regex(/^\d+$/, 'Abortions must be a number.'),
    living: z.string().min(1, "Number of living children required.").regex(/^\d+$/, 'Must be a number.'),
    priorComplications: z.string().nullable(),
    ongoingMedicalProblems: z.string().min(1, 'Diagnoses/Conditions required.'),
});
export type IParentalMedicalHistoryInputs = z.infer<typeof ParentalMedicalHistoryInputsSchema>

export const ParentalMedicalHistoryResponseSchema = ParentalMedicalHistoryInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IParentalMedicalHistoryResponse = z.infer<typeof ParentalMedicalHistoryResponseSchema>;