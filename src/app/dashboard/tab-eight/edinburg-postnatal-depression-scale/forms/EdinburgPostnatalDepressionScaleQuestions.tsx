import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
    getErrorMessage,
    labelMapping,
    IEdinburgPostnatalDepressionScaleInputs,
    EnjoymentEnum,
    SelfHarmThoughtsEnum,
    CryingEnum,
    SadnessEnum,
    UnhappinessEnum,
    ScaredEnum,
    AnxietyEnum,
    SelfBlameEnum,
    LaughEnum,
    CopeInabilityEnum
} from "../definitions";

const scoreMapping = {
    laugh: [0, 1, 2, 3],
    enjoyment: [0, 1, 2, 3],
    selfBlame: [3, 2, 1, 0],
    anxiety: [0, 1, 2, 3],
    scared: [3, 2, 1, 0],
    copeInability: [3, 2, 1, 0],
    unhappiness: [3, 2, 1, 0],
    sadness: [3, 2, 1, 0],
    crying: [3, 2, 1, 0],
    selfHarmThoughts: [3, 2, 1, 0]
};

type ScaleQuestionKeys = keyof typeof scoreMapping;

const EdinburgPostnatalDepressionScaleQuestions: React.FC<{ formData: IEdinburgPostnatalDepressionScaleInputs | null }> = ({ formData }) => {
    const { register, formState: { errors }, control } = useFormContext();
    const [totalScore, setTotalScore] = useState(0);

    const watchedValues = useWatch({ control });

    useEffect(() => {
        const calculateScore = () => {
            let score = 0;

            for (const key in watchedValues) {
                if (scoreMapping.hasOwnProperty(key)) {
                    const value = parseInt(watchedValues[key], 10);
                    if (!isNaN(value)) {
                        console.log(`Adding score for ${key}:`, scoreMapping[key as ScaleQuestionKeys][value]);
                        score += scoreMapping[key as ScaleQuestionKeys][value];
                    }
                }
            }
            setTotalScore(score);
        };

        calculateScore();
    }, [watchedValues]);

    return (
        <>
            <div className="pt-6">
                <p className="font-semibold text-xl">Patient Questions</p>
                <small>This is a short assessment to better understand how you are involved (if at all) in religion or religious practices.</small>
            </div>

            <div className="space-y-16 pt-12">
                <div className="space-y-2">
                    <p>We would like to know how you are feeling. Please choose the answer which comes closest to how you have felt <strong>IN THE PAST 7 DAYS</strong>, not just how you feel today.</p>
                    <p>Here is an example, already completed:</p>
                    <p className="font-semibold">I have felt happy:</p>
                    <ul className="list-disc pl-5">
                        <li>Yes, all the time</li>
                        <li><u>Yes, most of the time</u></li>
                        <li>No, not very often</li>
                        <li>No, not at all</li>
                    </ul>
                    <p>This would mean: “I have felt happy most of the time” during the past week. Please complete the other questions in the same way.</p>
                </div>


                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">I have been able to laugh and see the funny side of things</p>
                        <div className="space-y-2">
                            {LaughEnum.options.map((option, index) => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("laugh")}
                                        type="radio"
                                        value={index}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{labelMapping.laugh[option]}</span>
                                </label>
                            ))}
                            {errors.laugh && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.laugh)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">I have looked forward with enjoyment to things</p>
                        <div className="space-y-2">
                            {EnjoymentEnum.options.map((option, index) => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("enjoyment")}
                                        type="radio"
                                        value={index}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{labelMapping.enjoyment[option]}</span>
                                </label>
                            ))}
                            {errors.enjoyment && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.enjoyment)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">*I have blamed myself unnecessarily when things went wrong</p>
                        <div className="space-y-2">
                            {SelfBlameEnum.options.map((option, index) => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("selfBlame")}
                                        type="radio"
                                        value={index}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{labelMapping.selfBlame[option]}</span>
                                </label>
                            ))}
                            {errors.selfBlame && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.selfBlame)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">I have been anxious or worried for no good reason</p>
                        <div className="space-y-2">
                            {AnxietyEnum.options.map((option, index) => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("anxiety")}
                                        type="radio"
                                        value={index}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{labelMapping.anxiety[option]}</span>
                                </label>
                            ))}
                            {errors.anxiety && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.anxiety)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">*I have felt scared or panicky for no very good reason</p>
                        <div className="space-y-2">
                            {ScaredEnum.options.map((option, index) => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("scared")}
                                        type="radio"
                                        value={index}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{labelMapping.scared[option]}</span>
                                </label>
                            ))}
                            {errors.scared && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.scared)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">*Things have been getting on top of me</p>
                        <div className="space-y-2">
                            {CopeInabilityEnum.options.map((option, index) => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("copeInability")}
                                        type="radio"
                                        value={index}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{labelMapping.copeInability[option]}</span>
                                </label>
                            ))}
                            {errors.copeInability && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.copeInability)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">*I have been so unhappy that I have had difficulty sleeping</p>
                        <div className="space-y-2">
                            {UnhappinessEnum.options.map((option, index) => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("unhappiness")}
                                        type="radio"
                                        value={index}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{labelMapping.unhappiness[option]}</span>
                                </label>
                            ))}
                            {errors.unhappiness && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.unhappiness)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">*I have felt sad or miserable</p>
                        <div className="space-y-2">
                            {SadnessEnum.options.map((option, index) => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("sadness")}
                                        type="radio"
                                        value={index}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{labelMapping.sadness[option]}</span>
                                </label>
                            ))}
                            {errors.sadness && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.sadness)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">*I have been so unhappy that I have been crying</p>
                        <div className="space-y-2">
                            {CryingEnum.options.map((option, index) => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("crying")}
                                        type="radio"
                                        value={index}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{labelMapping.crying[option]}</span>
                                </label>
                            ))}
                            {errors.crying && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.crying)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">*The thought of harming myself has occurred to me</p>
                        <div className="space-y-2">
                            {SelfHarmThoughtsEnum.options.map((option, index) => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("selfHarmThoughts")}
                                        type="radio"
                                        value={index}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{labelMapping.selfHarmThoughts[option]}</span>
                                </label>
                            ))}
                            {errors.selfHarmThoughts && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.selfHarmThoughts)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <p className="font-semibold text-lg">Scoring:</p>
                    <ul className="list-disc pl-5">
                        <li>
                            Responses are scored 0, 1, 2, or 3 according to increased severity of the symptom.
                            Items marked with an asterisk (*) are reverse scored (i.e., 3, 2, 1, and 0).
                            The total score is determined by adding together the scores for each of the 10 items.
                        </li>
                        <li>
                            <span className="font-semibold">Priority:</span>
                            Always look at item 10 (suicidal thoughts) and, if appropriate, assess the safety of the mother and infant/family.
                        </li>
                        <li>
                            <span className="font-semibold">Maximum Score:</span> 30
                        </li>
                        <li>
                            <span className="font-semibold">Depression Risk:</span> 10 or greater
                        </li>
                        <li>
                            Scores greater than 13 indicate the likelihood of depressive illness of varying severity; refer for further assessment and treatment as appropriate.
                        </li>
                    </ul>
                </div>

                <div className="pt-6">
                    <p className="font-semibold text-xl">Total Score: {totalScore}</p>
                </div>
            </div>
        </>
    );
};

export default EdinburgPostnatalDepressionScaleQuestions;
