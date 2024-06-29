import { z } from "zod";

export const ScreeningToolEnum = z.enum([
  "HITS",
  "WAST",
  "PVS",
  "AAS",
  "HARK",
  // Add other screening tools as needed
]);

export const IPVDisclosureScreeningToolSchema = z.object({
  dateTaken: z.date({
    required_error: "Date taken is required",
  }),
  ipvScreeningDate: z.date().optional(),
  screeningToolUsed: ScreeningToolEnum,
  totalScore: z.number().int().min(0, "Total score must be a non-negative integer"),
  ipvDisclosure: z.string(),
  ipvDisclosureDate: z.date().optional(),
  notes: z.string().optional(),
});

export type IIPVDisclosureScreeningTool = z.infer<typeof IPVDisclosureScreeningToolSchema>;

export const mapBooleanToString = (value: boolean): string => {
  return value ? "Yes" : "No";
};