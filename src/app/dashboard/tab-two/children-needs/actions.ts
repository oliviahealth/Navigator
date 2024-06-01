'use server';

import { prisma } from "@/lib/prisma";
import { IChildrenNeedsFormInputs, IChildrenNeedsFormResponse } from "./definitions";

/**
 * Creates a new Children Needs Form in the db.
 * @param {IChildrenNeedsFormInputs} childrenNeedsFormInput - The Children Needs Form Data to be created.
 * @param {string} userId - The ID of the user creating the Children Needs Form
 * @returns {Promise<IChildrenNeedsFormResponse>} A promise resolving to the created Children Needs Form.
 * @throws {Error} If there's an issue creating the Children Needs Form.
 * @remarks This function takes Children Needs Form data and saves them to the database using Prisma.
 */
export const createChildrenNeedsForm = async (childrenNeedsInputs: IChildrenNeedsFormInputs, userId: string) => {
    const { ...data } = childrenNeedsInputs;

    const response = await prisma.childrenNeedsForm.create({
        data: {
            userId,
            ...data,
        },
    });

    return response;
};

/**
 * Retrieves a Children Needs Form from the database based on its ID and the user ID.
 * @param {string} childrenNeedsFormId - The ID of the Children Needs Form to retrieve
 * @param {string} userId - The ID of the user request the Children Needs Form.
 * @returns {Promise<IChildrenNeedsFormResponse | null>} A promise resolving to the retrieved Children Needs Form,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Children Needs Form.
 * @remarks This function retrieves a Children Needs Form from the database using Prisma based on the provided ID and the user ID.
 */
export const readChildrenNeedsForm = async (childrenNeedsFormId: string, userId: string) => {
    const response = await prisma.childrenNeedsForm.findUniqueOrThrow({
        where: {
            userId,
            id: childrenNeedsFormId
        },
    })

    return response
}

/**
 * Updates a Children Needs Form in the database with new Children Needs Form.
 * @param {IChildrenNeedsFormInputs} childrenNeedsFormInput - An array of updated Children Needs Formies.
 * @param {string} id - The ID of the Children Needs Form to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IChildrenNeedsFormResponse>} A promise resolving to the updated Children Needs Form.
 * @throws {Error} If there's an issue updating the Children Needs Form.
 * @remarks This function updates a Children Needs Form in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateChildrenNeedsForm = async (childrenNeedsFormInput: IChildrenNeedsFormInputs, id: string, userId: string) => {

    const { ...data } = childrenNeedsFormInput;

    const response = await prisma.childrenNeedsForm.update({
        where: {
            id,
            userId
        },
        data: {
            ...data,
        }
    })

    return response;
}

/**
 * Deletes a Children Needs Form from the database.
 * @param submissionId - The ID of the Children Needs Form to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<IChildrenNeedsFormResponse>}
 * @remarks To be used by the dashboard
 */
export const deleteChildrenNeedsForm = async (submissionId: string, userId: string) => {
    const response = await prisma.childrenNeedsForm.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });
    return response;
};