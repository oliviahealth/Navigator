"use client"

import React, { useEffect } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
    CurrentLivingArrangementInputsSchema,
    ICurrentLivingArrangementInputs,
    CurrentLivingArrangementResponseSchema
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import { createCurrentLivingArrangements, readCurrentLivingArrangement, updateCurrentLivingArrangements } from "../actions";

const ParticipantDemographicsRecord: React.FC = () => {
    const router = useRouter();
    const { action } = useParams();

    const verb = action[0]
    const submissionId = action[1]

    const user = useAppStore(state => state.user);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<ICurrentLivingArrangementInputs>({
        resolver: zodResolver(CurrentLivingArrangementInputsSchema),
        defaultValues: {
            listPeopleLivingWithPatient: [
                {
                    name: '',
                    dateOfBirth: '',
                    relation: ''
                }
            ],
            listChildrenNotLivingWithPatient: [
                {
                    name: '',
                    dateOfBirth: '',
                    caregiver: '',
                    caregiverNumber: ''
                }
            ]
        }
    });

    const {
        fields: peopleLivingWithFields,
        append: appendPeopleLivingWithField,
        remove: removePeopleLivingWithField
    } = useFieldArray({
        control,
        name: "listPeopleLivingWithPatient",
    });

    const addNewPersonLivingWith = () => {
        appendPeopleLivingWithField({
            name: '',
            dateOfBirth: '',
            relation: ''
        });
    };

    const {
        fields: childrenNotLivingWithFields,
        append: appendChildrenNotLivingWithField,
        remove: removeChildrenNotLivingWithField
    } = useFieldArray({
        control,
        name: "listChildrenNotLivingWithPatient",
    });

    const addNewChildNotLivingWith = () => {
        appendChildrenNotLivingWithField({
            name: '',
            dateOfBirth: '',
            caregiver: '',
            caregiverNumber: ''
        });
    };

    useEffect(() => {
        const fetchAndPopulatePastSubmissionData = async () => {
            try {
                if (verb !== 'edit') {
                    return;
                }

                if (!submissionId) {
                    throw new Error('Missing submissionId when fetching past submission');
                }

                if (!user) {
                    throw new Error('Missing user');
                }

                const response = await readCurrentLivingArrangement(submissionId, user.id);

                const validResponse = CurrentLivingArrangementResponseSchema.parse(response);

                reset(validResponse);

            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');

                router.push('/');

                return;
            }
        }

        fetchAndPopulatePastSubmissionData()
    }, [])

    const submit = async (data: ICurrentLivingArrangementInputs) => {
        try {
            let response;

            if (!user) {
                throw new Error("User missing");
            }

            if (verb === 'new') {
                response = await createCurrentLivingArrangements(data, user.id);
            } else {
                response = await updateCurrentLivingArrangements(data, submissionId, user.id)
            }

            CurrentLivingArrangementResponseSchema.parse(response);
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            return;
        }

        setSuccessMessage('Current Living Arrangement submitted successfully!')
        router.push('/dashboard');
        console.log(data);
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Current Living Arrangement</p>
                </div>

                <div className="space-y-16 pt-12">

                    <div>
                        <p className="text-xl font-bold">List of People Living With You</p>
                        {peopleLivingWithFields.map((field, index) => {
                            return (
                                <div key={field.id} className="py-6 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-bold">
                                            Person Living With You #{index + 1}
                                        </p>

                                        {!(peopleLivingWithFields.length == 1 && index == 0) && (
                                            <button
                                                type="button"
                                                onClick={() => removePeopleLivingWithField(index)}
                                                className="font-semibold text-red-600 px-4 py-2 rounded-md whitespace-nowrap"
                                            >
                                                - Remove Entry
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-between space-y-3">
                                        <p className="font-semibold">Name</p>

                                        <input
                                            {...register(`listPeopleLivingWithPatient.${index}.name`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="text"
                                        />
                                        {errors.listPeopleLivingWithPatient && errors.listPeopleLivingWithPatient[index]?.name && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.listPeopleLivingWithPatient[index]?.name?.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-between space-y-3">
                                        <p className="font-semibold">Date of Birth</p>

                                        <input
                                            {...register(`listPeopleLivingWithPatient.${index}.dateOfBirth`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="date"
                                        />
                                        {errors.listPeopleLivingWithPatient && errors.listPeopleLivingWithPatient[index]?.dateOfBirth && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.listPeopleLivingWithPatient[index]?.dateOfBirth?.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-between space-y-3">
                                        <p className="font-semibold">Relation</p>

                                        <input
                                            {...register(`listPeopleLivingWithPatient.${index}.relation`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="text"
                                        />
                                        {errors.listPeopleLivingWithPatient && errors.listPeopleLivingWithPatient[index]?.relation && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.listPeopleLivingWithPatient[index]?.relation?.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        <div className="flex justify-center py-4">
                            <button
                                type="button"
                                onClick={addNewPersonLivingWith}

                                className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                            >
                                + Add New Person
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className="text-xl font-bold">List of Children NOT Living With You</p>
                        {childrenNotLivingWithFields.map((field, index) => {
                            return (
                                <div key={field.id} className="py-6 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-bold">
                                            Child NOT Living With You #{index + 1}
                                        </p>

                                        {!(childrenNotLivingWithFields.length == 1 && index == 0) && (
                                            <button
                                                type="button"
                                                onClick={() => removeChildrenNotLivingWithField(index)}
                                                className="font-semibold text-red-600 px-4 py-2 rounded-md whitespace-nowrap"
                                            >
                                                - Remove Entry
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-between space-y-3">
                                        <p className="font-semibold">Name</p>

                                        <input
                                            {...register(`listChildrenNotLivingWithPatient.${index}.name`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="text"
                                        />
                                        {errors.listChildrenNotLivingWithPatient && errors.listChildrenNotLivingWithPatient[index]?.name && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.listChildrenNotLivingWithPatient[index]?.name?.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-between space-y-3">
                                        <p className="font-semibold">Date of Birth</p>

                                        <input
                                            {...register(`listChildrenNotLivingWithPatient.${index}.dateOfBirth`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="date"
                                        />
                                        {errors.listChildrenNotLivingWithPatient && errors.listChildrenNotLivingWithPatient[index]?.dateOfBirth && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.listChildrenNotLivingWithPatient[index]?.dateOfBirth?.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-between space-y-3">
                                        <p className="font-semibold">Caregiver</p>

                                        <input
                                            {...register(`listChildrenNotLivingWithPatient.${index}.caregiver`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="text"
                                        />
                                        {errors.listChildrenNotLivingWithPatient && errors.listChildrenNotLivingWithPatient[index]?.caregiver && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.listChildrenNotLivingWithPatient[index]?.caregiver?.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-between space-y-3">
                                        <p className="font-semibold">Caregiver Contact Number</p>

                                        <input
                                            {...register(`listChildrenNotLivingWithPatient.${index}.caregiverNumber`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="text"
                                        />
                                        {errors.listChildrenNotLivingWithPatient && errors.listChildrenNotLivingWithPatient[index]?.caregiverNumber && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.listChildrenNotLivingWithPatient[index]?.caregiverNumber?.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        <div className="flex justify-center py-4">
                            <button
                                type="button"
                                onClick={addNewChildNotLivingWith}

                                className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                            >
                                + Add New Person
                            </button>
                        </div>
                    </div>


                    <div className="flex flex-col justify-between space-y-3">
                        <p className="font-semibold">Notes</p>

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

export default ParticipantDemographicsRecord;