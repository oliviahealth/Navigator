'use server';

import { prisma } from "@/lib/prisma";
import { IEnrollmentFormInputs } from "./definitions";

export const createEnrollmentForm = async (enrollmentFormInput: IEnrollmentFormInputs, userId: string) => {
    const { emergencyContacts } = enrollmentFormInput;

    const response = await prisma.enrollmentForm.create({
        data: {
            userId,
            ...enrollmentFormInput,
            guardianDate: new Date(enrollmentFormInput.guardianDate).toISOString(),
            gcMomsDate: new Date(enrollmentFormInput.gcMomsDate).toISOString(),
            dateOfBirth: new Date(enrollmentFormInput.dateOfBirth).toISOString(),
            clientDate: new Date(enrollmentFormInput.clientDate).toISOString(),
            emergencyContacts: {
                create: emergencyContacts
            }
        },
        include: {
            emergencyContacts: true
        }
    });

    return response;
}

export const readEnrollmentForm = async(enrollmentFormId: string, userId: string) => {
    const response = await prisma.enrollmentForm.findUniqueOrThrow({
        where: {
            userId,
            id: enrollmentFormId
        },
        include: {
            emergencyContacts: true
        }
    });

    return response;
}

export const updateEnrollmentForm = async (enrollmentFormInput: IEnrollmentFormInputs, enrollmentFormId: string, userId: string) => {
    const { emergencyContacts } = enrollmentFormInput;

    const response = await prisma.enrollmentForm.update({
        where: {
            id: enrollmentFormId
        },
        data: {
            userId,
            ...enrollmentFormInput,
            guardianDate: new Date(enrollmentFormInput.guardianDate).toISOString(),
            gcMomsDate: new Date(enrollmentFormInput.gcMomsDate).toISOString(),
            dateOfBirth: new Date(enrollmentFormInput.dateOfBirth).toISOString(),
            clientDate: new Date(enrollmentFormInput.clientDate).toISOString(),
            emergencyContacts: {
                deleteMany: {},
                create: emergencyContacts
            }
        },
        include: {
            emergencyContacts: true
        }
    });

    return response;
}