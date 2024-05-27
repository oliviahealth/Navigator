'use server';

import { prisma } from "@/lib/prisma";
import { ICommunicationEntry } from "./definitions";
import { CommunicationMethod, FollowUpNeeded } from "@prisma/client";

export const createCommunicationLog = async (communicationLogInput: ICommunicationEntry[], userId: string) => {
    const formattedCommunicationEntries = communicationLogInput.map(communicationEntry => ({
        ...communicationEntry,
        dateTime: new Date(communicationEntry.dateTime).toISOString(),
        method: communicationEntry.method as CommunicationMethod,
        followUpNeeded: communicationEntry.followUpNeeded as FollowUpNeeded
    }));

    const response = await prisma.communicationLog.create({
        data: {
            userId,
            communicationEntries: {
                create: formattedCommunicationEntries
            },
        },
        include: {
            communicationEntries: true
        }
    });

    return response;
}

export const readCommunicationLog = async (communicationLogId: string, userId: string) => {
    const response = await prisma.communicationLog.findUniqueOrThrow({
        where: {
            userId,
            id: communicationLogId
        },
        include: {
            communicationEntries: true,
        },
    });

    return response;
}