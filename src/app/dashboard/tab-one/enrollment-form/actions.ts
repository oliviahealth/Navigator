'use server';

import { prisma } from "@/lib/prisma";
import { EnrollmentFormResponseSchema, IEnrollmentFormInputs } from "./definitions";

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

    return EnrollmentFormResponseSchema.parse(response);
}

export const readEnrollmentForm = async (enrollmentFormId: string, userId: string) => {
    const response = await prisma.enrollmentForm.findUniqueOrThrow({
        where: {
            userId,
            id: enrollmentFormId
        }
    });

    return EnrollmentFormResponseSchema.parse(response);
}

export const updateEnrollmentForm = async (enrollmentFormInput: IEnrollmentFormInputs, enrollmentFormId: string, userId: string) => {
    const { clientAge, ...rest } = enrollmentFormInput;

    const response = await prisma.enrollmentForm.update({
        where: {
            id: enrollmentFormId,
            userId,
        },
        data: {
            ...rest,
            guardianDate: rest.guardianDate ? new Date(rest.guardianDate).toISOString() : null,
            gcMomsDate: new Date(rest.gcMomsDate).toISOString(),
            dateOfBirth: new Date(rest.dateOfBirth).toISOString(),
            clientDate: new Date(rest.clientDate).toISOString(),
        }
    });

    return EnrollmentFormResponseSchema.parse(response);
}