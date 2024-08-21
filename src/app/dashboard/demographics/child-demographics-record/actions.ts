'use server';

import { prisma } from "@/lib/prisma";
import { ChildDemographicsRecordResponseSchema, IChildDemographicsRecordInputs } from "./definitions";

/**
 * Creates a new Child Demographics Record in the db.
 * @param {IChildDemographicsRecordInputs} ChildDemographicsRecordInput - The Child Demographics Record Data to be created.
 * @param {string} userId - The ID of the user creating the Child Demographics Record
 * @returns {Promise<IChildDemographicsRecordResponse>} A promise resolving to the created Child demographics record.
 * @throws {Error} If there's an issue creating the Child demographics record.
 * @remarks This function takes Child demographics record data and saves them to the database using Prisma.
 */
export const createChildDemographicsRecord = async (ChildDemographicsRecordInput: IChildDemographicsRecordInputs, userId: string) => {

    const response = await prisma.childDemographicsRecord.create({
        data: {
            userId,
            ...ChildDemographicsRecordInput
        },
    });

    return ChildDemographicsRecordResponseSchema.parse(response);
};

/**
 * Retrieves a Child demographics record from the database based on its ID and the user ID.
 * @param {string} ChildDemographicsRecordId - The ID of the Child Demographics Record to retrieve
 * @param {string} userId - The ID of the user request the Child Demographics Record.
 * @returns {Promise<IChildDemographicsRecordResponse | null>} A promise resolving to the retrieved Child Demographics Record,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Child Demographics Record.
 * @remarks This function retrieves a Child Demographics Record from the database using Prisma based on the provided ID and the user ID.
 */
export const readChildDemographicsRecord = async (ChildDemographicsRecordId: string, userId: string) => {
    const response = await prisma.childDemographicsRecord.findUniqueOrThrow({
        where: {
            userId,
            id: ChildDemographicsRecordId
        },
    })

    return ChildDemographicsRecordResponseSchema.parse(response);
}

export const readAllChildDemographicsRecord = async (userId: string) => {
    const response = await prisma.childDemographicsRecord.findMany({
        where: {
            userId
        }
    });

    return response.map(log => ChildDemographicsRecordResponseSchema.parse(log));
}

/**
 * Updates a Child Demographics Record in the database with new Child Demographics Record.
 * @param {IChildDemographicsRecordInputs} ChildDemographicsRecordInput - An array of updated Child Demographics Recordies.
 * @param {string} id - The ID of the Child Demographics Record to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IChildDemographicsRecordResponse>} A promise resolving to the updated Child Demographics Record.
 * @throws {Error} If there's an issue updating the Child Demographics Record.
 * @remarks This function updates a Child Demographics Record in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateChildDemographicsRecord = async (ChildDemographicsRecordInput: IChildDemographicsRecordInputs, id: string, userId: string) => {

    const response = await prisma.childDemographicsRecord.update({
        where: {
            id,
            userId
        },
        data: {
            ...ChildDemographicsRecordInput
        }
    })

    return ChildDemographicsRecordResponseSchema.parse(response);
}

/**
 * Deletes a Child Demographics Record from the database.
 * @param submissionId - The ID of the Child Demographics Record to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<ICommunicationLogResponse>}
 * @remarks To be used by the dashboard
 */
export const deleteChildDemographicsRecord = async (submissionId: string, userId: string) => {
    const response = await prisma.childDemographicsRecord.delete({
        where: {
            id: submissionId,
            userId: userId
        }
    });

    return ChildDemographicsRecordResponseSchema.parse(response);
};