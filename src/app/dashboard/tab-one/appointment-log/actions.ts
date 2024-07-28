'use server';

import { prisma } from "@/lib/prisma";
import { AppointmentLogResponseSchema, IAppointmentLogInputs, IAppointmentLogResponse } from './definitions';

/**
 * Creates a new appointment log entry in the database.
 * @param {IAppointmentLogInputs} appointmentLogInput - An array of appointment log entries to be created.
 * @param {string} userId - The ID of the user creating the appointment log entries.
 * @returns {Promise<IAppointmentLogResponse>} A promise resolving to the created appointment log entry.
 * @throws {Error} If there's an issue creating the appointment log entry.
 */
export const createAppointmentLog = async (appointmentLogInput: IAppointmentLogInputs, userId: string): Promise<IAppointmentLogResponse> => {
    // Create appointment log entry in the database
    const response = await prisma.appointmentLog.create({
        data: {
            userId,
            ...appointmentLogInput
        }
    });

    return AppointmentLogResponseSchema.parse(response);
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
    });

    return AppointmentLogResponseSchema.parse(response);
}


/**
 * Updates a appointment log entry in the database with new appointment log entries.
 * @param {IAppointmentLogInputs} appointmentLogInput - An array of updated appointment log entries.
 * @param {string} appointmentLogId - The ID of the appointment log entry to update.
 * @returns {Promise<IAppointmentLogResponse>} A promise resolving to the updated appointment log entry.
 * @throws {Error} If there's an issue updating the appointment log entry.
 * @remarks This function updates a appointment log entry in the database using Prisma. It replaces the existing
 * appointment entries associated with the log entry with the updated entries provided in the input array.
 */
export const updateAppointmentLog = async (appointmentLogInput: IAppointmentLogInputs, appointmentLogId: string, userId: string) => {
    // Update appointment log entry in the database
    const response = await prisma.appointmentLog.update({
        where: {
            id: appointmentLogId,
            userId
        },
        data: {
            ...appointmentLogInput
        },
    });

    return AppointmentLogResponseSchema.parse(response);
}