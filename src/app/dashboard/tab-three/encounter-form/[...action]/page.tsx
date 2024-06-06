"use client";

import React, { use, useEffect } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

// Import necessary schemas and types
import {
    IEncounterFormInputs,
    EncounterFormInputsSchema,
    IEncounterEntry,
    EncounterFormResponseSchema,
} from "../definitions";
// import { createEncounterForm, readEncounterForm, updateEncounterForm } from "../actions";

import useAppStore from "@/lib/useAppStore";

const EncounterForm: React.FC = () => {
    const router = useRouter()
    const { action } = useParams();

    const verb = action[0];
    const submissionId = action[1];
    const user = useAppStore(state => state.user);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<IEncounterFormInputs>({
        resolver: zodResolver(EncounterFormInputsSchema),
        defaultValues: {
            encounterEntries: [
                {
                    dateOfVisit: undefined,
                    staff: "",
                    healthInsurance: null,
                    parentConcerns: null,
                    careVisits: null,
                    careVisitsList: [
                        {
                            visitDate: undefined,
                            reason: null,
                            otherReason: null,
                        }
                    ],
                    wellchildVisits: null,
                    wellchildVisitsList: ""
                },
            ],
        },
    });

    const { fields: encounterEntriesFields, append: appendEncounterEntry, remove: removeEncounterEntry } = useFieldArray({
        control,
        name: "encounterEntries",
    });

    const addNewEncounterEntry = () => {
        appendEncounterEntry({
            dateOfVisit: "",
            staff: "",
            healthInsurance: null,
            parentConcerns: null,
            careVisits: null,
            careVisitsList: [
                {
                    visitDate: "",
                    reason: null,
                    otherReason: null,
                }
            ],
            wellchildVisits: null,
            wellchildVisitsList: ""
        });
    };

    // const { fields: careVisitsListFields, append: appendEncounterEntry, remove: removeEncounterEntry } = useFieldArray({
    //     control,
    //     name: "encounterEntries.0.careVisitLists",
    // });

    const submit = async (data: IEncounterFormInputs) => {
        console.log(data)
        // try {
        //     if (!user) {
        //         throw new Error('User not found');
        //     }

        //     const { encounterEntries } = data;

        //     let response;

        //     if (verb === 'new') {
        //         response = await createEncounterForm(encounterEntries, user.id);
        //     } else {
        //         response = await updateEncounterForm(encounterEntries, submissionId);
        //     }

        //     EncounterFormResponseSchema.parse(response);
        // } catch (error) {
        //     console.error(error);
        //     setErrorMessage('Something went wrong! Please try again later');

        //     router.push('/dashboard');

        //     return;
        // }

        // setSuccessMessage('Encounter Form submitted successfully!')
        // router.push('/dashboard');
    };


    // useEffect(() => {
    //     const fetchAndPopulatePastSubmissionData = async () => {
    //         try {
    //             if (!user) {
    //                 throw new Error('User not found');
    //             }

    //             if (verb !== 'edit') {
    //                 return;
    //             }

    //             if (!submissionId) {
    //                 throw new Error('Missing submissionId when fetching past submission');
    //             }

    //             const response = await readEncounterForm(submissionId, user.id);

    //             EncounterFormResponseSchema.parse(response);

    //             const formattedEntries = response.encounterEntries.map(entry => ({
    //                 ...entry,
    //                 dateTime: new Date(entry.dateTime).toISOString().slice(0, 16),
    //             }));

    //             reset({ encounterEntries: formattedEntries });
    //         } catch (error) {
    //             console.error(error);
    //             setErrorMessage('Something went wrong! Please try again later');

    //             router.push('/');

    //             return;
    //         }
    //     }

    //     fetchAndPopulatePastSubmissionData()
    // }, [])

    // if (!user) {
    //     return <h1>Unauthorized</h1>
    // }

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Encounter Form</p>

                <div className="space-y-16 pt-12">
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <p className="font-semibold">Participant Name</p>

                            <input
                                {...register("participantName")}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                type="date"
                            />
                            {errors.participantName && (
                                <span className="label-text-alt text-red-500">
                                    {errors.participantName.message}
                                </span>
                            )}
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">Case ID</p>

                            <input
                                {...register("caseId")}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                type="text"
                            />
                            {errors.caseId && (
                                <span className="label-text-alt text-red-500">
                                    {errors.caseId.message}
                                </span>
                            )}
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">Month/Year</p>

                            <input
                                {...register("monthYear")}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                type="text"
                            />
                            {errors.monthYear && (
                                <span className="label-text-alt text-red-500">
                                    {errors.monthYear.message}
                                </span>
                            )}
                        </div>
                    </div>

                    {encounterEntriesFields.map((field, index) => {
                        return (
                            <div key={field.id} className="py-6 space-y-4">
                                <div className="flex justify-between">
                                    <p className="text-lg font-bold">
                                        Encounter Entry {index + 1}
                                    </p>

                                    {encounterEntriesFields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeEncounterEntry(index)}
                                            className="font-semibold text-red-600 rounded-md whitespace-nowrap"
                                        >
                                            - Remove Entry
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <p className="font-semibold">Date Of Visit</p>

                                    <input
                                        {...register(`encounterEntries.${index}.dateOfVisit`)}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        type="date"
                                    />
                                    {errors.encounterEntries && errors.encounterEntries[index]?.dateOfVisit && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.encounterEntries[index]?.dateOfVisit?.message}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <p className="font-semibold">Staff</p>

                                    <input
                                        {...register(`encounterEntries.${index}.staff`)}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        type="text"
                                    />
                                    {errors.encounterEntries && errors.encounterEntries[index]?.staff && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.encounterEntries[index]?.staff?.message}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <p className="font-semibold">Health Insurance</p>

                                    <input
                                        {...register(`encounterEntries.${index}.healthInsurance`)}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        type="text"
                                    />
                                    {errors.encounterEntries && errors.encounterEntries[index]?.healthInsurance && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.encounterEntries[index]?.healthInsurance?.message}
                                        </span>
                                    )}
                                </div>

                            </div>
                        );
                    })}

                    <div className="flex justify-center py-4">
                        <button
                            type="button"
                            onClick={addNewEncounterEntry}
                            className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                        >
                            + Add Encounter Entry
                        </button>
                    </div>

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
    );
};

export default EncounterForm;
