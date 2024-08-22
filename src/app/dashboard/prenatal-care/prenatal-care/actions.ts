'use server';

import { prisma } from "@/lib/prisma";
import { PrenatalCareResponseSchema, IPrenatalCareInputs } from "./definitions";

export const createPrenatalCareRecord = async (prenatalCareInputs: IPrenatalCareInputs, userId: string) => {
    const { ...data } = prenatalCareInputs;
    const response = await prisma.prenatalCare.create({
        data: {
            userId,
            ...data
        }
    });

    return PrenatalCareResponseSchema.parse(response);
}

export const readPrenatalCareRecord = async (prenatalCareId: string, userId: string) => {
    const response = await prisma.prenatalCare.findUniqueOrThrow({
        where: {
            userId,
            id: prenatalCareId
        }
    });

    return PrenatalCareResponseSchema.parse(response);
}

export const readAllPrenatalCareRecords = async (userId: string) => {
    const response = await prisma.prenatalCare.findMany({
        where: {
            userId
        }
    });
    return response.map(form => PrenatalCareResponseSchema.parse(form));
}


export const updatePrenatalCareRecord = async (prenatalCareInputs: IPrenatalCareInputs, id: string, userId: string) => {
    const { ...data } = prenatalCareInputs;
    const response = await prisma.prenatalCare.update({
        where: {
            id,
            userId
        },
        data: {
            ...data
        }
    });

    return PrenatalCareResponseSchema.parse(response);
}

export const deletePrenatalCareRecord = async (prenatalCareId: string, userId: string) => {
    const response = await prisma.prenatalCare.deleteMany({
        where: {
            userId,
            id: prenatalCareId
        }
    });

    return PrenatalCareResponseSchema.parse(response);
}