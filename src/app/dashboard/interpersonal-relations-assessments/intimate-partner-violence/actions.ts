'use server';

import { prisma } from "@/lib/prisma";
import {
  IIntimatePartnerViolenceFormInputs,
  mapFormValueToIPVStatus,
  IntimatePartnerViolenceFormResponseSchema
} from "./definitions";
import { IPVStatus } from "@prisma/client";

/**
 * Creates a new intimate partner violence form entry in the database.
 * @param {IIntimatePartnerViolenceFormInputs} ipvFormInput - The intimate partner violence form data to be created.
 * @param {string} userId - The ID of the user creating the IPV form entry.
 * @returns {Promise<IIntimatePartnerViolenceFormResponse>} A promise resolving to the created IPV form entry.
 * @throws {Error} If there's an issue creating the IPV form entry.
 */
export const createIPVFormEntry = async (ipvFormInput: IIntimatePartnerViolenceFormInputs, userId: string) => {
  const response = await prisma.intimatePartnerViolenceForm.create({
    data: {
      userId,
      physicallyHurt: mapFormValueToIPVStatus(ipvFormInput.physicallyHurt),
      insultOrTalkDown: mapFormValueToIPVStatus(ipvFormInput.insultOrTalkDown),
      threatenWithHarm: mapFormValueToIPVStatus(ipvFormInput.threatenWithHarm),
      screamOrCurse: mapFormValueToIPVStatus(ipvFormInput.screamOrCurse),
      label: ipvFormInput.label,
      notes: ipvFormInput.notes
    }
  });

  return IntimatePartnerViolenceFormResponseSchema.parse(response);
}
/**
 * Retrieves an intimate partner violence form entry from the database based on its ID and the user ID.
 * @param {string} ipvFormId - The ID of the IPV form entry to retrieve.
 * @param {string} userId - The ID of the user requesting the IPV form entry.
 * @returns {Promise<IIntimatePartnerViolenceFormResponse | null>} A promise resolving to the retrieved IPV form entry,
 * or null if no entry is found.
 * @throws {Error} If there's an issue retrieving the IPV form entry.
 */
export const readIPVFormEntry = async (ipvFormId: string, userId: string) => {
  const response = await prisma.intimatePartnerViolenceForm.findUniqueOrThrow({
    where: {
      id: ipvFormId,
      userId: userId
    },
  });

  const formattedResponse = {
    ...response,
    physicallyHurt: mapIPVStatusToFormValue(response.physicallyHurt),
    insultOrTalkDown: mapIPVStatusToFormValue(response.insultOrTalkDown),
    threatenWithHarm: mapIPVStatusToFormValue(response.threatenWithHarm),
    screamOrCurse: mapIPVStatusToFormValue(response.screamOrCurse)
  };

  return IntimatePartnerViolenceFormResponseSchema.parse(formattedResponse);
}
/**
 * Updates an intimate partner violence form entry in the database.
 * @param {IIntimatePartnerViolenceFormInputs} ipvFormInput - The updated intimate partner violence form data.
 * @param {string} ipvFormId - The ID of the IPV form entry to update.
 * @param {string} userId - The ID of the user updating the IPV form entry.
 * @returns {Promise<IIntimatePartnerViolenceFormResponse>} A promise resolving to the updated IPV form entry.
 * @throws {Error} If there's an issue updating the IPV form entry.
 */
export const updateIPVFormEntry = async (ipvFormInput: IIntimatePartnerViolenceFormInputs, ipvFormId: string, userId: string) => {
  const response = await prisma.intimatePartnerViolenceForm.update({
    where: {
      id: ipvFormId,
      userId: userId,
    },
    data: {

    },
  });

  return IntimatePartnerViolenceFormResponseSchema.parse(response);
}

const mapIPVStatusToFormValue = (status: IPVStatus): string => {
  const statusMap: Record<IPVStatus, string> = {
    [IPVStatus.Never]: "Never (1)",
    [IPVStatus.Rarely]: "Rarely (2)",
    [IPVStatus.Sometimes]: "Sometimes (3)",
    [IPVStatus.Fairly]: "Fairly (4)",
    [IPVStatus.Often]: "Often (5)",
    [IPVStatus.Frequently]: "Frequently (6)",
  };
  return statusMap[status];
};