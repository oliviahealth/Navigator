"use server"

import { prisma } from "@/lib/prisma";
import { IPerceivedMaternalPlanningSelfEfficacyToolInputs, IPerceivedMaternalPlanningSelfEfficacyToolResponse, PerceivedMaternalPlanningSelfEfficacyToolResponseSchema } from "./definitions";

/**
 * Creates a new Perceived Maternal Planning Self Efficacy Tool in the db.
 * @param {IPerceivedMaternalPlanningSelfEfficacyToolInputs} PerceivedMaternalPlanningSelfEfficacyToolInput - The Perceived Maternal Planning Self Efficacy Tool Data to be created.
 * @param {string} userId - The ID of the user creating the Perceived Maternal Planning Self Efficacy Tool
 * @returns {Promise<IPerceivedMaternalPlanningSelfEfficacyToolResponse>} A promise resolving to the created Perceived Maternal Planning Self Efficacy Tool.
 * @throws {Error} If there's an issue creating the Perceived Maternal Planning Self Efficacy Tool.
 * @remarks This function takes Perceived Maternal Planning Self Efficacy Tool data and saves them to the database using Prisma.
 */
export const createPerceivedMaternalPlanningSelfEfficacyTool = async (PerceivedMaternalPlanningSelfEfficacyToolInput: IPerceivedMaternalPlanningSelfEfficacyToolInputs, userId: string) => {

    const response = await prisma.perceivedMaternalPlanningSelfEfficacyTool.create({
        data: {
            userId,
            ...PerceivedMaternalPlanningSelfEfficacyToolInput,
        },
    });

    return PerceivedMaternalPlanningSelfEfficacyToolResponseSchema.parse(response);
};

/**
 * Retrieves a Perceived Maternal Planning Self Efficacy Tool from the database based on its ID and the user ID.
 * @param {string} PerceivedMaternalPlanningSelfEfficacyToolId - The ID of the Perceived Maternal Planning Self Efficacy Tool to retrieve
 * @param {string} userId - The ID of the user request the Perceived Maternal Planning Self Efficacy Tool.
 * @returns {Promise<IPerceivedMaternalPlanningSelfEfficacyToolResponse | null>} A promise resolving to the retrieved Perceived Maternal Planning Self Efficacy Tool,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Perceived Maternal Planning Self Efficacy Tool.
 * @remarks This function retrieves a Perceived Maternal Planning Self Efficacy Tool from the database using Prisma based on the provided ID and the user ID.
 */
export const readPerceivedMaternalPlanningSelfEfficacyTool = async (PerceivedMaternalPlanningSelfEfficacyToolId: string, userId: string) => {
    const response = await prisma.perceivedMaternalPlanningSelfEfficacyTool.findUniqueOrThrow({
        where: {
            userId,
            id: PerceivedMaternalPlanningSelfEfficacyToolId
        },
    })

    return PerceivedMaternalPlanningSelfEfficacyToolResponseSchema.parse(response);
}

export const readAllPerceivedMaternalPlanningSelfEfficacyTool = async (userId: string) => {
    const response = await prisma.perceivedMaternalPlanningSelfEfficacyTool.findMany({
        where: {
            userId
        }
    });
    return response.map(form => PerceivedMaternalPlanningSelfEfficacyToolResponseSchema.parse(form));
}


/**
 * Updates a Perceived Maternal Planning Self Efficacy Tool in the database with new Perceived Maternal Planning Self Efficacy Tool.
 * @param {IPerceivedMaternalPlanningSelfEfficacyToolInputs} PerceivedMaternalPlanningSelfEfficacyToolInput - An array of updated Perceived Maternal Planning Self Efficacy Toolies.
 * @param {string} id - The ID of the Perceived Maternal Planning Self Efficacy Tool to update.
 * @param {string} userId - The ID of the user requesting to update the form.
 * @returns {Promise<IPerceivedMaternalPlanningSelfEfficacyToolResponse>} A promise resolving to the updated Perceived Maternal Planning Self Efficacy Tool.
 * @throws {Error} If there's an issue updating the Perceived Maternal Planning Self Efficacy Tool.
 * @remarks This function updates a Perceived Maternal Planning Self Efficacy Tool in the database using Prisma. It replaces the existing
 * form with the form provided in the input.
 */
export const updatePerceivedMaternalPlanningSelfEfficacyTool = async (PerceivedMaternalPlanningSelfEfficacyToolInput: IPerceivedMaternalPlanningSelfEfficacyToolInputs, id: string, userId: string) => {

    const response = await prisma.perceivedMaternalPlanningSelfEfficacyTool.update({
        where: {
            id,
            userId
        },
        data: {
            ...PerceivedMaternalPlanningSelfEfficacyToolInput,
        }
    })

    return PerceivedMaternalPlanningSelfEfficacyToolResponseSchema.parse(response);
}

/**
 * Deletes a Perceived Maternal Planning Self Efficacy Tool from the database.
 * @param submissionId - The ID of the Perceived Maternal Planning Self Efficacy Tool to delete.
 * @param userId - The ID of the user requesting to delete the form.
 * @returns {Promise<IPerceivedMaternalPlanningSelfEfficacyToolResponse>}
 * @remarks To be used by the dashboard
 */
export const deletePerceivedMaternalPlanningSelfEfficacyTool = async (submissionId: string, userId: string) => {
    const response = await prisma.perceivedMaternalPlanningSelfEfficacyTool.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });

    return PerceivedMaternalPlanningSelfEfficacyToolResponseSchema.parse(response);
};