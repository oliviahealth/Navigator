const crypto = require('crypto');
import { z } from "zod";
const encryptionKey = process.env.NEXT_PUBLIC_SSN_ENCRYPTION_KEY;

export const encryptSSN = (ssn: string) => {
    const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
    let encryptedSSN = cipher.update(ssn, 'utf8', 'hex');
    encryptedSSN += cipher.final('hex');
    return encryptedSSN;
}

export const decryptSSN = (encryptedSSN: string) => {
    const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
    let decryptedSSN = decipher.update(encryptedSSN, 'hex', 'utf8');
    decryptedSSN += decipher.final('utf8');
    return decryptedSSN;
}

export const YesNoEnum = z.enum([
    "Yes",
    "No"
]);

export const GenderEnum = z.enum([
    "Female",
    "Male"
]);

export const EthnicityEnum = z.enum([
    "Hispanic_or_Latinx",
    "Not_Hispanic_or_Latinx"
]);

export const RaceEnum = z.enum([
    "American_Indian_Alaska_Native",
    "Asian",
    "Black_or_African_American",
    "Native_Hawaiian_or_Pacific_Islander",
    "White",
    "More_than_one_race_not_specified",
    "Declined_to_identify"
]);

export const WellChildVisitsEnum = z.enum([
    'Newborn',
    '3-7 days old',
    '2-4 weeks old',
    '2-3 months old',
    '4-5 months old',
    '6-7 months old',
    '9-10 months old',
    '12-13 months old',
    '15-16 months old',
    '18-19 months old',
    '2-2.5 years old',
    '3-3.5 years old',
    '4-4.5 years old'
]);

export const HealthInsuranceEnum = z.enum([
    "Medicaid_or_Kidcare",
    "Private",
    "Tricare",
    "None",
    "Other"
]);

export const labelMapping = {
    race: {
        American_Indian_Alaska_Native: "American Indian/Alaska Native",
        Asian: "Asian",
        Black_or_African_American: "Black or African American",
        Native_Hawaiian_or_Pacific_Islander: "Native Hawaiian or Pacific Islander",
        White: "White",
        More_than_one_race_not_specified: "More than one race - not specified",
        Declined_to_identify: "Declined to identify"
    },
    ethnicity: {
        Hispanic_or_Latinx: "Hispanic or Latino/a",
        Not_Hispanic_or_Latinx: "Not Hispanic or Latino/a"
    },
    healthInsurance: {
        Medicaid_or_Kidcare: "Medicaid or Texas KidCare",
        Private: "Private health insurance",
        Tricare: "Tri-Care",
        None: "No health insurance",
        Other: "Other"
    },
};

export const TargetChildRecordInputsSchema = z.object({
    participantName: z.string().min(1, "Participant name required."),
    caseId: z.string().min(1, "Case ID required."),
    dateCompleted: z.union([z.string().min(1, "Date completed required."), z.date()]),
    staffName: z.string().min(1, "Staff name required."),
    childName: z.string().min(1, "Child name required."),
    childDateOfBirth: z.union([z.string().min(1, "Child DOB required."), z.date()]),
    childEnrollmentDate: z.union([z.string().min(1, "Child enrollment date required."), z.date()]),
    childSSN: z.string().nullable(),
    gestationalAgeAtBirth: z.string().min(1, "Gestational age at birth required."),
    childGender: GenderEnum,
    childEthnicity: EthnicityEnum,
    childRace: z.array(RaceEnum),
    isBiologicalMother: YesNoEnum,
    wellChildVisitsCompleted: z.array(WellChildVisitsEnum),
    healthInsurance: HealthInsuranceEnum.nullable(),
    otherHealthInsurance: z.string().nullable()
});
export type ITargetChildRecordInputs = z.infer<typeof TargetChildRecordInputsSchema>;

export const TargetChildRecordResponseSchema = TargetChildRecordInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type ITargetChildRecordResponse = z.infer<typeof TargetChildRecordResponseSchema>;