'use server';

import { prisma } from '@/lib/prisma';
import { CurrentMedicationListResponseSchema, ICurrentMedicationListInputs } from './definitions';

export const createCurrentMedicationListRecord = async (currentMedicationListInput: ICurrentMedicationListInputs, userId: string) => {
    const { ...data } = currentMedicationListInput;

    const response = await prisma.currentMedicationList.create({
        data: {
            userId,
            ...data
        },
    });

    return CurrentMedicationListResponseSchema.parse(response);
};

export const readCurrentMedicationListRecord = async (currentMedicationListId: string, userId: string) => {
    const response = await prisma.currentMedicationList.findUniqueOrThrow({
        where: {
            id: currentMedicationListId,
            userId,
        },
    });

    return CurrentMedicationListResponseSchema.parse(response);
};

export const readAllCurrentMedicationListRecords = async (userId: string) => {
    const response = await prisma.currentMedicationList.findMany({
        where: {
            userId,
        },
    });

    return response.map(form => CurrentMedicationListResponseSchema.parse(form));
};


export const updateCurrentMedicationListRecord = async (currentMedicationListInput: ICurrentMedicationListInputs, id: string, userId: string) => {
    const { currentMedicationList, notes } = currentMedicationListInput;

    const response = await prisma.currentMedicationList.update({
        where: {
            id,
            userId,
        },
        data: {
            currentMedicationList,
            notes,
        },
    });

    return CurrentMedicationListResponseSchema.parse(response);

};

export const deleteCurrentMedicationListRecord = async (currentMedicationListId: string, userId: string) => {
    const response = await prisma.currentMedicationList.deleteMany({
        where: {
            id: currentMedicationListId,
            userId,
        },
    });

    return CurrentMedicationListResponseSchema.parse(response);
};