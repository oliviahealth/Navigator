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

export const IntimatePartnerViolenceFormInputsSchema = z.object({
  physicallyHurt: IPVStatusEnum,
  insultOrTalkDown: IPVStatusEnum,
  threatenWithHarm: IPVStatusEnum,
  screamOrCurse: IPVStatusEnum,
  label: z.string().min(1, "Label required."),
  staffNotes: z.string().min(1, "Staff notes required.")
});
export type IIntimatePartnerViolenceFormInputs = z.infer<typeof IntimatePartnerViolenceFormInputsSchema>;

export const IntimatePartnerViolenceFormResponseSchema = IntimatePartnerViolenceFormInputsSchema.extend({
  id: z.string(),
  userId: z.string(),
  dateCreated: z.date(),
  dateModified: z.date()
});

export type IIntimatePartnerViolenceFormResponse = z.infer<typeof IntimatePartnerViolenceFormResponseSchema>;
