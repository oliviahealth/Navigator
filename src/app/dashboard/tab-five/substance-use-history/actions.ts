'use server';
import { prisma } from "@/lib/prisma";
import { ISubstanceUseHistory, SubstanceUseHistoryResponseSchema } from "./definitions";

/**
 * Creates a new Substance Use History in the db.
 * @param {ISubstanceUseHistoryInput} data - The Substance Use History Data to be created.
 * @param {string} userId - The ID of the user creating the Substance Use History
 * @returns {Promise<SubstanceUseHistoryResponseSchema>} A promise resolving to the created Substance Use History.
 * @throws {Error} If there's an issue creating the Substance Use History.
 * @remarks This function takes Substance Use History data and saves them to the database using Prisma.
 */
export const createSubstanceUseHistory = async (data: ISubstanceUseHistory, userId: string) => {
  const { other_drugs, ...rest } = data;
  const response = await prisma.substanceUseHistory.create({
    data: {
      ...rest,
      other_drugs: JSON.stringify(other_drugs),
      userId,
    },
  });
  return response;
};

/**
 * Retrieves a Substance Use History from the database based on its ID and the user ID.
 * @param {string} submissionId - The ID of the Substance Use History to retrieve
 * @param {string} userId - The ID of the user requesting the Substance Use History.
 * @returns {Promise<SubstanceUseHistoryResponseSchema | null>} A promise resolving to the retrieved Substance Use History,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Substance Use History.
 * @remarks This function retrieves a Substance Use History from the database using Prisma based on the provided ID and the user ID.
 */
export const readSubstanceUseHistory = async (submissionId: string, userId: string) => {
  const response = await prisma.substanceUseHistory.findUniqueOrThrow({
    where: {
      id: submissionId,
      userId,
    },
  });
  return {
    ...response,
    other_drugs: JSON.parse(response.other_drugs as string),
  };
};

/**
 * Updates a Substance Use History in the database with new data.
 * @param {ISubstanceUseHistoryInput} data - The updated Substance Use History data.
 * @param {string} submissionId - The ID of the Substance Use History to update.
 * @returns {Promise<SubstanceUseHistoryResponseSchema>} A promise resolving to the updated Substance Use History.
 * @throws {Error} If there's an issue updating the Substance Use History.
 * @remarks This function updates a Substance Use History in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateSubstanceUseHistory = async (data: ISubstanceUseHistory, submissionId: string) => {
  const { other_drugs, ...rest } = data;
  const response = await prisma.substanceUseHistory.update({
    where: {
      id: submissionId,
    },
    data: {
      ...rest,
      other_drugs: JSON.stringify(other_drugs),
    },
  });
  return response;
};

/**
 * Deletes a Substance Use History from the database.
 * @param {string} submissionId - The ID of the Substance Use History to delete.
 * @param {string} userId - The ID of the user requesting to delete the record.
 * @returns {Promise<SubstanceUseHistoryResponseSchema>} A promise resolving to the deleted Substance Use History.
 * @throws {Error} If there's an issue deleting the Substance Use History.
 * @remarks This function deletes a Substance Use History from the database using Prisma based on the provided ID and the user ID.
 */
export const deleteSubstanceUseHistory = async (submissionId: string, userId: string) => {
    const response = await prisma.substanceUseHistory.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });
    return response
}