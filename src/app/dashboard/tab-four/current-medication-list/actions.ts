'use server';

import { prisma } from '@/lib/prisma';
import { ICurrentMedicationListInputs, ICurrentMedicationListFormResponse } from './definitions';

export const createCurrentMedicationListRecord = async (currentMedicationListInput: ICurrentMedicationListInputs, userId: string) => {
    const { currentMedicationList, notes } = currentMedicationListInput;

    const response = await prisma.currentMedicationList.create({
        data: {
            userId,
            currentMedicationList,
            notes,
        },
    });

    return response;
};

export const readCurrentMedicationListRecord = async (currentMedicationListId: string, userId: string) => {
    const response = await prisma.currentMedicationList.findUniqueOrThrow({
        where: {
            id: currentMedicationListId,
            userId,
        },
    });

    return response;
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

    return response;
};

export const deleteCurrentMedicationListRecord = async (currentMedicationListId: string, userId: string) => {
    const response = await prisma.currentMedicationList.deleteMany({
        where: {
            id: currentMedicationListId,
            userId,
        },
    });

    return response;
};