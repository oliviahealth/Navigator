'use server';

import { prisma } from "@/lib/prisma";
import { IMediaAppearanceFormInput, MediaAppearanceFormResponseSchema } from "./definitions";

export const createMediaAppearanceForm = async (mediaAppearanceFormInput: IMediaAppearanceFormInput, userId: string) => {
    const { participantAge, ...rest } = mediaAppearanceFormInput;

    const response = await prisma.mediaAppearanceForm.create({
        data: {
            userId,
            ...rest,
            participantDate: new Date(mediaAppearanceFormInput.participantDate).toISOString(),
            guardianDate: mediaAppearanceFormInput.participantDate ? new Date(mediaAppearanceFormInput.participantDate).toISOString() : null
        }
    });

    return MediaAppearanceFormResponseSchema.parse(response);
}

export const readMediaAppearanceForm = async (mediaAppearanceFormId: string, userId: string) => {
    const response = await prisma.mediaAppearanceForm.findUniqueOrThrow({
        where: {
            userId,
            id: mediaAppearanceFormId
        }
    });

    return MediaAppearanceFormResponseSchema.parse(response);
}

export const updateMediaAppearanceForm = async (mediaAppearanceFormInput: IMediaAppearanceFormInput, mediaAppearanceFormId: string, userId: string) => {
    const { participantAge, ...rest } = mediaAppearanceFormInput;

    const response = await prisma.mediaAppearanceForm.update({
        where: {
            userId,
            id: mediaAppearanceFormId
        },
        data: {
            ...rest,
            participantDate: new Date(mediaAppearanceFormInput.participantDate).toISOString(),
            guardianDate: mediaAppearanceFormInput.participantDate ? new Date(mediaAppearanceFormInput.participantDate).toISOString() : null
        }
    });

    return MediaAppearanceFormResponseSchema.parse(response);
}