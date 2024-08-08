import { z } from "zod";

export const PregnancySpacingAssesmentInputsSchema = z.object({
    hadPregnanciesLessThan12MoApart: z.string().min(1, 'Had Pregnancy Less than 12 months apart is required'),
    discussFamilyPlanningInterest: z.string().min(1, 'Discuss Family Planning Interest is required'),
    label: z.string().min(1, "Label required."),
    staffNotes: z.string().min(1, "Staff notes required.")
});

export type IPregnancySpacingAssesmentInputs = z.infer<typeof PregnancySpacingAssesmentInputsSchema>;

export const PregnancySpacingAssesmentResponseSchema = PregnancySpacingAssesmentInputsSchema.extend({
    id: z.string()
});

export type IPregnancySpacingAssesmentFormResponse = z.infer<typeof PregnancySpacingAssesmentResponseSchema>;