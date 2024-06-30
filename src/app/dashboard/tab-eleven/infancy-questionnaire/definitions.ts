import { YesNo } from "@prisma/client";
import { z } from "zod";

export const TimeframeEnum = z.enum([
    "Birth_to_one_month",
    "Two_to_three_months",
    "Six_to_seven_months",
    "Ten_to_eleven_months"
]);

export const YesNoEnum = z.enum([
    "Yes",
    "No"
]);

export const FrequencyEnum = z.enum([
    "Some_days",
    "Everyday"
]);

export const YesEnum = z.enum(["Yes"]);

export const labelMapping = {
    timeframe: {
        Birth_to_one_month: "1 month old",
        Two_to_three_months: "2 - 3 months old",
        Six_to_seven_months: "6 - 7 months old",
        Ten_to_eleven_months: "10 - 11 months old"
    },
    frequency: {
        Some_days: "Some days",
        Everyday: "Every day"
    }
};

export const InfancyQuestionnaireInputsSchema = z.object({
    participantName: z.string().min(1, "Participant name required."),
    dateCompleted: z.union([z.string().min(1, "Date completed required."), z.date()]),
    childName: z.string().min(1, "Child name required."),
    caseId: z.string().min(1, "Case ID required."),
    staffName: z.string().min(1, "Staff name required."),
    timeframe: TimeframeEnum,
    sleepOnBack: YesNoEnum,
    sleepAlone: YesNoEnum,
    sleepWithoutSoftBedding: YesNoEnum,
    storytellingFrequency: FrequencyEnum,
    isBiologicalMother: YesNoEnum,
    attendedPostpartumVisit: YesNoEnum.nullable(),
    postpartumVisitDate: z.union([z.date(), z.string()]).nullable(),
    hadBreastMilk: YesNoEnum.nullable(),
    breastMilkAtTwoMonths: YesNoEnum.nullable(),
    breastMilkAtSixMonths: YesNoEnum.nullable(),
    motherCouldNotBreastfeed: YesEnum.nullable(),
});
export type IInfancyQuestionnaireInputs = z.infer<typeof InfancyQuestionnaireInputsSchema>;

export const InfancyQuestionnaireResponseSchema = InfancyQuestionnaireInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IInfancyQuestionnaireResponse = z.infer<typeof InfancyQuestionnaireResponseSchema>;