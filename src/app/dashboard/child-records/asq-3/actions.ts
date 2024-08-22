'use server';

import { prisma } from "@/lib/prisma";
import { ASQ3ResponseSchema, IASQ3Inputs, IASQ3Response, } from "./definitions";
import ASQ3 from "./[...action]/page";

/**
 * Creates a new ASQ-3 Record in the db.
 * @param {IASQ3Inputs} asq3Input - The ASQ-3 Record Data to be created.
 * @param {string} userId - The ID of the user creating the ASQ-3 Record
 * @returns {Promise<IASQ3Response>} A promise resolving to the created ASQ-3 record.
 * @throws {Error} If there's an issue creating the ASQ-3 record.
 * @remarks This function takes ASQ-3 record data and saves them to the database using Prisma.
 */
export const createASQ3 = async (asq3Input: IASQ3Inputs, userId: string) => {

    const response = await prisma.aSQ3.create({
        data: {
            userId,
            ...asq3Input,
        },
    });

    return ASQ3ResponseSchema.parse(response);
};

/**
 * Retrieves a ASQ-3 record from the database based on its ID and the user ID.
 * @param {string} asq3Id - The ID of the ASQ-3 Record to retrieve
 * @param {string} userId - The ID of the user request the ASQ-3 Record.
 * @returns {Promise<IASQ3Response | null>} A promise resolving to the retrieved ASQ-3 Record,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the ASQ-3 Record.
 * @remarks This function retrieves a ASQ-3 Record from the database using Prisma based on the provided ID and the user ID.
 */
export const readASQ3 = async (asq3Id: string, userId: string) => {
    const response = await prisma.aSQ3.findUniqueOrThrow({
        where: {
            userId,
            id: asq3Id
        },
    })

    return ASQ3ResponseSchema.parse(response);
}

export const readAllASQ3 = async (userId: string) => {
    const response = await prisma.aSQ3.findMany({
        where: {
            userId
        }
    });
    return response.map(form => ASQ3ResponseSchema.parse(form));
}

/**
 * Updates a ASQ-3 Record in the database with new ASQ-3 Record.
 * @param {IASQ3Inputs} asq3Input - An array of updated ASQ-3 Recordies.
 * @param {string} id - The ID of the ASQ-3 Record to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IASQ3Response>} A promise resolving to the updated ASQ-3 Record.
 * @throws {Error} If there's an issue updating the ASQ-3 Record.
 * @remarks This function updates a ASQ-3 Record in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateASQ3 = async (asq3Input: IASQ3Inputs, id: string, userId: string) => {

    const response = await prisma.aSQ3.update({
        where: {
            id,
            userId
        },
        data: {
            userId,
            ...asq3Input,
        }
    })

    return ASQ3ResponseSchema.parse(response);
}

/**
 * Deletes a ASQ-3 Record from the database.
 * @param submissionId - The ID of the ASQ-3 Record to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<IASQ3Response>}
 * @remarks To be used by the dashboard
 */
export const deleteASQ3 = async (submissionId: string, userId: string) => {
    const response = await prisma.aSQ3.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });

    return ASQ3ResponseSchema.parse(response);
};