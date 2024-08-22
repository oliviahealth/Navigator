"use server"

import { prisma } from "@/lib/prisma";
import { IInfancyQuestionnaireInputs, IInfancyQuestionnaireResponse, InfancyQuestionnaireResponseSchema } from "./definitions";

/**
 * Creates a new Infancy Questionnaire Record in the db.
 * @param {IInfancyQuestionnaireInputs} InfancyQuestionnaireInput - The Infancy Questionnaire Record Data to be created.
 * @param {string} userId - The ID of the user creating the Infancy Questionnaire Record
 * @returns {Promise<IInfancyQuestionnaireResponse>} A promise resolving to the created Infancy Questionnaire Record.
 * @throws {Error} If there's an issue creating the Infancy Questionnaire Record.
 * @remarks This function takes Infancy Questionnaire Record data and saves them to the database using Prisma.
 */
export const createInfancyQuestionnaire = async (InfancyQuestionnaireInput: IInfancyQuestionnaireInputs, userId: string) => {

    const response = await prisma.infancyQuestionnaire.create({
        data: {
            userId,
            ...InfancyQuestionnaireInput,
            dateCompleted: new Date(InfancyQuestionnaireInput.dateCompleted),
            postpartumVisitDate: InfancyQuestionnaireInput.postpartumVisitDate ? new Date(InfancyQuestionnaireInput.postpartumVisitDate) : null
        },
    });

    return InfancyQuestionnaireResponseSchema.parse(response);
};

/**
 * Retrieves a Infancy Questionnaire Record from the database based on its ID and the user ID.
 * @param {string} InfancyQuestionnaireId - The ID of the Infancy Questionnaire Record to retrieve
 * @param {string} userId - The ID of the user request the Infancy Questionnaire Record.
 * @returns {Promise<IInfancyQuestionnaireResponse | null>} A promise resolving to the retrieved Infancy Questionnaire Record,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Infancy Questionnaire Record.
 * @remarks This function retrieves a Infancy Questionnaire Record from the database using Prisma based on the provided ID and the user ID.
 */
export const readInfancyQuestionnaire = async (InfancyQuestionnaireId: string, userId: string) => {
    const response = await prisma.infancyQuestionnaire.findUniqueOrThrow({
        where: {
            userId,
            id: InfancyQuestionnaireId,
        },
    })

    return InfancyQuestionnaireResponseSchema.parse(response);
}
export const readAllInfancyQuestionnaire = async (userId: string) => {
    const response = await prisma.infancyQuestionnaire.findMany({
        where: {
            userId
        }
    });
    return response.map(form => InfancyQuestionnaireResponseSchema.parse(form));
}
/**
 * Updates a Infancy Questionnaire Record in the database with new Infancy Questionnaire Record.
 * @param {IInfancyQuestionnaireInputs} InfancyQuestionnaireInput - An array of updated Infancy Questionnaire Recordies.
 * @param {string} id - The ID of the Infancy Questionnaire Record to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IInfancyQuestionnaireResponse>} A promise resolving to the updated Infancy Questionnaire Record.
 * @throws {Error} If there's an issue updating the Infancy Questionnaire Record.
 * @remarks This function updates a Infancy Questionnaire Record in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateInfancyQuestionnaire = async (InfancyQuestionnaireInput: IInfancyQuestionnaireInputs, id: string, userId: string) => {
    const { ...data } = InfancyQuestionnaireInput;

    const response = await prisma.infancyQuestionnaire.update({
        where: {
            id,
            userId
        },
        data: {
            ...InfancyQuestionnaireInput,
            dateCompleted: new Date(InfancyQuestionnaireInput.dateCompleted),
            postpartumVisitDate: InfancyQuestionnaireInput.postpartumVisitDate ? new Date(InfancyQuestionnaireInput.postpartumVisitDate) : null
        }
    })

    return InfancyQuestionnaireResponseSchema.parse(response);
}

/**
 * Deletes a Infancy Questionnaire Record from the database.
 * @param submissionId - The ID of the Infancy Questionnaire Record to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<IInfancyQuestionnaireResponse>}
 * @remarks To be used by the dashboard
 */
export const deleteInfancyQuestionnaire = async (submissionId: string, userId: string) => {
    const response = await prisma.infancyQuestionnaire.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });

    return InfancyQuestionnaireResponseSchema.parse(response);
};