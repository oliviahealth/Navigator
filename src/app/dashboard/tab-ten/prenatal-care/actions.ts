'use server';

import { prisma } from "@/lib/prisma";
import { PrenatalCareResponseSchema, IPrenatalCareInputs } from "./definitions";

export const createPrenatalCareRecord = async (prenatalCareInputs: IPrenatalCareInputs, userId: string) => {
    const { ...data } = prenatalCareInputs;
    const response = await prisma.prenatalCare.create({
        data: {
            ...data,
            userId
        }
    });

    return PrenatalCareResponseSchema.parse(response);
}

export const readPrenatalCareRecord = async (prenatalCareId: string, userId: string) => {
    const response = await prisma.prenatalCare.findUniqueOrThrow({
        where: {
            id: prenatalCareId,
            userId
        }
    });

    return PrenatalCareResponseSchema.parse(response);
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
            id: prenatalCareId,
            userId
        }
    });

    return PrenatalCareResponseSchema.parse(response);
}