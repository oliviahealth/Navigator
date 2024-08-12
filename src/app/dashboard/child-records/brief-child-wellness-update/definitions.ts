import { z } from "zod";

export const TimeframeEnum = z.enum([
    "Enrollment",
    "Update"
]);

export const HealthInsuranceEnum = z.enum([
    "Medicaid_or_Kidcare",
    "Private",
    "Tricare",
    "None",
    "Other"
]);

export const MedicalCareEnum = z.enum([
    "Doctor_office",
    "Hospital_emergency_room",
    "Hospital_clinic",
    "Qualified_health_center",
    "Retail_or_Minute_clinic",
    "None",
    "Other"
]);

export const YesNoEnum = z.enum(["Yes", "No"]);

export const ReadingFrequencyEnum = z.enum(["Some_days", "Everyday"]);

export const labelMapping = {
    healthInsurance: {
        Medicaid_or_Kidcare: "Medicaid or Texas KidCare",
        Private: "Private health insurance",
        Tricare: "Tri-Care",
        None: "No health insurance",
        Other: "Other"
    },
    medicalCare: {
        Doctor_office: "Doctor’s/Nurse Practitioner’s Office",
        Hospital_emergency_room: "Hospital Emergency Room",
        Hospital_clinic: "Hospital Clinic",
        Qualified_health_center: "Federally Qualified Health Center",
        Retail_or_Minute_clinic: "Retail Store or Minute Clinic",
        None: "No usual source of care",
        Other: "Other"
    },
    readingFrequency: {
        Some_days: "Some days",
        Everyday: "Everyday"
    }
};

export const BriefChildWellnessUpdateInputsSchema = z.object({
    childName: z.string().min(1, "Child name required."),
    dateCompleted: z.union([z.date(), z.string().min(1, "Date completed required")]),
    timeframe: TimeframeEnum,
    healthInsurance: HealthInsuranceEnum,
    otherHealthInsurance: z.string().nullable(),
    medicalCare: MedicalCareEnum,
    otherMedicalCare: z.string().nullable(),
    hasDentalCare: YesNoEnum,
    readingFrequency: ReadingFrequencyEnum,
    label: z.string().min(1, "Label required."),
    staffNotes: z.string().min(1, "Staff notes required.")
});
export type IBriefChildWellnessUpdateInputs = z.infer<typeof BriefChildWellnessUpdateInputsSchema>;

export const BriefChildWellnessUpdateResponseSchema = BriefChildWellnessUpdateInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IBriefChildWellnessUpdateResponse = z.infer<typeof BriefChildWellnessUpdateResponseSchema>;