"use server"

import { prisma } from "@/lib/prisma";
import { IPerceivedStressScaleInputs, IPerceivedStressScaleResponse, PerceivedStressScaleResponseSchema } from "./definitions";

/**
 * Creates a new Perceived Stress Scale Record in the db.
 * @param {IPerceivedStressScaleInputs} PerceivedStressScaleInput - The Perceived Stress Scale Record Data to be created.
 * @param {string} userId - The ID of the user creating the Perceived Stress Scale Record
 * @returns {Promise<IPerceivedStressScaleResponse>} A promise resolving to the created Perceived Stress Scale Record.
 * @throws {Error} If there's an issue creating the Perceived Stress Scale Record.
 * @remarks This function takes Perceived Stress Scale Record data and saves them to the database using Prisma.
 */
export const createPerceivedStressScale = async (PerceivedStressScaleInput: IPerceivedStressScaleInputs, userId: string) => {
    const { ...data } = PerceivedStressScaleInput;

    const response = await prisma.perceivedStressScale.create({
        data: {
            userId,
            ...data,
        },
    });

    return PerceivedStressScaleResponseSchema.parse(response);
};

/**
 * Retrieves a Perceived Stress Scale Record from the database based on its ID and the user ID.
 * @param {string} PerceivedStressScaleId - The ID of the Perceived Stress Scale Record to retrieve
 * @param {string} userId - The ID of the user request the Perceived Stress Scale Record.
 * @returns {Promise<IPerceivedStressScaleResponse | null>} A promise resolving to the retrieved Perceived Stress Scale Record,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Perceived Stress Scale Record.
 * @remarks This function retrieves a Perceived Stress Scale Record from the database using Prisma based on the provided ID and the user ID.
 */
export const readPerceivedStressScale = async (PerceivedStressScaleId: string, userId: string) => {
    const response = await prisma.perceivedStressScale.findUniqueOrThrow({
        where: {
            userId,
            id: PerceivedStressScaleId
        },
    })

    return PerceivedStressScaleResponseSchema.parse(response);
};

export const readAllPercievedStressScale = async (userId: string) => {
    const response = await prisma.perceivedStressScale.findMany({
        where: {
            userId
        }
    });

    return response.map(log => PerceivedStressScaleResponseSchema.parse(log));
}

/**
 * Updates a Perceived Stress Scale Record in the database with new Perceived Stress Scale Record.
 * @param {IPerceivedStressScaleInputs} PerceivedStressScaleInput - An array of updated Perceived Stress Scale Recordies.
 * @param {string} id - The ID of the Perceived Stress Scale Record to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IPerceivedStressScaleResponse>} A promise resolving to the updated Perceived Stress Scale Record.
 * @throws {Error} If there's an issue updating the Perceived Stress Scale Record.
 * @remarks This function updates a Perceived Stress Scale Record in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updatePerceivedStressScale = async (PerceivedStressScaleInput: IPerceivedStressScaleInputs, id: string, userId: string) => {
    const { ...data } = PerceivedStressScaleInput;

    const response = await prisma.perceivedStressScale.update({
        where: {
            id,
            userId
        },
        data: {
            ...data
        }
    })

    return PerceivedStressScaleResponseSchema.parse(response);
}

/**
 * Deletes a Perceived Stress Scale Record from the database.
 * @param submissionId - The ID of the Perceived Stress Scale Record to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<IPerceivedStressScaleResponse>}
 * @remarks To be used by the dashboard
 */
export const deletePerceivedStressScale = async (submissionId: string, userId: string) => {
    const response = await prisma.perceivedStressScale.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });
    
    return PerceivedStressScaleResponseSchema.parse(response);
};