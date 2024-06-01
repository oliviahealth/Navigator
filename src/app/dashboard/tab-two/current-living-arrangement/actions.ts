'use server';

import { prisma } from "@/lib/prisma";
import { ICurrentLivingArrangementInputs, ICurrentLivingArrangementResponse } from "./definitions";

/**
 * Creates a new current living arrangement form in the db.
 * @param {currentLivingArrangementInputs} currentLivingArrangementInputs - The current living arrangement form Data to be created.
 * @param {string} userId - The ID of the user creating the current living arrangement form
 * @returns {Promise<ICurrentLivingArrangementResponse>} A promise resolving to the created current living arrangement form.
 * @throws {Error} If there's an issue creating the current living arrangement form.
 * @remarks This function takes current living arrangement form data and saves them to the database using Prisma.
 */
export const createCurrentLivingArrangements = async (currentLivingArrangementInputs: ICurrentLivingArrangementInputs, userId: string) => {
    const { ...data } = currentLivingArrangementInputs;

    const transformedData = {
        listPeopleLivingWithPatient: currentLivingArrangementInputs.listPeopleLivingWithPatient.map(person => ({
            ...person,
            dateOfBirth: new Date(person.dateOfBirth),
        })),
        listChildrenNotLivingWithPatient: currentLivingArrangementInputs.listChildrenNotLivingWithPatient.map(child => ({
            ...child,
            dateOfBirth: new Date(child.dateOfBirth),
        })),
    };

    const response = await prisma.currentLivingArrangement.create({
        data: {
            userId,
            ...data
        },
    });

    return response;
};

/**
 * Retrieves a current living arrangement form from the database based on its ID and the user ID.
 * @param {string} currentLivingArrangementId - The ID of the current living arrangement form to retrieve
 * @param {string} userId - The ID of the user request the current living arrangement form.
 * @returns {Promise<ICurrentLivingArrangementResponse | null>} A promise resolving to the retrieved Current Living Arrangement form,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the current living arrangement form.
 * @remarks This function retrieves a current living arrangement form from the database using Prisma based on the provided ID and the user ID.
 */
export const readCurrentLivingArrangement = async (currentLivingArrangementId: string, userId: string) => {
    const response = await prisma.currentLivingArrangement.findUniqueOrThrow({
        where: {
            userId,
            id: currentLivingArrangementId
        },
    })

    return response
}

/**
 * Updates a current living arrangement form in the database with new current living arrangement form.
 * @param {ICurrentLivingArrangementInputs} currentLivingArrangementInputs - An array of updated current living arrangement formies.
 * @param {string} id - The ID of the current living arrangement form to update.
 * @param {string} userId - The ID of the user requesting to update the form.
 * @returns {Promise<ICurrentLivingArrangementResponse>} A promise resolving to the updated current living arrangement form.
 * @throws {Error} If there's an issue updating the current living arrangement form.
 * @remarks This function updates a current living arrangement form in the database using Prisma. It replaces the existing
 * form with the form provided in the input.
 */
export const updateCurrentLivingArrangements = async (currentLivingArrangementInputs: ICurrentLivingArrangementInputs, id: string, userId: string) => {

    const { ...data } = currentLivingArrangementInputs;

    const response = await prisma.currentLivingArrangement.update({
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
 * Deletes a current living arrangement form from the database.
 * @param submissionId - The ID of the current living arrangement form to delete.
 * @param userId - The ID of the user requesting to delete the form.
 * @returns {Promise<ICurrentLivingArrangementResponse>}
 * @remarks To be used by the dashboard
 */
export const deleteCurrentLivingArrangements = async (submissionId: string, userId: string) => {
    const response = await prisma.currentLivingArrangement.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });
    return response;
};