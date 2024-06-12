'use server';

import { prisma } from '@/lib/prisma';
import { ISubstanceUseHistoryInputs, ISubstanceUseHistoryResponse, ISubstanceUseHistoryUpdateInput } from './definitions';

export const createSubstanceUseHistoryRecord = async (substanceUseHistoryInput: ISubstanceUseHistoryInputs) => {
    const { userId, substance, everUsed, usedDuringPregnancy, dateLastUsed } = substanceUseHistoryInput;

    const response = await prisma.substanceUseHistory.create({
        data: {
            userId,
            substance,
            everUsed,
            usedDuringPregnancy,
            dateLastUsed,
        },
        include: { User: true },
    });

    return response;
};

export const readSubstanceUseHistoryRecord = async (substanceUseHistoryId: string) => {
    const response = await prisma.substanceUseHistory.findUniqueOrThrow({
        where: {
            id: substanceUseHistoryId,
        },
        include: { User: true },
    });

    return response;
};

export const updateSubstanceUseHistoryRecord = async (substanceUseHistoryInput: ISubstanceUseHistoryUpdateInput, id: string) => {
    const { userId, substance, everUsed, usedDuringPregnancy, dateLastUsed } = substanceUseHistoryInput;

    const response = await prisma.substanceUseHistory.update({
        where: {
            id,
        },
        data: {
            userId,
            substance,
            everUsed,
            usedDuringPregnancy,
            dateLastUsed,
        },
        include: { User: true },
    });

    return response;
};

export const deleteSubstanceUseHistoryRecord = async (substanceUseHistoryId: string) => {
    const response = await prisma.substanceUseHistory.delete({
        where: {
            id: substanceUseHistoryId,
        },
        include: { User: true },
    });

    return response;
};