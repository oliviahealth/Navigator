import { z } from "zod";

export const YesNoEnum = z.enum(['Yes', 'No']);

export const TenBsPostpartumAssesmentInputsSchema = z.object({
    physicalExamBaby: YesNoEnum,
    feedingBaby: YesNoEnum,
    growthAndWeightGainBaby: YesNoEnum,
    assessSupplyLatchMilkTransferPainBreasts: YesNoEnum,
    referLactationConsultantBreasts: YesNoEnum,
    educationCollectionStorageMilkBreasts: YesNoEnum,
    mastisisSignsBreasts: YesNoEnum,
    constipationTreatementBowels: YesNoEnum,
    urinaryIncontinenceBladder: YesNoEnum,
    painBelly: YesNoEnum,
    perinealPainBotton: YesNoEnum,
    hemorrhoidsBottom: YesNoEnum,
    finishedBleeding: YesNoEnum,
    screenBabyBluePostpartumDepression: YesNoEnum,
    EPDStool: YesNoEnum,
    birthControl: YesNoEnum,
    bloodwork: YesNoEnum,
    label: z.string().min(1, "Label required."),
    staffNotes: z.string().min(1, "Staff notes required.")
  });

export type ITenBsPostpartumAssesmentInputs = z.infer<typeof TenBsPostpartumAssesmentInputsSchema>;

export const TenBsPostpartumAssesmentResponseSchema = TenBsPostpartumAssesmentInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});

export type ITenBsPostpartumAssesmentFormResponse = z.infer<typeof TenBsPostpartumAssesmentResponseSchema>;
