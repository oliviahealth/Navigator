import { z } from "zod";

export const AnswersEnum = z.enum([
    "Never",
    "Almost_never",
    "Sometimes",
    "Fairly_often",
    "Very_often"
]);

export const labelMapping = {
    Never: "",
    Almost_never: "",
    Sometimes: "",
    Fairly_often: "",
    Very_often: ""
};

export const options = [
    "Never",
    "Almost Never",
    "Sometimes",
    "Fairly Often",
    "Very Often"
];

export const PerceivedStressScaleInputsSchema = z.object({
    upsetUnexpectedly: AnswersEnum,
    unableControlImportant: AnswersEnum,
    nervousAndStressed: AnswersEnum,
    handleProblemsConfidently: AnswersEnum,
    thingsGoingWay: AnswersEnum,
    copeInability: AnswersEnum,
    controlIrritations: AnswersEnum,
    onTopOfThings: AnswersEnum,
    angeredOutsideControl: AnswersEnum,
    difficultiesPilingUp: AnswersEnum,
    totalScore: z.string(),
    label: z.string().min(1, "Label required."),
    staffNotes: z.string().min(1, "Staff notes required.")
});
export type IPerceivedStressScaleInputs = z.infer<typeof PerceivedStressScaleInputsSchema>;

export const PerceivedStressScaleResponseSchema = PerceivedStressScaleInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IPerceivedStressScaleResponse = z.infer<typeof PerceivedStressScaleResponseSchema>;