'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';

import { IMentalHealthHistoryInputs, MentalHealthHistoryInputsSchema, YesNoEnum } from '../definitions';
import useAppStore from '@/lib/useAppStore';
import {
    createMentalHealthHistory,
    readMentalHealthHistory,
    updateMentalHealthHistory,
} from '../actions';

const MentalHealthHistory: React.FC = () => {
    const router = useRouter();
    const { action } = useParams();

    const verb = action[0];
    const submissionId = action[1];

    const user = useAppStore((state) => state.user);

    const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);
    const setErrorMessage = useAppStore((state) => state.setErrorMessage);

    const [showMedicationDetails, setShowMedicationDetails] = useState<boolean>(false);
    const handleShowMedicationDetails = (value: string) => {
        if (value === "Yes") {
            setShowMedicationDetails(true);
        } else {
            setShowMedicationDetails(false);
            setValue("medicationDetails", null);
        }
    }

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors, isSubmitting },
    } = useForm<IMentalHealthHistoryInputs>({
        resolver: zodResolver(MentalHealthHistoryInputsSchema),
        defaultValues: {
            mentalHealthHistory: [{ diagnosis: '', date: '', provider: '', providerPhone: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'mentalHealthHistory',
    });

    useEffect(() => {
        const fetchAndPopulatePastSubmissionData = async () => {
            try {
                if (verb !== 'edit') {
                    return;
                }

                if (!user) {
                    throw new Error("User not found");
                }

                if (!submissionId) {
                    throw new Error('Missing submissionId when fetching past submission');
                }

                const response = await readMentalHealthHistory(submissionId, user.id);

                reset(response);

                if(response.medicationDetails) {
                    setShowMedicationDetails(true);
                }

            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');
                router.push('/dashboard');
            }
        };

        if (user && verb === 'edit' && submissionId) {
            fetchAndPopulatePastSubmissionData();
        }
    }, [user, verb, submissionId, reset, router, setErrorMessage]);

    const submit = async (data: IMentalHealthHistoryInputs) => {
        try {
            MentalHealthHistoryInputsSchema.parse(data);

            let response;
            if (!user) {
                throw new Error('User missing');
            }

            if (verb === 'new') {
                response = await createMentalHealthHistory(data, user.id);
            } else {
                response = await updateMentalHealthHistory(data, submissionId, user.id);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            router.push('/dashboard');

            return;
        }

        setSuccessMessage('Mental Health History submitted successfully!');
        router.push('/dashboard');
    };

    const addNewDiagnosis = () => {
        append({ diagnosis: '', date: '', provider: '', providerPhone: '' });
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">Mental Health History</p>
                    <small className="text-gray-500">Complete with client/participant as part of each Encounter/Home Visit.</small>
                    <small className="text-gray-500">Follow up as needed with OB/GYN, Primary Care Provider, Nurse Practitioner or Mental Health Provider</small>
                </div>

                <div className="space-y-16 pt-12">

                    <div className="space-y-12">
                        {fields.map((field, index) => (
                            <div key={field.id} className="space-y-12">
                                <div className="space-y-4">

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold pb-2 pt-8">Diagnosis {index + 1}</p>
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                                            >
                                                - Remove Diagnosis
                                            </button>
                                        </div>

                                        <input
                                            {...register(`mentalHealthHistory.${index}.diagnosis`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        />
                                        {errors.mentalHealthHistory &&
                                            errors.mentalHealthHistory[index]?.diagnosis && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.mentalHealthHistory[index]?.diagnosis?.message}
                                                </span>
                                            )}
                                    </div>

                                    <div className="space-y-3">
                                        <p className="font-semibold">Date</p>
                                        <input
                                            {...register(`mentalHealthHistory.${index}.date`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="date"
                                        />
                                        {errors.mentalHealthHistory &&
                                            errors.mentalHealthHistory[index]?.date && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.mentalHealthHistory[index]?.date?.message}
                                                </span>
                                            )}
                                    </div>

                                    <div className="space-y-3">
                                        <p className="font-semibold">Provider</p>
                                        <input
                                            {...register(`mentalHealthHistory.${index}.provider`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        />
                                        {errors.mentalHealthHistory &&
                                            errors.mentalHealthHistory[index]?.provider && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.mentalHealthHistory[index]?.provider?.message}
                                                </span>
                                            )}
                                    </div>

                                    <div className="space-y-3">
                                        <p className="font-semibold">Medication Notes</p>
                                        <textarea
                                            {...register(`mentalHealthHistory.${index}.providerPhone`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        />
                                        {errors.mentalHealthHistory &&
                                            errors.mentalHealthHistory[index]?.providerPhone && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.mentalHealthHistory[index]?.providerPhone?.message}
                                                </span>
                                            )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center py-4">
                    <button
                        type="button"
                        onClick={addNewDiagnosis}
                        className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                    >
                        + Add Diagnosis
                    </button>
                </div>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <p className="font-semibold">Are you currently taking any medication for these diagnoses?</p>
                            <div className="flex flex-col space-y-3">
                                <div className="flex items-center gap-x-12">
                                    {YesNoEnum.options.map(option => (
                                        <label key={option} className="inline-flex items-center">
                                            <input
                                                {...register("takingMedication")}
                                                type="radio"
                                                value={option}
                                                className="form-radio"
                                                onChange={(e) => handleShowMedicationDetails(e.target.value)}
                                            />
                                            <span className="ml-2">{option}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.takingMedication && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.takingMedication.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        {showMedicationDetails && (
                            <div className="space-y-3">
                                <p className="font-semibold">Please explain</p>
                                <textarea
                                    {...register('medicationDetails')}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.medicationDetails && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.medicationDetails.message}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-3">
                            <p className="font-semibold">Notes</p>
                            <textarea
                                {...register('notes')}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            />
                            {errors.notes && (
                                <span className="label-text-alt text-red-500">
                                    {errors.notes.message}
                                </span>
                            )}
                        </div>
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
            </form >
        </div >
    );
};

export default MentalHealthHistory;