"use client"

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {

    ASQ3InputsSchema,
    FollowUpActionEnum,
    IASQ3Inputs,
    YesNoEnum,
    labelMapping,
    months
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import {
    createASQ3,
    readASQ3,
    updateASQ3
} from "../actions";

const ASQ3: React.FC = () => {
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
    } = useForm<IASQ3Inputs>({
        resolver: zodResolver(ASQ3InputsSchema),
    });

    const [showCommunicationScore, setShowCommunicationScore] = useState<boolean>(false);
    const handleShowCommunicationScore = (value: string) => {
        setShowCommunicationScore(value === "No")
        if (value === "Yes") {
            setValue("communicationScore", null)
        }
    }

    const [showGrossMotorScore, setShowGrossMotorScore] = useState<boolean>(false);
    const handleShowGrossMotorScore = (value: string) => {
        setShowGrossMotorScore(value === "No")
        if (value === "Yes") {
            setValue("grossMotorScore", null)
        }
    }

    const [showFineMotorScore, setShowFineMotorScore] = useState<boolean>(false);
    const handleShowFineMotorScore = (value: string) => {
        setShowFineMotorScore(value === "No")
        if (value === "Yes") {
            setValue("fineMotorScore", null)
        }
    }

    const [showProblemSolvingScore, setShowProblemSolvingScore] = useState<boolean>(false);
    const handleShowProblemSolvingScore = (value: string) => {
        setShowProblemSolvingScore(value === "No")
        if (value === "Yes") {
            setValue("problemSolvingScore", null)
        }
    }

    const [showPersonalSocialScore, setShowPersonalSocialScore] = useState<boolean>(false);
    const handleShowPersonalSocialScore = (value: string) => {
        setShowPersonalSocialScore(value === "No")
        if (value === "Yes") {
            setValue("personalSocialScore", null)
        }
    }

    const [selectedFollowUpAction, setSelectedFollowUpAction] = useState('');
    const followUpAction = watch("followUpAction", []);
    const [showDescribeActivitesProvided, setShowDescribeActivitesProvided] = useState<boolean>(false);
    useEffect(() => {
        if (Array.isArray(followUpAction)) {
            const includesNone = followUpAction.includes("No_further_action");
            if (includesNone) {
                if (JSON.stringify(followUpAction) !== JSON.stringify(["No_further_action"])) {
                    setValue("followUpAction", ["No_further_action"]);
                }
                setSelectedFollowUpAction("No_further_action");
                setShowDescribeActivitesProvided(false);
            } else if (followUpAction.length === 0) {
                setSelectedFollowUpAction("");
            } else {
                const includesProvideSupport = followUpAction.includes("Provide_support");
                setShowDescribeActivitesProvided(includesProvideSupport);
            }
        }
    }, [followUpAction, setValue]);

    console.log(errors);

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

                const response = await readASQ3(submissionId, user.id);

                const formattedData = {
                    ...response,
                    dateCompleted: new Date(response.dateCompleted).toISOString().split('T')[0], // Format as YYYY-MM-DD
                };
                
                reset(formattedData);
                setShowCommunicationScore(formattedData.communicationScoreNotRecorded === "No");
                setShowGrossMotorScore(formattedData.grossMotorScoreNotRecorded === "No");
                setShowFineMotorScore(formattedData.fineMotorScoreNotRecorded === "No");
                setShowProblemSolvingScore(formattedData.problemSolvingScoreNotRecorded === "No");
                setShowPersonalSocialScore(formattedData.personalSocialScoreNotRecorded === "No");
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

    const submit = async (data: IASQ3Inputs) => {
        try {
            let response;

            if (!user) {
                throw new Error("User missing");
            }

            if (verb === 'new') {
                response = await createASQ3(data, user.id);
            } else {
                response = await updateASQ3(data, submissionId, user.id)
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');
            return;
        }

        setSuccessMessage('ASQ-3 submitted successfully!')
        router.push('/dashboard')
    };


    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} ASQ-3 </p>
                    <small>OLIVIA-NAVIGATOR: ASQ-3 Results TouchPoint (from Target Child Record TouchPoint Dashboard)</small>
                </div>

                <div className="space-y-16 pt-12">
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <p className="font-semibold">Participant name</p>
                            <input
                                {...register("participantName")}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                type="text"
                            />
                            {errors.participantName && (
                                <span className="label-text-alt text-red-500">
                                    {errors.participantName.message}
                                </span>
                            )}
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">Case ID</p>
                            <input
                                {...register("caseId")}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                type="text"
                            />
                            {errors.caseId && (
                                <span className="label-text-alt text-red-500">
                                    {errors.caseId.message}
                                </span>
                            )}
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">Date Completed</p>
                            <input
                                {...register("dateCompleted", { valueAsDate: true })}
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
                            <p className="font-semibold">Staff Name</p>
                            <input
                                {...register("staffName")}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                type="text"
                            />
                            {errors.staffName && (
                                <span className="label-text-alt text-red-500">
                                    {errors.staffName.message}
                                </span>
                            )}
                        </div>

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
                    </div>

                    <div className="space-y-8">
                        <p className="font-bold text-xl"> ASQ-3 Administration and Results </p>

                        <div className="space-y-4">

                            <div className="space-y-3">
                                <p className="font-semibold">Questionnaire Used</p>
                                <select
                                    {...register("questionnaireUsed")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-1/6"
                                    defaultValue=""
                                >
                                    <option value="" disabled> -- </option>
                                    {months.map((month, index) => (
                                        <option key={index} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                                <span className="ml-2">month</span>
                                {errors.questionnaireUsed && (
                                    <div className="label-text-alt text-red-500">
                                        {errors.questionnaireUsed.message}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold"> Was age adjusted for prematurity? </p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {YesNoEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("ageAdjusted")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.ageAdjusted && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.ageAdjusted.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <i>If child is less than 24 months old and was born premature (less than 37 weeks gestation), the timing of ASQ-3 administration should be adjusted according to ASQ guidelines.</i>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-lg font-bold">Communication Score</p>
                            <div className="space-y-3">
                                <p className="font-semibold"> Is child currently receiving services in this area? </p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {YesNoEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("communicationScoreNotRecorded")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                    onChange={(e) => handleShowCommunicationScore(e.target.value)}
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.communicationScoreNotRecorded && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.communicationScoreNotRecorded.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {showCommunicationScore && (
                                <div className="space-y-3">
                                    <p className="font-semibold">Score</p>
                                    <input
                                        {...register("communicationScore")}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        type="text"
                                    />
                                    {errors.communicationScore && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.communicationScore.message}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <p className="text-lg font-bold">Gross Motor Score</p>
                            <div className="space-y-3">
                                <p className="font-semibold"> Is child currently receiving services in this area? </p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {YesNoEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("grossMotorScoreNotRecorded")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                    onChange={(e) => handleShowGrossMotorScore(e.target.value)}
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.grossMotorScoreNotRecorded && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.grossMotorScoreNotRecorded.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {showGrossMotorScore && (
                                <div className="space-y-3">
                                    <p className="font-semibold">Score</p>
                                    <input
                                        {...register("grossMotorScore")}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        type="text"
                                    />
                                    {errors.grossMotorScore && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.grossMotorScore.message}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <p className="text-lg font-bold">Fine Motor</p>
                            <div className="space-y-3">
                                <p className="font-semibold"> Is child currently receiving services in this area? </p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {YesNoEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("fineMotorScoreNotRecorded")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                    onChange={(e) => handleShowFineMotorScore(e.target.value)}
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.fineMotorScoreNotRecorded && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.fineMotorScoreNotRecorded.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {showFineMotorScore && (
                                <div className="space-y-3">
                                    <p className="font-semibold">Score</p>
                                    <input
                                        {...register("fineMotorScore")}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        type="text"
                                    />
                                    {errors.fineMotorScore && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.fineMotorScore.message}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <p className="text-lg font-bold">Problem Solving</p>
                            <div className="space-y-3">
                                <p className="font-semibold"> Is child currently receiving services in this area? </p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {YesNoEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("problemSolvingScoreNotRecorded")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                    onChange={(e) => handleShowProblemSolvingScore(e.target.value)}
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.problemSolvingScoreNotRecorded && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.problemSolvingScoreNotRecorded.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {showProblemSolvingScore && (
                                <div className="space-y-3">
                                    <p className="font-semibold">Score</p>
                                    <input
                                        {...register("problemSolvingScore")}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        type="text"
                                    />
                                    {errors.problemSolvingScore && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.problemSolvingScore.message}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <p className="text-lg font-bold">Personal-Social</p>
                            <div className="space-y-3">
                                <p className="font-semibold"> Is child currently receiving services in this area? </p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {YesNoEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("personalSocialScoreNotRecorded")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                    onChange={(e) => handleShowPersonalSocialScore(e.target.value)}
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.personalSocialScoreNotRecorded && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.personalSocialScoreNotRecorded.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {showPersonalSocialScore && (
                                <div className="space-y-3">
                                    <p className="font-semibold">Score</p>
                                    <input
                                        {...register("personalSocialScore")}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        type="text"
                                    />
                                    {errors.personalSocialScore && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.personalSocialScore.message}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <p className="font-bold text-xl"> Follow-Up </p>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">Follow-Up Action Taken</p>
                                <small>Check all that apply</small>
                                <div className="space-y-2">
                                    {FollowUpActionEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register("followUpAction")}
                                                type="checkbox"
                                                value={option}
                                                className="form-checkbox"
                                                checked={Array.isArray(followUpAction) && followUpAction.includes(option)}
                                                disabled={selectedFollowUpAction === 'No_further_action' && option !== 'No_further_action'}
                                            />
                                            <span className="ml-2">{labelMapping.followUpAction[option]}</span>
                                        </label>
                                    ))}
                                    {errors.followUpAction && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.followUpAction.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {showDescribeActivitesProvided && (
                                <div className="space-y-3">
                                    <p className="font-semibold">Describe activities provided (Include date delivered, name/description of activity, and area of concern addressed.)</p>
                                    <textarea
                                        {...register("describeActivitiesProvided")}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    />
                                    {errors.describeActivitiesProvided && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.describeActivitiesProvided.message}
                                        </span>
                                    )}
                                </div>
                            )}
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

export default ASQ3;