"use client"

import React, { useEffect } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    ChurchAttendanceEnum,
    DukeUniversityReligionIndexInputsSchema,
    IDukeUniversityReligionIndexInputs,
    TimeSpentReligiouslyEnum,
    TruthLevelEnum,
    labelMapping
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import {
    createDukeUniversityReligionIndex,
    readDukeUniversityReligionIndex,
    updatedukeUniversityReligionIndex
} from "../actions";

const DukeUniversityReligionIndex: React.FC = () => {
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
        formState: { errors, isSubmitting },
    } = useForm<IDukeUniversityReligionIndexInputs>({
        resolver: zodResolver(DukeUniversityReligionIndexInputsSchema),
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

                const response = await readDukeUniversityReligionIndex(submissionId, user.id);
                reset(response);
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

    const submit = async (data: IDukeUniversityReligionIndexInputs) => {
        try {
            let response;

            if (!user) {
                throw new Error("User missing");
            }

            if (verb === 'new') {
                response = await createDukeUniversityReligionIndex(data, user.id);
            } else {
                response = await updatedukeUniversityReligionIndex(data, submissionId, user.id)
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');
            return;
        }

        setSuccessMessage('Duke University Religion Index submitted successfully!')
        router.push('/dashboard')
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Duke University Religion Index</p>
                    <small>This is a short assessment to better understand how you are involved (if at all) in religion or religious practices.</small>
                </div>

                <div className="space-y-16 pt-12">

                    <div className="space-y-4">
                        <div className="space-y-3">
                            <p className="font-semibold">How often do you attend church, synagogue, or other religious meetings?</p>
                            <div className="space-y-2">
                                {ChurchAttendanceEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("churchAttendance")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.churchAttendance[option]}</span>
                                    </label>
                                ))}
                                {errors.churchAttendance && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.churchAttendance.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">How often do you spend time in private religious activities, such as prayer, meditation or Bible study?</p>
                            <div className="space-y-2">
                                {TimeSpentReligiouslyEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("timeSpentReligiously")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.timeSpentReligiously[option]}</span>
                                    </label>
                                ))}
                                {errors.timeSpentReligiously && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.timeSpentReligiously.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">In my life, I experience the presence of the divine.</p>
                            <div className="space-y-2">
                                {TruthLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("divineExperience")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.truthLevel[option]}</span>
                                    </label>
                                ))}
                                {errors.divineExperience && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.divineExperience.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">My religious beliefs are what really lie behind my whole approach to life.</p>
                            <div className="space-y-2">
                                {TruthLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("beliefLifeInfluence")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.truthLevel[option]}</span>
                                    </label>
                                ))}
                                {errors.beliefLifeInfluence && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.beliefLifeInfluence.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">I try hard to carry my religion over into other dealings in life.</p>
                            <div className="space-y-2">
                                {TruthLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("religiousIntegrationEffort")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.truthLevel[option]}</span>
                                    </label>
                                ))}
                                {errors.religiousIntegrationEffort && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.religiousIntegrationEffort.message}
                                    </span>
                                )}
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

export default DukeUniversityReligionIndex;