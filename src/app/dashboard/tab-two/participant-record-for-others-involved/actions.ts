"use server"

import { prisma } from "@/lib/prisma";
import { IParticipantRecordForOthersEntry, IParticipantRecordForOthersInvolvedInputs, IParticipantRecordForOthersInvolvedResponse } from "./definitions";
import { DeliveryMode, LivingArrangements, ParticipantRecordForOthersInvolvedMaritalStatus } from "@prisma/client"

/**
 * Creates a new Participant Record For Others Involved in the db.
 * @param {IParticipantRecordForOthersInvolvedInputs} ParticipantRecordForOthersInvolvedInput - The Participant Record For Others Involved Data to be created.
 * @param {string} userId - The ID of the user creating the Participant Record For Others Involved
 * @returns {Promise<IParticipantRecordForOthersInvolvedResponse>} A promise resolving to the created Participant Record For Others Involved.
 * @throws {Error} If there's an issue creating the Participant Record For Others Involved.
 * @remarks This function takes Participant Record For Others Involved data and saves them to the database using Prisma.
 */
export const createParticipantRecordForOthersInvolved = async (ParticipantRecordForOthersInvolvedInput: IParticipantRecordForOthersEntry[], userId: string) => {
    const formattedParticipantRecordForOthersInovolvedEntries = ParticipantRecordForOthersInvolvedInput.map(participantRecordForOthersInvolvedEntry => ({
        ...participantRecordForOthersInvolvedEntry,
        dateOfBirth: new Date(participantRecordForOthersInvolvedEntry.dateOfBirth).toISOString(),
        effectiveDate: new Date(participantRecordForOthersInvolvedEntry.effectiveDate).toISOString(),
        dueDate: new Date(participantRecordForOthersInvolvedEntry.dueDate).toISOString(),
        postpartumVisitDate: participantRecordForOthersInvolvedEntry.postpartumVisitDate ? new Date(participantRecordForOthersInvolvedEntry.postpartumVisitDate).toISOString() : null,
        currentLivingArrangement: participantRecordForOthersInvolvedEntry.currentLivingArrangement as LivingArrangements,
        maritalStatus: participantRecordForOthersInvolvedEntry.maritalStatus as ParticipantRecordForOthersInvolvedMaritalStatus,
        plannedModeDelivery: participantRecordForOthersInvolvedEntry.plannedModeDelivery as DeliveryMode,
        actualModeDelivery: participantRecordForOthersInvolvedEntry.actualModeDelivery as DeliveryMode,
        priorComplications: participantRecordForOthersInvolvedEntry.priorComplications as string
    }));

    const response = await prisma.participantRecordForOthersInvolvedForm.create({
        data: {
            userId,
            participantRecordForOthersInvolvedEntries: {
                create: formattedParticipantRecordForOthersInovolvedEntries
            }
        }
    })

    return response;
};

/**
 * Retrieves a Participant Record For Others Involved from the database based on its ID and the user ID.
 * @param {string} ParticipantRecordForOthersInvolvedId - The ID of the Participant Record For Others Involved to retrieve
 * @param {string} userId - The ID of the user request the Participant Record For Others Involved.
 * @returns {Promise<IParticipantRecordForOthersInvolvedResponse | null>} A promise resolving to the retrieved Participant Record,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Participant Record For Others Involved.
 * @remarks This function retrieves a Participant Record For Others Involved from the database using Prisma based on the provided ID and the user ID.
 */
export const readParticipantRecordForOthersInvolved = async (ParticipantRecordForOthersInvolvedId: string, userId: string) => {
    const response = await prisma.participantRecordForOthersInvolvedForm.findUniqueOrThrow({
        where: {
            userId,
            id: ParticipantRecordForOthersInvolvedId
        },
    })

    return response
}

/**
 * Updates a Participant Record For Others Involved in the database with new Participant Record For Others Involved.
 * @param {IParticipantRecordForOthersInvolvedInputs} ParticipantRecordForOthersInvolvedInput - An array of updated Participant Record For Others Involvedies.
 * @param {string} id - The ID of the Participant Record For Others Involved to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IParticipantRecordForOthersInvolvedResponse>} A promise resolving to the updated Participant Record For Others Involved.
 * @throws {Error} If there's an issue updating the Participant Record For Others Involved.
 * @remarks This function updates a Participant Record For Others Involved in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateParticipantRecordForOthersInvolved = async (ParticipantRecordForOthersInvolvedInput: IParticipantRecordForOthersEntry[], id: string) => {
    const formattedParticipantRecordForOthersInovolvedEntries = ParticipantRecordForOthersInvolvedInput.map(participantRecordForOthersInvolvedEntry => ({
        ...participantRecordForOthersInvolvedEntry,
        dateOfBirth: new Date(participantRecordForOthersInvolvedEntry.dateOfBirth).toISOString(),
        effectiveDate: new Date(participantRecordForOthersInvolvedEntry.effectiveDate).toISOString(),
        dueDate: new Date(participantRecordForOthersInvolvedEntry.dueDate).toISOString(),
        postpartumVisitDate: participantRecordForOthersInvolvedEntry.postpartumVisitDate ? new Date(participantRecordForOthersInvolvedEntry.postpartumVisitDate).toISOString() : null,
        currentLivingArrangement: participantRecordForOthersInvolvedEntry.currentLivingArrangement as LivingArrangements,
        maritalStatus: participantRecordForOthersInvolvedEntry.maritalStatus as ParticipantRecordForOthersInvolvedMaritalStatus,
        plannedModeDelivery: participantRecordForOthersInvolvedEntry.plannedModeDelivery as DeliveryMode,
        actualModeDelivery: participantRecordForOthersInvolvedEntry.actualModeDelivery as DeliveryMode,
        priorComplications: participantRecordForOthersInvolvedEntry.priorComplications as string
    }));

    const response = await prisma.participantRecordForOthersInvolvedForm.update({
        where: {
            id
        },
        data: {
            participantRecordForOthersInvolvedEntries: {
                deleteMany: {},
                create: formattedParticipantRecordForOthersInovolvedEntries
            }
        },
        include: {
            participantRecordForOthersInvolvedEntries: true
        }
    })

    return response;
}

/**
 * Deletes a Participant Record For Others Involved from the database.
 * @param submissionId - The ID of the Participant Record For Others Involved to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<IParticipantRecordForOthersInvolvedResponse>}
 * @remarks To be used by the dashboard
 */
export const deleteParticipantRecordForOthersInvolved = async (submissionId: string, userId: string) => {
    const response = await prisma.participantRecordForOthersInvolvedForm.delete({
        where: {
            id: submissionId,
            userId: userId
        }
    });
    return response;
};