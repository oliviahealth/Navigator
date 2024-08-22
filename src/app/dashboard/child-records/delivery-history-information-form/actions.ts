"use server"

import { prisma } from "@/lib/prisma";
import { IDeliveryHistoryInformationFormInputs, IDeliveryHistoryInformationResponse, DeliveryHistoryInformationFormResponseSchema } from "./definitions";

/**
 * Creates a new Delivery History Information Form in the db.
 * @param {IDeliveryHistoryInformationFormInputs} deliveryHistoryInformationFormInput - The Delivery History Information Form Data to be created.
 * @param {string} userId - The ID of the user creating the Delivery History Information Form
 * @returns {Promise<IDeliveryHistoryInformationFormResponse>} A promise resolving to the created Delivery History Information Form.
 * @throws {Error} If there's an issue creating the Delivery History Information Form.
 * @remarks This function takes Delivery History Information Form data and saves them to the database using Prisma.
 */
export const createDeliveryHistoryInformationForm = async (deliveryHistoryInformationFormInput: IDeliveryHistoryInformationFormInputs, userId: string) => {

    const response = await prisma.deliveryHistoryInformationForm.create({
        data: {
            userId,
            ...deliveryHistoryInformationFormInput,
            dateCompleted: new Date(deliveryHistoryInformationFormInput.dateCompleted)
        },
    });

    return DeliveryHistoryInformationFormResponseSchema.parse(response);
};

/**
 * Retrieves a Delivery History Information Form from the database based on its ID and the user ID.
 * @param {string} deliveryHistoryInformationFormId - The ID of the Delivery History Information Form to retrieve
 * @param {string} userId - The ID of the user request the Delivery History Information Form.
 * @returns {Promise<IDeliveryHistoryInformationFormResponse | null>} A promise resolving to the retrieved Delivery History Information Form,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Delivery History Information Form.
 * @remarks This function retrieves a Delivery History Information Form from the database using Prisma based on the provided ID and the user ID.
 */
export const readDeliveryHistoryInformationForm = async (deliveryHistoryInformationFormId: string, userId: string) => {
    const response = await prisma.deliveryHistoryInformationForm.findUniqueOrThrow({
        where: {
            userId,
            id: deliveryHistoryInformationFormId
        },
    })

    return DeliveryHistoryInformationFormResponseSchema.parse(response);
}

export const readAllDeliveryHistoryInformationForm = async (userId: string) => {
    const response = await prisma.deliveryHistoryInformationForm.findMany({
        where: {
            userId
        }
    });
    return response.map(form => DeliveryHistoryInformationFormResponseSchema.parse(form));
}

/**
 * Updates a Delivery History Information Form in the database with new Delivery History Information Form.
 * @param {IDeliveryHistoryInformationFormInputs} deliveryHistoryInformationFormInput - An array of updated Delivery History Information Formies.
 * @param {string} id - The ID of the Delivery History Information Form to update.
 * @param {string} userId - The ID of the user requesting to update the form.
 * @returns {Promise<IDeliveryHistoryInformationFormResponse>} A promise resolving to the updated Delivery History Information Form.
 * @throws {Error} If there's an issue updating the Delivery History Information Form.
 * @remarks This function updates a Delivery History Information Form in the database using Prisma. It replaces the existing
 * form with the form provided in the input.
 */
export const updateDeliveryHistoryInformationForm = async (deliveryHistoryInformationFormInput: IDeliveryHistoryInformationFormInputs, id: string, userId: string) => {

    const response = await prisma.deliveryHistoryInformationForm.update({
        where: {
            id,
            userId
        },
        data: {
            ...deliveryHistoryInformationFormInput,
            dateCompleted: new Date(deliveryHistoryInformationFormInput.dateCompleted)
        }
    })

    return DeliveryHistoryInformationFormResponseSchema.parse(response);
}

/**
 * Deletes a Delivery History Information Form from the database.
 * @param submissionId - The ID of the Delivery History Information Form to delete.
 * @param userId - The ID of the user requesting to delete the form.
 * @returns {Promise<IDeliveryHistoryInformationFormResponse>}
 * @remarks To be used by the dashboard
 */
export const deleteDeliveryHistoryInformationForm = async (submissionId: string, userId: string) => {
    const response = await prisma.deliveryHistoryInformationForm.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });

    return DeliveryHistoryInformationFormResponseSchema.parse(response);
};