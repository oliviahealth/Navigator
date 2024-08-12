'use server';

import { prisma } from '@/lib/prisma';
import { ISmokingTobaccoPregnancyInputs, SmokingTobaccoPregnancyResponseSchema } from './definitions';
import { SmokingStatus } from '@prisma/client';

export const createSmokingTobaccoPregnancyRecord = async (input: ISmokingTobaccoPregnancyInputs, userId: string) => {
  const response = await prisma.smokingTobaccoPregnancy.create({
    data: {
      userId,
      smokingStatus: input.smokingStatus as SmokingStatus, 
      label: input.label,
      staffNotes: input.staffNotes
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

export const updateSmokingTobaccoPregnancyRecord = async (input: ISmokingTobaccoPregnancyInputs, id: string, userId: string) => {
  const response = await prisma.smokingTobaccoPregnancy.update({
    where: {
      id,
      userId,
    },
    data: {
      smokingStatus: input.smokingStatus as SmokingStatus
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