import { z } from "zod";

export const livingArrangementsEnum = z.enum([
    'Rent_Own_a_Home',
    'Living_with_Relatives_or_Friends',
    'Residential_Treatment_Center',
    'Correctional_Facility',
    'Emergency_Shelter',
    'Homeless',
    'Other',
]);

export const maritalStatusEnum = z.enum([
    'Single',
    'Married',
    'Divorced',
    'Widowed',
    'Separated',
]);

export const deliveryModeEnum = z.enum(['Vaginal', 'Cesarean'])

export const labelMapping = {
    Rent_Own_a_Home: "Rent/Own a Home",
    Living_with_Relatives_or_Friends: "Living with Relatives or Friends",
    Residential_Treatment_Center: "Residential Treatment Center",
    Correctional_Facility: "Correctional Facility",
    Emergency_Shelter: "Emergency Shelter",
    Homeless: "Homeless",
    Other: "Other"
};

export const ParticipantRecordForOthersEntrySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    dateOfBirth: z.union([z.date(), z.string().min(1, "Date of Birth is required")]),
    currentLivingArrangement: (livingArrangementsEnum).nullable().refine(val => val, { message: 'Current Living Arrangment is required' }),
    streetAddress: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'Zip code is required'),
    county: z.string().min(1, 'County is required'),
    primaryPhoneNumber: z.string().min(1, 'Primary phone number is required'),
    emergencyContact: z.string().min(1, 'Emergency contact is required'),
    emergencyContactPhone: z.string().min(1, 'Emergency contact phone number is required'),
    emergencyContactRelationship: z.string().min(1, 'Emergency contact relationship is required'),
    maritalStatus: maritalStatusEnum.nullable().refine(val => val, { message: 'Marital status is required' }),
    insurancePlan: z.string().min(1, 'Insurance plan is required'),
    effectiveDate: z.union([z.date(), z.string().min(1, "Insurance plan effective date is required")]),
    subscriberId: z.string().min(1, 'Insurance plan subscriber ID is required'),
    groupId: z.string().min(1, 'Insurance plan group ID is required'),
    gestationalAge: z.string().min(1, 'Gestational age is required'),
    dueDate: z.union([z.date(), z.string().min(1, "Due date is required")]),
    deliveryDate: z.union([z.date(), z.string().min(1, "Delivery date is required")]),
    plannedModeDelivery: deliveryModeEnum.nullable().refine(val => val, { message: 'Planned mode of delivery is required' }),
    actualModeDelivery: deliveryModeEnum.nullable().refine(val => val, { message: 'Actual mode of delivery is required' }),
    attendedPostpartumVisit: z.string().min(1, 'Postpartum visit attendance is required'),
    postpartumVisitLocation: z.string().nullable(),
    postpartumVisitDate: z.union([z.date(), z.string()]).nullable(),
    totalNumPregnancies: z.string().min(0, 'Total number of pregnancies is required').regex(/^\d+$/, 'Total number of pregnancies must be a numeric string'),
    numLiveBirths: z.string().min(0, 'Number of live births is required').regex(/^\d+$/, 'Number of live births must be a numeric string'),
    numChildrenWithMother: z.string().min(1, 'Number of children with mother is required').regex(/^\d+$/, 'Number of children living with mother must be a numeric string'),
    priorComplications: z.string().nullable(),
    ongoingMedicalProblems: z.string().min(1, 'Diagnoses/Conditions required'),
});
export type IParticipantRecordForOthersEntry = z.infer<typeof ParticipantRecordForOthersEntrySchema>

export const ParticipantRecordForOthersInvolvedInputsSchema = z.object({
    participantRecordForOthersEntries: z.array(ParticipantRecordForOthersEntrySchema)
});
export type IParticipantRecordForOthersInvolvedInputs = z.infer<typeof ParticipantRecordForOthersInvolvedInputsSchema>

export const ParticipantRecordForOthersInvolvedResponseSchema = ParticipantRecordForOthersInvolvedInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IParticipantRecordForOthersInvolvedResponse = z.infer<typeof ParticipantRecordForOthersInvolvedResponseSchema>;