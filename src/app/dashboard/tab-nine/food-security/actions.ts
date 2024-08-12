'use server';

import { prisma } from "@/lib/prisma";
import { FoodSecurityResponseSchema, IFoodSecurityInputs } from "./definitions";

export const createFoodSecurityRecord = async (foodSecurityInputs: IFoodSecurityInputs, userId: string) => {
    const { ...rest } = foodSecurityInputs;
    const response = await prisma.foodSecurity.create({
        data: {
            ...rest,
            userId
        }
    });

    return FoodSecurityResponseSchema.parse(response);
}

export const readFoodSecurityRecord = async (foodSecurityId: string, userId: string) => {
    const response = await prisma.foodSecurity.findUniqueOrThrow({
        where: {
            id: foodSecurityId,
            userId
        }
    });

    return FoodSecurityResponseSchema.parse(response);
}

export const updateFoodSecurityRecord = async (foodSecurityInput: IFoodSecurityInputs, id: string, userId: string) => {
    const { ...rest } = foodSecurityInput;
    const response = await prisma.foodSecurity.update({
        where: {
            id,
            userId
        },
        data: {
            ...rest
        }
    });

    return FoodSecurityResponseSchema.parse(response);
}

export const deleteFoodSecurityRecord = async (foodSecurityId: string, userId: string) => {
    const response = await prisma.foodSecurity.deleteMany({
        where: {
            id: foodSecurityId,
            userId
        }
    });

    return FoodSecurityResponseSchema.parse(response);
}
