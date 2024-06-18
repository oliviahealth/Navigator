import { z } from "zod";

export const IPVStatusEnum = z.enum([
  "Never (1)",
  "Rarely (2)",
  "Sometimes (3)",
  "Fairly (4)",
  "Often (5)",
  "Frequently (6)"
]);

export const IntimatePartnerViolenceFormInputsSchema = z.object({
  physicallyHurt: IPVStatusEnum.refine(val => val, { message: "Required" }),
  insultOrTalkDown: IPVStatusEnum.refine(val => val, { message: "Required" }),
  threatenWithHarm: IPVStatusEnum.refine(val => val, { message: "Required" }),
  screamOrCurse: IPVStatusEnum.refine(val => val, { message: "Required" })
});

export type IIntimatePartnerViolenceFormInputs = z.infer<typeof IntimatePartnerViolenceFormInputsSchema>;

export const IntimatePartnerViolenceFormResponseSchema = IntimatePartnerViolenceFormInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});

export type IIntimatePartnerViolenceFormResponse = z.infer<typeof IntimatePartnerViolenceFormResponseSchema>;