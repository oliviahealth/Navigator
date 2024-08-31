import { z } from "zod";

export const FoodSecurityInputsSchema = z.object({
  worryHouseholdWithoutFood: z.enum(["Yes", "No"]),
  howOftenWorryHouseholdWithoutFood: z.string().nullable(),
  pastFourWeeksFamilyDidNotEatPreferredFoodResources: z.enum(["Yes", "No"]),
  howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResources: z.string().nullable(),
  pastFourWeeksFamilyDidNotEatPreferredFoodVariety: z.enum(["Yes", "No"]),
  howOftenPastFourWeeksFamilyDidNotEatPreferredFoodVariety: z.string().nullable(),
  pastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood: z.enum(["Yes", "No"]),
  howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood: z.string().nullable(),
  label: z.string().min(1, "Label required."),
  staffNotes: z.string().min(1, "Staff notes required.")
});

export type IFoodSecurityInputs = z.infer<typeof FoodSecurityInputsSchema>;

export const FoodSecurityResponseSchema = FoodSecurityInputsSchema.extend({
  id: z.string(),
  userId: z.string(),
  dateCreated: z.date(),
  dateModified: z.date()
});

export type IFoodSecurityFormResponse = z.infer<
  typeof FoodSecurityResponseSchema
>;
