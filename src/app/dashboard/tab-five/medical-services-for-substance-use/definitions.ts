import { z } from 'zod';

export const MedicationSchema = z.object({
  medication: z.string().min(1, 'Medication required'),
  dose: z.string().min(1, 'Dose required'),
});
export type IMedication = z.infer<typeof MedicationSchema>;

export const MedicalServicesSubstanceUseInputsSchema = z.object({
  mat_engaged: z.string().min(1, 'MAT engaged required'),
  date_used_mat: z.string().nullable(),
  medications: z.array(MedicationSchema),
  mat_clinic_name: z.string().nullable(),
  mat_clinic_phone: z.string().nullable(),
  used_addiction_medicine_services: z.string().min(1, 'This field is required'),
  date_used_medicine_service: z.string().nullable(),
  addiction_medicine_clinic: z.string().nullable(),
  addiction_medicine_clinic_phone: z.string().nullable()
});
export type IMedicalServicesSubstanceUseInputs = z.infer<typeof MedicalServicesSubstanceUseInputsSchema>;

export const MedicalServicesSubstanceUseResponseSchema = MedicalServicesSubstanceUseInputsSchema.extend({
  id: z.string(),
  userId: z.string(),
});
export type IMedicalServicesSubstanceUseResponse = z.infer<typeof MedicalServicesSubstanceUseResponseSchema>;