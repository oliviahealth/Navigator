import { z } from "zod"

export const EmergencyContactsSchema = z.object({
    emergencyname: z.string().min(1, "Emergency Name is required"),
    emergencyphone: z.string().min(1, "Emergency Phone is required"),
    emergencyrelationship: z
        .string()
        .min(1, "Relationship to patient is required"),
    emergencyemail: z.string().min(1, "Emergency Email is required"),
})
export type IEmergencyContact = z.infer<typeof EmergencyContactsSchema>

export const EnrollmentLogInputsSchema = z.object({
    firstname: z.string().min(1, "First Name is required"),
    lastname: z.string().min(1, "Last Name is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Zip is required"),
    phone: z.string().min(1, "Phone is required"),
    email: z.string().min(1, "Email is required"),
    datebirth: z.string().min(1, "Date of Birth is required"),
    emergencyContacts: z.array(EmergencyContactsSchema)
});
export type IEnrollmentLogInputs = z.infer<typeof EnrollmentLogInputsSchema>;

export const EnrollmentLogResponseSchema = EnrollmentLogInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type EnrollmentLogResponse = z.infer<typeof EnrollmentLogResponseSchema>