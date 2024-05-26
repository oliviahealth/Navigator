'use server';

import { prisma } from "@/lib/prisma";
import { ICommunicationEntry } from "./definitions";

export const createCommunicationLog = async (communicationLogInput: ICommunicationEntry[], userId: string) => {    
    try {
        const response = await prisma.communicationLog.create({
            data: {
                userId,
                communicationEntries: {
                    create: [...communicationLogInput]
                },
            },
            include: {
                communicationEntries: true
            }
        });
        
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error creating communication log:', error);
        throw error; // Rethrow the error for the caller to handle
    } finally {
        await prisma.$disconnect();
    }
}