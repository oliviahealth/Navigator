import { z } from "zod";

export const LaughEnum = z.enum([
    "As_much_as_always",
    "Not_quite_so_much",
    "Definitely_not_so_much",
    "Not_at_all",
]);

export const EnjoymentEnum = z.enum([
    "As_much_as_ever",
    "Rather_less",
    "Definitely_less",
    "Hardly",
]);

export const SelfBlameEnum = z.enum([
    "Yes_mostly",
    "Yes_some",
    "Not_often",
    "Never",
]);

export const AnxietyEnum = z.enum([
    "Not_at_all",
    "Hardly_ever",
    "Yes_sometimes",
    "Yes_often",
]);

export const ScaredEnum = z.enum([
    "Yes_a_lot",
    "Yes_sometimes",
    "Not_much",
    "Not_at_all",
]);

export const CopeInabilityEnum = z.enum([
    "Yes_mostly_have_not",
    "Yes_sometimes_have_not",
    "No_mostly_have",
    "No_always_have",
]);

export const DifficultySleepingEnum = z.enum([
    "Yes_mostly",
    "Yes_sometimes",
    "Not_often",
    "Not_at_all",
]);

export const SadnessEnum = z.enum([
    "Yes_mostly",
    "Yes_often",
    "Not_often",
    "Not_at_all",
]);

export const CryingEnum = z.enum([
    "Yes_mostly",
    "Yes_often",
    "Occasionally",
    "Never",
]);

export const SelfHarmThoughtsEnum = z.enum([
    "Yes_often",
    "Sometimes",
    "Hardly_ever",
    "Never",
]);

export const TimeframeEnum = z.enum([
    "Prenatal",
    "Postnatal",
]);

export const labelMapping = {
    laugh: {
        As_much_as_always: "As much as I always could",
        Not_quite_so_much: "Not quite so much now",
        Definitely_not_so_much: "Definitely not so much now",
        Not_at_all: "Not at all"
    },
    enjoyment: {
        As_much_as_ever: "As much as I ever did",
        Rather_less: "Rather less than I used to",
        Definitely_less: "Definitely less than I used to",
        Hardly: "Hardly at all",
    },
    selfBlame: {
        Yes_mostly: "Yes, most of the time",
        Yes_some: "Yes, some of the time",
        Not_often: "Not very often",
        Never: "No, never"
    },
    anxiety: {
        Not_at_all: "No, not at all",
        Hardly_ever: "Hardly ever",
        Yes_sometimes: "Yes, sometimes",
        Yes_often: "Yes, very often",
    },
    scared: {
        Yes_a_lot: "Yes, quite a lot",
        Yes_sometimes: "Yes, sometimes",
        Not_much: "No, not much",
        Not_at_all: "No, not at all",
    },
    copeInability: {
        Yes_mostly_have_not: "Yes, most of the time I haven’t been able to cope at all",
        Yes_sometimes_have_not: "Yes, sometimes I haven’t been coping as well as usual",
        No_mostly_have: "No, most of the time I have coped quite well",
        No_always_have: "No, have been coping as well as ever",
    },
    difficultySleeping: {
        Yes_mostly: "Yes, most of the time",
        Yes_sometimes: "Yes, sometimes",
        Not_often: "Not very often",
        Not_at_all: "No, not at all",
    },
    sadness: {
        Yes_mostly: "Yes, most of the time",
        Yes_often: "Yes, quite often",
        Not_often: "Not very often",
        Not_at_all: "No, not at all",
    },
    crying: {
        Yes_mostly: "Yes, most of the time",
        Yes_often: "Yes, quite often",
        Occasionally: "Only occasionally",
        Never: "No, never",
    },
    selfHarmThoughts: {
        Yes_often: "Yes, quite often",
        Sometimes: "Sometimes",
        Hardly_ever: "Hardly ever",
        Never: "Never",
    },
    timeframe: {
        Prenatal: "Prenatal (not required for Olivia-Navigator)",
        Postnatal: "Postnatal"
    }
};

export const EdinburgPostnatalDepressionScaleInputsSchema = z.object({
    laugh: LaughEnum,
    enjoyment: EnjoymentEnum,
    selfBlame: SelfBlameEnum,
    anxiety: AnxietyEnum,
    scared: ScaredEnum,
    copeInability: CopeInabilityEnum,
    difficultySleeping: DifficultySleepingEnum,
    sadness: SadnessEnum,
    crying: CryingEnum,
    selfHarmThoughts: SelfHarmThoughtsEnum,
    participantName: z.string().min(1, "Participant name required."),
    caseId: z.string().min(1, "Case ID required."),
    dateCompleted: z.union([z.date(), z.string().min(1, "Date completed required")]),
    staffName: z.string().min(1, "Staff name required."),
    timeframe: TimeframeEnum,
    totalScore: z.string().min(1, "Total score required."),
    notes: z.string().nullable(),
    label: z.string().min(1, "Label required."),
    staffNotes: z.string().min(1, "Staff notes required.")
});
export type IEdinburgPostnatalDepressionScaleInputs = z.infer<typeof EdinburgPostnatalDepressionScaleInputsSchema>;

export const EdinburgPostnatalDepressionScaleResponseSchema = EdinburgPostnatalDepressionScaleInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IEdinburgPostnatalDepressionScaleResponse = z.infer<typeof EdinburgPostnatalDepressionScaleResponseSchema>;

export const getErrorMessage = (error: any) => {
    if (error && typeof error.message === 'string') {
        return error.message;
    }
    return '';
};

export const pages: Array<keyof Partial<IEdinburgPostnatalDepressionScaleInputs>>[] = [
    [
        "laugh",
        "enjoyment",
        "selfBlame",
        "anxiety",
        "scared",
        "copeInability",
        "difficultySleeping",
        "sadness",
        "crying",
        "selfHarmThoughts"
    ],
    [
        "participantName",
        "caseId",
        "dateCompleted",
        "staffName",
        "timeframe",
        "totalScore",
        "notes",
        "label",
        "staffNotes"
    ],
];