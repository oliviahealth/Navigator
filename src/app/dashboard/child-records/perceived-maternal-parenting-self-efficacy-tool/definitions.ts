import { z } from "zod";

export const AgreementLevelEnum = z.enum([
    "Strongly_disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly_agree"
]); 

export const labelMapping = {
    Strongly_disagree: "Strongly disagree",
    Disagree: "Disagree",
    Neutral: "Neutral",
    Strongly_agree: "Strongly agree",
    Agree: "Agree",
};

export const PerceivedMaternalPlanningSelfEfficacyToolInputsSchema = z.object({
    keepingBabyOccupied: AgreementLevelEnum,
    feedingBaby: AgreementLevelEnum,
    changingBaby: AgreementLevelEnum,
    bathingBaby: AgreementLevelEnum,
    makingBabyHappy: AgreementLevelEnum,
    calmingCryingBaby: AgreementLevelEnum,
    soothingUpsetBaby: AgreementLevelEnum,
    soothingFussyBaby: AgreementLevelEnum,
    soothingCryingBaby: AgreementLevelEnum,
    soothingRestlessBaby: AgreementLevelEnum,
    gettingBabiesAttention: AgreementLevelEnum,
    recognizingTiredness: AgreementLevelEnum,
    havingControlOverBaby: AgreementLevelEnum,
    recognizingSickness: AgreementLevelEnum,
    readingBabysCues: AgreementLevelEnum,
    understandingBabyWants: AgreementLevelEnum,
    knowingDislikedActivities: AgreementLevelEnum,
    babyRespondsWell: AgreementLevelEnum,
    goodInteraction: AgreementLevelEnum,
    showingAffection: AgreementLevelEnum,
    label: z.string().min(1, "Label required."),
    staffNotes: z.string().min(1, "Staff notes required.")  
});
export type IPerceivedMaternalPlanningSelfEfficacyToolInputs = z.infer<typeof PerceivedMaternalPlanningSelfEfficacyToolInputsSchema>;

export const PerceivedMaternalPlanningSelfEfficacyToolResponseSchema = PerceivedMaternalPlanningSelfEfficacyToolInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date(),
});
export type IPerceivedMaternalPlanningSelfEfficacyToolResponse = z.infer<typeof PerceivedMaternalPlanningSelfEfficacyToolResponseSchema>;