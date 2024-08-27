'use server';

import { prisma } from "@/lib/prisma";
import { IIntimatePartnerViolenceFormInputs, IntimatePartnerViolenceFormResponseSchema } from "./definitions";
import { IPVStatus } from "@prisma/client";

/**
 * Creates a new intimate partner violence form entry in the database.
 * @param {IIntimatePartnerViolenceFormInputs} ipvFormInput - The intimate partner violence form data to be created.
 * @param {string} userId - The ID of the user creating the IPV form entry.
 * @returns {Promise<IIntimatePartnerViolenceFormResponse>} A promise resolving to the created IPV form entry.
 * @throws {Error} If there's an issue creating the IPV form entry.
 */
export const createIPVForm = async (intimatePartnerViolenceFormInput: IIntimatePartnerViolenceFormInputs, userId: string) => {
  const response = await prisma.intimatePartnerViolenceForm.create({
    data: {
      userId,
      ...intimatePartnerViolenceFormInput
    }
  });

  return IntimatePartnerViolenceFormResponseSchema.parse(response);
}
/**
 * Retrieves an intimate partner violence form entry from the database based on its ID and the user ID.
 * @param {string} id - The ID of the IPV form entry to retrieve.
 * @param {string} userId - The ID of the user requesting the IPV form entry.
 * @returns {Promise<IIntimatePartnerViolenceFormResponse | null>} A promise resolving to the retrieved IPV form entry,
 * or null if no entry is found.
 * @throws {Error} If there's an issue retrieving the IPV form entry.
 */
export const readIPVForm = async (id: string, userId: string) => {
  const response = await prisma.intimatePartnerViolenceForm.findUniqueOrThrow({
    where: {
      id,
      userId
    },
  });

  return IntimatePartnerViolenceFormResponseSchema.parse(response);
}

export const readAllIPVForms = async (userId: string) => {
  const response = await prisma.intimatePartnerViolenceForm.findMany({
    where: {
      userId
    },
  });

  return response.map(log => IntimatePartnerViolenceFormResponseSchema.parse(log));
}

/**
 * Updates an intimate partner violence form entry in the database.
 * @param {IIntimatePartnerViolenceFormInputs} intimatePartnerViolenceFormInput - The updated intimate partner violence form data.
 * @param {string} id - The ID of the IPV form entry to update.
 * @param {string} userId - The ID of the user updating the IPV form entry.
 * @returns {Promise<IIntimatePartnerViolenceFormResponse>} A promise resolving to the updated IPV form entry.
 * @throws {Error} If there's an issue updating the IPV form entry.
 */
export const updateIPVForm = async (intimatePartnerViolenceFormInput: IIntimatePartnerViolenceFormInputs, id: string, userId: string) => {
  const response = await prisma.intimatePartnerViolenceForm.update({
    where: {
      id,
      userId
    },
    data: {
      ...intimatePartnerViolenceFormInput
    },
  });

  return IntimatePartnerViolenceFormResponseSchema.parse(response);
}

export const deleteIPVForm = async (id: string, userId: string) => {
  const response = await prisma.intimatePartnerViolenceForm.delete({
    where: {
      id,
      userId,
    }
  });
  return response;
};