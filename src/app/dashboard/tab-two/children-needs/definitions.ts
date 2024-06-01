import { z } from "zod";

export const StatusEnum = z.enum([
    "Yes",
    "No",
    "Pending"
]);

export const OtherChildrenNeeds = z.object({
    name: z.string().min(1, "Name is required."),
    status: StatusEnum.nullable().refine(val => val, { message: "Status is required" }),
    notes: z.string().nullable()
});

export const ChildrenNeedsFormInputsSchema = z.object({
    breastPump: StatusEnum,
    breastPumpNotes: z.string().nullable(),
    breastfeedingSupport: StatusEnum,
    breastfeedingSupportNotes: z.string().nullable(),
    carSeat: StatusEnum,
    carSeatNotes: z.string().nullable(),
    childcare: StatusEnum,
    childcareNotes: z.string().nullable(),
    clothing: StatusEnum,
    clothingNotes: z.string().nullable(),
    bed: StatusEnum,
    bedNotes: z.string().nullable(),
    diapers: StatusEnum,
    diapersNotes: z.string().nullable(),
    infantFormula: StatusEnum,
    infantFormulaNotes: z.string().nullable(),
    infantStroller: StatusEnum,
    infantStrollerNotes: z.string().nullable(),
    schoolSupplies: StatusEnum,
    schoolSuppliesNotes: z.string().nullable(),
    specializedMedEquipment: StatusEnum,
    specializedMedEquipmentNotes: z.string().nullable(),
    other: z.array(OtherChildrenNeeds),
    notes: z.string().nullable()
});
export type IChildrenNeedsFormInputs = z.infer<typeof ChildrenNeedsFormInputsSchema>

export const ChildrenNeedsFormResponseSchema = ChildrenNeedsFormInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
})
export type IChildrenNeedsFormResponse = z.infer<typeof ChildrenNeedsFormResponseSchema>