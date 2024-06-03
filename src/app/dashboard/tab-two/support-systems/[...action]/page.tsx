"use client"

import React, { useEffect } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    SupportSystemsInputsSchema,
    ISupportSystemInputs,
    SupportSystemsResponseSchema
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import { createSupportSystems, readSupportSystems, updateSupportSystems } from "../actions";

const SupportSystems: React.FC = () => {
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
    } = useForm<ISupportSystemInputs>({
        resolver: zodResolver(SupportSystemsInputsSchema),
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

                const response = await readSupportSystems(submissionId, user.id);

                const validResponse = SupportSystemsResponseSchema.parse(response);

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

    const submit = async (SupportSystemsData: ISupportSystemInputs) => {
        try {
            let response;

            if (!user) {
                throw new Error("User missing");
            }

            if (verb === 'new') {
                response = await createSupportSystems(SupportSystemsData, user.id);
            } else {
                response = await updateSupportSystems(SupportSystemsData, submissionId, user.id)
            }

            SupportSystemsResponseSchema.parse(response);
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            router.push('/dashboard');

            return;
        }

        setSuccessMessage('Support Systems Record submitted successfully!')
        router.push('/dashboard');
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Support Systems, Strengths, Areas for Improvement & Goals</p>
                    <small>Complete with Participant. </small>
                    <small>Follow up as indicated with Provider, Social Worker, Case Manager, Recovery Coach, etc.</small>
                </div>

                <div className="space-y-16 pt-12">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">Current Support System (partner, family, friends, faith community, recovery, community, etc.)</p>
                                <textarea
                                    {...register("currentSupportSystem")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.currentSupportSystem && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.currentSupportSystem.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3" >
                                <p className="font-semibold">Your Strengths</p>
                                <textarea
                                    {...register("strengths")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.strengths && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.strengths.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Your Areas for Improvement and Needs</p>
                                <textarea
                                    {...register("areasForImprovement")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.areasForImprovement && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.areasForImprovement.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Your Goals</p>
                                <textarea
                                    {...register("goals")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.goals && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.goals.message}
                                    </span>
                                )}
                            </div>
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
            </form>
        </div>
    )

}

export default SupportSystems;