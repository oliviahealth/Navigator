import { z } from "zod";

export const EnrollmentEmergencyContactsSchema = z.object({
  name: z.string().min(1, "Emergency Name is required"),
  phone: z.string().min(1, "Emergency Phone is required"),
  relationship: z.string().min(1, "Relationship to patient is required"),
  email: z.string().email().min(1, "Emergency Email is required"),
})
export type IEnrollmentEmergencyContact = z.infer<typeof EnrollmentEmergencyContactsSchema>;

export const EnrollmentFormInputsSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "Zip is required"),
  homePhone: z.string().min(1, "Home phone is required"),
  cellPhone: z.string().min(1, "Cell phone is required"),
  email: z.string().email().min(1, "Email is required"),
  dateOfBirth: z.union([z.date(), z.string().min(1, "Date of Birth is required")]),
  emergencyContacts: z.array(EnrollmentEmergencyContactsSchema),
  clientName: z.string().min(1, 'Client name is required'),
  clientAge: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((age) => !isNaN(age) && age >= 1, {
      message:
        "Client Age is required and should be a number greater than 0",
      path: ["clientAge"],
    }),
  clientDate: z.union([z.date(), z.string().min(1, "Date is required")]),
  guardianName: z.string().nullish(),
  guardianDate: z.union([z.date(), z.string()]).nullish(),
  gcMomsName: z.string().min(1, 'GC-MOMS name is required'),
  gcMomsDate: z.union([z.date(), z.string().min(1, "Date is required")]),
  label: z.string().min(1, "Label required."),
  staffNotes: z.string().min(1, "Staff notes required.")
});
export type IEnrollmentFormInputs = z.infer<typeof EnrollmentFormInputsSchema>;

export const EnrollmentFormResponseSchema = EnrollmentFormInputsSchema.omit({ clientAge: true }).extend({
  id: z.string(),
  userId: z.string(),
  dateCreated: z.date(),
  dateModified: z.date()
});
export type IEnrollmentFormResponse = z.infer<typeof EnrollmentFormResponseSchema>