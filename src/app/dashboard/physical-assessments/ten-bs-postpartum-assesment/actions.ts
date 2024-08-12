'use server';

import { prisma } from "@/lib/prisma";
import { TenBsPostpartumAssesmentResponseSchema, ITenBsPostpartumAssesmentInputs } from "./definitions";

export const createTenBsPostpartumAssesmentRecord = async (tenBsPospartumAssesmentInputs: ITenBsPostpartumAssesmentInputs, userId: string) => {
    const { ...data } = tenBsPospartumAssesmentInputs;
    const response = await prisma.tenBsPostpartumAppointmentAssesment.create({
        data: {
            ...data,
            userId 
        }
    });

    return TenBsPostpartumAssesmentResponseSchema.parse(response);
}

export const readTenBsPostpartumAssesmentRecord = async (tenBsPostpartumAssesmentId: string, userId: string) => {
    const response = await prisma.tenBsPostpartumAppointmentAssesment.findUniqueOrThrow({
        where: {
            id: tenBsPostpartumAssesmentId,
            userId
        }
    });

    return TenBsPostpartumAssesmentResponseSchema.parse(response);
}

export const updateTenBsPostpartumAssesmentRecord = async (tenBsPostpartumAssesmentInputs: ITenBsPostpartumAssesmentInputs, id: string, userId: string) => {
    const {  ...data } = tenBsPostpartumAssesmentInputs;
    const response = await prisma.tenBsPostpartumAppointmentAssesment.update({
        where: {
            id,
            userId
        },
        data: {
            ...data
        }
    });

    return TenBsPostpartumAssesmentResponseSchema.parse(response);
}

export const deleteTenBsPostpartumAssesmentRecord = async (tenBsPostpartumAssesmentId: string, userId: string) => {
    const response = await prisma.tenBsPostpartumAppointmentAssesment.deleteMany({
        where: {
            id: tenBsPostpartumAssesmentId,
            userId
        }
    });

    return TenBsPostpartumAssesmentResponseSchema.parse(response);
}