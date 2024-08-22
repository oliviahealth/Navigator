import { z } from 'zod';

export const SmokingStatusEnum = z.enum([
  "NEVER",
  "NOT_BEFORE_AND_NOT_NOW",
  "NOT_AFTER_AND_NOT_NOW",
  "NOT_DURING_AND_NOT_NOW",
  "NOT_DURING_AND_NOW"
]);

export const SmokingTobaccoPregnancyLabelMapping: Record<any, any> = {
  smokingStatus: {
    NEVER: "I have NEVER smoked or have smoked less than 100 cigarettes in my lifetime.",
    NOT_BEFORE_AND_NOT_NOW: "I stopped smoking BEFORE I found out I was pregnant and am not smoking now.",
    NOT_AFTER_AND_NOT_NOW: "I stopped smoking AFTER I found out I was pregnant and I am not smoking now.",
    NOT_DURING_AND_NOT_NOW: "I stopped smoking during pregnancy but I am smoking now.",
    NOT_DURING_AND_NOW: "I smoked during pregnancy and I am smoking now."
  }
}

export const SmokingTobaccoPregnancyInputSchema = z.object({
  smokingStatus: SmokingStatusEnum.nullable(),
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