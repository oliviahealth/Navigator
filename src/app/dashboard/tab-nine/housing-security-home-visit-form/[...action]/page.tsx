"use client"

import React, { useEffect } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    HousingSecurityHomeVisitResponseSchema,
    IHousingSecurityHomeVisitInputs,
    HousingSecurityHomeVisitInputsSchema,
    YesNoEnum,
    YesNoDidNotAskEnum
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import { createHousingSecurityHomeVisit, readHousingSecurityHomeVisit, updateHousingSecurityHomeVisit } from "../actions";

const HousingSecurityHomeVisit: React.FC = () => {
    const router = useRouter();
    const { action } = useParams();

    const verb = action[0];
    const submissionId = action[1];

    const user = useAppStore(state => state.user);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<IHousingSecurityHomeVisitInputs>({
        resolver: zodResolver(HousingSecurityHomeVisitInputsSchema),
    });

    useEffect(() => {
        const fetchAndPopulatePastSubmissionData = async () => {
            try {
                if (verb !== 'edit') {
                    return;
                }
                
                if (!user) {
                    throw new Error('User not found');
                }

                const response = await readHousingSecurityHomeVisit(submissionId, user.id);

                const validResponse = HousingSecurityHomeVisitResponseSchema.parse(response);

                reset(validResponse);
            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');
                router.push('/dashboard');
                return;
            }
        }

        if(user) return;

        fetchAndPopulatePastSubmissionData();
    }, [user, verb, submissionId, reset, setErrorMessage, router]);

    const submit = async (data: IHousingSecurityHomeVisitInputs) => {
        console.log(data);
        try {
            let response;

            if (!user) {
                throw new Error("User missing");
            }

            if (verb === 'new') {
                response = await createHousingSecurityHomeVisit(data, user.id);
            } else {
                response = await updateHousingSecurityHomeVisit(data, submissionId, user.id);
            }

            HousingSecurityHomeVisitResponseSchema.parse(response);
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');
            return;
        }

        setSuccessMessage('Housing Security Home Visit submitted successfully!');
        router.push('/dashboard');
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Housing Security Home Visit Form</p>
                </div>

                <div className="space-y-16 pt-12">
                    <div className="space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">Participant Name</p>
                                <input
                                    {...register("participantName")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.participantName?.message && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.participantName.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="font-semibold">Case ID</p>
                    <input
                        {...register("caseId")}
                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        type="text"
                    />
                    {errors.caseId?.message && (
                        <span className="label-text-alt text-red-500">
                            {errors.caseId.message}
                        </span>
                    )}
                </div>

                <div className="space-y-3">
                    <p className="font-semibold">Date of Visit</p>
                    <input
                        {...register("dateOfVisit")}
                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        type="date"
                    />
                    {errors.dateOfVisit && (
                        <span className="label-text-alt text-red-500">
                            {errors.dateOfVisit.message}
                        </span>
                    )}
                </div>


                <div className="space-y-3">
                    <p className="font-semibold">Staff Name</p>
                    <input
                        {...register("staffName")}
                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    />
                    {errors.staffName?.message && (
                        <span className="label-text-alt text-red-500">
                            {errors.staffName.message}
                        </span>
                    )}
                </div>

                <div className="space-y-3">
                    <p className="font-semibold">Do you have health insurance coverage? </p>
                    <div className="flex items-center gap-x-12">
                        {YesNoEnum.options.map(option => (
                            <label key={option} className="flex items-center">
                                <input
                                    {...register("haveHealhInsurance")}
                                    className="form-radio"
                                    type="radio"
                                    value={option}
                                />
                                <span className="ml-2">{option}</span>
                            </label>
                        ))}
                    </div>
                    {errors.haveHealhInsurance && (
                        <span className="label-text-alt text-red-500">
                            {errors.haveHealhInsurance.message}
                        </span>
                    )}
                </div>
                


                <div className="space-y-3">
                    <p className="font-semibold">Do you have any concerns about your child's development, behavior, or learning? </p>
                    <div className="flex items-center gap-x-12">
                        {YesNoDidNotAskEnum.options.map(option => (
                            <label key={option} className="flex items-center">
                                <input
                                    {...register("childConcerns")}
                                    className="form-radio"
                                    type="radio"
                                    value={option}
                                />
                                <span className="ml-2">{option}</span>
                            </label>
                        ))}
                    </div>
                    {errors.childConcerns && (
                        <span className="label-text-alt text-red-500">
                            {errors.childConcerns.message}
                        </span>
                    )}
                </div>




                <div className="space-y-3">
                    <p className="font-semibold">Since our last visit, have you taken your child to the hospital emergency room? </p>
                    <div className="flex items-center gap-x-12">
                        {YesNoEnum.options.map(option => (
                            <label key={option} className="flex items-center">
                                <input
                                    {...register("takenChildToEr")}
                                    className="form-radio"
                                    type="radio"
                                    value={option}
                                />
                                <span className="ml-2">{option}</span>
                            </label>
                        ))}
                    </div>
                    {errors.takenChildToEr && (
                        <span className="label-text-alt text-red-500">
                            {errors.takenChildToEr.message}
                        </span>
                    )}
                </div>
                


                <div className="space-y-3">
                    <p className="font-semibold">Since our last visit, has your child had any well-child visits? </p>
                    <div className="flex items-center gap-x-12">
                        {YesNoEnum.options.map(option => (
                            <label key={option} className="flex items-center">
                                <input
                                    {...register("wellChildVisits")}
                                    className="form-radio"
                                    type="radio"
                                    value={option}
                                />
                                <span className="ml-2">{option}</span>
                            </label>
                        ))}
                    </div>
                    {errors.wellChildVisits && (
                        <span className="label-text-alt text-red-500">
                            {errors.wellChildVisits.message}
                        </span>
                    )}
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

export default HousingSecurityHomeVisit;
