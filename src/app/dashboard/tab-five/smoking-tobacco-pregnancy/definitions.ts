import { z } from 'zod';

export const TobaccoUseScreeningAndDocumentationSchema = z.enum(['NEVER_SMOKED', 'STOPPED_BEFORE_PREGNANCY', 'STOPPED_AFTER_PREGNANCY', 'STOPPED_DURING_PREGNANCY_BUT_SMOKING_NOW', 'SMOKED_DURING_PREGNANCY_AND_SMOKING_NOW']);

export type TobaccoUseScreeningAndDocumentation = z.infer<typeof TobaccoUseScreeningAndDocumentationSchema>;

export const SmokingTobaccoPregnancySchema = z.object({
  drugsOtherThanMedicines: z.enum(['Yes', 'No']),
  abuseMoreThanOneDrug: z.enum(['Yes', 'No']),
  ableToStopUsingDrugs: z.enum(['Yes', 'No']),
  haveBlackoutsFlashbacksFromDrugs: z.enum(['Yes', 'No']),
  guiltFromDrugUse: z.enum(['Yes', 'No']),
  spouseParentsComplainAboutUsage: z.enum(['Yes', 'No']),
  neglectedFamily: z.enum(['Yes', 'No']),
  illegalActivitiesToObtainDrugs: z.enum(['Yes', 'No']),
  withdrawalsWhenStoppedDrugs: z.enum(['Yes', 'No']),
  medicalProblemsFromUsage: z.enum(['Yes', 'No']),
  tobaccoUseScreeningAndDocumentation: TobaccoUseScreeningAndDocumentationSchema,
});

export type SmokingTobaccoPregnancyInputs = z.infer<typeof SmokingTobaccoPregnancySchema>;

export const SmokingTobaccoPregnancyResponseSchema = SmokingTobaccoPregnancySchema.extend({
  id: z.string(),
});

export type SmokingTobaccoPregnancyResponse = z.infer<typeof SmokingTobaccoPregnancyResponseSchema>;