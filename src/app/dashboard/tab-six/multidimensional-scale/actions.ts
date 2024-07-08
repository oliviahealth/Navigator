'use server';

import { prisma } from "@/lib/prisma";
import {
  INewAssessmentFormInputs,
  NewAssessmentFormResponseSchema,
} from "./definitions";

const parseFormInput = (formInput: INewAssessmentFormInputs) => ({
  ...formInput,
  participantId: Number(formInput.participantId),
});

export const createNewAssessmentFormEntry = async (formInput: INewAssessmentFormInputs, userId: string) => {
  if (!userId) {
    throw new Error("Missing submissionId");
  }
  const parsedInput = parseFormInput(formInput);
  const response = await prisma.newAssessmentForm.create({
    data: {
      userId,
      ...parsedInput,
    }
  });
  return NewAssessmentFormResponseSchema.parse(response);
}

export const updateNewAssessmentFormEntry = async (formInput: INewAssessmentFormInputs, formId: string, userId: string) => {
  if (!formId) {
    throw new Error("Missing submissionId");
  }

  const parsedInput = parseFormInput(formInput);
  const response = await prisma.newAssessmentForm.update({
    where: {
      id: formId,
      userId: userId,
    },
    data: parsedInput,
  });
  return NewAssessmentFormResponseSchema.parse(response);
}

export const readNewAssessmentFormEntry = async (formId: string, userId: string) => {
  if (!formId) {
    throw new Error("Missing submissionId");
  }

  const response = await prisma.newAssessmentForm.findUniqueOrThrow({
    where: {
      id: formId,
      userId: userId
    },
  });
  return NewAssessmentFormResponseSchema.parse(response);
}
