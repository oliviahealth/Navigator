'use server';

import { prisma } from "@/lib/prisma";
import {
  MultidimensionalScaleInputs,
  MultidimensionalScaleResponseSchema,
} from "./definitions";

const parseFormInput = (formInput: MultidimensionalScaleInputs) => ({
  ...formInput,
  participantId: Number(formInput.participantId),
});

export const createNewMultidimensionalScaleEntry = async (formInput: MultidimensionalScaleInputs, userId: string) => {
  if (!userId) {
    throw new Error("Missing submissionId");
  }
  const parsedInput = parseFormInput(formInput);
  const response = await prisma.multidimensionalScale.create({
    data: {
      userId,
      ...parsedInput,
    }
  });
  return MultidimensionalScaleResponseSchema.parse(response);
}

export const updateMultidimensionalScaleEntry = async (formInput: MultidimensionalScaleInputs, formId: string, userId: string) => {
  if (!formId) {
    throw new Error("Missing submissionId");
  }

  const parsedInput = parseFormInput(formInput);
  const response = await prisma.multidimensionalScale.update({
    where: {
      id: formId,
      userId: userId,
    },
    data: parsedInput,
  });
  return MultidimensionalScaleResponseSchema.parse(response);
}

export const readMultidimensionalScaleEntry = async (formId: string, userId: string) => {
  if (!formId) {
    throw new Error("Missing submissionId");
  }

  const response = await prisma.multidimensionalScale.findUniqueOrThrow({
    where: {
      id: formId,
      userId: userId
    },
  });
  return MultidimensionalScaleResponseSchema.parse(response);
}
