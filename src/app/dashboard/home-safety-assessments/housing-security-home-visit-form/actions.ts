'use server';

import { prisma } from "@/lib/prisma";
import { HousingSecurityHomeVisitResponseSchema, IHousingSecurityHomeVisitInputs } from "./definitions";
import { YesNoDidNotAsk } from "@prisma/client";

/**
 * Creates a new Housing Security Home Visit in the db.
 * @param {IHousingSecurityHomeVisitInputs} housingSecurityHomeVisitInput - The Housing Security Home Visit data to be created.
 * @param {string} userId - The ID of the user creating the Housing Security Home Visit.
 * @returns {Promise<IHousingSecurityHomeVisitResponse>} A promise resolving to the created Housing Security Home Visit.
 * @throws {Error} If there's an issue creating the Housing Security Home Visit.
 */
export const createHousingSecurityHomeVisit = async (housingSecurityHomeVisitInput: IHousingSecurityHomeVisitInputs, userId: string) => {
    const response = await prisma.housingSecurityHomeVisitForm.create({
        data: {
            userId,
            ...housingSecurityHomeVisitInput,
            concerns: housingSecurityHomeVisitInput.concerns as YesNoDidNotAsk,
            erVisitSpecific: housingSecurityHomeVisitInput.erVisitSpecific ? housingSecurityHomeVisitInput.erVisitSpecific : [],
            wellChildVisitsSpecific: housingSecurityHomeVisitInput.wellChildVisitsSpecific ? housingSecurityHomeVisitInput.wellChildVisitsSpecific : []
        },
    });

    return HousingSecurityHomeVisitResponseSchema.parse(response)
};

/**
 * Retrieves a Housing Security Home Visit from the database based on its ID and the user ID.
 * @param {string} housingSecurityHomeVisitId - The ID of the Housing Security Home Visit to retrieve.
 * @param {string} userId - The ID of the user requesting the Housing Security Home Visit.
 * @returns {Promise<IHousingSecurityHomeVisitResponse | null>} A promise resolving to the retrieved Housing Security Home Visit,
 * or null if no entry is found.
 * @throws {Error} If there's an issue retrieving the Housing Security Home Visit.
 */
export const readHousingSecurityHomeVisit = async (housingSecurityHomeVisitId: string, userId: string) => {
    const response = await prisma.housingSecurityHomeVisitForm.findUniqueOrThrow({
        where: {
            id: housingSecurityHomeVisitId,
            userId,
        },
    });

    return HousingSecurityHomeVisitResponseSchema.parse(response)
};

export const readAllHousingSecurityHomeVisit = async (userId: string) => {
    const response = await prisma.housingSecurityHomeVisitForm.findMany({
        where: {
            userId
        }
    });

    return response.map(log => HousingSecurityHomeVisitResponseSchema.parse(log));
};

/**
 * Updates a Housing Security Home Visit in the database with new data.
 * @param {IHousingSecurityHomeVisitInputs} housingSecurityHomeVisitInput - The updated Housing Security Home Visit data.
 * @param {string} id - The ID of the Housing Security Home Visit to update.
 * @param {string} userId - The ID of the user requesting to update the record.
 * @returns {Promise<IHousingSecurityHomeVisitResponse>} A promise resolving to the updated Housing Security Home Visit.
 * @throws {Error} If there's an issue updating the Housing Security Home Visit.
 */
export const updateHousingSecurityHomeVisit = async (housingSecurityHomeVisitInput: IHousingSecurityHomeVisitInputs, id: string, userId: string) => {
    const response = await prisma.housingSecurityHomeVisitForm.update({
        where: {
            id,
            userId,
        },
        data: {
            userId,
            ...housingSecurityHomeVisitInput,
            concerns: housingSecurityHomeVisitInput.concerns as YesNoDidNotAsk,
            erVisitSpecific: housingSecurityHomeVisitInput.erVisitSpecific ? housingSecurityHomeVisitInput.erVisitSpecific : [],
            wellChildVisitsSpecific: housingSecurityHomeVisitInput.wellChildVisitsSpecific ? housingSecurityHomeVisitInput.wellChildVisitsSpecific : []
        },
    });

    return HousingSecurityHomeVisitResponseSchema.parse(response)
};

/**
 * Deletes a Housing Security Home Visit from the database.
 * @param submissionId - The ID of the Housing Security Home Visit to delete.
 * @param userId - The ID of the user requesting to delete the record.
 * @returns {Promise<IHousingSecurityHomeVisitResponse>}
 */
export const deleteHousingSecurityHomeVisit = async (submissionId: string, userId: string) => {
    const response = await prisma.housingSecurityHomeVisitForm.deleteMany({
        where: {
            id: submissionId,
            userId,
        },
    });

    return HousingSecurityHomeVisitResponseSchema.parse(response)
};
