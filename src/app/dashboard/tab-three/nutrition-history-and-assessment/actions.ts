'use server';

import { prisma } from "@/lib/prisma";
import { INutritionHistoryAndAssessmentInputs, INutritionHistoryAndAssessmentResponse } from "./definitions";

/**
 * Creates a new Nutrition History and Assessment in the db.
 * @param {INutritionHistoryAndAssessmentInputs} nutritionHistoryAndAssessmentInput - The Nutrition History and Assessment Data to be created.
 * @param {string} userId - The ID of the user creating the Nutrition History and Assessment
 * @returns {Promise<INutritionHistoryAndAssessmentResponse>} A promise resolving to the created Nutrition History and Assessment.
 * @throws {Error} If there's an issue creating the Nutrition History and Assessment.
 * @remarks This function takes Nutrition History and Assessment data and saves them to the database using Prisma.
 */
export const createNutritionHistoryAndAssessment = async (nutritionHistoryAndAssessmentInput: INutritionHistoryAndAssessmentInputs, userId: string) => {
    const {
        todaysDate,
        lastMenstrualPeriod,
        dueDate,
        ...rest
    } = nutritionHistoryAndAssessmentInput;

    const todaysDateAsDate = new Date(todaysDate);
    const lastMenstrualPeriodAsDate = new Date(lastMenstrualPeriod);
    const dueDateAsDate = new Date(dueDate);

    const response = await prisma.nutritionHistoryAndAssessment.create({
        data: {
            userId,
            todaysDate: todaysDateAsDate,
            lastMenstrualPeriod: lastMenstrualPeriodAsDate,
            dueDate: dueDateAsDate,
            ...rest,
        },
    });

    return response;
};

/**
 * Retrieves a Nutrition History and Assessment from the database based on its ID and the user ID.
 * @param {string} NutritionHistoryAndAssessmentId - The ID of the Nutrition History and Assessment to retrieve
 * @param {string} userId - The ID of the user request the Nutrition History and Assessment.
 * @returns {Promise<INutritionHistoryAndAssessmentResponse | null>} A promise resolving to the retrieved Nutrition History and Assessment,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Nutrition History and Assessment.
 * @remarks This function retrieves a Nutrition History and Assessment from the database using Prisma based on the provided ID and the user ID.
 */
export const readNutritionHistoryAndAssessment = async (NutritionHistoryAndAssessmentId: string, userId: string) => {
    const response = await prisma.nutritionHistoryAndAssessment.findUniqueOrThrow({
        where: {
            userId,
            id: NutritionHistoryAndAssessmentId
        },
    })

    return response;
}

/**
 * Updates a Nutrition History and Assessment in the database with new Nutrition History and Assessment.
 * @param {INutritionHistoryAndAssessmentInputs} nutritionHistoryAndAssessmentInput - An array of updated Nutrition History and Assessmenties.
 * @param {string} id - The ID of the Nutrition History and Assessment to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<INutritionHistoryAndAssessmentResponse>} A promise resolving to the updated Nutrition History and Assessment.
 * @throws {Error} If there's an issue updating the Nutrition History and Assessment.
 * @remarks This function updates a Nutrition History and Assessment in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateNutritionHistoryAndAssessment = async (nutritionHistoryAndAssessmentInput: INutritionHistoryAndAssessmentInputs, id: string, userId: string) => {
    const {
        todaysDate,
        lastMenstrualPeriod,
        dueDate,
        ...rest
    } = nutritionHistoryAndAssessmentInput;

    const todaysDateAsDate = new Date(todaysDate);
    const lastMenstrualPeriodAsDate = new Date(lastMenstrualPeriod);
    const dueDateAsDate = new Date(dueDate);

    const response = await prisma.nutritionHistoryAndAssessment.update({
        where: {
            id,
            userId
        },
        data: {
            todaysDate: todaysDateAsDate,
            lastMenstrualPeriod: lastMenstrualPeriodAsDate,
            dueDate: dueDateAsDate,
            ...rest,
        }
    })

    return response;
}

/**
 * Deletes a Nutrition History and Assessment from the database.
 * @param submissionId - The ID of the Nutrition History and Assessment to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<INutritionHistoryAndAssessmentResponse>}
 * @remarks To be used by the dashboard
 */
export const deleteNutritionHistoryAndAssessment = async (submissionId: string, userId: string) => {
    const response = await prisma.nutritionHistoryAndAssessment.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });
    return response;
};