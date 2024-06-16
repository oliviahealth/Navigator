"use server"

import { prisma } from "@/lib/prisma";
import { IMentalHealthHistoryInputs, IMentalHealthHistoryResponse } from "./definitions";

/**
 * Creates a new Mental Health History Record in the db.
 * @param {IMentalHealthHistoryInputs} mentalHealthHistoryInput - The Mental Health History Record Data to be created.
 * @param {string} userId - The ID of the user creating the Mental Health History Record
 * @returns {Promise<IMentalHealthHistoryResponse>} A promise resolving to the created Mental Health History Record.
 * @throws {Error} If there's an issue creating the Mental Health History Record.
 * @remarks This function takes Mental Health History Record data and saves them to the database using Prisma.
 */
export const createMentalHealthHistory = async (mentalHealthHistoryInput: IMentalHealthHistoryInputs, userId: string) => {
    const { ...data } = mentalHealthHistoryInput;

    const response = await prisma.mentalHealthHistory.create({
        data: {
            userId,
            ...data,
        },
    });

    return response;
};

/**
 * Retrieves a Mental Health History Record from the database based on its ID and the user ID.
 * @param {string} mentalHealthHistoryId - The ID of the Mental Health History Record to retrieve
 * @param {string} userId - The ID of the user request the Mental Health History Record.
 * @returns {Promise<IMentalHealthHistoryResponse | null>} A promise resolving to the retrieved Mental Health History Record,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Mental Health History Record.
 * @remarks This function retrieves a Mental Health History Record from the database using Prisma based on the provided ID and the user ID.
 */
export const readMentalHealthHistory = async (mentalHealthHistoryId: string, userId: string) => {
    const response = await prisma.mentalHealthHistory.findUniqueOrThrow({
        where: {
            userId,
            id: mentalHealthHistoryId
        },
    })

    return response
}

/**
 * Updates a Mental Health History Record in the database with new Mental Health History Record.
 * @param {IMentalHealthHistoryInputs} mentalHealthHistoryInput - An array of updated Mental Health History Recordies.
 * @param {string} id - The ID of the Mental Health History Record to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IMentalHealthHistoryResponse>} A promise resolving to the updated Mental Health History Record.
 * @throws {Error} If there's an issue updating the Mental Health History Record.
 * @remarks This function updates a Mental Health History Record in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateMentalHealthHistory = async (mentalHealthHistoryInput: IMentalHealthHistoryInputs, id: string, userId: string) => {
    const { ...data } = mentalHealthHistoryInput;

    const response = await prisma.mentalHealthHistory.update({
        where: {
            id,
            userId
        },
        data: {
            ...data
        }
    })

    return response;
}

/**
 * Deletes a Mental Health History Record from the database.
 * @param submissionId - The ID of the Mental Health History Record to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<IMentalHealthHistoryResponse>}
 * @remarks To be used by the dashboard
 */
export const deleteMentalHealthHistory = async (submissionId: string, userId: string) => {
    const response = await prisma.mentalHealthHistory.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });
    return response;
};