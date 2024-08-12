import { z } from "zod";

export const YesNoEnum = z.enum(["Yes", "No"]);

export const DeliveryHistoryInformationFormInputsSchema = z.object({
    participantName: z.string().min(1, "Participant name required."),
    caseId: z.string().min(1, "Case ID required."),
    dateCompleted: z.union([z.date(), z.string().min(1, "Date completed required.")]),
    staffName: z.string().min(1, "Staff name required."),
    deliveries: z.array(
        z.object({
            estimatedDeliveryDate: z.union([z.date(), z.string().min(1, "Estimated delivery date required.")]),
            actualDeliveryDate: z.union([z.date(), z.string().min(1, "Actual delivery date required.")]),
            deliveryResultInBirth: YesNoEnum.nullable().refine(val => val !== null, { message: "Required." }),
            enrolledAsTargetChild: YesNoEnum.nullable()
        })
    ),
    label: z.string().min(1, "Label required."),
    staffNotes: z.string().min(1, "Staff notes required.")
});
export type IDeliveryHistoryInformationFormInputs = z.infer<typeof DeliveryHistoryInformationFormInputsSchema>;

export const DeliveryHistoryInformationFormResponseSchema = DeliveryHistoryInformationFormInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IDeliveryHistoryInformationResponse = z.infer<typeof DeliveryHistoryInformationFormResponseSchema>