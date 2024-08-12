import { z } from "zod";

export const AnswersEnum = z.enum([
    "Not_at_all",
    "Several_days",
    "More_than_half",
    "Everyday"
]);

export const DifficultyEnum = z.enum([
    "Not_at_all",
    "Somewhat",
    "Very",
    "Extremely"
]);

export const labelMapping = {
    answers: {
        Not_at_all: "Not at all",
        Several_days: "Several days",
        More_than_half: "More than half the days",
        Everyday: "Nearly everyday"
    },
    difficulty: {
        Not_at_all: "Not difficult at all",
        Somewhat: "Somewhat difficult",
        Very: "Very difficult",
        Extremely: "Extremely difficult"
    }
};

export const GeneralizedAnxietyDisorderInputsSchema = z.object({
    feelingNervous: AnswersEnum,
    unableToControlWorrying: AnswersEnum,
    worryingTooMuch: AnswersEnum,
    troubleRelaxing: AnswersEnum,
    restlessness: AnswersEnum,
    easilyAnnoyed: AnswersEnum,
    feelingAfraid: AnswersEnum,
    problemsDifficulty: DifficultyEnum,
    totalScore: z.string(),
});
export type IGeneralizedAnxietyDisorderInputs = z.infer<typeof GeneralizedAnxietyDisorderInputsSchema>;

export const GeneralizedAnxietyDisorderResponseSchema = GeneralizedAnxietyDisorderInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date(),
});
export type IGeneralizedAnxietyDisorderResponse = z.infer<typeof GeneralizedAnxietyDisorderResponseSchema>;