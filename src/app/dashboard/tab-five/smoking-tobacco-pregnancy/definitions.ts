import { z } from 'zod';

export const SmokingTobaccoPregnancyInputSchema = z.object({
  smokingStatus: z.string().nullish()
});

export type ISmokingTobaccoPregnancyInputs = z.infer<typeof SmokingTobaccoPregnancyInputSchema>;

export const SmokingTobaccoPregnancyResponseSchema = SmokingTobaccoPregnancyInputSchema.extend({
  id: z.string(),
});

export type ISmokingTobaccoPregnancyResponse = z.infer<typeof SmokingTobaccoPregnancyResponseSchema>;