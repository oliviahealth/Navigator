import { z } from "zod";

export const displayNames: Record<string, string> = {
    parentingClasses: 'Parenting Classes',
    transportationServices: 'Transportation Services',
    ssiDisability: 'SSI/Disability',
    temporaryAssistanceForNeedyFamilies: 'Temporary Assistance for Needy Families (TANF)',
    personalSafety: 'Personal Safety',
    homeVisitationProgram: 'Home Visitation Program',
    housingAssistance: 'Housing Assistance',
    healthyStartProgram: 'Healthy Start Program',
    employmentServices: 'Employment Services',
    breastfeedingSupport: 'Breastfeeding Support',
    localFoodPantries: 'Local Food Pantries',
    snap: 'SNAP',
    womenInfantsAndChildren: 'Women, Infants, & Children (WIC)',
    healthInsuranceEnrollment: 'Health Insurance Enrollment',
    prenatalHealthcare: 'Prenatal Healthcare',
    familyPlanning: 'Family Planning',
    primaryCare: 'Primary Care',
    mentalHealthCounseling: 'Mental Health/Counseling',
    smokingCessation: 'Smoking Cessation',
    residential: 'Residential',
    outpatient: 'Outpatient',
    caringForTwoProgram: 'Caring for Two Program',
    theCradlesProgram: 'The Cradles Program',
    recoverySupportServices: 'Recovery Support Services',
    naloxone: 'Naloxone (Narcan)',
    medicationAssistedTreatment: 'Medication-Assisted Treatment (MAT)',
    transportationToTreatment: 'Transportation to Treatment',
    earlyChildhoodIntervention: 'Early Childhood Intervention',
    earlyHeadStart: 'Early Head Start',
    nciChildcareSubsidy: 'NCI Childcare Subsidy',
    pediatricianPrimaryCare: 'Pediatrician/Primary Care',
    safeSleepEducation: 'Safe Sleep Education',
    childProtectiveService: 'Child Protective Service',
    legalAid: 'Legal Aid',
    specialtyCourt: 'Specialty Court',
    additionalNotes: 'Additional Notes',
};

export const ServiceSchema = z.object({
    serviceStatus: z.string().min(1, 'Service status required'),
    organization: z.string().min(1, 'Organization required'),
    organizationContactInformation: z.string().min(1, 'Organization contact info required'),
});
export type IService = z.infer<typeof ServiceSchema>;

export const AdditionalServiceSchema = z.object({
    name: z.string().min(1, 'Service name required'),
    serviceStatus: z.string().min(1, 'Service status required'),
    organization: z.string().min(1, 'Organization required'),
    organizationContactInformation: z.string().min(1, 'Organization contact info required'),
});
export type IAdditionalService = z.infer<typeof AdditionalServiceSchema>;

export const ReferralsAndServicesInputsSchema = z.object({
    parentingClasses: ServiceSchema,
    transportationServices: ServiceSchema,
    ssiDisability: ServiceSchema,
    temporaryAssistanceForNeedyFamilies: ServiceSchema,
    personalSafety: ServiceSchema,
    homeVisitationProgram: ServiceSchema,
    housingAssistance: ServiceSchema,
    healthyStartProgram: ServiceSchema,
    employmentServices: ServiceSchema,
    supportServicesOther: z.array(AdditionalServiceSchema),
    breastfeedingSupport: ServiceSchema,
    localFoodPantries: ServiceSchema,
    snap: ServiceSchema,
    womenInfantsAndChildren: ServiceSchema,
    foodNutritionOther: z.array(AdditionalServiceSchema),
    healthInsuranceEnrollment: ServiceSchema,
    prenatalHealthcare: ServiceSchema,
    familyPlanning: ServiceSchema,
    primaryCare: ServiceSchema,
    mentalHealthCounseling: ServiceSchema,
    smokingCessation: ServiceSchema,
    healthcareOther: z.array(AdditionalServiceSchema),
    residential: ServiceSchema,
    outpatient: ServiceSchema,
    caringForTwoProgram: ServiceSchema,
    theCradlesProgram: ServiceSchema,
    recoverySupportServices: ServiceSchema,
    naloxone: ServiceSchema,
    medicationAssistedTreatment: ServiceSchema,
    transportationToTreatment: ServiceSchema,
    substanceUseTreatmentOther: z.array(AdditionalServiceSchema),
    earlyChildhoodIntervention: ServiceSchema,
    earlyHeadStart: ServiceSchema,
    nciChildcareSubsidy: ServiceSchema,
    pediatricianPrimaryCare: ServiceSchema,
    safeSleepEducation: ServiceSchema,
    childRelatedOther: z.array(AdditionalServiceSchema),
    childProtectiveService: ServiceSchema,
    legalAid: ServiceSchema,
    specialtyCourt: ServiceSchema,
    legalAssistanceOther: z.array(AdditionalServiceSchema),
    additionalNotes: z.string(),
    label: z.string().min(1, "Label required."),
    staffNotes: z.string().min(1, "Staff notes required.")
});
export type IReferralsAndServicesInputs = z.infer<typeof ReferralsAndServicesInputsSchema>;

export const ReferralsAndServicesResponseSchema = ReferralsAndServicesInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IReferralsAndServicesResponse = z.infer<typeof ReferralsAndServicesResponseSchema>;