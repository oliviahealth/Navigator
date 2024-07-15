'use server';

import { prisma } from "@/lib/prisma";
import { BriefChildWellnessUpdateResponseSchema, IBriefChildWellnessUpdateInputs, IBriefChildWellnessUpdateResponse, } from "./definitions";

/**
 * Creates a new Brief Child Wellness Update in the db.
 * @param {IBriefChildWellnessUpdateInputs} BriefChildWellnessUpdateInput - The Brief Child Wellness Update Data to be created.
 * @param {string} userId - The ID of the user creating the Brief Child Wellness Update
 * @returns {Promise<IBriefChildWellnessUpdateResponse>} A promise resolving to the created Brief Child Wellness Update.
 * @throws {Error} If there's an issue creating the Brief Child Wellness Update.
 * @remarks This function takes Brief Child Wellness Update data and saves them to the database using Prisma.
 */
export const createBriefChildWellnessUpdate = async (BriefChildWellnessUpdateInput: IBriefChildWellnessUpdateInputs, userId: string) => {

    const response = await prisma.briefChildWellnessUpdate.create({
        data: {
            userId,
            ...BriefChildWellnessUpdateInput,
            dateCompleted: new Date(BriefChildWellnessUpdateInput.dateCompleted),
        },
    });

    return BriefChildWellnessUpdateResponseSchema.parse(response);
};

/**
 * Retrieves a Brief Child Wellness Update record from the database based on its ID and the user ID.
 * @param {string} BriefChildWellnessUpdateId - The ID of the Brief Child Wellness Update to retrieve
 * @param {string} userId - The ID of the user request the Brief Child Wellness Update.
 * @returns {Promise<IBriefChildWellnessUpdateResponse | null>} A promise resolving to the retrieved Brief Child Wellness Update,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Brief Child Wellness Update.
 * @remarks This function retrieves a Brief Child Wellness Update from the database using Prisma based on the provided ID and the user ID.
 */
export const readBriefChildWellnessUpdate = async (BriefChildWellnessUpdateId: string, userId: string) => {
    const response = await prisma.briefChildWellnessUpdate.findUniqueOrThrow({
        where: {
            userId,
            id: BriefChildWellnessUpdateId
        },
    })

    return BriefChildWellnessUpdateResponseSchema.parse(response);
}

/**
 * Updates a Brief Child Wellness Update in the database with new Brief Child Wellness Update.
 * @param {IBriefChildWellnessUpdateInputs} BriefChildWellnessUpdateInput - An array of updated Brief Child Wellness Updateies.
 * @param {string} id - The ID of the Brief Child Wellness Update to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IBriefChildWellnessUpdateResponse>} A promise resolving to the updated Brief Child Wellness Update.
 * @throws {Error} If there's an issue updating the Brief Child Wellness Update.
 * @remarks This function updates a Brief Child Wellness Update in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateBriefChildWellnessUpdate = async (BriefChildWellnessUpdateInput: IBriefChildWellnessUpdateInputs, id: string, userId: string) => {

    const response = await prisma.briefChildWellnessUpdate.update({
        where: {
            id,
            userId
        },
        data: {
            userId,
            ...BriefChildWellnessUpdateInput,
            dateCompleted: new Date(BriefChildWellnessUpdateInput.dateCompleted),
        }
    })

    return BriefChildWellnessUpdateResponseSchema.parse(response);
}

/**
 * Deletes a Brief Child Wellness Update from the database.
 * @param submissionId - The ID of the Brief Child Wellness Update to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<IBriefChildWellnessUpdateResponse>}
 * @remarks To be used by the dashboard
 */
export const deleteBriefChildWellnessUpdate = async (submissionId: string, userId: string) => {
    const response = await prisma.briefChildWellnessUpdate.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });

    return BriefChildWellnessUpdateResponseSchema.parse(response);
};