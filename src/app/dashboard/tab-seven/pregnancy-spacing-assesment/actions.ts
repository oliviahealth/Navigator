'use server';

import { prisma } from "@/lib/prisma";
import { PregnancySpacingAssesmentResponseSchema, IPregnancySpacingAssesmentInputs } from "./definitions";

export const createPregnancySpacingAssesmentRecord = async (pregnancySpacingAssesmentInput: IPregnancySpacingAssesmentInputs, userId: string) => {
    const { hadPregnanciesLessThan12MoApart, discussFamilyPlanningInterest, label, staffNotes } = pregnancySpacingAssesmentInput;
    const response = await prisma.pregnancySpacingAssesment.create({
        data: {
            hadPregnanciesLessThan12MoApart,
            discussFamilyPlanningInterest,
            label,
            staffNotes,
            userId,
        }
    });

    return PregnancySpacingAssesmentResponseSchema.parse(response);
}

export const readPregnancySpacingAssesmentRecord = async (pregnancySpacingAssesmentId: string, userId: string) => {
    const response = await prisma.pregnancySpacingAssesment.findUniqueOrThrow({
        where: {
            id: pregnancySpacingAssesmentId,
            userId
        }
    });

    return PregnancySpacingAssesmentResponseSchema.parse(response);
}

export const updatePregnancySpacingAssesmentRecord = async (pregnancySpacingAssesmentInput: IPregnancySpacingAssesmentInputs, id: string, userId: string) => {
    const { hadPregnanciesLessThan12MoApart, discussFamilyPlanningInterest, label, staffNotes } = pregnancySpacingAssesmentInput;
    const response = await prisma.pregnancySpacingAssesment.update({
        where: {
            id,
            userId
        },
        data: {
            hadPregnanciesLessThan12MoApart,
            discussFamilyPlanningInterest,
            label,
            staffNotes
        }
    });

    return PregnancySpacingAssesmentResponseSchema.parse(response);
}

export const deletePregnancySpacingAssesmentRecord = async (pregnancySpacingAssesmentId: string, userId: string) => {
    const response = await prisma.pregnancySpacingAssesment.deleteMany({
        where: {
            id: pregnancySpacingAssesmentId,
            userId
        }
    });

    return PregnancySpacingAssesmentResponseSchema.parse(response);
}

