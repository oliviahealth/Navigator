import { prisma } from '@/lib/prisma';
import { SmokingTobaccoPregnancyInputs, SmokingTobaccoPregnancyResponseSchema } from './definitions';

export const createSmokingTobaccoPregnancyRecord = async (input: SmokingTobaccoPregnancyInputs, userId: string) => {
  const response = await prisma.smokingTobaccoPregnancy.create({
    data: {
      userId,
      ...input,
    },
  });

  return SmokingTobaccoPregnancyResponseSchema.parse(response);
};

export const readSmokingTobaccoPregnancyRecord = async (id: string, userId: string) => {
  const response = await prisma.smokingTobaccoPregnancy.findUniqueOrThrow({
    where: {
      id,
      userId,
    },
  });

  return SmokingTobaccoPregnancyResponseSchema.parse(response);
};

export const updateSmokingTobaccoPregnancyRecord = async (id: string, input: SmokingTobaccoPregnancyInputs, userId: string) => {
  const response = await prisma.smokingTobaccoPregnancy.update({
    where: {
      id,
      userId,
    },
    data: {
      ...input,
    },
  });

  return SmokingTobaccoPregnancyResponseSchema.parse(response);
};

export const deleteSmokingTobaccoPregnancyRecord = async (id: string, userId: string) => {
  const response = await prisma.smokingTobaccoPregnancy.deleteMany({
    where: {
      id,
      userId,
    },
  });

  return response;
};