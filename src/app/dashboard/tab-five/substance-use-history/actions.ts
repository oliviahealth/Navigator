'use server';

import { prisma } from "@/lib/prisma";
import { ISubstanceUseHistoryInput, SubstanceUseHistoryResponseSchema } from "./definitions";

export const createSubstanceUseHistory = async (data: ISubstanceUseHistoryInput, userId: string) => {
    const { other_drugs, ...rest } = data;
    const response = await prisma.substanceUseHistory.create({
        data: {
            ...rest,
            other_drugs: JSON.stringify(other_drugs),
            userId,
        },
    });

    return response;
};

export const readSubstanceUseHistory = async (submissionId: string, userId: string) => {
    const response = await prisma.substanceUseHistory.findUniqueOrThrow({
        where: {
            id: submissionId,
            userId,
        },
    });

    return {
        ...response,
        other_drugs: JSON.parse(response.other_drugs as string),
    };
};

export const updateSubstanceUseHistory = async (data: ISubstanceUseHistoryInput, submissionId: string) => {
    const { other_drugs, ...rest } = data;
    const response = await prisma.substanceUseHistory.update({
        where: {
            id: submissionId,
        },
        data: {
            ...rest,
            other_drugs: JSON.stringify(other_drugs),
        },
    });

    return response;
};