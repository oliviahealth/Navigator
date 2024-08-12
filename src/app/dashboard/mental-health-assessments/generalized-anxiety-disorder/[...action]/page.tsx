"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    IGeneralizedAnxietyDisorderInputs,
    GeneralizedAnxietyDisorderInputsSchema,
    AnswersEnum,
    DifficultyEnum,
    labelMapping
} from '../definitions';
import useAppStore from '@/lib/useAppStore';
import {
    createGeneralizedAnxietyDisorder,
    readGeneralizedAnxietyDisorder,
    updateGeneralizedAnxietyDisorder,
} from '../actions';

const MentalHealthHistory: React.FC = () => {
    const router = useRouter();
    const { action } = useParams();

    const verb = action[0];
    const submissionId = action[1];

    const user = useAppStore((state) => state.user);

    const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);
    const setErrorMessage = useAppStore((state) => state.setErrorMessage);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<IGeneralizedAnxietyDisorderInputs>({
        resolver: zodResolver(GeneralizedAnxietyDisorderInputsSchema)
    });

    const feelingNervous = watch("feelingNervous");
    const unableToControlWorrying = watch("unableToControlWorrying");
    const worryingTooMuch = watch("worryingTooMuch");
    const troubleRelaxing = watch("troubleRelaxing");
    const restlessness = watch("restlessness");
    const easilyAnnoyed = watch("easilyAnnoyed");
    const feelingAfraid = watch("feelingAfraid");
    const problemsDifficulty = watch("problemsDifficulty");

    const [totalScore, setTotalScore] = useState(0);

    const [scores, setScores] = useState({
        feelingNervous: 0,
        unableToControlWorrying: 0,
        worryingTooMuch: 0,
        troubleRelaxing: 0,
        restlessness: 0,
        easilyAnnoyed: 0,
        feelingAfraid: 0,
        problemsDifficulty: 0,
    });

    const handleScore = (value: string, score: number) => {
        setScores(prevScores => ({
            ...prevScores,
            [value]: score,
        }));
    };

    useEffect(() => {
        let { feelingNervous, unableToControlWorrying, worryingTooMuch, troubleRelaxing, restlessness, easilyAnnoyed, feelingAfraid, problemsDifficulty } = scores;

        feelingNervous = feelingNervous < 0 ? 0 : feelingNervous;
        unableToControlWorrying = unableToControlWorrying < 0 ? 0 : unableToControlWorrying;
        worryingTooMuch = worryingTooMuch < 0 ? 0 : worryingTooMuch;
        troubleRelaxing = troubleRelaxing < 0 ? 0 : troubleRelaxing;
        restlessness = restlessness < 0 ? 0 : restlessness;
        easilyAnnoyed = easilyAnnoyed < 0 ? 0 : easilyAnnoyed;
        feelingAfraid = feelingAfraid < 0 ? 0 : feelingAfraid;
        problemsDifficulty = problemsDifficulty < 0 ? 0 : problemsDifficulty;

        let sum = feelingNervous + unableToControlWorrying + worryingTooMuch + troubleRelaxing + restlessness + easilyAnnoyed + feelingAfraid + problemsDifficulty;
        setTotalScore(sum);
    }, [scores]);

    useEffect(() => {
        setValue("totalScore", totalScore.toString())
    }, [totalScore]);

    useEffect(() => {
        handleScore("feelingNervous", AnswersEnum.options.indexOf(feelingNervous));
        handleScore("unableToControlWorrying", AnswersEnum.options.indexOf(unableToControlWorrying));
        handleScore("worryingTooMuch", AnswersEnum.options.indexOf(worryingTooMuch));
        handleScore("troubleRelaxing", AnswersEnum.options.indexOf(troubleRelaxing));
        handleScore("restlessness", AnswersEnum.options.indexOf(restlessness));
        handleScore("easilyAnnoyed", AnswersEnum.options.indexOf(easilyAnnoyed));
        handleScore("feelingAfraid", AnswersEnum.options.indexOf(feelingAfraid));
        handleScore("problemsDifficulty", DifficultyEnum.options.indexOf(problemsDifficulty));
    }, [feelingNervous, unableToControlWorrying, worryingTooMuch, troubleRelaxing, restlessness, easilyAnnoyed, feelingAfraid, problemsDifficulty]);

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

                const response = await readGeneralizedAnxietyDisorder(submissionId, user.id);

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

    const submit = async (data: IGeneralizedAnxietyDisorderInputs) => {
        try {
            GeneralizedAnxietyDisorderInputsSchema.parse(data);

            let response;
            if (!user) {
                throw new Error('User missing');
            }

            if (verb === 'new') {
                response = await createGeneralizedAnxietyDisorder(data, user.id);
            } else {
                response = await updateGeneralizedAnxietyDisorder(data, submissionId, user.id);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            router.push('/dashboard');

            return;
        }

        setSuccessMessage('GAD-7 submitted successfully!');
        router.push('/dashboard');
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">Generalized Anxiety Disorder (GAD-7)</p>
                    <div><small className="text-gray-500">GAD-7 Anxiety Scale</small></div>
                    <small className="text-gray-500">This assessment is to screen for generalized anxiety disorder. Everybody experiences stress and anxiety, but this assessment measures how severe your anxiety is, and can help healthcare providers understand if you need resources or further treatment to help you live with your anxiety.</small>
                </div>

                <div className="space-y-16 pt-12">

                    <div className="space-y-4">
                        <p className="font-semibold text-xl"> Over the last 2 weeks, how often have you been bothered by any of the following problems? </p>
                        <div className="space-y-3">
                            <p className="font-semibold">Feeling nervous, anxious or on edge</p>
                            <div className="space-y-2">
                                {AnswersEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("feelingNervous")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.answers[option]}</span>
                                    </label>
                                ))}
                                {errors.feelingNervous && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.feelingNervous.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">Not being able to stop or control worrying</p>
                            <div className="space-y-2">
                                {AnswersEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("unableToControlWorrying")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.answers[option]}</span>
                                    </label>
                                ))}
                                {errors.unableToControlWorrying && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.unableToControlWorrying.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">Worrying too much about different things</p>
                            <div className="space-y-2">
                                {AnswersEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("worryingTooMuch")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.answers[option]}</span>
                                    </label>
                                ))}
                                {errors.worryingTooMuch && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.worryingTooMuch.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">Trouble relaxing</p>
                            <div className="space-y-2">
                                {AnswersEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("troubleRelaxing")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.answers[option]}</span>
                                    </label>
                                ))}
                                {errors.troubleRelaxing && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.troubleRelaxing.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">Being so restless that it is hard to sit still</p>
                            <div className="space-y-2">
                                {AnswersEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("restlessness")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.answers[option]}</span>
                                    </label>
                                ))}
                                {errors.restlessness && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.restlessness.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">Becoming easily annoyed or irritable</p>
                            <div className="space-y-2">
                                {AnswersEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("easilyAnnoyed")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.answers[option]}</span>
                                    </label>
                                ))}
                                {errors.easilyAnnoyed && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.easilyAnnoyed.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">Feeling afraid as if something awful might happen</p>
                            <div className="space-y-2">
                                {AnswersEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("feelingAfraid")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.answers[option]}</span>
                                    </label>
                                ))}
                                {errors.feelingAfraid && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.feelingAfraid.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">If you checked off any problems on this questionnaire so far, how difficult have these problems made if for you to do your work, take care of things at home, or get along with other people?</p>
                            <div className="space-y-2">
                                {DifficultyEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("problemsDifficulty")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.difficulty[option]}</span>
                                    </label>
                                ))}
                                {errors.problemsDifficulty && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.problemsDifficulty.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-3">
                            <p className="font-semibold">Patient Score</p>
                            <input
                                type="text"
                                disabled
                                {...register("totalScore")}
                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                            {errors.totalScore && (
                                <span className="label-text-alt text-red-500">
                                    {errors.totalScore.message}
                                </span>
                            )}
                        </div>

                        <div className="p-8 bg-white shadow-md rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">GAD-7 Scoring Guidelines</h2>
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Score</th>
                                        <th className="py-2 px-4 border-b">Risk Level</th>
                                        <th className="py-2 px-4 border-b">Guidelines for Interpretation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 border-b text-center">0</td>
                                        <td className="py-2 px-4 border-b text-center">No to Low risk</td>
                                        <td className="py-2 px-4 border-b">None, rescreen annually</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b text-center">5</td>
                                        <td className="py-2 px-4 border-b text-center">Mild</td>
                                        <td className="py-2 px-4 border-b">Provide general feedback, repeat GAD7 at follow up</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b text-center">10</td>
                                        <td className="py-2 px-4 border-b text-center">Moderate</td>
                                        <td className="py-2 px-4 border-b">Further Evaluation Recommended and referral to mental health program</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 text-center">15+</td>
                                        <td className="py-2 px-4 text-center">Severe</td>
                                        <td className="py-2 px-4">Further Evaluation Recommended and referral to mental health program</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            If the total score is 10 or more, this could indicate a clinically significant problem and should trigger referral to a mental health program or enrollment in the Mental Health Integration Program.
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
            </form >
        </div >
    );
};

export default MentalHealthHistory;