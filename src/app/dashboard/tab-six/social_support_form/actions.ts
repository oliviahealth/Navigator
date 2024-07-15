'use server';

import { prisma } from "@/lib/prisma";
import { SocialSupportFormResponseSchema, ISocialSupportFormInputs, SocialSupportFormResponse } from "./definitions";

/**
 * Creates a new Social Support Form Record in the db.
 * @param {ISocialSupportFormInputs} socialSupportFormInput - The Social Support Form Record Data to be created.
 * @param {string} userId - The ID of the user creating the Social Support Form Record
 * @returns {Promise<SocialSupportFormResponse>} A promise resolving to the created Social Support Form Record.
 * @throws {Error} If there's an issue creating the Social Support Form Record.
 * @remarks This function takes Social Support Form Record data and saves them to the database using Prisma.
 */
export const createSocialSupportForm = async (socialSupportFormInput: ISocialSupportFormInputs, userId: string) => {
    const { ...data } = socialSupportFormInput;

    const response = await prisma.socialSupportForm.create({
        data: {
            userId,
            ...data
        },
    });

    return SocialSupportFormResponseSchema.parse(response);
};

/**
 * Retrieves a Social Support Form Record from the database based on its ID and the user ID.
 * @param {string} socialSupportFormId - The ID of the Social Support Form Record to retrieve
 * @param {string} userId - The ID of the user requesting the Social Support Form Record.
 * @returns {Promise<SocialSupportFormResponse | null>} A promise resolving to the retrieved Social Support Form Record,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Social Support Form Record.
 * @remarks This function retrieves a Social Support Form Record from the database using Prisma based on the provided ID and the user ID.
 */
export const readSocialSupportForm = async (socialSupportFormId: string, userId: string) => {
    const response = await prisma.socialSupportForm.findUniqueOrThrow({
        where: {
            userId,
            id: socialSupportFormId
        },
    });

    return SocialSupportFormResponseSchema.parse(response);
};

/**
 * Updates a Social Support Form Record in the database with new Social Support Form Record.
 * @param {ISocialSupportFormInputs} socialSupportFormInput - The updated Social Support Form Record data.
 * @param {string} id - The ID of the Social Support Form Record to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<SocialSupportFormResponse>} A promise resolving to the updated Social Support Form Record.
 * @throws {Error} If there's an issue updating the Social Support Form Record.
 * @remarks This function updates a Social Support Form Record in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateSocialSupportForm = async (socialSupportFormInput: ISocialSupportFormInputs, id: string, userId: string) => {
    const { ...data } = socialSupportFormInput;

    const response = await prisma.socialSupportForm.update({
        where: {
            id,
            userId
        },
        data: {
            ...data
        }
    });

    return SocialSupportFormResponseSchema.parse(response);
};

/**
 * Deletes a Social Support Form Record from the database.
 * @param submissionId - The ID of the Social Support Form Record to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<SocialSupportFormResponse>}
 * @remarks To be used by the dashboard
 */
export const deleteSocialSupportForm = async (submissionId: string, userId: string) => {
    const response = await prisma.socialSupportForm.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });
    
    return SocialSupportFormResponseSchema.parse(response);
};