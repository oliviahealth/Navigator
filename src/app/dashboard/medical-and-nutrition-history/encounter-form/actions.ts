'use server';

import { prisma } from "@/lib/prisma";
import { EncounterFormResponseSchema, IEncounterFormInputs } from "./definitions";

/**
 * Creates a new Encounter Form in the db.
 * @param {IEncounterFormInputs} encounterFormInput - The Encounter Form Data to be created.
 * @param {string} userId - The ID of the user creating the Encounter Form
 * @returns {Promise<IEncounterFormResponse>} A promise resolving to the created Encounter Form.
 * @throws {Error} If there's an issue creating the Encounter Form.
 * @remarks This function takes Encounter Form data and saves them to the database using Prisma.
 */
export const createEncounterForm = async (encounterFormInput: IEncounterFormInputs, userId: string) => {

    const response = await prisma.encounterForm.create({
        data: {
            userId,
            ...encounterFormInput,
        },
    });

    return EncounterFormResponseSchema.parse(response);
};

/**
 * Retrieves a Encounter Form from the database based on its ID and the user ID.
 * @param {string} encounterFormId - The ID of the Encounter Form to retrieve
 * @param {string} userId - The ID of the user request the Encounter Form.
 * @returns {Promise<IEncounterFormResponse | null>} A promise resolving to the retrieved Encounter Form,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Encounter Form.
 * @remarks This function retrieves a Encounter Form from the database using Prisma based on the provided ID and the user ID.
 */
export const readEncounterForm = async (encounterFormId: string, userId: string) => {
    const response = await prisma.encounterForm.findUniqueOrThrow({
        where: {
            userId,
            id: encounterFormId
        },
    })

    return EncounterFormResponseSchema.parse(response);
}

/**
 * Updates a Encounter Form in the database with new Encounter Form.
 * @param {IEncounterFormInputs} encounterFormInput - An array of updated Encounter Formies.
 * @param {string} id - The ID of the Encounter Form to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IEncounterFormResponse>} A promise resolving to the updated Encounter Form.
 * @throws {Error} If there's an issue updating the Encounter Form.
 * @remarks This function updates a Encounter Form in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateEncounterForm = async (encounterFormInput: IEncounterFormInputs, id: string, userId: string) => {

    const response = await prisma.encounterForm.update({
        where: {
            id,
            userId
        },
        data: {
            ...encounterFormInput
        }
    })

    return EncounterFormResponseSchema.parse(response);
}

/**
 * Deletes a Encounter Form from the database.
 * @param submissionId - The ID of the Encounter Form to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<IEncounterFormResponse>}F
 * @remarks To be used by the dashboard
 */
export const deleteEncounterForm = async (submissionId: string, userId: string) => {
    const response = await prisma.encounterForm.delete({
        where: {
            id: submissionId,
            userId: userId
        }
    });

    return EncounterFormResponseSchema.parse(response);
};