'use server';

import { prisma } from "@/lib/prisma";
import { IParentalMedicalHistoryInputs, ParentalMedicalHistoryResponseSchema } from "./definitions";

/**
 * Creates a new Parental Medical History in the db.
 * @param {IParentalMedicalHistoryInputs} parentalMedicalHistoryInput - The Parental Medical History Data to be created.
 * @param {string} userId - The ID of the user creating the Parental Medical History
 * @returns {Promise<IParentalMedicalHistoryResponse>} A promise resolving to the created Parental Medical History.
 * @throws {Error} If there's an issue creating the Parental Medical History.
 * @remarks This function takes Parental Medical History data and saves them to the database using Prisma.
 */
export const createParentalMedicalHistory = async (parentalMedicalHistoryInput: IParentalMedicalHistoryInputs, userId: string) => {

    const { postpartumVisitDate, ...data } = parentalMedicalHistoryInput;
    const postpartumVisitDateAsDate = postpartumVisitDate ? new Date(postpartumVisitDate) : null;

    const response = await prisma.parentalMedicalHistory.create({
        data: {
            userId,
            postpartumVisitDate: postpartumVisitDateAsDate,
            ...data
        },
    });

    return ParentalMedicalHistoryResponseSchema.parse(response);
};

/**
 * Retrieves a Parental Medical History from the database based on its ID and the user ID.
 * @param {string} parentalMedicalHistoryId - The ID of the Parental Medical History to retrieve
 * @param {string} userId - The ID of the user request the Parental Medical History.
 * @returns {Promise<IParentalMedicalHistoryResponse | null>} A promise resolving to the retrieved Parental Medical History,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Parental Medical History.
 * @remarks This function retrieves a Parental Medical History from the database using Prisma based on the provided ID and the user ID.
 */
export const readParentalMedicalHistory = async (parentalMedicalHistoryId: string, userId: string) => {
    const response = await prisma.parentalMedicalHistory.findUniqueOrThrow({
        where: {
            userId,
            id: parentalMedicalHistoryId
        },
    })

    return ParentalMedicalHistoryResponseSchema.parse(response);
}

export const readAllParentalMedicalHistory = async (userId: string) => {
    const response = await prisma.parentalMedicalHistory.findMany({
        where: {
            userId
        }
    });
    return response.map(form => ParentalMedicalHistoryResponseSchema.parse(form));
}

/**
 * Updates a Parental Medical History in the database with new Parental Medical History.
 * @param {IParentalMedicalHistoryInputs} parentalMedicalHistoryInput - An array of updated Parental Medical Historyies.
 * @param {string} id - The ID of the Parental Medical History to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IParentalMedicalHistoryResponse>} A promise resolving to the updated Parental Medical History.
 * @throws {Error} If there's an issue updating the Parental Medical History.
 * @remarks This function updates a Parental Medical History in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateParentalMedicalHistory = async (parentalMedicalHistoryInput: IParentalMedicalHistoryInputs, id: string, userId: string) => {

    const { postpartumVisitDate, ...data } = parentalMedicalHistoryInput;
    const postpartumVisitDateAsDate = postpartumVisitDate ? new Date(postpartumVisitDate) : null;

    const response = await prisma.parentalMedicalHistory.update({
        where: {
            id,
            userId
        },
        data: {
            postpartumVisitDate: postpartumVisitDateAsDate,
            ...data
        }
    })

    return ParentalMedicalHistoryResponseSchema.parse(response);
}

/**
 * Deletes a Parental Medical History from the database.
 * @param submissionId - The ID of the Parental Medical History to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<IParentalMedicalHistoryResponse>}
 */
export const deleteParentalMedicalHistory = async (submissionId: string, userId: string) => {
    const response = await prisma.parentalMedicalHistory.delete({
        where: {
            id: submissionId,
            userId: userId
        }
    });

    return ParentalMedicalHistoryResponseSchema.parse(response);
};