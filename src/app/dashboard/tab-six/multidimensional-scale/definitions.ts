import { z } from "zod";

export const NewAssessmentFormInputsSchema = z.object({
  assessmentDate: z.string(),
  siteId: z.string().regex(/^\d{2}-\d{2}$/, "Site ID must be in 01-00 format"),
  participantId: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    { message: "Participant ID must be a positive number" }
  ),
  relation: z.string().regex(/^\d{2}-\d{2}$/, "Relation must be in 01-00 format"),
  formCompletionStatus: z.enum(["1", "2", "4", "5"]),
  phase: z.enum(["Baseline", "Post Randomization"]),
  segment: z.string().regex(/^\d{2}$/, "Segment must be a 2-digit number"),
  formCompletionLanguage: z.enum(["English", "Spanish", "Both"]),
});

export type INewAssessmentFormInputs = z.infer<typeof NewAssessmentFormInputsSchema>;

export const NewAssessmentFormResponseSchema = NewAssessmentFormInputsSchema.extend({
  id: z.string(),
  userId: z.string(),
  participantId: z.number(), // This ensures the response has a number
});

export type INewAssessmentFormResponse = z.infer<typeof NewAssessmentFormResponseSchema>;