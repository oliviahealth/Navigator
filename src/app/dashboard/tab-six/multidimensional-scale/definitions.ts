import { z } from "zod";

export const MultidimensionalScaleInputsSchema = z.object({
  assessmentDate: z.string(),
  siteId: z.string().regex(/^\d{2}-\d{2}$/, "Site ID must be in 01-00 format"),
  // not sure what format ID is in so left it for both
  participantId: z.union([
    z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {}),
    z.number().positive(),
  ]),
  relation: z.string().regex(/^\d{2}-\d{2}$/, "Relation must be in 01-00 format"),
  formCompletionStatus: z.enum(["1", "2", "4", "5"]),
  phase: z.enum(["Baseline", "Post Randomization"]),
  segment: z.string().regex(/^\d{2}$/, "Segment must be a 2-digit number"),
  formCompletionLanguage: z.enum(["English", "Spanish", "Both"]),
});

export type MultidimensionalScaleInputs = z.infer<typeof MultidimensionalScaleInputsSchema>;

export const MultidimensionalScaleResponseSchema = MultidimensionalScaleInputsSchema.extend({
  id: z.string(),
  userId: z.string(),
  participantId: z.number(), 
});

export type MultidimensionalScaleResponse = z.infer<typeof MultidimensionalScaleResponseSchema>;