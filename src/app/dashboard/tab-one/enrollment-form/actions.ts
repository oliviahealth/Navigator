'use server';

import { prisma } from "@/lib/prisma";
import { IEnrollmentFormInputs } from "./definitions";

export const createEnrollmentForm = async (enrollmentFormInput: IEnrollmentFormInputs, userId: string) => {
    const { clientAge, ...rest } = enrollmentFormInput;

    const response = await prisma.enrollmentForm.create({
        data: {
            userId,
            ...rest,
            guardianDate: rest.guardianDate ? new Date(rest.guardianDate).toISOString() : null,
            gcMomsDate: new Date(rest.gcMomsDate).toISOString(),
            dateOfBirth: new Date(rest.dateOfBirth).toISOString(),
            clientDate: new Date(rest.clientDate).toISOString(),
        }
    });

    return response;
}

export const readEnrollmentForm = async (enrollmentFormId: string, userId: string) => {
    const response = await prisma.enrollmentForm.findUniqueOrThrow({
        where: {
            userId,
            id: enrollmentFormId
        }
    });

    return response;
}

export const updateEnrollmentForm = async (enrollmentFormInput: IEnrollmentFormInputs, enrollmentFormId: string, userId: string) => {
    const { clientAge, ...rest } = enrollmentFormInput;

    const response = await prisma.enrollmentForm.create({
        data: {
            userId,
            ...rest,
            guardianDate: rest.guardianDate ? new Date(rest.guardianDate).toISOString() : null,
            gcMomsDate: new Date(rest.gcMomsDate).toISOString(),
            dateOfBirth: new Date(rest.dateOfBirth).toISOString(),
            clientDate: new Date(rest.clientDate).toISOString(),
        }
    });

    return response;
}