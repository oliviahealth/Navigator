'use server';

import { prisma } from "@/lib/prisma";
import { ICompleteFormData, IHousingSecurityHomeVisitForm, IErVisits, IWellChildVisits } from "./backup-definitions";

// Create a complete Home Visit Form with associated ER and Well Child visits
export const createCompleteHomeVisitForm = async (formData: ICompleteFormData) => {
    const { homeVisitForm, erVisits, wellChildVisits } = formData;

    // Create the main HomeVisitForm entry
    const createdHomeVisitForm = await prisma.HousingSecurityHomeVisitForm.create({
        data: {
            ...homeVisitForm,
            ErVisits: {
                create: erVisits
            },
            WellChildVisits: {
                create: wellChildVisits
            }
        },
        include: {
            ErVisits: true,
            WellChildVisits: true
        }
    });

    return createdHomeVisitForm;
};

// Retrieve a specific Home Visit Form by ID with related ER and Well Child visits
export const getHomeVisitFormById = async (id: number) => {
    const homeVisitForm = await prisma.HousingSecurityHomeVisitForm.findUniqueOrThrow({
        where: { id },
        include: {
            ErVisits: true,
            WellChildVisits: true
        }
    });
    return homeVisitForm;
};

// Update a specific Home Visit Form by ID
export const updateHomeVisitFormById = async (id: number, formData: IHousingSecurityHomeVisitForm) => {
    const updatedHomeVisitForm = await prisma.HousingSecurityHomeVisitForm.update({
        where: { id },
        data: formData,
        include: {
            ErVisits: true,
            WellChildVisits: true
        }
    });
    return updatedHomeVisitForm;
};

// Delete a specific Home Visit Form by ID
export const deleteHomeVisitFormById = async (id: number) => {
    const deletedHomeVisitForm = await prisma.HousingSecurityHomeVisitForm.delete({
        where: { id }
    });
    return deletedHomeVisitForm;
};

// Separate functions to manage ER Visits and Well Child Visits could also be implemented if needed.
