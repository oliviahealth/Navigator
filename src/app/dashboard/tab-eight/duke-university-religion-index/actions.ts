'use server';

import { prisma } from "@/lib/prisma";
import { IDukeUniversityReligionIndexInputs, IDukeUniversityReligionIndexResponse } from "./definitions";

/**
 * Creates a new Duke University Religion Index Record in the db.
 * @param {IDukeUniversityReligionIndexInputs} dukeUniversityReligionIndexInput - The Duke University Religion Index Record Data to be created.
 * @param {string} userId - The ID of the user creating the Duke University Religion Index Record
 * @returns {Promise<IDukeUniversityReligionIndexResponse>} A promise resolving to the created Duke University Religion Index Record.
 * @throws {Error} If there's an issue creating the Duke University Religion Index Record.
 * @remarks This function takes Duke University Religion Index Record data and saves them to the database using Prisma.
 */
export const createDukeUniversityReligionIndex = async (dukeUniversityReligionIndexInput: IDukeUniversityReligionIndexInputs, userId: string) => {
    const { ...data } = dukeUniversityReligionIndexInput;

    const response = await prisma.dukeUniversityReligionIndex.create({
        data: {
            userId,
            ...data
        },
    });

    return response;
};

/**
 * Retrieves a Duke University Religion Index Record from the database based on its ID and the user ID.
 * @param {string} dukeUniversityReligionIndexId - The ID of the Duke University Religion Index Record to retrieve
 * @param {string} userId - The ID of the user request the Duke University Religion Index Record.
 * @returns {Promise<IdukeUniversityReligionIndexResponse | null>} A promise resolving to the retrieved Duke University Religion Index Record,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Duke University Religion Index Record.
 * @remarks This function retrieves a Duke University Religion Index Record from the database using Prisma based on the provided ID and the user ID.
 */
export const readDukeUniversityReligionIndex = async (dukeUniversityReligionIndexId: string, userId: string) => {
    const response = await prisma.dukeUniversityReligionIndex.findUniqueOrThrow({
        where: {
            userId,
            id: dukeUniversityReligionIndexId
        },
    })

    return response;
}

/**
 * Updates a Duke University Religion Index Record in the database with new Duke University Religion Index Record.
 * @param {IdukeUniversityReligionIndexInputs} dukeUniversityReligionIndexInput - An array of updated Duke University Religion Index Recordies.
 * @param {string} id - The ID of the Duke University Religion Index Record to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IdukeUniversityReligionIndexResponse>} A promise resolving to the updated Duke University Religion Index Record.
 * @throws {Error} If there's an issue updating the Duke University Religion Index Record.
 * @remarks This function updates a Duke University Religion Index Record in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updatedukeUniversityReligionIndex = async (dukeUniversityReligionIndexInput: IDukeUniversityReligionIndexInputs, id: string, userId: string) => {
    const { ...data } = dukeUniversityReligionIndexInput;

    const response = await prisma.dukeUniversityReligionIndex.update({
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
 * Deletes a Duke University Religion Index Record from the database.
 * @param submissionId - The ID of the Duke University Religion Index Record to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<IdukeUniversityReligionIndexResponse>}
 * @remarks To be used by the dashboard
 */
export const deletedukeUniversityReligionIndex = async (submissionId: string, userId: string) => {
    const response = await prisma.dukeUniversityReligionIndex.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });
    return response;
};