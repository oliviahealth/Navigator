import { z } from "zod";

export const YesNoEnum = z.enum(['Yes', 'No']);

export const PrenatalCareInputsSchema = z.object({
    attendRegularVisitsWithOBCare: YesNoEnum,
    prenatalCareStartDate: z.union([z.date(), z.string().min(1, "Date required.")]),
    drivingDistanceForPrenatalCare: z.string(),
    haveMissedAppointments: z.string()
});

export type IPrenatalCareInputs = z.infer<typeof PrenatalCareInputsSchema>;

export const PrenatalCareResponseSchema = PrenatalCareInputsSchema.extend({
    id: z.string(),
    userId: z.string()
});

export type IPrenatalCareFormResponse = z.infer<typeof PrenatalCareResponseSchema>;