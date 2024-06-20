import { z } from 'zod';

const MedicationSchema = z.object({
  medication: z.string().min(1, 'Medication required'),
  dose: z.string().min(1, 'Dose required'),
});

const AdditionalDrugSchema = z.object({
  drug_used: z.string().min(1, 'Substance name required'),
  used_during_pregnancy: z.string().min(1, 'Field required'),
  date_last_used: z.string().min(1, 'Date required'),
  notes: z.string().nullable(),
});

export const SubstanceUseHistorySchema = z.object({
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
  mat_engaged: z.string().min(1, 'MAT engaged required'),
  date_used_mat: z.string().nullable(),
  medications: z.array(MedicationSchema),
  mat_clinic_name: z.string().nullable(),
  mat_clinic_phone: z.string().nullable(),
  used_addiction_medicine_services: z.string().min(1, 'This field is required'),
  date_used_medicine_service: z.string().nullable(),
  addiction_medicine_clinic: z.string().nullable(),
  addiction_medicine_clinic_phone: z.string().nullable(),
});

export type ISubstanceUseHistory = z.infer<typeof SubstanceUseHistorySchema>;

export const SubstanceUseHistoryResponseSchema = SubstanceUseHistorySchema.extend({
  id: z.string(),
});

export type ISubstanceUseHistoryResponse = z.infer<typeof SubstanceUseHistoryResponseSchema>;