'use server';

import { prisma } from "@/lib/prisma";
import { IMediaAppearanceFormInput, MediaAppearanceFormResponseSchema } from "./definitions";

export const createMediaApperanceForm = async (mediaApperanceFormInput: IMediaAppearanceFormInput, userId: string) => {
    const { participantAge, ...rest } = mediaApperanceFormInput;

    const response = await prisma.mediaAppearanceForm.create({
        data: {
            userId,
            ...rest,
            // participantDate: new Date(mediaApperanceFormInput.participantDate).toISOString(),
            // guardianDate: mediaApperanceFormInput.guardianDate ? new Date(mediaApperanceFormInput.guardianDate).toISOString() : null
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

    const response = await prisma.mediaAppearanceForm.create({
        data: {
            userId,
            ...rest
        }
    });

    return MediaAppearanceFormResponseSchema.parse(response);
}