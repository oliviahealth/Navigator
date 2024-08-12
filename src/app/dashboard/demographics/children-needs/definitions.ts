import { z } from "zod";

export const StatusEnum = z.enum([
    "Yes",
    "No",
    "Pending"
]);

export const OtherChildrenNeeds = z.object({
    need: z.string().min(1, "Name is required."),
    status: StatusEnum.nullable().refine(val => val, { message: "Status is required" }),
    notes: z.string().nullable()
});

export const ChildrenNeedsFormInputsSchema = z.object({
    breastPump: StatusEnum.refine(val => val, { message: "Required" }),
    breastPumpNotes: z.string().nullable(),
    breastfeedingSupport: StatusEnum.refine(val => val, { message: "Required" }),
    breastfeedingSupportNotes: z.string().nullable(),
    carSeat: StatusEnum.refine(val => val, { message: "Required" }),
    carSeatNotes: z.string().nullable(),
    childcare: StatusEnum.refine(val => val, { message: "Required" }),
    childcareNotes: z.string().nullable(),
    clothing: StatusEnum.refine(val => val, { message: "Required" }),
    clothingNotes: z.string().nullable(),
    bed: StatusEnum.refine(val => val, { message: "Required" }),
    bedNotes: z.string().nullable(),
    diapers: StatusEnum.refine(val => val, { message: "Required" }),
    diapersNotes: z.string().nullable(),
    infantFormula: StatusEnum.refine(val => val, { message: "Required" }),
    infantFormulaNotes: z.string().nullable(),
    infantStroller: StatusEnum.refine(val => val, { message: "Required" }),
    infantStrollerNotes: z.string().nullable(),
    schoolSupplies: StatusEnum.refine(val => val, { message: "Required" }),
    schoolSuppliesNotes: z.string().nullable(),
    specializedMedEquipment: StatusEnum.refine(val => val, { message: "Required" }),
    specializedMedEquipmentNotes: z.string().nullable(),
    other: z.array(OtherChildrenNeeds),
    notes: z.string().nullable(),
    label: z.string().min(1, "Label required."),
    staffNotes: z.string().min(1, "Staff notes required.")
});
export type IChildrenNeedsFormInputs = z.infer<typeof ChildrenNeedsFormInputsSchema>

export const ChildrenNeedsFormResponseSchema = ChildrenNeedsFormInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
})
export type IChildrenNeedsFormResponse = z.infer<typeof ChildrenNeedsFormResponseSchema>