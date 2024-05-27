'use server';

import { prisma } from "@/lib/prisma";
import { ICommunicationEntry } from "./definitions";
import { CommunicationMethod, FollowUpNeeded } from "@prisma/client";

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
    // Format communication log entries
    const formattedCommunicationEntries = communicationLogInput.map(communicationEntry => ({
        ...communicationEntry,
        dateTime: new Date(communicationEntry.dateTime).toISOString(),
        method: communicationEntry.method as CommunicationMethod,
        followUpNeeded: communicationEntry.followUpNeeded as FollowUpNeeded
    }));

    // Create communication log entry in the database
    const response = await prisma.communicationLog.create({
        data: {
            userId,
            communicationEntries: {
                create: formattedCommunicationEntries // Create a new CommunctionEntry record in the db and store the ids in an array
            },
        },
        include: {
            communicationEntries: true
        }
    });

    return response;
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
        include: {
            communicationEntries: true,
        },
    });

    return response;
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
export const updateCommunicationLog = async (communicationLogInput: ICommunicationEntry[], communicationLogId: string) => {    
    // Format updated communication log entries
    const formattedCommunicationEntries = communicationLogInput.map(communicationEntry => ({
        ...communicationEntry,
        dateTime: new Date(communicationEntry.dateTime).toISOString(),
        method: communicationEntry.method as CommunicationMethod,
        followUpNeeded: communicationEntry.followUpNeeded as FollowUpNeeded,
    }));

    // Update communication log entry in the database
    const response = await prisma.communicationLog.update({
        where: {
            id: communicationLogId,
        },
        data: {
            communicationEntries: {
                deleteMany: {}, // Deletes existing entries
                create: formattedCommunicationEntries // Creates new entries
            },
        },
        include: {
            communicationEntries: true
        }
    });

    return response;
}