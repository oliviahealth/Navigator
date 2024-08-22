"use client"

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    BriefChildWellnessUpdateInputsSchema,
    HealthInsuranceEnum,
    IBriefChildWellnessUpdateInputs,
    MedicalCareEnum,
    ReadingFrequencyEnum,
    TimeframeEnum,
    YesNoEnum,
    labelMapping,
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import {
    createBriefChildWellnessUpdate,
    readBriefChildWellnessUpdate,
    updateBriefChildWellnessUpdate
} from "../actions";

const BriefChildWellnessUpdate: React.FC = () => {
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
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<IBriefChildWellnessUpdateInputs>({
        resolver: zodResolver(BriefChildWellnessUpdateInputsSchema),
    });

    const [showOtherHealthInsurance, setShowOtherHealthInsurance] = useState<boolean>(false);
    const handleShowOtherHealthInsurance = (value: string) => {
        setShowOtherHealthInsurance(value === "Other");
        if (value !== "Other") {
            setValue("otherHealthInsurance", null)
        }
    }

    const [showOtherMedicalCare, setShowOtherMedicalCare] = useState<boolean>(false);
    const handleShowOtherMedicalCare = (value: string) => {
        setShowOtherMedicalCare(value === "Other");
        if (value !== "Other") {
            setValue("otherMedicalCare", null)
        }
    }

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

                const response = await readBriefChildWellnessUpdate(submissionId, user.id);
                const formattedData = {
                    ...response,
                    dateCompleted: new Date(response.dateCompleted).toISOString().split('T')[0], // Format as YYYY-MM-DD
                };
                reset(formattedData);
                setShowOtherHealthInsurance(formattedData.healthInsurance === "Other");
                setShowOtherMedicalCare(formattedData.medicalCare === "Other");
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

    const submit = async (data: IBriefChildWellnessUpdateInputs) => {
        try {
            let response;

            if (!user) {
                throw new Error("User missing");
            }

            if (verb === 'new') {
                response = await createBriefChildWellnessUpdate(data, user.id);
            } else {
                response = await updateBriefChildWellnessUpdate(data, submissionId, user.id)
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');
            return;
        }

        setSuccessMessage('Brief Child Wellness Update submitted successfully!')
        router.push('/dashboard/child-records')
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Brief Child Wellness Update </p>
                    <div className="text-sm mt-2">Olivia-Navigator: Child Wellness TouchPoint (from Target Child Record TouchPoint Dashboard)</div>
                    <div className="text-sm mt-2"><i>Complete this form for each OLIVIA-NAVIGATOR target child at each required timeframe once the child is enrolled.</i></div>
                </div>

                <div className="space-y-16 pt-12">
                    <div className="space-y-8">

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">Child Name</p>
                                <input
                                    {...register("childName")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="text"
                                />
                                {errors.childName && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.childName.message}
                                    </span>
                                )}
                            </div>
                            <div className="space-y-3">
                                <p className="font-semibold">Date Completed</p>
                                <input
                                    {...register("dateCompleted")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="date"
                                />
                                {errors.dateCompleted && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.dateCompleted.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold"> Timeframe </p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {TimeframeEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("timeframe")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.timeframe && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.timeframe.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">

                            <div className="space-y-3">
                                <p className="font-semibold">What kind of health insurance coverage does your child have?</p>
                                <div className="space-y-2">
                                    {HealthInsuranceEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register("healthInsurance")}
                                                type="radio"
                                                value={option}
                                                className="form-radio"
                                                onChange={(e) => handleShowOtherHealthInsurance(e.target.value)}
                                            />
                                            <span className="ml-2">{labelMapping.healthInsurance[option]}</span>
                                        </label>
                                    ))}
                                    {errors.healthInsurance && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.healthInsurance.message}
                                        </span>
                                    )}
                                </div>

                                {showOtherHealthInsurance && (
                                    <div className="space-y-3">
                                        <p className="font-semibold">Specify Other</p>
                                        <input
                                            {...register("otherHealthInsurance")}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="text"
                                        />
                                        {errors.otherHealthInsurance && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.otherHealthInsurance.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                        </div>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">What is your child’s usual source of medical care?</p>
                                <div className="space-y-2">
                                    {MedicalCareEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register("medicalCare")}
                                                type="radio"
                                                value={option}
                                                className="form-radio"
                                                onChange={(e) => handleShowOtherMedicalCare(e.target.value)}
                                            />
                                            <span className="ml-2">{labelMapping.medicalCare[option]}</span>
                                        </label>
                                    ))}
                                    {errors.healthInsurance && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.healthInsurance.message}
                                        </span>
                                    )}
                                </div>

                                {showOtherMedicalCare && (
                                    <div className="space-y-3">
                                        <p className="font-semibold">Specify Other</p>
                                        <input
                                            {...register("otherMedicalCare")}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="text"
                                        />
                                        {errors.otherMedicalCare && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.otherMedicalCare.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold"> Does your child have a usual source of dental care? </p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {YesNoEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("hasDentalCare")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.hasDentalCare && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.hasDentalCare.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold"> In a typical week, how often do you or a family member read, tell stories, or sing songs to your child? </p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {ReadingFrequencyEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("readingFrequency")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">{labelMapping.readingFrequency[option]}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.readingFrequency && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.readingFrequency.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

export default BriefChildWellnessUpdate;