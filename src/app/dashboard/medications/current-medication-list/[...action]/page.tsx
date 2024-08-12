'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';

import { ICurrentMedicationListInputs, CurrentMedicationListInputsSchema } from '../definitions';
import useAppStore from '@/lib/useAppStore';
import {
    createCurrentMedicationListRecord,
    readCurrentMedicationListRecord,
    updateCurrentMedicationListRecord,
} from '../actions';

const CurrentMedicationListRecord: React.FC = () => {
    const router = useRouter();
    const { action } = useParams();

    const verb = action[0];
    const submissionId = action[1];

    const user = useAppStore((state) => state.user);

    const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);
    const setErrorMessage = useAppStore((state) => state.setErrorMessage);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<ICurrentMedicationListInputs>({
        resolver: zodResolver(CurrentMedicationListInputsSchema),
        defaultValues: {
            currentMedicationList: [{ name: '', dose: '', prescriber: '', notes: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'currentMedicationList',
    });

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

                const validResponse = await readCurrentMedicationListRecord(submissionId, user.id);

                reset(validResponse);
            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');

                router.push('/');
                return;
            }
        };

        fetchAndPopulatePastSubmissionData();
    }, []);

    const submit = async (data: ICurrentMedicationListInputs) => {
        try {
            CurrentMedicationListInputsSchema.parse(data);
            
            let response;
            if (!user) {
                throw new Error('User missing');
            }

            if (verb === 'new') {
                response = await createCurrentMedicationListRecord(data, user.id);
            } else {
                response = await updateCurrentMedicationListRecord(data, submissionId, user.id);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            router.push('/dashboard');

            return;
        }

        setSuccessMessage('Current Medication List submitted successfully!');
        router.push('/dashboard');
    };

    const addNewMedication = () => {
        append({ name: '', dose: '', prescriber: '', notes: '' });
    };
    
    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pb-4 pt-4 flex flex-col">
                    <p className="font-semibold text-2xl">Current Medication List</p>
                    <small className="text-gray-500">Include prescription and over the counter and supplements.</small>
                    <small className="text-gray-500">Complete with participants.</small>
                    <small className="text-gray-500">Follow up as indicated with provider, social worker, case manager, recovery coach etc..</small>
                </div>
                {fields.map((field, index) => (
                    <div key={field.id} className="py-6">
                        <div className="flex justify-between items-center">
                            <p className="font-medium pb-2 pt-8">Medication {index + 1}</p>
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                            >
                                - Remove Medicine
                            </button>
                        </div>
                        <input
                            {...register(`currentMedicationList.${index}.name`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.currentMedicationList &&
                            errors.currentMedicationList[index]?.name && (
                                <span className="label-text-alt text-red-500">
                                    {errors.currentMedicationList[index]?.name?.message}
                                </span>
                            )}

                        <p className="font-medium pt-6">Dose</p>
                        <input
                            {...register(`currentMedicationList.${index}.dose`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.currentMedicationList &&
                            errors.currentMedicationList[index]?.dose && (
                                <span className="label-text-alt text-red-500">
                                    {errors.currentMedicationList[index]?.dose?.message}
                                </span>
                            )}
                        <p className="font-medium pt-6">Prescriber</p>
                        <input
                            {...register(`currentMedicationList.${index}.prescriber`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.currentMedicationList &&
                            errors.currentMedicationList[index]?.prescriber && (
                                <span className="label-text-alt text-red-500">
                                    {errors.currentMedicationList[index]?.prescriber?.message}
                                </span>
                            )}

                        <p className="font-medium pt-6">Medication Notes</p>
                        <textarea
                            {...register(`currentMedicationList.${index}.notes`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.currentMedicationList &&
                            errors.currentMedicationList[index]?.notes && (
                                <span className="label-text-alt text-red-500">
                                    {errors.currentMedicationList[index]?.notes?.message}
                                </span>
                            )}
                    </div>
                ))}

                <div className="flex justify-center py-4">
                    <button
                        type="button"
                        onClick={addNewMedication}
                        className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                    >
                        + Add Medication
                    </button>
                </div>

                <p className="font-medium pt-6">Notes</p>
                <textarea
                    {...register('notes')}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />

                <div>
                    <hr className="border-t-1 border-gray-400 my-4" />
                    <div>
                        <p className="font-semibold pb-2 pt-8">Submission Label</p>
                        <textarea {...register("label")} className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                        {errors.label && (<span className="label-text-alt text-red-500">{errors.label.message}</span>)}
                    </div>
                    <div>
                        <p className="font-semibold pb-2 pt-8">Staff Notes</p>
                        <textarea {...register("staffNotes")} className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                        {errors.staffNotes && (<span className="label-text-alt text-red-500">{errors.staffNotes.message}</span>)}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-white bg-[#AFAFAFAF] px-20 py-2 mt-6 rounded-md whitespace-nowrap"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CurrentMedicationListRecord;