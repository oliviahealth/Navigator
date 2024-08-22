"use client"

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    FrequencyEnum,
    IInfancyQuestionnaireInputs,
    InfancyQuestionnaireInputsSchema,
    TimeframeEnum,
    YesEnum,
    YesNoEnum,
    labelMapping
} from "../definitions";
import useAppStore from "@/lib/useAppStore";
import { createInfancyQuestionnaire, readInfancyQuestionnaire, updateInfancyQuestionnaire } from "../actions";

const InfancyQuestionnaire: React.FC = () => {
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
        watch,
        formState: { errors, isSubmitting },
    } = useForm<IInfancyQuestionnaireInputs>({
        resolver: zodResolver(InfancyQuestionnaireInputsSchema),
        defaultValues: {
            attendedPostpartumVisit: null,
            postpartumVisitDate: null,
            hadBreastMilk: null,
            breastMilkAtTwoMonths: null,
            breastMilkAtSixMonths: null,
            motherCouldNotBreastfeed: null,
        }
    });

    const [showPostpartumVisitDate, setShowPostpartumVisitDate] = useState<boolean>(false);
    const handlePostpartumAttendance = (value: string) => {
        setShowPostpartumVisitDate(value === "Yes");
        if (value === "No") {
            setValue("postpartumVisitDate", null);
        }
    };

    const timeframe = watch("timeframe");
    const isBiologicalMother = watch("isBiologicalMother")
    const [showAdditionalQuestions, setShowAdditionalQuestions] = useState<string>("");

    const [count, setCount] = useState(0);

    useEffect(() => {
        const handleShowAdditionalQuestion = () => {

            if (isBiologicalMother === "Yes") {
                setShowAdditionalQuestions(timeframe);
            } else {
                setShowAdditionalQuestions("");
            }

            if (verb !== "edit" || count > 3) {
                setValue("attendedPostpartumVisit", null);
                setValue("postpartumVisitDate", null);
                setValue("hadBreastMilk", null);
                setValue("breastMilkAtTwoMonths", null);
                setValue("breastMilkAtSixMonths", null);
                setValue("motherCouldNotBreastfeed", null);
                setShowPostpartumVisitDate(false);
            }
        };
        handleShowAdditionalQuestion();
        setCount(prevRuns => prevRuns + 1);
    }, [timeframe, isBiologicalMother]);

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

                const validResponse = await readInfancyQuestionnaire(submissionId, user.id);
                const formattedResponse = {
                    ...validResponse,
                    dateCompleted: new Date(validResponse.dateCompleted).toISOString().slice(0, 10),
                    postpartumVisitDate: validResponse.postpartumVisitDate ? new Date(validResponse.postpartumVisitDate).toISOString().slice(0, 10) : null,
                };
                reset(formattedResponse);

                setShowPostpartumVisitDate(validResponse.attendedPostpartumVisit === 'Yes');
            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');
                router.push('/dashboard/child-records/');
            }
        };

        if (user && verb === 'edit' && submissionId) {
            fetchAndPopulatePastSubmissionData();
        }
    }, [user, verb, submissionId, reset, router, setErrorMessage]);

    const submit = async (data: IInfancyQuestionnaireInputs) => {
        console.log(data)
        try {
            let response;

            if (!user) {
                throw new Error("User missing");
            }

            if (verb === 'new') {
                response = await createInfancyQuestionnaire(data, user.id);
            } else {
                response = await updateInfancyQuestionnaire(data, submissionId, user.id)
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');
            return;
        }

        setSuccessMessage('Infancy Questionnaire submitted successfully!')
        router.push('/dashboard/child-records/');
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Infancy Questionnaire </p>
                    <small>Olivia-Navigator: Infancy Questionnaire TouchPoint (from Target Child Record TouchPoint Dashboard)</small>
                </div>

                <div className="space-y-16 pt-8">
                    <div className="space-y-8">

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">Participant Name</p>
                                <input
                                    type="text"
                                    {...register("participantName")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                                {errors.participantName && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.participantName.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Date completed</p>
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
                                <p className="font-semibold">Child Name</p>
                                <input
                                    type="text"
                                    {...register("childName")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                                {errors.childName && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.childName.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Case ID</p>
                                <input
                                    type="text"
                                    {...register("caseId")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                                {errors.caseId && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.caseId.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Staff Name</p>
                                <input
                                    type="text"
                                    {...register("staffName")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                                {errors.staffName && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.staffName.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="pt-6">Complete this form for each OLIVIA-NAVIGATOR target child when timeframe is reached. Skip timeframes prior to enrollment.</p>
                        <div className="space-y-4">
                            <p className="text-lg font-bold"> Timeframe* </p>
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    {TimeframeEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register("timeframe")}
                                                className="form-radio"
                                                type="radio"
                                                value={option}
                                            />
                                            <span className="ml-2">{labelMapping.timeframe[option]}</span>
                                        </label>
                                    ))}
                                    {errors.timeframe && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.timeframe.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-lg font-bold"> Questions for all timeframes </p>

                            <div className="space-y-3">
                                <p className="font-semibold">Do you always place your baby to sleep on his or her back?</p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {YesNoEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("sleepOnBack")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.sleepOnBack && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.sleepOnBack.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Do you always place your baby to sleep alone without bed sharing?</p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {YesNoEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("sleepAlone")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.sleepAlone && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.sleepAlone.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Do you always place your baby to sleep without soft bedding?</p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {YesNoEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("sleepWithoutSoftBedding")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.sleepWithoutSoftBedding && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.sleepWithoutSoftBedding.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">In a typical week, how often do you or a family member read, tell stories, or sing songs to your child?</p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {FrequencyEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("storytellingFrequency")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">{labelMapping.frequency[option]}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.storytellingFrequency && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.storytellingFrequency.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Is the Participant the biological mother of the child?*</p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {YesNoEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("isBiologicalMother")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.isBiologicalMother && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.isBiologicalMother.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {showAdditionalQuestions === "Birth_to_one_month" && (
                            <div className="space-y-4">
                                <p className="text-lg font-bold"> Birth - 1 months old (Additional Questions) </p>

                                <div className="space-y-3">
                                    <p className="font-semibold">Attended Postpartum Visit</p>
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center gap-x-12">
                                            {YesNoEnum.options.map(option => (
                                                <label key={option} className="inline-flex items-center">
                                                    <input
                                                        {...register("attendedPostpartumVisit")}
                                                        type="radio"
                                                        value={option}
                                                        className="form-radio"
                                                        onChange={(e) => handlePostpartumAttendance(e.target.value)}
                                                    />
                                                    <span className="ml-2">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.attendedPostpartumVisit && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.attendedPostpartumVisit.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {showPostpartumVisitDate && (
                                    <>
                                        <div className="space-y-3">
                                            <p className="font-medium">Date of postpartum visit </p>
                                            <input
                                                {...register("postpartumVisitDate")}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                type="date"
                                            />
                                            {errors.postpartumVisitDate && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.postpartumVisitDate.message}
                                                </span>
                                            )}
                                        </div>
                                    </>
                                )}

                                <div className="space-y-3">
                                    <p className="font-semibold">Has your baby ever had breast milk?</p>
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center gap-x-12">
                                            {YesNoEnum.options.map(option => (
                                                <label key={option} className="inline-flex items-center">
                                                    <input
                                                        {...register("hadBreastMilk")}
                                                        type="radio"
                                                        value={option}
                                                        className="form-radio"
                                                    />
                                                    <span className="ml-2">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.hadBreastMilk && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.hadBreastMilk.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="font-semibold">(If mother could not initiate or continue breastfeeding due to medical conditions, mark Yes):</p>
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center gap-x-12">
                                            {YesEnum.options.map(option => (
                                                <label key={option} className="inline-flex items-center">
                                                    <input
                                                        {...register("motherCouldNotBreastfeed")}
                                                        type="radio"
                                                        value={option}
                                                        className="form-radio"
                                                    />
                                                    <span className="ml-2">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.motherCouldNotBreastfeed && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.motherCouldNotBreastfeed.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {showAdditionalQuestions === "Two_to_three_months" && (
                            <div className="space-y-4">
                                <p className="text-lg font-bold"> 2 - 3 months old (Additional Questions) </p>

                                <div className="space-y-3">
                                    <p className="font-semibold">Attended Postpartum Visit</p>
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center gap-x-12">
                                            {YesNoEnum.options.map(option => (
                                                <label key={option} className="inline-flex items-center">
                                                    <input
                                                        {...register("attendedPostpartumVisit")}
                                                        type="radio"
                                                        value={option}
                                                        className="form-radio"
                                                        onChange={(e) => handlePostpartumAttendance(e.target.value)}
                                                    />
                                                    <span className="ml-2">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.attendedPostpartumVisit && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.attendedPostpartumVisit.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {showPostpartumVisitDate && (
                                    <>
                                        <div className="space-y-3">
                                            <p className="font-medium">Date of postpartum visit </p>
                                            <input
                                                {...register("postpartumVisitDate")}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                type="date"
                                            />
                                            {errors.postpartumVisitDate && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.postpartumVisitDate.message}
                                                </span>
                                            )}
                                        </div>
                                    </>
                                )}

                                <div className="space-y-3">
                                    <p className="font-semibold">When your baby turned 2 months old, was he/she getting any breast milk?</p>
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center gap-x-12">
                                            {YesNoEnum.options.map(option => (
                                                <label key={option} className="inline-flex items-center">
                                                    <input
                                                        {...register("breastMilkAtTwoMonths")}
                                                        type="radio"
                                                        value={option}
                                                        className="form-radio"
                                                    />
                                                    <span className="ml-2">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.breastMilkAtTwoMonths && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.breastMilkAtTwoMonths.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="font-semibold">(If mother could not initiate or continue breastfeeding due to medical conditions, mark Yes):</p>
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center gap-x-12">
                                            {YesEnum.options.map(option => (
                                                <label key={option} className="inline-flex items-center">
                                                    <input
                                                        {...register("motherCouldNotBreastfeed")}
                                                        type="radio"
                                                        value={option}
                                                        className="form-radio"
                                                    />
                                                    <span className="ml-2">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.motherCouldNotBreastfeed && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.motherCouldNotBreastfeed.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {showAdditionalQuestions === "Six_to_seven_months" && (
                            <div className="space-y-4">
                                <p className="text-lg font-bold"> 6 - 7 months old (Additional Questions) </p>

                                <div className="space-y-3">
                                    <p className="font-semibold">When your baby turned 6 months old, was he/she getting any breast milk?</p>
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center gap-x-12">
                                            {YesNoEnum.options.map(option => (
                                                <label key={option} className="inline-flex items-center">
                                                    <input
                                                        {...register("breastMilkAtSixMonths")}
                                                        type="radio"
                                                        value={option}
                                                        className="form-radio"
                                                    />
                                                    <span className="ml-2">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.breastMilkAtSixMonths && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.breastMilkAtSixMonths.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="font-semibold">(If mother could not initiate or continue breastfeeding due to medical conditions, mark Yes):</p>
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center gap-x-12">
                                            {YesEnum.options.map(option => (
                                                <label key={option} className="inline-flex items-center">
                                                    <input
                                                        {...register("motherCouldNotBreastfeed")}
                                                        type="radio"
                                                        value={option}
                                                        className="form-radio"
                                                    />
                                                    <span className="ml-2">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.motherCouldNotBreastfeed && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.motherCouldNotBreastfeed.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
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
                </div>
            </form >
        </div >
    )
}

export default InfancyQuestionnaire;