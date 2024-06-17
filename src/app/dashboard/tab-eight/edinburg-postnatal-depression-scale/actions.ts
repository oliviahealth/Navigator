'use server';

import { prisma } from "@/lib/prisma";
import { IEdinburgPostnatalDepressionScaleInputs, IEdinburgPostnatalDepressionScaleResponse } from "./definitions";

/**
 * Creates a new Edinburg Postnatal Depression Scale Record in the db.
 * @param {IEdinburgPostnatalDepressionScaleInputs} EdinburgPostnatalDepressionScaleInput - The Edinburg Postnatal Depression Scale Record Data to be created.
 * @param {string} userId - The ID of the user creating the Edinburg Postnatal Depression Scale Record
 * @returns {Promise<IEdinburgPostnatalDepressionScaleResponse>} A promise resolving to the created Edinburg Postnatal Depression Scale Record.
 * @throws {Error} If there's an issue creating the Edinburg Postnatal Depression Scale Record.
 * @remarks This function takes Edinburg Postnatal Depression Scale Record data and saves them to the database using Prisma.
 */
export const createEdinburgPostnatalDepressionScale = async (EdinburgPostnatalDepressionScaleInput: IEdinburgPostnatalDepressionScaleInputs, userId: string) => {
    const { dateCompleted, ...data } = EdinburgPostnatalDepressionScaleInput;

    const dateCompletedAsDate = new Date(dateCompleted);

    const response = await prisma.edinburgPostnatalDepressionScale.create({
        data: {
            userId,
            dateCompleted: dateCompletedAsDate,
            ...data
        },
    });

    return response;
};

/**
 * Retrieves a Edinburg Postnatal Depression Scale Record from the database based on its ID and the user ID.
 * @param {string} EdinburgPostnatalDepressionScaleId - The ID of the Edinburg Postnatal Depression Scale Record to retrieve
 * @param {string} userId - The ID of the user request the Edinburg Postnatal Depression Scale Record.
 * @returns {Promise<IEdinburgPostnatalDepressionScaleResponse | null>} A promise resolving to the retrieved Edinburg Postnatal Depression Scale Record,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Edinburg Postnatal Depression Scale Record.
 * @remarks This function retrieves a Edinburg Postnatal Depression Scale Record from the database using Prisma based on the provided ID and the user ID.
 */
export const readEdinburgPostnatalDepressionScale = async (EdinburgPostnatalDepressionScaleId: string, userId: string) => {
    const response = await prisma.edinburgPostnatalDepressionScale.findUniqueOrThrow({
        where: {
            userId,
            id: EdinburgPostnatalDepressionScaleId
        },
    })

    return response;
}

/**
 * Updates a Edinburg Postnatal Depression Scale Record in the database with new Edinburg Postnatal Depression Scale Record.
 * @param {IEdinburgPostnatalDepressionScaleInputs} EdinburgPostnatalDepressionScaleInput - An array of updated Edinburg Postnatal Depression Scale Recordies.
 * @param {string} id - The ID of the Edinburg Postnatal Depression Scale Record to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IEdinburgPostnatalDepressionScaleResponse>} A promise resolving to the updated Edinburg Postnatal Depression Scale Record.
 * @throws {Error} If there's an issue updating the Edinburg Postnatal Depression Scale Record.
 * @remarks This function updates a Edinburg Postnatal Depression Scale Record in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateEdinburgPostnatalDepressionScale = async (EdinburgPostnatalDepressionScaleInput: IEdinburgPostnatalDepressionScaleInputs, id: string, userId: string) => {
    const { dateCompleted, ...data } = EdinburgPostnatalDepressionScaleInput;

    const dateCompletedAsDate = new Date(dateCompleted);

    const response = await prisma.edinburgPostnatalDepressionScale.update({
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
 * Deletes a Edinburg Postnatal Depression Scale Record from the database.
 * @param submissionId - The ID of the Edinburg Postnatal Depression Scale Record to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<IEdinburgPostnatalDepressionScaleResponse>}
 * @remarks To be used by the dashboard
 */
export const deleteEdinburgPostnatalDepressionScale = async (submissionId: string, userId: string) => {
    const response = await prisma.edinburgPostnatalDepressionScale.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });
    return response;
};