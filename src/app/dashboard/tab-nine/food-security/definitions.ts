import { z } from "zod";

export const FoodSecurityInputsSchema = z.object({
  worryHouseholdWithoutFood: z.enum(["Yes", "No"]),
  howOftenWorryHouseholdWithoutFood: z.string().nullable(),
  pastFourWeeksFamilyDidNotEatPreferredFoodResources: z.enum(["Yes", "No"]),
  howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResources: z.string().nullable(),
  pastFourWeeksFamilyDidNotEatPreferredFoodVariety: z.enum(["Yes", "No"]),
  howOftenPastFourWeeksFamilyDidNotEatPreferredFoodVariety: z.string().nullable(),
  pastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood: z.enum(["Yes", "No"]),
  howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood: z.string().nullable()
});

export type IFoodSecurityInputs = z.infer<typeof FoodSecurityInputsSchema>;

export const FoodSecurityResponseSchema = FoodSecurityInputsSchema.extend({
    id: z.string()
});

export type IFoodSecurityFormResponse = z.infer<typeof FoodSecurityResponseSchema>;