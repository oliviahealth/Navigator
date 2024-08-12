'use server';

import { prisma } from "@/lib/prisma";
import { IIPVScreeningInputs, IIPVScreeningResponse } from "./definitions";

export const createIPVScreening = async (ipvScreeningInput: IIPVScreeningInputs, userId: string) => {
    const {
        dateTaken,
        ipvScreeningDate,
        ipvDisclosureDate,
        ...rest
    } = ipvScreeningInput;

    const dateTakenAsDate = new Date(dateTaken);
    const ipvScreeningDateAsDate = ipvScreeningDate ? new Date(ipvScreeningDate) : null;
    const ipvDisclosureDateAsDate = ipvDisclosureDate ? new Date(ipvDisclosureDate) : null;

    const response = await prisma.iPVScreening.create({
        data: {
            userId,
            dateTaken: dateTakenAsDate,
            ipvScreeningDate: ipvScreeningDateAsDate,
            ipvDisclosureDate: ipvDisclosureDateAsDate,
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
    const {
        dateTaken,
        ipvScreeningDate,
        ipvDisclosureDate,
        ...rest
    } = ipvScreeningInput;

    const dateTakenAsDate = new Date(dateTaken);
    const ipvScreeningDateAsDate = ipvScreeningDate ? new Date(ipvScreeningDate) : null;
    const ipvDisclosureDateAsDate = ipvDisclosureDate ? new Date(ipvDisclosureDate) : null;

    const response = await prisma.iPVScreening.update({
        where: {
            id,
            userId
        },
        data: {
            dateTaken: dateTakenAsDate,
            ipvScreeningDate: ipvScreeningDateAsDate,
            ipvDisclosureDate: ipvDisclosureDateAsDate,
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