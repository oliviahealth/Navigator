import { z } from 'zod';

export const YesNoEnum = z.enum(["Yes", "No"]);

export const AdditionalDrugSchema = z.object({
  drug_used: z.string().min(1, 'Substance name required'),
  used_during_pregnancy: YesNoEnum.nullish().refine(val => val, { message: 'Required' }),
  date_last_used: z.union([z.date(), z.string().min(1, "Date last used is required")]),
  notes: z.string().nullable(),
});
export type IAdditionalDrug = z.infer<typeof AdditionalDrugSchema>;

export const SubstanceUseHistoryInputSchema = z.object({
  alcohol_ever_used: YesNoEnum,
  alcohol_used_during_pregnancy: YesNoEnum.nullish(),
  alcohol_date_last_used: z.union([z.date(), z.string().min(1, "Date last used is required")]).nullish(),
  alcohol_notes: z.string().nullish(),
  benzodiazepines_ever_used: YesNoEnum,
  benzodiazepines_used_during_pregnancy: YesNoEnum.nullish(),
  benzodiazepines_date_last_used: z.union([z.date(), z.string().min(1, "Date last used is required")]).nullish(),
  benzodiazepines_notes: z.string().nullish(),
  cocaine_ever_used: YesNoEnum,
  cocaine_used_during_pregnancy: YesNoEnum.nullish(),
  cocaine_date_last_used: z.union([z.date(), z.string().min(1, "Date last used is required")]).nullish(),
  cocaine_notes: z.string().nullable(),
  heroin_ever_used: YesNoEnum,
  heroin_used_during_pregnancy: YesNoEnum.nullish(),
  heroin_date_last_used: z.union([z.date(), z.string().min(1, "Date last used is required")]).nullish(),
  heroin_notes: z.string().nullable(),
  kush_ever_used: YesNoEnum,
  kush_used_during_pregnancy: YesNoEnum.nullish(),
  kush_date_last_used: z.union([z.date(), z.string().min(1, "Date last used is required")]).nullish(),
  kush_notes: z.string().nullable(),
  marijuana_ever_used: YesNoEnum,
  marijuana_used_during_pregnancy: YesNoEnum.nullish(),
  marijuana_date_last_used: z.union([z.date(), z.string().min(1, "Date last used is required")]).nullish(),
  marijuana_notes: z.string().nullable(),
  methamphetamine_ever_used: YesNoEnum,
  methamphetamine_used_during_pregnancy: YesNoEnum.nullish(),
  methamphetamine_date_last_used: z.union([z.date(), z.string().min(1, "Date last used is required")]).nullish(),
  methamphetamine_notes: z.string().nullable(),
  prescription_drugs_ever_used: YesNoEnum,
  prescription_drugs_used_during_pregnancy: YesNoEnum.nullish(),
  prescription_drugs_date_last_used: z.union([z.date(), z.string().min(1, "Date last used is required")]).nullish(),
  prescription_drugs_notes: z.string().nullish(),
  tobacco_ever_used: YesNoEnum,
  tobacco_used_during_pregnancy: YesNoEnum.nullish(),
  tobacco_date_last_used: z.union([z.date(), z.string().min(1, "Date last used is required")]).nullish(),
  tobacco_notes: z.string().nullish(),
  other_drugs: z.array(AdditionalDrugSchema),
  notes: z.string().nullable(),
});

export type ISubstanceUseHistoryInput = z.infer<typeof SubstanceUseHistoryInputSchema>;

export const SubstanceUseHistoryResponseSchema = SubstanceUseHistoryInputSchema.extend({
  id: z.string(),
  userId: z.string(),
  dateCreated: z.date(),
  dateModified: z.date()
});

export type ISubstanceUseHistoryResponse = z.infer<typeof SubstanceUseHistoryResponseSchema>;