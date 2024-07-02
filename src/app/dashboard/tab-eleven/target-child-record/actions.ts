'use server';
import { prisma } from "@/lib/prisma";
import { ITargetChildRecordInputs, ITargetChildRecordResponse, TargetChildRecordResponseSchema } from "./definitions";
import { encryptSSN } from "./encryption";

/**
 * Creates a new Target Child Record in the db.
 * @param {ITargetChildRecordInput} targetChildRecordInput - The Target Child Record Data to be created.
 * @param {string} userId - The ID of the user creating the Target Child Record
 * @returns {Promise<ITargetChildRecordResponse>} A promise resolving to the created Target Child Record.
 * @throws {Error} If there's an issue creating the Target Child Record.
 * @remarks This function takes Target Child Record data and saves them to the database using Prisma.
 */
export const createTargetChildRecord = async (targetChildRecordInput: ITargetChildRecordInputs, userId: string) => {
    const response = await prisma.targetChildRecord.create({
        data: {
            userId,
            ...targetChildRecordInput,
            dateCompleted: new Date(targetChildRecordInput.dateCompleted),
            childDateOfBirth: new Date(targetChildRecordInput.childDateOfBirth),
            childEnrollmentDate: new Date(targetChildRecordInput.childEnrollmentDate),
            childSSN: targetChildRecordInput.childSSN ? encryptSSN(targetChildRecordInput.childSSN) : null
        }
    });

    return TargetChildRecordResponseSchema.parse(response);
};

/**
 * Retrieves a Target Child Record from the database based on its ID and the user ID.
 * @param {string} submissionId - The ID of the Target Child Record to retrieve
 * @param {string} userId - The ID of the user requesting the Target Child Record.
 * @returns {Promise<ITargetChildRecordResponse | null>} A promise resolving to the retrieved Target Child Record,
 * or null if no entry is found
 * @throws {Error} If there's an issue retrieving the Target Child Record.
 * @remarks This function retrieves a Target Child Record from the database using Prisma based on the provided ID and the user ID.
 */
export const readTargetChildRecord = async (submissionId: string, userId: string) => {
    const response = await prisma.targetChildRecord.findUniqueOrThrow({
        where: {
            id: submissionId,
            userId,
        },
    });

    return TargetChildRecordResponseSchema.parse(response);
};

/**
 * Updates a Target Child Record in the database with new data.
 * @param {ITargetChildRecordInput} targetChildRecordInput - The updated Target Child Record data.
 * @param {string} submissionId - The ID of the Target Child Record to update.
 * @returns {Promise<ITargetChildRecordResponse>} A promise resolving to the updated Target Child Record.
 * @throws {Error} If there's an issue updating the Target Child Record.
 * @remarks This function updates a Target Child Record in the database using Prisma. It replaces the existing
 * record with the record provided in the input.
 */
export const updateTargetChildRecord = async (targetChildRecordInput: ITargetChildRecordInputs, id: string, userId: string) => {
    const response = await prisma.targetChildRecord.update({
        where: {
            id,
            userId
        },
        data: {
            ...targetChildRecordInput,
            dateCompleted: new Date(targetChildRecordInput.dateCompleted),
            childDateOfBirth: new Date(targetChildRecordInput.childDateOfBirth),
            childEnrollmentDate: new Date(targetChildRecordInput.childEnrollmentDate),
            childSSN: targetChildRecordInput.childSSN ? encryptSSN(targetChildRecordInput.childSSN) : null
        }
    });

    return TargetChildRecordResponseSchema.parse(response);
};

/**
 * Deletes a Target Child Record from the database.
 * @param {string} id - The ID of the Target Child Record to delete.
 * @param {string} userId - The ID of the user requesting to delete the record.
 * @returns {Promise<ITargetChildRecordResponse>} A promise resolving to the deleted Target Child Record.
 * @throws {Error} If there's an issue deleting the Target Child Record.
 * @remarks This function deletes a Target Child Record from the database using Prisma based on the provided ID and the user ID.
 */
export const deleteTargetChildRecord = async (id: string, userId: string) => {
    const response = await prisma.targetChildRecord.deleteMany({
        where: {
            id,
            userId
        }
    });

    return TargetChildRecordResponseSchema.parse(response);
}