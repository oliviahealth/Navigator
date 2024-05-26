import { z } from "zod";

// Define the schema of each row in the communication log
export const CommunicationEntrySchema = z.object({
    dateTime: z.string().min(1, "Date/Time is required"),
    method: z.string().min(1, "Communication method is required"),
    organizationPerson: z.string().min(1, "Organization/Person is required"),
    purpose: z.string().min(1, "Purpose is required"),
    notes: z.string().nullable(),
    followUpNeeded: z.string().min(1, "Required"),
});
export type ICommunicationEntry = z.infer<typeof CommunicationEntrySchema>;

// Define the overall schema of the communcation log which is an array of objects from above
export const CommunicationLogInputsSchema = z.object({
    communicationEntries: z.array(CommunicationEntrySchema),
});
export type ICommunicationLogInputs = z.infer<typeof CommunicationLogInputsSchema>;

// Response will include everything we submitted to the db plus a few extra details
export const CommunicationLogResponseSchema = CommunicationLogInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.string(),
    dateModified: z.string()
});
export type ICommunicationLogResponse = z.infer<typeof CommunicationLogResponseSchema>;