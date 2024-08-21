'use server';

import { prisma } from "@/lib/prisma";
import { ISupportSystemInputs, SupportSystemsResponseSchema } from "./definitions";

/**
 * Creates a new Support Systems Record in the db.
 * @param {ISupportSystemInputs} SupportSystemsInput - The Support Systems Record Data to be created.
 * @param {string} userId - The ID of the user creating the Support Systems Record
 * @returns {Promise<ISupportSystemsResponse>} A promise resolving to the created Support Systems record.
 * @throws {Error} If there's an issue creating the Support Systems record.
 * @remarks This function takes Support Systems record data and saves them to the database using Prisma.
 */
export const createSupportSystems = async (SupportSystemsInput: ISupportSystemInputs, userId: string) => {

    const response = await prisma.supportSystemsForm.create({
        data: {
            userId,
            ...SupportSystemsInput,
        },
    });

    return SupportSystemsResponseSchema.parse(response);
};

/**
 * Retrieves a Support Systems record from the database based on its ID and the user ID.
 * @param {string} SupportSystemsId - The ID of the Support Systems Record to retrieve
 * @param {string} userId - The ID of the user request the Support Systems Record.
 * @returns {Promise<ISupportSystemsResponse | null>} A promise resolving to the retrieved Support Systems Record,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Support Systems Record.
 * @remarks This function retrieves a Support Systems Record from the database using Prisma based on the provided ID and the user ID.
 */
export const readSupportSystems = async (SupportSystemsId: string, userId: string) => {
    const response = await prisma.supportSystemsForm.findUniqueOrThrow({
        where: {
            userId,
            id: SupportSystemsId
        },
    })

    return SupportSystemsResponseSchema.parse(response);
}

export const readAllSupportSystems = async (userId: string) => {
    const response = await prisma.communicationLog.findMany({
        where: {
            userId
        }
    });

    return response.map(log => SupportSystemsResponseSchema.parse(log));
}

/**
 * Updates a Support Systems Record in the database with new Support Systems Record.
 * @param {ISupportSystemInputs} SupportSystemsInput - An array of updated Support Systems Recordies.
 * @param {string} id - The ID of the Support Systems Record to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<ISupportSystemsResponse>} A promise resolving to the updated Support Systems Record.
 * @throws {Error} If there's an issue updating the Support Systems Record.
 * @remarks This function updates a Support Systems Record in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateSupportSystems = async (SupportSystemsInput: ISupportSystemInputs, id: string, userId: string) => {

    const response = await prisma.supportSystemsForm.update({
        where: {
            id,
            userId
        },
        data: {
            ...SupportSystemsInput
        }
    })

    return SupportSystemsResponseSchema.parse(response);
}

/**
 * Deletes a Support Systems Record from the database.
 * @param submissionId - The ID of the Support Systems Record to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<ICommunicationLogResponse>}
 * @remarks To be used by the dashboard
 */
export const deleteSupportSystems = async (submissionId: string, userId: string) => {
    const response = await prisma.supportSystemsForm.delete({
        where: {
            id: submissionId,
            userId: userId
        }
    });

    return SupportSystemsResponseSchema.parse(response);
};