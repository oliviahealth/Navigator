"use client"

import React, { useEffect } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
    ChildrenNeedsFormInputsSchema,
    ChildrenNeedsFormResponseSchema,
    IChildrenNeedsFormInputs,
    StatusEnum
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import { createChildrenNeedsForm, readChildrenNeedsForm, updateChildrenNeedsForm } from "../actions";

const ChildrenNeedsForm: React.FC = () => {
    const router = useRouter();
    const { action } = useParams();

    const verb = action[0]
    const submissionId = action[1]

    const user = useAppStore(state => state.user);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<IChildrenNeedsFormInputs>({
        resolver: zodResolver(ChildrenNeedsFormInputsSchema),
        defaultValues: {
            other: [{
                need: '',
                status: null,
                notes: null
            }]
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'other',
    });

    const addNewChildrenNeed = () =>
        append({
            need: '',
            status: null,
            notes: null,
        });

    useEffect(() => {
        const fetchAndPopulatePastSubmissionData = async () => {
            try {

                if (!user) {
                    throw new Error('Missing user');
                }

                if (verb !== 'edit') {
                    return;
                }

                if (!submissionId) {
                    throw new Error('Missing submissionId when fetching past submission');
                }

                const response = await readChildrenNeedsForm(submissionId, user.id);
                const validResponse = ChildrenNeedsFormResponseSchema.parse(response);
                reset(validResponse);

            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');
                router.push('/dashboard');
                return;
            }
        }

        fetchAndPopulatePastSubmissionData()
    }, [])

    const submit = async (data: IChildrenNeedsFormInputs) => {
        try {
            let response;

            if (!user) {
                throw new Error("User missing");
            }

            if (verb === 'new') {
                response = await createChildrenNeedsForm(data, user.id);
            } else {
                response = await updateChildrenNeedsForm(data, submissionId, user.id)
            }

            ChildrenNeedsFormResponseSchema.parse(response);
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            return
        }

        setSuccessMessage('Children Needs Form submitted successfully!')
        router.push('/dashboard');
    };

    const sections: Record<string, [string, string]> = {
        breastPump: ["Breast Pump", "breastPumpNotes"],
        breastfeedingSupport: ["Breastfeeding Support", "breastfeedingSupportNotes"],
        carSeat: ["Car Seat", "carSeatNotes"],
        childcare: ["Childcare", "childcareNotes"],
        clothing: ["Clothing", "clothingNotes"],
        bed: ["Crib/Pack-n-play/Bed", "bedNotes"],
        diapers: ["Diapers", "diapersNotes"],
        infantFormula: ["Infant Formula", "infantFormulaNotes"],
        infantStroller: ["Infant Stroller", "infantStrollerNotes"],
        schoolSupplies: ["School Supplies", "schoolSuppliesNotes"],
        specializedMedEquipment: ["Specialized Medical Equipment", "specializedMedEquipmentNotes"]
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Child(ren) Needs</p>
                </div>

                <div className="space-y-16 pt-12">
                    {Object.entries(sections).map(([key, [displayName, notesKey]], index) => (
                        <div key={index} className="space-y-8">
                            <div>
                                    <p className="font-bold text-xl">{displayName}</p>
                                    <div className="flex flex-row space-x-12">
                                        {StatusEnum.options.map((status) => (
                                            <label key={status} className="inline-flex items-center pt-2">
                                                <input
                                                    {...register(key as keyof IChildrenNeedsFormInputs)}
                                                    type="radio"
                                                    value={status}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">{status}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {/* @ts-expect-error: Overriding ts checks */}
                                    {errors[key]?.message && (
                                        <span className="label-text-alt text-red-500">
                                            {/* @ts-expect-error: Overriding ts checks */}
                                            {errors[key]?.message}
                                        </span>
                                    )}

                                    <p className="font-medium pt-6">Notes</p>
                                    <textarea
                                        {...register(notesKey as keyof IChildrenNeedsFormInputs)}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    />
                                    {/* @ts-expect-error: Overriding ts checks */}
                                    {errors[key]?.notes && (
                                        <span className="label-text-alt text-red-500">
                                            {/* @ts-expect-error: Overriding ts checks */}
                                            {errors[key]?.notes.message}
                                        </span>
                                    )}
                            </div>
                        </div>
                    ))}

                    <div>
                        <p className="text-xl font-bold">Other Child(ren) Needs</p>
                        {fields.map((field, index) => {
                            return (
                                <div key={field.id} className="py-6 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-bold">
                                            Other Child(ren) Need #{index + 1}
                                        </p>

                                        {(fields.length > 0) && (
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="font-semibold text-red-600 px-4 py-2 rounded-md whitespace-nowrap"
                                            >
                                                - Remove Entry
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-between space-y-3">
                                        <p className="font-semibold">Name</p>

                                        <input
                                            {...register(`other.${index}.need`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="text"
                                        />
                                        {errors.other && errors.other[index]?.need && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.other[index]?.need?.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-between space-y-3">
                                        <p className="font-semibold">Status</p>

                                        <div className="flex flex-row space-x-4">
                                            {StatusEnum.options.map((status) => (
                                                <label key={status} className="inline-flex items-center pt-2">
                                                    <input
                                                        {...register(`other.${index}.status`)}
                                                        type="radio"
                                                        value={status}
                                                        className="form-radio"
                                                    />
                                                    <span className="ml-2">{status}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.other && errors.other[index]?.status && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.other[index]?.status?.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-between space-y-3">
                                        <p className="font-semibold">Notes</p>

                                        <textarea
                                            {...register(`other.${index}.notes`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        />
                                        {errors.other && errors.other[index]?.notes && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.other[index]?.notes?.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        <div className="flex justify-center py-4">
                            <button
                                type="button"
                                onClick={addNewChildrenNeed}

                                className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                            >
                                + Add New Need
                            </button>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col justify-between space-y-3">
                    <p className="font-semibold">Additional Notes</p>

                    <textarea
                        {...register("notes")}
                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    />
                    {errors.notes && (
                        <span className="label-text-alt text-red-500">
                            {errors.notes.message}
                        </span>
                    )}
                </div>

                <div className="flex justify-center py-4">
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-x-2 w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto font-semibold"
                    >
                        {isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChildrenNeedsForm;