'use server';

import { prisma } from "@/lib/prisma";
import { IParticipantDemographicsFormInputs, ParticipantDemographicsFormResponseSchema, IParticipantDemographicsFormResponse } from "./definitions";

/**
 * Creates a new Participant Demographics Record in the db.
 * @param {IParticipantDemographicsFormInputs} participantDemographicsRecordInput - The Participant Demographics Record Data to be created.
 * @param {string} userId - The ID of the user creating the Participant Demographics Record
 * @returns {Promise<IParticipantDemographicsFormResponse>} A promise resolving to the created participant demographics record.
 * @throws {Error} If there's an issue creating the participant demographics record.
 * @remarks This function takes participant demographics record data and saves them to the database using Prisma.
 */
export const createParticipantDemographicsRecord = async (participantDemographicsRecordInput: IParticipantDemographicsFormInputs, userId: string) => {

    const response = await prisma.participantDemographicsForm.create({
        data: {
            userId,
            ...participantDemographicsRecordInput
        },
    });

    return ParticipantDemographicsFormResponseSchema.parse(response);
};

/**
 * Retrieves a participant demographics record from the database based on its ID and the user ID.
 * @param {string} participantDemographicsRecordId - The ID of the Participant Demographics Record to retrieve
 * @param {string} userId - The ID of the user request the Participant Demographics Record.
 * @returns {Promise<IParticipantDemographicsFormResponse | null>} A promise resolving to the retrieved Participant Demographics Record,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Participant Demographics Record.
 * @remarks This function retrieves a Participant Demographics Record from the database using Prisma based on the provided ID and the user ID.
 */
export const readParticipantDemographicsRecord = async (participantDemographicsRecordId: string, userId: string) => {
    const response = await prisma.participantDemographicsForm.findUniqueOrThrow({
        where: {
            userId,
            id: participantDemographicsRecordId
        },
    })

    return ParticipantDemographicsFormResponseSchema.parse(response);
}

export const readAllParticipantDemographicsRecord = async (userId: string) => {
    const response = await prisma.participantDemographicsForm.findMany({
        where: {
            userId
        }
    });

    return response.map(log => ParticipantDemographicsFormResponseSchema.parse(log));
}

/**
 * Updates a Participant Demographics Record in the database with new Participant Demographics Record.
 * @param {IParticipantDemographicsFormInputs} participantDemographicsRecordInput - An array of updated Participant Demographics Recordies.
 * @param {string} id - The ID of the Participant Demographics Record to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IParticipantDemographicsFormResponse>} A promise resolving to the updated Participant Demographics Record.
 * @throws {Error} If there's an issue updating the Participant Demographics Record.
 * @remarks This function updates a Participant Demographics Record in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateParticipantDemographicsRecord = async (participantDemographicsRecordInput: IParticipantDemographicsFormInputs, id: string, userId: string) => {

    const response = await prisma.participantDemographicsForm.update({
        where: {
            id,
            userId
        },
        data: {
            ...participantDemographicsRecordInput
        }
    })

    return ParticipantDemographicsFormResponseSchema.parse(response);
}

/**
 * Deletes a Participant Demographics Record from the database.
 * @param submissionId - The ID of the Participant Demographics Record to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<IParticipantDemographicsFormResponse>}
 * @remarks To be used by the dashboard
 */
export const deleteParticipantDemographicsRecord = async (submissionId: string, userId: string) => {
    const response = await prisma.participantDemographicsForm.delete({
        where: {
            id: submissionId,
            userId: userId
        }
    });

    return ParticipantDemographicsFormResponseSchema.parse(response);
};