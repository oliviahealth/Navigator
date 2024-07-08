"use client"

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import useAppStore from "@/lib/useAppStore";
import { AnswersEnum, IPerceivedStressScaleInputs, PerceivedStressScaleInputsSchema, labelMapping, options } from "../definitions";
import { createPerceivedStressScale, readPerceivedStressScale, updatePerceivedStressScale } from "../actions";

const PerceivedStressScale: React.FC = () => {
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
    } = useForm<IPerceivedStressScaleInputs>({
        resolver: zodResolver(PerceivedStressScaleInputsSchema),
    });
    const upsetUnexpectedly = watch("upsetUnexpectedly");
    const unableControlImportant = watch("unableControlImportant");
    const nervousAndStressed = watch("nervousAndStressed");
    const handleProblemsConfidently = watch("handleProblemsConfidently");
    const thingsGoingWay = watch("thingsGoingWay");
    const copeInability = watch("copeInability");
    const controlIrritations = watch("controlIrritations");
    const onTopOfThings = watch("onTopOfThings");
    const angeredOutsideControl = watch("angeredOutsideControl");
    const difficultiesPilingUp = watch("difficultiesPilingUp");

    const [totalScore, setTotalScore] = useState(0);

    const [scores, setScores] = useState({
        upsetUnexpectedly: 0,
        unableControlImportant: 0,
        nervousAndStressed: 0,
        handleProblemsConfidently: 4,
        thingsGoingWay: 4,
        copeInability: 0,
        controlIrritations: 4,
        onTopOfThings: 4,
        angeredOutsideControl: 0,
        difficultiesPilingUp: 0
    });

    const handleScore = (value: string, score: number) => {
        setScores(prevScores => ({
            ...prevScores,
            [value]: score,
        }));
    };

    useEffect(() => {
        let { upsetUnexpectedly, unableControlImportant, nervousAndStressed, handleProblemsConfidently, thingsGoingWay, copeInability, controlIrritations, onTopOfThings, angeredOutsideControl, difficultiesPilingUp } = scores;

        upsetUnexpectedly = upsetUnexpectedly < 0 ? 0 : upsetUnexpectedly;
        unableControlImportant = unableControlImportant < 0 ? 0 : unableControlImportant;
        nervousAndStressed = nervousAndStressed < 0 ? 0 : nervousAndStressed;
        handleProblemsConfidently = handleProblemsConfidently < 0 ? 4 : handleProblemsConfidently;
        thingsGoingWay = thingsGoingWay < 0 ? 4 : thingsGoingWay;
        copeInability = copeInability < 0 ? 0 : copeInability;
        controlIrritations = controlIrritations < 0 ? 4 : controlIrritations;
        onTopOfThings = onTopOfThings < 0 ? 4 : onTopOfThings;
        angeredOutsideControl = angeredOutsideControl < 0 ? 0 : angeredOutsideControl;
        difficultiesPilingUp = difficultiesPilingUp < 0 ? 0 : difficultiesPilingUp;

        let sum = upsetUnexpectedly + unableControlImportant + nervousAndStressed + (4 - handleProblemsConfidently) + (4 - thingsGoingWay) + copeInability + (4 - controlIrritations) + (4 - onTopOfThings) + angeredOutsideControl + difficultiesPilingUp;
        setTotalScore(sum);
    }, [scores]);

    useEffect(() => {
        setValue("totalScore", totalScore.toString())
    }, [totalScore]);

    useEffect(() => {
        handleScore("upsetUnexpectedly", AnswersEnum.options.indexOf(upsetUnexpectedly));
        handleScore("unableControlImportant", AnswersEnum.options.indexOf(unableControlImportant));
        handleScore("nervousAndStressed", AnswersEnum.options.indexOf(nervousAndStressed));
        handleScore("handleProblemsConfidently", AnswersEnum.options.indexOf(handleProblemsConfidently));
        handleScore("thingsGoingWay", AnswersEnum.options.indexOf(thingsGoingWay));
        handleScore("copeInability", AnswersEnum.options.indexOf(copeInability));
        handleScore("controlIrritations", AnswersEnum.options.indexOf(controlIrritations));
        handleScore("onTopOfThings", AnswersEnum.options.indexOf(onTopOfThings));
        handleScore("angeredOutsideControl", AnswersEnum.options.indexOf(angeredOutsideControl));
        handleScore("difficultiesPilingUp", AnswersEnum.options.indexOf(difficultiesPilingUp));
    }, [upsetUnexpectedly, unableControlImportant, nervousAndStressed, handleProblemsConfidently, thingsGoingWay, copeInability, controlIrritations, onTopOfThings, angeredOutsideControl, difficultiesPilingUp]);

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

                const response = await readPerceivedStressScale(submissionId, user.id);

                reset(response);
                setTotalScore(parseInt(response.totalScore));

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

    const submit = async (data: IPerceivedStressScaleInputs) => {
        try {
            let response;

            if (!user) {
                throw new Error("User missing");
            }

            if (verb === 'new') {
                response = await createPerceivedStressScale(data, user.id);
            } else {
                response = await updatePerceivedStressScale(data, submissionId, user.id)
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');
            return;
        }

        setSuccessMessage('Perceived Stress Scale submitted successfully!')
        router.push('/dashboard')
    };

    return (

        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="space-y-4"
            >
                <div className="pt-6 mb-8">
                    <p className="flex font-semibold text-2xl justify-center">{verb === 'new' ? 'New' : 'Edit'} Perceived Stress Scale</p>
                    <p className="block max-w-2xl mx-auto pt-6">
                        The questions in this scale ask you about your feelings and thoughts during <b>THE LAST MONTH</b>. In each case, please indicate your response by selecting the option representing <b>HOW OFTEN</b> you felt or thought a certain way.
                    </p>
                </div>

                <div className="flex justify-center items-center bg-gray-100 rounded-lg p-3">

                    <table className="w-full max-w-3xl bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500"></th>
                                {options.map((option, index) => (
                                    <th key={index} className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-center text-sm font-medium text-gray-500">{option}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>

                            <tr className="">
                                <td className={`py-2 px-4 ${errors.upsetUnexpectedly ? '' : 'border-b border-gray-200'}`}>
                                    In the last month, how often have you been upset because of something that happened unexpectedly?
                                </td>
                                {AnswersEnum.options.map((option, index) => (
                                    <td key={index} className={`py-2 px-4 ${errors.upsetUnexpectedly ? '' : 'border-b border-gray-200'} text-center`}>
                                        <label className="block text-sm text-gray-700">
                                            <input
                                                {...register("upsetUnexpectedly")}
                                                type="radio"
                                                value={option}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{labelMapping[option]}</span>
                                        </label>
                                    </td>
                                ))}
                            </tr>
                            {errors.upsetUnexpectedly && (
                                <tr>
                                    <td colSpan={AnswersEnum.options.length + 1} className="py-2 px-4 border-b border-gray-200 text-center">
                                        <p className="text-red-500 text-sm break-words">{errors.upsetUnexpectedly.message}</p>
                                    </td>
                                </tr>
                            )}

                            <tr className="">
                                <td className={`py-2 px-4 ${errors.unableControlImportant ? '' : 'border-b border-gray-200'}`}>
                                    In the last month, how often have you felt that you were unable to control the important things in your life?
                                </td>
                                {AnswersEnum.options.map((option, index) => (
                                    <td key={index} className={`py-2 px-4 ${errors.unableControlImportant ? '' : 'border-b border-gray-200'} text-center`}>
                                        <label className="block text-sm text-gray-700">
                                            <input
                                                {...register("unableControlImportant")}
                                                type="radio"
                                                value={option}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{labelMapping[option]}</span>
                                        </label>
                                    </td>
                                ))}
                            </tr>
                            {errors.unableControlImportant && (
                                <tr>
                                    <td colSpan={AnswersEnum.options.length + 1} className="py-2 px-4 border-b border-gray-200 text-center">
                                        <p className="text-red-500 text-sm break-words">{errors.unableControlImportant.message}</p>
                                    </td>
                                </tr>
                            )}

                            <tr className="">
                                <td className={`py-2 px-4 ${errors.nervousAndStressed ? '' : 'border-b border-gray-200'}`}>
                                    In the last month, how often have you felt nervous and “stressed”?
                                </td>
                                {AnswersEnum.options.map((option, index) => (
                                    <td key={index} className={`py-2 px-4 ${errors.nervousAndStressed ? '' : 'border-b border-gray-200'} text-center`}>
                                        <label className="block text-sm text-gray-700">
                                            <input
                                                {...register("nervousAndStressed")}
                                                type="radio"
                                                value={option}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{labelMapping[option]}</span>
                                        </label>
                                    </td>
                                ))}
                            </tr>
                            {errors.nervousAndStressed && (
                                <tr>
                                    <td colSpan={AnswersEnum.options.length + 1} className="py-2 px-4 border-b border-gray-200 text-center">
                                        <p className="text-red-500 text-sm break-words">{errors.nervousAndStressed.message}</p>
                                    </td>
                                </tr>
                            )}

                            <tr className="">
                                <td className={`py-2 px-4 ${errors.handleProblemsConfidently ? '' : 'border-b border-gray-200'}`}>
                                    *In the last month, how often have you felt confident about your ability to handle your personal problems?
                                </td>
                                {AnswersEnum.options.map((option, index) => (
                                    <td key={index} className={`py-2 px-4 ${errors.handleProblemsConfidently ? '' : 'border-b border-gray-200'} text-center`}>
                                        <label className="block text-sm text-gray-700">
                                            <input
                                                {...register("handleProblemsConfidently")}
                                                type="radio"
                                                value={option}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{labelMapping[option]}</span>
                                        </label>
                                    </td>
                                ))}
                            </tr>
                            {errors.handleProblemsConfidently && (
                                <tr>
                                    <td colSpan={AnswersEnum.options.length + 1} className="py-2 px-4 border-b border-gray-200 text-center">
                                        <p className="text-red-500 text-sm break-words">{errors.handleProblemsConfidently.message}</p>
                                    </td>
                                </tr>
                            )}

                            <tr className="">
                                <td className={`py-2 px-4 ${errors.thingsGoingWay ? '' : 'border-b border-gray-200'}`}>
                                    *In the last month, how often have you felt that things were going your way?
                                </td>
                                {AnswersEnum.options.map((option, index) => (
                                    <td key={index} className={`py-2 px-4 ${errors.thingsGoingWay ? '' : 'border-b border-gray-200'} text-center`}>
                                        <label className="block text-sm text-gray-700">
                                            <input
                                                {...register("thingsGoingWay")}
                                                type="radio"
                                                value={option}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{labelMapping[option]}</span>
                                        </label>
                                    </td>
                                ))}
                            </tr>
                            {errors.thingsGoingWay && (
                                <tr>
                                    <td colSpan={AnswersEnum.options.length + 1} className="py-2 px-4 border-b border-gray-200 text-center">
                                        <p className="text-red-500 text-sm break-words">{errors.thingsGoingWay.message}</p>
                                    </td>
                                </tr>
                            )}

                            <tr className="">
                                <td className={`py-2 px-4 ${errors.copeInability ? '' : 'border-b border-gray-200'}`}>
                                    In the last month, how often have you found that you could not cope with all the things that you had to do?
                                </td>
                                {AnswersEnum.options.map((option, index) => (
                                    <td key={index} className={`py-2 px-4 ${errors.copeInability ? '' : 'border-b border-gray-200'} text-center`}>
                                        <label className="block text-sm text-gray-700">
                                            <input
                                                {...register("copeInability")}
                                                type="radio"
                                                value={option}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{labelMapping[option]}</span>
                                        </label>
                                    </td>
                                ))}
                            </tr>
                            {errors.copeInability && (
                                <tr>
                                    <td colSpan={AnswersEnum.options.length + 1} className="py-2 px-4 border-b border-gray-200 text-center">
                                        <p className="text-red-500 text-sm break-words">{errors.copeInability.message}</p>
                                    </td>
                                </tr>
                            )}

                            <tr className="">
                                <td className={`py-2 px-4 ${errors.controlIrritations ? '' : 'border-b border-gray-200'}`}>
                                    *In the last month, how often have you been able to control irritations in your life?
                                </td>
                                {AnswersEnum.options.map((option, index) => (
                                    <td key={index} className={`py-2 px-4 ${errors.controlIrritations ? '' : 'border-b border-gray-200'} text-center`}>
                                        <label className="block text-sm text-gray-700">
                                            <input
                                                {...register("controlIrritations")}
                                                type="radio"
                                                value={option}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{labelMapping[option]}</span>
                                        </label>
                                    </td>
                                ))}
                            </tr>
                            {errors.controlIrritations && (
                                <tr>
                                    <td colSpan={AnswersEnum.options.length + 1} className="py-2 px-4 border-b border-gray-200 text-center">
                                        <p className="text-red-500 text-sm break-words">{errors.controlIrritations.message}</p>
                                    </td>
                                </tr>
                            )}

                            <tr className="">
                                <td className={`py-2 px-4 ${errors.onTopOfThings ? '' : 'border-b border-gray-200'}`}>
                                    *In the last month, how often have you felt that you were on top of things?
                                </td>
                                {AnswersEnum.options.map((option, index) => (
                                    <td key={index} className={`py-2 px-4 ${errors.onTopOfThings ? '' : 'border-b border-gray-200'} text-center`}>
                                        <label className="block text-sm text-gray-700">
                                            <input
                                                {...register("onTopOfThings")}
                                                type="radio"
                                                value={option}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{labelMapping[option]}</span>
                                        </label>
                                    </td>
                                ))}
                            </tr>
                            {errors.onTopOfThings && (
                                <tr>
                                    <td colSpan={AnswersEnum.options.length + 1} className="py-2 px-4 border-b border-gray-200 text-center">
                                        <p className="text-red-500 text-sm break-words">{errors.onTopOfThings.message}</p>
                                    </td>
                                </tr>
                            )}

                            <tr className="">
                                <td className={`py-2 px-4 ${errors.angeredOutsideControl ? '' : 'border-b border-gray-200'}`}>
                                    In the last month, how often have you been angered because of things that were outside your control?
                                </td>
                                {AnswersEnum.options.map((option, index) => (
                                    <td key={index} className={`py-2 px-4 ${errors.angeredOutsideControl ? '' : 'border-b border-gray-200'} text-center`}>
                                        <label className="block text-sm text-gray-700">
                                            <input
                                                {...register("angeredOutsideControl")}
                                                type="radio"
                                                value={option}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{labelMapping[option]}</span>
                                        </label>
                                    </td>
                                ))}
                            </tr>
                            {errors.angeredOutsideControl && (
                                <tr>
                                    <td colSpan={AnswersEnum.options.length + 1} className="py-2 px-4 border-b border-gray-200 text-center">
                                        <p className="text-red-500 text-sm break-words">{errors.angeredOutsideControl.message}</p>
                                    </td>
                                </tr>
                            )}

                            <tr className="">
                                <td className={`py-2 px-4 ${errors.difficultiesPilingUp ? '' : 'border-b border-gray-200'}`}>
                                    In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?
                                </td>
                                {AnswersEnum.options.map((option, index) => (
                                    <td key={index} className={`py-2 px-4 ${errors.difficultiesPilingUp ? '' : 'border-b border-gray-200'} text-center`}>
                                        <label className="block text-sm text-gray-700">
                                            <input
                                                {...register("difficultiesPilingUp")}
                                                type="radio"
                                                value={option}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{labelMapping[option]}</span>
                                        </label>
                                    </td>
                                ))}
                            </tr>
                            {errors.difficultiesPilingUp && (
                                <tr>
                                    <td colSpan={AnswersEnum.options.length + 1} className="py-2 px-4 border-b border-gray-200 text-center">
                                        <p className="text-red-500 text-sm break-words">{errors.difficultiesPilingUp.message}</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mb-8">
                    <p className="block max-w-3xl mx-auto pt-6">
                        Scoring: PSS scores are obtained by reversing responses (e.g., 0 = 4, 1 = 3, 2 = 2, 3 = 1 & 4 = 0) to the four positively stated items (*items 4, 5, 7, & 8) and then summing across all scale items. A short 4 item scale can be made from questions 2, 4, 5 and 10 of the PSS 10 item scale.
                    </p>
                    <p className="block max-w-3xl mx-auto pt-6">
                        Scores ranging from 0-13 would be considered low stress. ► Scores ranging from 14-26 would be considered moderate stress. ► Scores ranging from 27-40 would be considered high perceived stress.
                    </p>
                </div>

                <div className="space-y-3">
                    <p className="font-semibold">Your Score</p>
                    <input
                        {...register("totalScore")}
                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        type="text"
                        disabled
                    />
                    {errors.totalScore && (
                        <span className="label-text-alt text-red-500">
                            {errors.totalScore.message}
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
            </form >
        </div >
    );
};

export default PerceivedStressScale;