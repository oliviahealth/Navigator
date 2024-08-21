'use server';

import { prisma } from "@/lib/prisma";
import { IReferralsAndServicesInputs, ReferralsAndServicesResponseSchema } from "./definitions";

/**
 * Creates a new Referrals And Services Form in the db.
 * @param {IReferralsAndServicesInputs} referralsAndServicesInput - The Referrals And Services Form Data to be created.
 * @param {string} userId - The ID of the user creating the Referrals And Services Form
 * @returns {Promise<IReferralsAndServicesResponse>} A promise resolving to the created Referrals And Services Form.
 * @throws {Error} If there's an issue creating the Referrals And Services Form.
 * @remarks This function takes Referrals And Services Form data and saves them to the database using Prisma.
 */
export const createReferralsAndServices = async (referralsAndServicesInput: IReferralsAndServicesInputs, userId: string) => {

    const response = await prisma.referralsAndServices.create({
        data: {
            userId,
            ...referralsAndServicesInput,
        },
    });

    return ReferralsAndServicesResponseSchema.parse(response);
};

/**
 * Retrieves a Referrals And Services Form from the database based on its ID and the user ID.
 * @param {string} referralsAndServicesId - The ID of the Referrals And Services Form to retrieve
 * @param {string} userId - The ID of the user request the Referrals And Services Form.
 * @returns {Promise<IReferralsAndServicesResponse | null>} A promise resolving to the retrieved Referrals And Services Form,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Referrals And Services Form.
 * @remarks This function retrieves a Referrals And Services Form from the database using Prisma based on the provided ID and the user ID.
 */
export const readReferralsAndServices = async (referralsAndServicesId: string, userId: string) => {
    const response = await prisma.referralsAndServices.findUniqueOrThrow({
        where: {
            userId,
            id: referralsAndServicesId
        },
    })

    return ReferralsAndServicesResponseSchema.parse(response);
}

export const readAllReferralsAndServices = async (userId: string) => {
    const response = await prisma.referralsAndServices.findMany({
        where: {
            userId
        }
    });

    return response.map(log => ReferralsAndServicesResponseSchema.parse(log));
}

/**
 * Updates a Referrals And Services Form in the database with new Referrals And Services Form.
 * @param {IReferralsAndServicesInputs} referralsAndServicesInput - An array of updated Referrals And Services Formies.
 * @param {string} id - The ID of the Referrals And Services Form to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IReferralsAndServicesResponse>} A promise resolving to the updated Referrals And Services Form.
 * @throws {Error} If there's an issue updating the Referrals And Services Form.
 * @remarks This function updates a Referrals And Services Form in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateReferralsAndServices = async (referralsAndServicesInput: IReferralsAndServicesInputs, id: string, userId: string) => {

    const response = await prisma.referralsAndServices.update({
        where: {
            id,
            userId
        },
        data: {
            ...referralsAndServicesInput,
        }
    })

    return ReferralsAndServicesResponseSchema.parse(response);
}

/**
 * Deletes a Referrals And Services Form from the database.
 * @param submissionId - The ID of the Referrals And Services Form to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<IReferralsAndServicesResponse>}
 * @remarks To be used by the dashboard
 */
export const deleteReferralsAndServices = async (submissionId: string, userId: string) => {
    const response = await prisma.referralsAndServices.delete({
        where: {
            id: submissionId,
            userId: userId
        }
    });

    return ReferralsAndServicesResponseSchema.parse(response);
};