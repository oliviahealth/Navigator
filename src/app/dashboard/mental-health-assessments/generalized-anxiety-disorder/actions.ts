"use server"

import { prisma } from "@/lib/prisma";
import { IGeneralizedAnxietyDisorderInputs, IGeneralizedAnxietyDisorderResponse, GeneralizedAnxietyDisorderResponseSchema } from "./definitions";

/**
 * Creates a new Generalized Anxiety Disorder Record in the db.
 * @param {IGeneralizedAnxietyDisorderInputs} GeneralizedAnxietyDisorderInput - The Generalized Anxiety Disorder Record Data to be created.
 * @param {string} userId - The ID of the user creating the Generalized Anxiety Disorder Record
 * @returns {Promise<IGeneralizedAnxietyDisorderResponse>} A promise resolving to the created Generalized Anxiety Disorder Record.
 * @throws {Error} If there's an issue creating the Generalized Anxiety Disorder Record.
 * @remarks This function takes Generalized Anxiety Disorder Record data and saves them to the database using Prisma.
 */
export const createGeneralizedAnxietyDisorder = async (GeneralizedAnxietyDisorderInput: IGeneralizedAnxietyDisorderInputs, userId: string) => {
    const { ...data } = GeneralizedAnxietyDisorderInput;

    const response = await prisma.generalizedAnxietyDisorder.create({
        data: {
            userId,
            ...data,
        },
    });

    return GeneralizedAnxietyDisorderResponseSchema.parse(response);
};

/**
 * Retrieves a Generalized Anxiety Disorder Record from the database based on its ID and the user ID.
 * @param {string} GeneralizedAnxietyDisorderId - The ID of the Generalized Anxiety Disorder Record to retrieve
 * @param {string} userId - The ID of the user request the Generalized Anxiety Disorder Record.
 * @returns {Promise<IGeneralizedAnxietyDisorderResponse | null>} A promise resolving to the retrieved Generalized Anxiety Disorder Record,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Generalized Anxiety Disorder Record.
 * @remarks This function retrieves a Generalized Anxiety Disorder Record from the database using Prisma based on the provided ID and the user ID.
 */
export const readGeneralizedAnxietyDisorder = async (GeneralizedAnxietyDisorderId: string, userId: string) => {
    const response = await prisma.generalizedAnxietyDisorder.findUniqueOrThrow({
        where: {
            userId,
            id: GeneralizedAnxietyDisorderId
        },
    })

    return GeneralizedAnxietyDisorderResponseSchema.parse(response);
}

/**
 * Updates a Generalized Anxiety Disorder Record in the database with new Generalized Anxiety Disorder Record.
 * @param {IGeneralizedAnxietyDisorderInputs} GeneralizedAnxietyDisorderInput - An array of updated Generalized Anxiety Disorder Recordies.
 * @param {string} id - The ID of the Generalized Anxiety Disorder Record to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IGeneralizedAnxietyDisorderResponse>} A promise resolving to the updated Generalized Anxiety Disorder Record.
 * @throws {Error} If there's an issue updating the Generalized Anxiety Disorder Record.
 * @remarks This function updates a Generalized Anxiety Disorder Record in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateGeneralizedAnxietyDisorder = async (GeneralizedAnxietyDisorderInput: IGeneralizedAnxietyDisorderInputs, id: string, userId: string) => {
    const { ...data } = GeneralizedAnxietyDisorderInput;

    const response = await prisma.generalizedAnxietyDisorder.update({
        where: {
            id,
            userId
        },
        data: {
            ...data
        }
    })

    return GeneralizedAnxietyDisorderResponseSchema.parse(response);
}

/**
 * Deletes a Generalized Anxiety Disorder Record from the database.
 * @param submissionId - The ID of the Generalized Anxiety Disorder Record to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<IGeneralizedAnxietyDisorderResponse>}
 * @remarks To be used by the dashboard
 */
export const deleteGeneralizedAnxietyDisorder = async (submissionId: string, userId: string) => {
    const response = await prisma.generalizedAnxietyDisorder.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });

    return GeneralizedAnxietyDisorderResponseSchema.parse(response);
};