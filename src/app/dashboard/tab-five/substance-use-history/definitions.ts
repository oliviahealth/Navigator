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

export const SubstanceUseHistorySchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    substance: SubstanceSchema,
    everUsed: z.boolean(),
    usedDuringPregnancy: z.boolean(),
    dateLastUsed: z.date().nullable(),
  });

export type SubstanceUseHistory = z.infer<typeof SubstanceUseHistorySchema>;