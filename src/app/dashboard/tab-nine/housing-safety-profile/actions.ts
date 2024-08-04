// actions.ts

'use server';

import { prisma } from "@/lib/prisma";
import { HouseholdHousingSafetyProfileResponseSchema, IHouseholdHousingSafetyProfileInputs } from "./definitions";

export const createHouseholdHousingSafetyProfile = async (profileInput: IHouseholdHousingSafetyProfileInputs, userId: string) => {
    const response = await prisma.householdHousingSafetyProfile.create({
        data: {
            userId,
            ...profileInput,
        },
    });

    return HouseholdHousingSafetyProfileResponseSchema.parse(response);
};

export const readHouseholdHousingSafetyProfile = async (profileId: string, userId: string) => {
    const response = await prisma.householdHousingSafetyProfile.findUniqueOrThrow({
        where: {
            id: profileId,
            userId,
        },
    });

    return HouseholdHousingSafetyProfileResponseSchema.parse(response);
};

export const updateHouseholdHousingSafetyProfile = async (profileInput: IHouseholdHousingSafetyProfileInputs, id: string, userId: string) => {
    const response = await prisma.householdHousingSafetyProfile.update({
        where: {
            id,
            userId,
        },
        data: {
            userId,
            ...profileInput,
        },
    });

    return HouseholdHousingSafetyProfileResponseSchema.parse(response);
};

export const deleteHouseholdHousingSafetyProfile = async (profileId: string, userId: string) => {
    const response = await prisma.householdHousingSafetyProfile.deleteMany({
        where: {
            id: profileId,
            userId,
        },
    });

    return HouseholdHousingSafetyProfileResponseSchema.parse(response);
};