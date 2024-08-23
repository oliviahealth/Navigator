'use server';

import { prisma } from '@/lib/prisma';
import { ISmokingTobaccoPregnancyInputs, SmokingTobaccoPregnancyResponseSchema } from './definitions';

export const createSmokingTobaccoPregnancyRecord = async (input: ISmokingTobaccoPregnancyInputs, userId: string) => {
  const response = await prisma.smokingTobaccoPregnancy.create({
    data: {
      userId,
      ...input
    },
  });

  return SmokingTobaccoPregnancyResponseSchema.parse(response);
};

export const readSmokingTobaccoPregnancyRecord = async (SmokingTobaccoPregnancyRecordId: string, userId: string) => {
  const response = await prisma.smokingTobaccoPregnancy.findUniqueOrThrow({
    where: {
      userId,
      id: SmokingTobaccoPregnancyRecordId,
    },
  });

  return SmokingTobaccoPregnancyResponseSchema.parse(response);
};

export const readAllSmokingTobaccoPregnancyRecords = async (userId: string) => {
  const response = await prisma.smokingTobaccoPregnancy.findMany({
    where: {
      userId,
    },
  });

  return response.map(log => SmokingTobaccoPregnancyResponseSchema.parse(log));
}

export const updateSmokingTobaccoPregnancyRecord = async (input: ISmokingTobaccoPregnancyInputs, SmokingTobaccoPregnancyRecordId: string, userId: string) => {

  const response = await prisma.smokingTobaccoPregnancy.update({
    where: {
      id: SmokingTobaccoPregnancyRecordId,
      userId,
    },
    data: {
      ...input
    }
  });

  return SmokingTobaccoPregnancyResponseSchema.parse(response);
}

export const deleteSmokingTobaccoPregnancyRecord = async (submissionId: string, userId: string) => {
  const response = await prisma.smokingTobaccoPregnancy.delete({
    where: {
      id: submissionId,
      userId,
    },
  });

  return response;
};