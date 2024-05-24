"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

// Define the schema of each row in the communication log
const CommunicationEntrySchema = z.object({
    dateTime: z.string().min(1, "Date/Time is required"),
    method: z.string().min(1, "Communication method is required"),
    organizationPerson: z.string().min(1, "Organization/Person is required"),
    purpose: z.string().min(1, "Purpose is required"),
    notes: z.string().nullable(),
    followUpNeeded: z.string().min(1, "Required"),
});
export type ICommunicationEntry = z.infer<typeof CommunicationEntrySchema>;

// Define the overall schema of the communcation log which is an array of objects from above
const CommunicationLogInputsSchema = z.object({
    communicationEntries: z.array(CommunicationEntrySchema),
});
export type ICommunicationLogInputs = z.infer<typeof CommunicationLogInputsSchema>;

const CommunicationLog: React.FC = () => {
    
    // Using React Hook Form for form controls and validations with Zod
    // See: https://react-hook-form.com/
    // See: https://zod.dev/
    // See: https://www.freecodecamp.org/news/react-form-validation-zod-react-hook-form/
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ICommunicationLogInputs>({
        resolver: zodResolver(CommunicationLogInputsSchema),
        defaultValues: {
            communicationEntries: [
                {
                    dateTime: "",
                    method: "",
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
    const addNewCommunicationEntry = () =>
        append({
            dateTime: "",
            method: "",
            organizationPerson: "",
            purpose: "",
            notes: "",
            followUpNeeded: "",
        });

    // Temporary submit function while we work to get db setup
    const submit = (data: ICommunicationLogInputs) => {
        alert("Communication Log submitted successfully");

        console.log(data);
    }

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form onSubmit={handleSubmit((data) => submit(data))} className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-1 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4">
                <p className="font-medium text-xl">Communications Log</p>

                {fields.map((field, index) => (
                    <div key={field.id} className="py-6">
                        <div className="flex justify-between">
                            <p className="text-lg font-medium pt-8">Communication Entry {index + 1}</p>

                            {index > 0 && <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                            >
                                - Remove Diagnosis
                            </button>}
                        </div>

                        <div className="flex flex-col justify-between ">
                            <p className="font-medium pb-2 pt-4">Date/Time</p>
                            <input
                                {...register(`communicationEntries.${index}.dateTime`)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                type="date"
                            />
                            {errors.communicationEntries && errors.communicationEntries[index]?.dateTime && (
                                <span className="label-text-alt text-red-500">
                                    {errors.communicationEntries[index]?.dateTime?.message}
                                </span>
                            )}

                            <p className="font-medium pb-2 pt-8">Method</p>
                            <input
                                {...register(`communicationEntries.${index}.method`)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            />
                            {errors.communicationEntries && errors.communicationEntries[index]?.method && (
                                <span className="label-text-alt text-red-500">
                                    {errors.communicationEntries[index]?.method?.message}
                                </span>
                            )}

                            <p className="font-medium pb-2 pt-8">Organization/Person</p>
                            <input
                                {...register(`communicationEntries.${index}.organizationPerson`)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            />
                            {errors.communicationEntries && errors.communicationEntries[index]?.organizationPerson && (
                                <span className="label-text-alt text-red-500">
                                    {errors.communicationEntries[index]?.organizationPerson?.message}
                                </span>
                            )}

                            <p className="font-medium pb-2 pt-8">Purpose</p>
                            <input
                                {...register(`communicationEntries.${index}.purpose`)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            />
                            {errors.communicationEntries && errors.communicationEntries[index]?.purpose && (
                                <span className="label-text-alt text-red-500">
                                    {errors.communicationEntries[index]?.purpose?.message}
                                </span>
                            )}

                            <p className="font-medium pb-2 pt-8">Notes</p>
                            <input
                                {...register(`communicationEntries.${index}.notes`)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            />

                            <p className="font-medium pb-2 pt-8">Follow Up Needed?</p>
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
                ))}

                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={addNewCommunicationEntry}
                        className="text-green-500 px-20 py-4 font-medium rounded-md whitespace-nowrap"
                    >
                        + Add Diagnosis
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default CommunicationLog;
