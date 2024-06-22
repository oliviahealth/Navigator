"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

// Import necessary schemas and types
import {
    ICommunicationLogInputs,
    CommunicationLogInputsSchema,
    ICommunicationEntry,
} from "../definitions";
import { createCommunicationLog, readCommunicationLog, updateCommunicationLog } from "../actions";

import useAppStore from "@/lib/useAppStore";

const CommunicationLog: React.FC = () => {
    const router = useRouter()
    const { action } = useParams(); // Capture weather this is a new submission or edit submission and the submission id using the url

    const verb = action[0]; // Either 'new' or 'edit'
    const submissionId = action[1]; // SubmissionId is a uuid that corresponds to a specific CommunicationLog record in the db

    const user = useAppStore(state => state.user);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    // Using React Hook Form for form controls and validations with Zod
    // See: https://react-hook-form.com/
    // See: https://zod.dev/
    // See: https://www.freecodecamp.org/news/react-form-validation-zod-react-hook-form/
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<ICommunicationLogInputs>({
        resolver: zodResolver(CommunicationLogInputsSchema),
        defaultValues: {
            communicationEntries: [
                {
                    dateTime: undefined,
                    method: null,
                    organizationPerson: "",
                    purpose: "",
                    notes: "",
                    followUpNeeded: "",
                },
            ],
        },
    });

    // Extract some functions that will allow us to interface with the array
    const { fields, append, remove } = useFieldArray({
        control,
        name: "communicationEntries",
    });

    // Add a new blank communication object when the user clicks on the '+ Add Diagnosis button'
    const addNewCommunicationEntry = () => {
        append({
            dateTime: '',
            method: null,
            organizationPerson: "",
            purpose: "",
            notes: "",
            followUpNeeded: "",
        });
    };

    // Send the data to the db depending on weather this is a new submission or updating a submission
    // Parse the response to ensure it is compliant with what we expect
    // Redirect to dashboard
    const submit = async (data: { communicationEntries: ICommunicationEntry[] }) => {
        try {
            if (!user) {
                throw new Error('User not found');
            }

            const { communicationEntries } = data;

            let response;

            if (verb === 'new') {
                response = await createCommunicationLog(communicationEntries, user.id);
            } else {
                response = await updateCommunicationLog(communicationEntries, submissionId, user.id);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            router.push('/dashboard')

            return;
        }

        setSuccessMessage('Communication Log submitted successfully!')
        router.push('/dashboard')
    };

    // If this is an update submission, fetch the past submission data using the submissionId from the url
    // Parse the respond data to ensure it is compliant with what we expect
    // Iterate through the response data and fill in the inputs
    // Call reset() to keep React-Hook-Form in line with our data
    useEffect(() => {
        const fetchAndPopulatePastSubmissionData = async () => {
            try {
                if (verb !== 'edit') {
                    return;
                }

                if (!user) {
                    throw new Error('User not found');
                }

                if (!submissionId) {
                    throw new Error('Missing submissionId when fetching past submission');
                }

                const response = await readCommunicationLog(submissionId, user.id);

                const formattedEntries = response.communicationEntries.map(entry => ({
                    ...entry,
                    dateTime: new Date(entry.dateTime).toISOString().slice(0, 16),
                }));

                reset({ communicationEntries: formattedEntries });
            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');

                router.push('/dashboard');

                return;
            }
        }

        if(!user) return;

        fetchAndPopulatePastSubmissionData()
    }, [])

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Communications Log</p>

                {fields.map((field, index) => {
                    return (
                        <div key={field.id} className="py-6 space-y-4">
                            <div className="flex justify-between">
                                <p className="text-lg font-bold pt-8">
                                    Communication Entry {index + 1}
                                </p>

                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="font-semibold text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                                    >
                                        - Remove Entry
                                    </button>
                                )}
                            </div>

                            <div className="flex flex-col justify-between">
                                <p className="font-semibold pb-2 pt-4">Date/Time</p>

                                <input
                                    {...register(`communicationEntries.${index}.dateTime`)}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="datetime-local"
                                />
                                {errors.communicationEntries && errors.communicationEntries[index]?.dateTime && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.communicationEntries[index]?.dateTime?.message}
                                    </span>
                                )}
                            </div>

                            <div>
                                <p className="font-semibold pb-2 pt-8">Method</p>

                                <div className="space-y-3">
                                    <label className="flex items-center">
                                        <input
                                            {...register(`communicationEntries.${index}.method`)}
                                            className="form-radio"
                                            type="radio"
                                            value={'Phone'}
                                        />
                                        <span className="ml-2">Phone</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            {...register(`communicationEntries.${index}.method`)}
                                            className="form-radio"
                                            type="radio"
                                            value={'Mail'}
                                        />
                                        <span className="ml-2">Mail (Email or Letter)</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            {...register(`communicationEntries.${index}.method`)}
                                            className="form-radio"
                                            type="radio"
                                            value={'In_Person'}
                                        />
                                        <span className="ml-2">In Person</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            {...register(`communicationEntries.${index}.method`)}
                                            className="form-radio"
                                            type="radio"
                                            value={'Video_Call'}
                                        />
                                        <span className="ml-2">Video Call</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            {...register(`communicationEntries.${index}.method`)}
                                            className="form-radio"
                                            type="radio"
                                            value={'Other'}
                                        />
                                        <span className="ml-2">Other</span>
                                    </label>
                                    {errors.communicationEntries && errors.communicationEntries[index]?.method && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.communicationEntries[index]?.method?.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="font-semibold pb-2 pt-8">Organization/Person</p>
                                <input
                                    {...register(`communicationEntries.${index}.organizationPerson`)}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.communicationEntries && errors.communicationEntries[index]?.organizationPerson && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.communicationEntries[index]?.organizationPerson?.message}
                                    </span>
                                )}
                            </div>

                            <div>
                                <p className="font-semibold pb-2 pt-8">Purpose</p>
                                <textarea
                                    {...register(`communicationEntries.${index}.purpose`)}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.communicationEntries && errors.communicationEntries[index]?.purpose && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.communicationEntries[index]?.purpose?.message}
                                    </span>
                                )}
                            </div>

                            <div>
                                <p className="font-semibold pb-2 pt-8">Notes</p>
                                <textarea
                                    {...register(`communicationEntries.${index}.notes`)}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                            </div>

                            <div>
                                <p className="font-semibold pb-2 pt-8">Follow Up Needed?</p>
                                <div className="flex gap-x-12 items-center">
                                    {['Yes', 'No'].map((status, idx) => (
                                        <label key={idx} className="inline-flex items-center">
                                            <input
                                                {...register(`communicationEntries.${index}.followUpNeeded`)}
                                                type="radio"
                                                value={status}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{status}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.communicationEntries && errors.communicationEntries[index]?.followUpNeeded && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.communicationEntries[index]?.followUpNeeded?.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}

                <div className="flex justify-center py-4">
                    <button
                        type="button"
                        onClick={addNewCommunicationEntry}
                        className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                    >
                        + Add Communication Entry
                    </button>
                </div>

                <button
                    type="submit"
                    className="flex items-center justify-center gap-x-2 w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto font-semibold"
                >
                    {isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
                    Save
                </button>
            </form>
        </div>
    );
};

export default CommunicationLog;
