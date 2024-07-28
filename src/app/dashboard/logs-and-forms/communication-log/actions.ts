'use server';

import { prisma } from "@/lib/prisma";
import { CommunicationLogResponseSchema, ICommunicationEntry } from "./definitions";

/**
 * Creates a new communication log entry in the database.
 * @param {ICommunicationEntry[]} communicationLogInput - An array of communication log entries to be created.
 * @param {string} userId - The ID of the user creating the communication log entries.
 * @returns {Promise<ICommunicationLogResponse>} A promise resolving to the created communication log entry.
 * @throws {Error} If there's an issue creating the communication log entry.
 * @remarks This function takes an array of communication log entries and a user ID, creates formatted entries,
 * and saves them to the database using Prisma.
 */
export const createCommunicationLog = async (communicationLogInput: ICommunicationEntry[], userId: string) => {
    // Create communication log entry in the database
    const response = await prisma.communicationLog.create({
        data: {
            userId,
            communicationEntries: communicationLogInput
        },        
    });

    return CommunicationLogResponseSchema.parse(response);
}

/**
 * Retrieves a communication log entry from the database based on its ID and the user ID.
 * @param {string} communicationLogId - The ID of the communication log entry to retrieve.
 * @param {string} userId - The ID of the user requesting the communication log entry.
 * @returns {Promise<ICommunicationLogResponse | null>} A promise resolving to the retrieved communication log entry,
 * or null if no entry is found.
 * @throws {Error} If there's an issue retrieving the communication log entry.
 * @remarks This function retrieves a communication log entry from the database using Prisma based on the provided ID
 * and the user ID. It includes the communication entries associated with the log entry in the response.
 */
export const readCommunicationLog = async (communicationLogId: string, userId: string) => {
    // Retrieve communication log entry from the database
    const response = await prisma.communicationLog.findUniqueOrThrow({
        where: {
            userId,
            id: communicationLogId
        },
    });

    return CommunicationLogResponseSchema.parse(response);
}

/**
 * Updates a communication log entry in the database with new communication log entries.
 * @param {ICommunicationEntry[]} communicationLogInput - An array of updated communication log entries.
 * @param {string} communicationLogId - The ID of the communication log entry to update.
 * @returns {Promise<ICommunicationLogResponse>} A promise resolving to the updated communication log entry.
 * @throws {Error} If there's an issue updating the communication log entry.
 * @remarks This function updates a communication log entry in the database using Prisma. It replaces the existing
 * communication entries associated with the log entry with the updated entries provided in the input array.
 */
export const updateCommunicationLog = async (communicationLogInput: ICommunicationEntry[], communicationLogId: string, userId: string) => {    
    // Update communication log entry in the database
    const response = await prisma.communicationLog.update({
        where: {
            id: communicationLogId,
            userId
        },
        data: {
            communicationEntries: communicationLogInput
        },
    });

    return CommunicationLogResponseSchema.parse(response);
}