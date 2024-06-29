'use server';

import { prisma } from "@/lib/prisma";
import { IIPVDisclosureScreeningTool } from "./definitions";

export const createIPVDisclosureScreeningTool = async (formData: IIPVDisclosureScreeningTool, userId: string) => {
  try {
    const response = await prisma.iPVDisclosureScreeningTool.create({
      data: {
        ...formData,
        userId,
      }
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create IPV Disclosure Screening Tool entry: ${error.message}`);
    } else {
      throw new Error('Failed to create IPV Disclosure Screening Tool entry due to an unexpected error');
    }
  }
}

export const readIPVDisclosureScreeningTool = async (formId: string, userId: string) => {
  try {
    const response = await prisma.ipvDisclosureScreeningTool.findUniqueOrThrow({
      where: {
        id: formId,
        userId: userId
      },
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve IPV Disclosure Screening Tool entry: ${error.message}`);
    } else {
      throw new Error('Failed to retrieve IPV Disclosure Screening Tool entry due to an unexpected error');
    }
  }
}

export const updateIPVDisclosureScreeningTool = async (formData: IIPVDisclosureScreeningTool, formId: string, userId: string) => {
  try {
    const response = await prisma.ipvDisclosureScreeningTool.update({
      where: {
        id: formId,
        userId: userId,
      },
      data: formData,
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update IPV Disclosure Screening Tool entry: ${error.message}`);
    } else {
      throw new Error('Failed to update IPV Disclosure Screening Tool entry due to an unexpected error');
    }
  }
}