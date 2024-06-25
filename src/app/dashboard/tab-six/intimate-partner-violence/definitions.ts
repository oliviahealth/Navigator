import { z } from "zod";
import { IPVStatus } from "@prisma/client";

export const IPVStatusEnum = z.enum([
  "Never (1)",
  "Rarely (2)",
  "Sometimes (3)",
  "Fairly (4)",
  "Often (5)",
  "Frequently (6)"
]);

export const mapFormValueToIPVStatus = (value: string): IPVStatus => {
  const statusMap: Record<string, IPVStatus> = {
    "Never (1)": IPVStatus.Never,
    "Rarely (2)": IPVStatus.Rarely,
    "Sometimes (3)": IPVStatus.Sometimes,
    "Fairly (4)": IPVStatus.Fairly,
    "Often (5)": IPVStatus.Often,
    "Frequently (6)": IPVStatus.Frequently,
  };
  return statusMap[value];
};

export const IntimatePartnerViolenceFormInputsSchema = z.object({
  physicallyHurt: IPVStatusEnum,
  insultOrTalkDown: IPVStatusEnum,
  threatenWithHarm: IPVStatusEnum,
  screamOrCurse: IPVStatusEnum
});

export type IIntimatePartnerViolenceFormInputs = z.infer<typeof IntimatePartnerViolenceFormInputsSchema>;