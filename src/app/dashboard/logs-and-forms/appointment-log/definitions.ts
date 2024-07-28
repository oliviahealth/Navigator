import { z } from "zod";

// Define the schema of each row in the appointment log
const AppointmentEntrySchema = z.object({
    dateTime: z.union([z.date(), z.string().min(1, "Date/Time is required")]),
    who: z.string().min(1, "Who is required"),
    location: z.string().min(1, "Location is required"),
    notes: z.string().nullable(),
});
export type IAppointmentEntry = z.infer<typeof AppointmentEntrySchema>;

// Define the overall schema of the appointment log which is an array of objects from above
export const AppointmentLogInputsSchema = z.object({appointmentEntries: z.array(AppointmentEntrySchema)});
export type IAppointmentLogInputs = z.infer<typeof AppointmentLogInputsSchema>;

// Response will include everything we submitted to the db plus a few extra details
export const AppointmentLogResponseSchema = AppointmentLogInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IAppointmentLogResponse = z.infer<typeof AppointmentLogResponseSchema>;