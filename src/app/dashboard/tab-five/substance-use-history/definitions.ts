import { z } from 'zod';

export const AdditionalDrugSchema = z.object({
  drug_used: z.string().min(1, 'Substance name required'),
  used_during_pregnancy: z.string().min(1, 'Field required'),
  date_last_used: z.string().min(1, 'Date required'),
  notes: z.string().nullable(),
});
export type IAdditionalDrug = z.infer<typeof AdditionalDrugSchema>;

export const SubstanceUseHistoryInputSchema = z.object({
  alcohol_ever_used: z.string().min(1, 'Field required'),
  alcohol_used_during_pregnancy: z.string().min(1, 'Field required'),
  alcohol_date_last_used: z.string().nullable(),
  alcohol_notes: z.string().nullable(),
  benzodiazepines_ever_used: z.string().min(1, 'Field required'),
  benzodiazepines_used_during_pregnancy: z.string().min(1, 'Field required'),
  benzodiazepines_date_last_used: z.string().nullable(),
  benzodiazepines_notes: z.string().nullable(),
  cocaine_ever_used: z.string().min(1, 'Field required'),
  cocaine_used_during_pregnancy: z.string().min(1, 'Field required'),
  cocaine_date_last_used: z.string().nullable(),
  cocaine_notes: z.string().nullable(),
  heroin_ever_used: z.string().min(1, 'Field required'),
  heroin_used_during_pregnancy: z.string().min(1, 'Field required'),
  heroin_date_last_used: z.string().nullable(),
  heroin_notes: z.string().nullable(),
  kush_ever_used: z.string().min(1, 'Field required'),
  kush_used_during_pregnancy: z.string().min(1, 'Field required'),
  kush_date_last_used: z.string().nullable(),
  kush_notes: z.string().nullable(),
  marijuana_ever_used: z.string().min(1, 'Field required'),
  marijuana_used_during_pregnancy: z.string().min(1, 'Field required'),
  marijuana_date_last_used: z.string().nullable(),
  marijuana_notes: z.string().nullable(),
  methamphetamine_ever_used: z.string().min(1, 'Field required'),
  methamphetamine_used_during_pregnancy: z.string().min(1, 'Field required'),
  methamphetamine_date_last_used: z.string().nullable(),
  methamphetamine_notes: z.string().nullable(),
  prescription_drugs_ever_used: z.string().min(1, 'Field required'),
  prescription_drugs_used_during_pregnancy: z.string().min(1, 'Field required'),
  prescription_drugs_date_last_used: z.string().nullable(),
  prescription_drugs_notes: z.string().nullable(),
  tobacco_ever_used: z.string().min(1, 'Field required'),
  tobacco_used_during_pregnancy: z.string().min(1, 'Field required'),
  tobacco_date_last_used: z.string().nullable(),
  tobacco_notes: z.string().nullable(),
  other_drugs: z.array(AdditionalDrugSchema).nullable(),
  notes: z.string().nullable(),
});

export type ISubstanceUseHistoryInput = z.infer<typeof SubstanceUseHistoryInputSchema>;

export const SubstanceUseHistoryResponseSchema = SubstanceUseHistoryInputSchema.extend({
  id: z.string()
});

export type ISubstanceUseHistoryResponse = z.infer<typeof SubstanceUseHistoryResponseSchema>;