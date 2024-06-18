'use server';

import { prisma } from "@/lib/prisma";
import { IAppointmentEntry, IAppointmentLogInputs, IAppointmentLogResponse } from './definitions';

/**
 * Creates a new appointment log entry in the database.
 * @param {IAppointmentEntry[]} appointmentLogInput - An array of appointment log entries to be created.
 * @param {string} userId - The ID of the user creating the appointment log entries.
 * @returns {Promise<IAppointmentLogResponse>} A promise resolving to the created appointment log entry.
 * @throws {Error} If there's an issue creating the appointment log entry.
 */
export const createAppointmentLog = async (appointmentLogInput: IAppointmentEntry[], userId: string): Promise<IAppointmentLogResponse> => {
    // Format appointment log entries
    const formattedAppointmentEntries = appointmentLogInput.map(appointmentEntry => ({
        ...appointmentEntry,
        dateTime: new Date(appointmentEntry.dateTime).toISOString(),
    }));

    // Create appointment log entry in the database
    const response = await prisma.appointmentLog.create({
        data: {
            userId,
            appointmentEntries: {
                create: formattedAppointmentEntries
            },
        },
        include: {
            appointmentEntries: true
        }
    });

    return response;
}

/**
 * Retrieves an appointment log entry from the database based on its ID and the user ID.
 * @param {string} appointmentLogId - The ID of the appointment log entry to retrieve.
 * @param {string} userId - The ID of the user requesting the appointment log entry.
 * @returns {Promise<IAppointmentLogResponse | null>} A promise resolving to the retrieved appointment log entry,
 * or null if no entry is found.
 * @throws {Error} If there's an issue retrieving the appointment log entry.
 */
export const readAppointmentLog = async (appointmentLogId: string, userId: string): Promise<IAppointmentLogResponse | null> => {
    // Retrieve appointment log entry from the database
    const response = await prisma.appointmentLog.findUniqueOrThrow({
        where: {
            userId,
            id: appointmentLogId
        },
        include: {
            appointmentEntries: true
        }
    });

    return response;
}

export const updateAppointmentLog = async (appointmentLogInput: IAppointmentEntry[], appointmentLogId: string, userId: string) => {
    // Format updated appointment log entries
    const formattedAppointmentEntries = appointmentLogInput.map(appointmentEntry => ({
        ...appointmentEntry,
        dateTime: new Date(appointmentEntry.dateTime).toISOString(),
        who: appointmentEntry.who,
        location: appointmentEntry.location,
        notes: appointmentEntry.notes,
    }));

    // Update appointment log entry in the database
    const response = await prisma.appointmentLog.update({
        where: {
            id: appointmentLogId,
            // Optionally, you can ensure that the log belongs to the user attempting the update
            // userId: userId,
        },
        data: {
            appointmentEntries: {
                deleteMany: {}, // Deletes existing entries
                create: formattedAppointmentEntries // Creates new entries
            },
        },
        include: {
            appointmentEntries: true
        }
    });

    return response;
}