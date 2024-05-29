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

export const phoneTypeEnum = z.enum(['Mobile', 'Home', 'Other']);

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
    Correctional_Facility:"Correctional Facility",
    Emergency_Shelter: "Emergency Shelter",
    Homeless: "Homeless",
    Other: "Other"
}

export const ParticipantRecordForOthersInvolvedSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    currentLivingArrangement: livingArrangementsEnum,
    streetAddress: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'Zip code is required'),
    county: z.string().min(1, 'County is required'),
    primaryPhoneNumber: z.string().min(1, 'Primary phone number is required'),
    phoneType: phoneTypeEnum,
    emergencyContact: z.string().min(1, 'Emergency contact is required'),
    emergencyContactPhone: z.string().min(1, 'Emergency contact phone number is required'),
    emergencyContactRelationship: z.string().min(1, 'Emergency contact relationship is required'),
    maritalStatus: maritalStatusEnum,
    insurancePlan: z.string().min(1, 'Insurance plan is required'),
    effectiveDate: z.string().min(1, 'Insurace plan effective date is required'),
    subscriberId: z.string().min(1, 'Insurance plan subscriber ID is required'),
    groupId: z.string().min(1, 'Insurance plan group ID is required'),
    gestationalAge: z.string().min(1, 'Gestational age is required'),
    anticipatedDeliveryDate: z.string().min(1, 'Anticipated delivery date is required'),
    plannedModeDelivery: deliveryModeEnum,
    actualModeDelivery: deliveryModeEnum,
    attendedPostpartumVisit: z.string().min(1, 'Postpartum visit attendance is required'),
    postpartumVisitLocation: z.string().nullable(),
    postpartumVisitDate: z.string().nullable(),
    totalNumPregnancies: z.string().min(0, 'Total number of pregnancies is required'),
    numLiveBirths: z.string().min(0, 'Number of live births is required'),
    numChildrenWithMother: z.string().min(1, 'Number of children with mother is required'),
    priorComplications: z.string().default(''),
    ongoingMedicalProblems: z.string().min(1, 'Diagnoses/Conditions required'),
});
export type IParticipantRecordForOthersInvolvedInputs = z.infer<typeof ParticipantRecordForOthersInvolvedSchema>

export const ParticipantRecordForOthersInvolvedResponseSchema = ParticipantRecordForOthersInvolvedSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IParticipantRecordForOthersInvolvedResponse = z.infer<typeof ParticipantRecordForOthersInvolvedResponseSchema>;