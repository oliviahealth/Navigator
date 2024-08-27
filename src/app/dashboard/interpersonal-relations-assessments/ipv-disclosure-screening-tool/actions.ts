'use server';

import { prisma } from "@/lib/prisma";
import { IIPVDisclosureScreeningToolInputs, IPVDisclosureScreeningToolResponseSchema } from "./definitions";

export const createIPVDisclosureScreeningTool = async (ipvScreeningInput: IIPVDisclosureScreeningToolInputs, userId: string) => {

    const response = await prisma.iPVDisclosureScreeningTool.create({
        data: {
            userId,
            ...ipvScreeningInput,
        },
    });

    return IPVDisclosureScreeningToolResponseSchema.parse(response);
};

export const readIPVDisclosureScreeningTool = async (ipvScreeningId: string, userId: string) => {
    const response = await prisma.iPVDisclosureScreeningTool.findUniqueOrThrow({
        where: {
            userId,
            id: ipvScreeningId
        },
    });

    return IPVDisclosureScreeningToolResponseSchema.parse(response);
};

export const readAllIPVDisclosureScreeningTools = async (userId: string) => {
    const response = await prisma.iPVDisclosureScreeningTool.findMany({
        where: {
            userId,
        },
    });

    return response.map(log => IPVDisclosureScreeningToolResponseSchema.parse(log));
};

export const updateIPVDisclosureScreeningTool = async (ipvScreeningInput: IIPVDisclosureScreeningToolInputs, id: string, userId: string) => {

    const response = await prisma.iPVDisclosureScreeningTool.update({
        where: {
            id,
            userId
        },
        data: {
            ...ipvScreeningInput,
        }
    });

    return IPVDisclosureScreeningToolResponseSchema.parse(response);
};

export const deleteIPVDisclosureScreeningTool = async (submissionId: string, userId: string) => {
    const response = await prisma.iPVDisclosureScreeningTool.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });
    return IPVDisclosureScreeningToolResponseSchema.parse(response);
};