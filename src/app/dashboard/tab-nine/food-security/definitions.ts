import { z } from "zod";

export const FoodSecurityInputsSchema = z.object({
  worryHouseholdWithoutFood: z.string(),
  howOftenWorryHouseholdWithoutFood: z.string(),
  pastFourWeeksFamilyDidNotEatPreferredFoodResources: z.string(),
  howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResources: z.string(),
  pastFourWeeksFamilyDidNotEatPreferredFoodVariety: z.string(),
  howOftenPastFourWeeksFamilyDidNotEatPreferredFoodVariety: z.string(),
  pastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood: z.string(),
  howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood: z.string()
});

export type IFoodSecurityInputs = z.infer<typeof FoodSecurityInputsSchema>;

export const FoodSecurityResponseSchema = FoodSecurityInputsSchema.extend({
    id: z.string()
});

export type IFoodSecurityFormResponse = z.infer<typeof FoodSecurityResponseSchema>;
