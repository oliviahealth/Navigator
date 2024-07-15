"use client";

import React from "react";
import { useRouter, useParams } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

// Import necessary schemas and types
import {
    IAppointmentLogInputs,
    AppointmentLogInputsSchema,
    IAppointmentEntry,
} from "../definitions";
import { createAppointmentLog, updateAppointmentLog } from "../actions";

import useAppStore from "@/lib/useAppStore";

const AppointmentLog: React.FC = () => {
    const router = useRouter();
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
    } = useForm<IAppointmentLogInputs>({
        resolver: zodResolver(AppointmentLogInputsSchema),
        defaultValues: {
            appointmentEntries: [
                {
                    dateTime: "",
                    who: "",
                    location: "",
                    notes: "",
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "appointmentEntries",
    });

    const addNewAppointmentEntry = () => {
        append({
            dateTime: "",
            who: "",
            location: "",
            notes: "",
        });
    };

    const submit = async (data: { appointmentEntries: IAppointmentEntry[] }) => {
        try {
            if (!user) {
                throw new Error('User not found');
            }

            const { appointmentEntries } = data;

            let response;

            if (verb === 'new') {
                response = await createAppointmentLog(appointmentEntries, user.id);
            } else {
                
                response = await updateAppointmentLog(appointmentEntries, submissionId, "userIdValue");
            }

        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            router.push('/dashboard');

            return;
        }

        setSuccessMessage('Appointment Log submitted successfully!');
        router.push('/dashboard');
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form onSubmit={handleSubmit((data) => submit(data))} className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-4 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4">
                <p className="font-semibold text-2xl">Appointment Log</p>

                {fields.map((field, index) => (
                    <div key={index} className="py-6 space-y-4">
                        <div className="flex justify-between">
                            <p className="text-lg font-semibold pt-8">Appointment Entry {index + 1}</p>

                            {fields.length > 1 && <button
                                type="button"
                                onClick={() => remove(index)}
                                className="font-semibold text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                            >
                                - Remove Diagnosis
                            </button>}
                        </div>
                        <div className="flex flex-col justify-between ">
                            <p className="font-semibold pb-2 pt-4">Date/Time</p>
                            <input
                                {...register(`appointmentEntries.${index}.dateTime`)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                type="datetime-local"
                            />
                            {errors.appointmentEntries && errors.appointmentEntries[index]?.dateTime && (
                                <span className="label-text-alt text-red-500">
                                    {errors.appointmentEntries[index]?.dateTime?.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col justify-between ">
                            <div className="pb-4 pt-4">
                                <p className="font-semibold">Who Is The Appointment With</p>
                                <small className="text-gray-500">Participant plus anyone else who joined the interaction</small>
                            </div>
                            <input
                                {...register(`appointmentEntries.${index}.who`)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                type="text"
                            />
                            {errors.appointmentEntries && errors.appointmentEntries[index]?.who && (
                                <span className="label-text-alt text-red-500">
                                    {errors.appointmentEntries[index]?.who?.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col justify-between ">
                            <div className="pb-2 pt-4">
                                <p className="font-semibold">Location</p>
                                <small className="text-gray-500">Home, park, coffee shop etc..</small>
                            </div>
                            <input
                                {...register(`appointmentEntries.${index}.location`)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                type="text"
                            />
                            {errors.appointmentEntries && errors.appointmentEntries[index]?.location && (
                                <span className="label-text-alt text-red-500">
                                    {errors.appointmentEntries[index]?.location?.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <p className="font-semibold pb-2 pt-8">Notes</p>
                            <textarea
                                {...register(`appointmentEntries.${index}.notes`)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            />
                        </div>
                    </div>
                ))}

                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={addNewAppointmentEntry}
                        className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                    >
                        + Add Diagnosis
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
    )
}

export default AppointmentLog;