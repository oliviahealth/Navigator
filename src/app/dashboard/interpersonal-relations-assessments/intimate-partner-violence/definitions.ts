import { z } from "zod";
import { IPVStatus } from "@prisma/client";

export const IPVStatusEnum = z.enum([
  "Never",
  "Rarely",
  "Sometimes",
  "Fairly",
  "Often",
  "Frequently"
]);

export const mapFormValueToIPVStatus = (value: string): IPVStatus => {
  const statusMap: Record<string, IPVStatus> = {
    "Never": IPVStatus.Never,
    "Rarely": IPVStatus.Rarely,
    "Sometimes": IPVStatus.Sometimes,
    "Fairly": IPVStatus.Fairly,
    "Often": IPVStatus.Often,
    "Frequently": IPVStatus.Frequently,
  };
  return statusMap[value];
};

export const IntimatePartnerViolenceFormInputsSchema = z.object({
  physicallyHurt: IPVStatusEnum,
  insultOrTalkDown: IPVStatusEnum,
  threatenWithHarm: IPVStatusEnum,
  screamOrCurse: IPVStatusEnum,
  label: z.string().min(1, "Label required."),
  notes: z.string().min(1, "Staff notes required.")
});
export type IIntimatePartnerViolenceFormInputs = z.infer<typeof IntimatePartnerViolenceFormInputsSchema>;

export const IntimatePartnerViolenceFormResponseSchema = IntimatePartnerViolenceFormInputsSchema.extend({
  id: z.string(),
});

export type IIntimatePartnerViolenceFormResponse = z.infer<typeof IntimatePartnerViolenceFormResponseSchema>;
