import { z } from "zod";

export const MediaReleaseFormInputSchema = z.object({
    participantName: z.string().min(1, "Participant Name is required"),
    // added participant age as if participant is under 18 years old, legal guardian name is required and will pop up on form
    // tranforms string into integer and checks if it is a number and greater than 1
    participantAge: z
        .string()
        .transform((val) => parseInt(val, 10))
        .refine((age) => !isNaN(age) && age >= 1, {
            message:
                "Participant Age is required and should be a number greater than 0",
            path: ["participantAge"],
        }),
    date: z.union([z.date(), z.string().min(1, "Date is required")]),
    // make optional in case user is over the age of 18
    legalGuardianName: z
        .string()
        .min(1, "Legal Guardian Name is required")
        .nullish(),
});
export type IMediaReleaseFormInput = z.infer<typeof MediaReleaseFormInputSchema>;

export const MediaReleaseFormResponseSchema = MediaReleaseFormInputSchema.omit({ participantAge: true }).extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IMediaReleaseFormResponse = z.infer<typeof MediaReleaseFormResponseSchema>;
