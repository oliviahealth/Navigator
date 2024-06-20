'use server';
import { prisma } from '@/lib/prisma';
import { IMedicalServicesSubstanceUseInputs, IMedicalServicesSubstanceUseResponse } from './definitions';

export const createMedicalServicesSubstanceUseRecord = async (data: IMedicalServicesSubstanceUseInputs, userId: string): Promise<IMedicalServicesSubstanceUseResponse> => {
  const response = await prisma.medicalServicesSubstanceUse.create({
    data: {
      ...data,
      userId,
      medications: JSON.stringify(data.medications),
    },
  });

  return {
    ...response,
    medications: JSON.parse(response.medications as string),
    date_used_mat: response.date_used_mat?.toISOString() || null,
    date_used_medicine_service: response.date_used_medicine_service?.toISOString() || null
  };
};

export const updateMedicalServicesSubstanceUseRecord = async (data: IMedicalServicesSubstanceUseInputs, id: string, userId: string): Promise<IMedicalServicesSubstanceUseResponse> => {
  const response = await prisma.medicalServicesSubstanceUse.update({
    where: { id },
    data: {
      ...data,
      userId,
      medications: JSON.stringify(data.medications),
    },
  });

  return {
    ...response,
    medications: JSON.parse(response.medications as string),
    date_used_mat: response.date_used_mat?.toISOString() || null,
    date_used_medicine_service: response.date_used_medicine_service?.toISOString() || null,
  };
};

export const getMedicalServicesSubstanceUseRecord = async (id: string): Promise<IMedicalServicesSubstanceUseResponse | null> => {
  const response = await prisma.medicalServicesSubstanceUse.findUnique({
    where: { id },
  });

  if (!response) return null;

  return {
    ...response,
    medications: JSON.parse(response.medications as string),
    date_used_mat: response.date_used_mat?.toISOString() || null,
    date_used_medicine_service: response.date_used_medicine_service?.toISOString() || null
  };
};