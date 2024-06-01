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
    clientDate: z.union([z.date(), z.string().min(1, "Date is required")]),
    guardianName: z.string().min(1, 'Guardian name is required'),
    guardianDate: z.union([z.date(), z.string().min(1, "Date is required")]),
    gcMomsName: z.string().min(1, 'GC-MOMS name is required'),
    gcMomsDate: z.union([z.date(), z.string().min(1, "Date is required")])
});
export type IEnrollmentFormInputs = z.infer<typeof EnrollmentFormInputsSchema>;

export const EnrollmentFormResponseSchema = EnrollmentFormInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IEnrollmentFormResponse = z.infer<typeof EnrollmentFormResponseSchema>