'use server';

import { prisma } from "@/lib/prisma";
import { IIPVScreeningInputs, IIPVScreeningResponse } from "./definitions";

export const createIPVScreening = async (ipvScreeningInput: IIPVScreeningInputs, userId: string) => {
    const { ...rest } = ipvScreeningInput;
  
    const response = await prisma.iPVScreening.create({
      data: {
        userId,
        ...rest,
      },
    });
  
    return response;
};

export const readIPVScreening = async (ipvScreeningId: string, userId: string) => {
    const response = await prisma.iPVScreening.findUniqueOrThrow({
        where: {
            userId,
            id: ipvScreeningId
        },
    });

    return response;
};

export const updateIPVScreening = async (ipvScreeningInput: IIPVScreeningInputs, id: string, userId: string) => {
    const { ...rest } = ipvScreeningInput;

    const response = await prisma.iPVScreening.update({
        where: {
            id,
            userId
        },
        data: {
            ...rest,
        }
    });

    return response;
};

export const deleteIPVScreening = async (submissionId: string, userId: string) => {
    const response = await prisma.iPVScreening.deleteMany({
        where: {
            id: submissionId,
            userId: userId
        }
    });
    return response;
};