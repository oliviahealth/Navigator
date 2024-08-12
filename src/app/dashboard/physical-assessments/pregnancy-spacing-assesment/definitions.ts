import { z } from "zod";

export const PregnancySpacingAssesmentInputsSchema = z.object({
    hadPregnanciesLessThan12MoApart: z.string().min(1, 'Had Pregnancy Less than 12 months apart is required'),
    discussFamilyPlanningInterest: z.string().min(1, 'Discuss Family Planning Interest is required')
});

export type IPregnancySpacingAssesmentInputs = z.infer<typeof PregnancySpacingAssesmentInputsSchema>;

export const PregnancySpacingAssesmentResponseSchema = PregnancySpacingAssesmentInputsSchema.extend({
    id: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});

export type IPregnancySpacingAssesmentFormResponse = z.infer<typeof PregnancySpacingAssesmentResponseSchema>;