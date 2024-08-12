'use server';

import { prisma } from "@/lib/prisma";
import { IParticipantRecordForOthersEntry, ParticipantRecordForOthersInvolvedResponseSchema } from "./definitions";

/**
 * Creates a new Participant Record Entry in the database.
 * @param {IParticipantRecordForOthersInvolvedEntry[]} participantRecordFormInput - An array of participant record entries to be created.
 * @param {string} userId - The ID of the user creating the participant record entries.
 * @returns {Promise<IParticipantRecordForOthersInvolvedResponse>} A promise resolving to the created participant record entry.
 * @throws {Error} If there's an issue creating the participant record entry.
 * @remarks This function takes an array of participant record entries and a user ID, creates formatted entries,
 * and saves them to the database using Prisma.
 */
export const createParticipantRecordForOthersInvolved = async (participantRecordFormInput: IParticipantRecordForOthersEntry[], userId: string) => {
    // Create participant record entry in the database
    const response = await prisma.participantRecordForOthersInvolvedForm.create({
        data: {
            userId,
            participantRecordForOthersInvolvedEntries: participantRecordFormInput
        },
       
    });

    return ParticipantRecordForOthersInvolvedResponseSchema.parse(response);
}

/**
 * Retrieves a participant record entry from the database based on its ID and the user ID.
 * @param {string} participantRecordId - The ID of the participant record entry to retrieve.
 * @param {string} userId - The ID of the user requesting the participant record entry.
 * @returns {Promise<IParticipantRecordForOthersInvolvedResponse | null>} A promise resolving to the retrieved participant record entry,
 * or null if no entry is found.
 * @throws {Error} If there's an issue retrieving the participant record entry.
 * @remarks This function retrieves a participant record entry from the database using Prisma based on the provided ID
 * and the user ID. It includes the participant record entries associated with the record entry in the response.
 */
export const readParticipantRecordForOthersInvolved = async (participantRecordId: string, userId: string) => {
    // Retrieve participant record entry from the database
    const response = await prisma.participantRecordForOthersInvolvedForm.findUniqueOrThrow({
        where: {
            userId,
            id: participantRecordId
        }
    });

    return ParticipantRecordForOthersInvolvedResponseSchema.parse(response);
}

/**
 * Updates a participant record entry in the database with new participant record entries.
 * @param {IParticipantRecordForOthersInvolvedEntry[]} participantRecordFormInput - An array of updated participant record entries.
 * @param {string} participantRecordId - The ID of the participant record entry to update.
 * @returns {Promise<IParticipantRecordForOthersInvolvedResponse>} A promise resolving to the updated participant record entry.
 * @throws {Error} If there's an issue updating the participant record entry.
 * @remarks This function updates a participant record entry in the database using Prisma. It replaces the existing
 * participation record entries associated with the record entry with the updated entries provided in the input array.
 */
export const updateParticipantRecordForOthersInvolved = async (participantRecordFormInput: IParticipantRecordForOthersEntry[], participantRecordId: string, userId: string) => {
    const response = await prisma.participantRecordForOthersInvolvedForm.update({
        where: {
            id: participantRecordId,
            userId
        },
        data: {
            participantRecordForOthersInvolvedEntries: participantRecordFormInput
        },
    });

    return ParticipantRecordForOthersInvolvedResponseSchema.parse(response);
}