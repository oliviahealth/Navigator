'use server';

import { prisma } from '@/lib/prisma';
import { SubstanceUseHistory, SubstanceUseHistorySchema } from './definitions';

export const createSubstanceUseHistoryRecord = async (input: SubstanceUseHistory) => {
  const { dateLastUsed, ...rest } = input;
  const dateLastUsedAsDate = dateLastUsed ? new Date(dateLastUsed) : null;

  const response = await prisma.substanceUseHistory.create({
    data: {
      ...rest,
      dateLastUsed: dateLastUsedAsDate,
    },
  });

  return SubstanceUseHistorySchema.parse(response);
};

export const readSubstanceUseHistoryRecord = async (id: string, userId: string) => {
  const response = await prisma.substanceUseHistory.findUniqueOrThrow({
    where: {
      id,
      userId,
    },
  });

  return SubstanceUseHistorySchema.parse(response);
};

export const updateSubstanceUseHistoryRecord = async (id: string, input: SubstanceUseHistory) => {
  const { dateLastUsed, ...rest } = input;
  const dateLastUsedAsDate = dateLastUsed ? new Date(dateLastUsed) : null;

  const response = await prisma.substanceUseHistory.update({
    where: {
      id,
    },
    data: {
      ...rest,
      dateLastUsed: dateLastUsedAsDate,
    },
  });

  return SubstanceUseHistorySchema.parse(response);
};

export const deleteSubstanceUseHistoryRecord = async (id: string) => {
  const response = await prisma.substanceUseHistory.delete({
    where: {
      id,
    },
  });

  return response;
};