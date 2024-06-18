'use server';

import { prisma } from "@/lib/prisma";
import { IIntimatePartnerViolenceFormInputs } from "./definitions";

export const createIntimatePartnerViolenceForm = async (intimatePartnerViolenceFormInput: IIntimatePartnerViolenceFormInputs, userId: string) => {
    const response = await prisma.intimatePartnerViolenceForm.create({
        data: {
            userId,
            ...intimatePartnerViolenceFormInput,
            dateCreated: new Date().toISOString(),
            dateModified: new Date().toISOString()
        }
    });

    return response;
}

export const readIntimatePartnerViolenceForm = async (intimatePartnerViolenceFormId: string, userId: string) => {
    const response = await prisma.intimatePartnerViolenceForm.findUniqueOrThrow({
        where: {
            userId,
            id: intimatePartnerViolenceFormId
        }
    });

    return response;
}

export const updateIntimatePartnerViolenceForm = async (intimatePartnerViolenceFormInput: IIntimatePartnerViolenceFormInputs, intimatePartnerViolenceFormId: string, userId: string) => {
    const response = await prisma.intimatePartnerViolenceForm.update({
        where: {
            id: intimatePartnerViolenceFormId
        },
        data: {
            userId,
            ...intimatePartnerViolenceFormInput,
            dateModified: new Date().toISOString()
        }
    });

    return response;
}