import { nullable, z } from "zod";

export const sexEnum = z.enum(["Female", "Male"]);

export const childLivingWithEnum = z.enum([
    "Mother",
    "Father",
    "Grandparents",
    "Siblings",
    "Foster_Family",
    "Other"
]);

export const YesNoEnum = z.enum(["Yes", "No"]);

export const childProtectiveServiceEnum = z.enum([
    "Currently",
    "Previously",
    "Never"
]);

export const labelMapping = {
    childLivingWith: {
        Mother: "Mother",
        Father: "Father",
        Grandparents: "Grandparents",
        Siblings: "Sibling(s)",
        Foster_Family: "Foster Family",
        Other: "Other"
    },
    childProtectiveService: {
        Currently: "Yes, Currently Involved with CPS",
        Previously: "Yes, Previously Involved with CPS",
        Never: "No, Never"
    }
};

export const ChildDemographicsRecordInputsSchema = z.object({
    childName: z.string().min(1, "Child's name required."),
    dateOfBirth: z.union([z.date(), z.string().min(1, "Date of Birth is required")]),
    sex: sexEnum,
    childLivingWith: z.array(childLivingWithEnum),
    childLivingWithOther: z.string().nullable(),
    parentOneName: z.string().min(1, "Parent 1's name required."),
    parentOneInvolvedInLife: YesNoEnum,
    parentTwoName: z.string().min(1, "Parent 2's name required."),
    parentTwoInvolvedInLife: YesNoEnum,
    insurancePlan: z.string().min(1, "Insurance plan required."),
    effectiveDate: z.union([z.date(), z.string().min(1, "Effective date required.")]),
    subscriberId: z.string().min(1, "Subscriber ID required."),
    groupId: z.string().min(1, "Group ID required."),
    primaryCareProvider: z.string().min(1, "Primary care provider required."),
    primaryCareProviderPhone: z.string().min(1, "Primary care provider phone required."),
    birthWeight: z.string().min(1, "Birth weight required."),
    gestationalAgeAtBirth: z.string().min(1, "Gestational age required."),
    nicuStay: YesNoEnum,
    nicuStayLength: z.string().nullable(),
    prenatalDrugExposure: YesNoEnum,
    prenatalDrug: z.string().nullable(),
    medicalComplicationsAtBirth: z.string().min(1, "Medical complications required."),
    ongoingMedicalIssues: z.string().min(1, "Ongoing medical issues required."),
    ongoingMedications: z.string().min(1, "Ongoing medications required."),
    healthConcerns: z.string().min(1, "Health concerns required."),
    difficultiesServicesReceived: z.string().min(1, "Difficulties or services received required."),
    lactationConsultant: YesNoEnum,
    legalSystemInvolvement: YesNoEnum,
    childProtectiveService: childProtectiveServiceEnum,
    caseworker: z.string().nullable(),
    caseworkerPhoneNumber: z.string().nullable(),
    importantInformation: z.string().nullable()
});
export type IChildDemographicsRecordInputs = z.infer<typeof ChildDemographicsRecordInputsSchema>

export const ChildDemographicsRecordResponseSchema = ChildDemographicsRecordInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IChildDemographicsRecordResponse = z.infer<typeof ChildDemographicsRecordResponseSchema>;