import { z } from 'zod';

export const SubstanceSchema = z.enum([
  'ALCOHOL',
  'AMPHETAMINES',
  'BENZODIAZEPINES',
  'CANNABIS',
  'COCAINE',
  'HEROIN',
  'KUSH',
  'PRESCRIPTION_DRUGS',
  'TOBACCO',
  'OTHER',
]);


export const SubstanceUseHistoryInputsSchema = z.object({
  userId: z.string(),
  substance: SubstanceSchema,
  everUsed: z.boolean(),
  usedDuringPregnancy: z.boolean(),
  dateLastUsed: z.string().nullable().optional(),
});

export type ISubstanceUseHistoryInputs = z.infer<typeof SubstanceUseHistoryInputsSchema>;

export const SubstanceUseHistoryResponseSchema = SubstanceUseHistoryInputsSchema.extend({
  id: z.string()
});

export type ISubstanceUseHistoryResponse = z.infer<typeof SubstanceUseHistoryResponseSchema>;

export const SubstanceUseHistoryUpdateInputSchema = z.object({
  userId: z.string().optional(),
  substance: SubstanceSchema.optional(),
  everUsed: z.boolean().optional(),
  usedDuringPregnancy: z.boolean().optional(),
  dateLastUsed: z.string().nullable().optional(),
});

export type ISubstanceUseHistoryUpdateInput = z.infer<typeof SubstanceUseHistoryUpdateInputSchema>;

export const SubstanceUseHistoryWhereUniqueInputSchema = z.object({
  id: z.string(),
});

export type ISubstanceUseHistoryWhereUniqueInput = z.infer<typeof SubstanceUseHistoryWhereUniqueInputSchema>;