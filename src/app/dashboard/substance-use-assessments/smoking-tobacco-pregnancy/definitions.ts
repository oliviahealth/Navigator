import { z } from 'zod';

export const SmokingTobaccoPregnancyInputSchema = z.object({
  smokingStatus: z.string().nullish(),
  label: z.string(),
  staffNotes: z.string()
});

export type ISmokingTobaccoPregnancyInputs = z.infer<typeof SmokingTobaccoPregnancyInputSchema>;

export const SmokingTobaccoPregnancyResponseSchema = SmokingTobaccoPregnancyInputSchema.extend({
  id: z.string(),
  userId: z.string(),
  dateCreated: z.date(),
  dateModified: z.date()
});

export type ISmokingTobaccoPregnancyResponse = z.infer<typeof SmokingTobaccoPregnancyResponseSchema>;