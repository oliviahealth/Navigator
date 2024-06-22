'use server';

import { prisma } from "@/lib/prisma";
import { IIntimatePartnerViolenceFormInputs } from "./definitions";
import { IPVStatus } from "@prisma/client";
import { StringifyOptions } from "querystring";

/**
 * Creates a new intimate partner violence form entry in the database.
 * @param {IIntimatePartnerViolenceFormInputs} ipvFormInput - The intimate partner violence form data to be created.
 * @param {string} userId - The ID of the user creating the IPV form entry.
 * @returns {Promise<IIntimatePartnerViolenceFormResponse>} A promise resolving to the created IPV form entry.
 * @throws {Error} If there's an issue creating the IPV form entry.
 */
export const createIPVFormEntry = async (ipvFormInput: IIntimatePartnerViolenceFormInputs, userId: string) => {
    // Create IPV form entry in the database
    const response = await prisma.intimatePartnerViolenceFormResponse.create({
        data: {
            ...ipvFormInput,
            userId,
            physicallyHurt: ipvFormInput.physicallyHurt as IPVStatus,
            insultOrTalkDown: ipvFormInput.insultOrTalkDown as IPVStatus,
            threatenWithHarm: ipvFormInput.threatenWithHarm as IPVStatus,
            screamOrCurse: ipvFormInput.screamOrCurse as IPVStatus,
        }
    });

    return response;
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
    // Retrieve IPV form entry from the database
    const response = await prisma.intimatePartnerViolenceFormResponse.findUniqueOrThrow({
        where: {
            id: ipvFormId,
            userId: userId
        },
    });

    return response;
}

/**
 * Updates an intimate partner violence form entry in the database.
 * @param {IIntimatePartnerViolenceFormInputs} ipvFormInput - The updated intimate partner violence form data.
 * @param {string} ipvFormId - The ID of the IPV form entry to update.
 * @returns {Promise<IIntimatePartnerViolenceFormResponse>} A promise resolving to the updated IPV form entry.
 * @throws {Error} If there's an issue updating the IPV form entry.
 */
export const updateIPVFormEntry = async (ipvFormInput: IIntimatePartnerViolenceFormInputs, ipvFormId: string, userId: string) => {
    // Update IPV form entry in the database
    const response = await prisma.intimatePartnerViolenceFormResponse.update({
        where: {
            id: ipvFormId,
        },
        data: {
            ...ipvFormInput,
            physicallyHurt: ipvFormInput.physicallyHurt as IPVStatus,
            insultOrTalkDown: ipvFormInput.insultOrTalkDown as IPVStatus,
            threatenWithHarm: ipvFormInput.threatenWithHarm as IPVStatus,
            screamOrCurse: ipvFormInput.screamOrCurse as IPVStatus,
        },
    });

    return response;
}