import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
    getErrorMessage,
    labelMapping,
    EnjoymentEnum,
    SelfHarmThoughtsEnum,
    CryingEnum,
    SadnessEnum,
    ScaredEnum,
    AnxietyEnum,
    SelfBlameEnum,
    LaughEnum,
    CopeInabilityEnum,
    DifficultySleepingEnum
} from "../definitions";

type Scores = {
    laugh: number;
    enjoyment: number;
    selfBlame: number;
    anxiety: number;
    scared: number;
    copeInability: number;
    difficultySleeping: number;
    sadness: number;
    crying: number;
    selfHarmThoughts: number;
};

const EdinburgPostnatalDepressionScaleQuestions: React.FC<{
    handleScore: (value: keyof Scores, score: number) => void;
    totalScore: number;
}> = ({ handleScore, totalScore }) => {
    const { register, formState: { errors }, watch } = useFormContext();

    const laugh = watch("laugh");
    const enjoyment = watch("enjoyment");
    const selfBlame = watch("selfBlame");
    const anxiety = watch("anxiety");
    const scared = watch("scared");
    const copeInability = watch("copeInability");
    const difficultySleeping = watch("difficultySleeping");
    const sadness = watch("sadness");
    const crying = watch("crying");
    const selfHarmThoughts = watch("selfHarmThoughts");

    useEffect(() => {
        handleScore("laugh", LaughEnum.options.indexOf(laugh));
        handleScore("enjoyment", EnjoymentEnum.options.indexOf(enjoyment));
        handleScore("selfBlame", SelfBlameEnum.options.indexOf(selfBlame));
        handleScore("anxiety", AnxietyEnum.options.indexOf(anxiety));
        handleScore("scared", ScaredEnum.options.indexOf(scared));
        handleScore("copeInability", CopeInabilityEnum.options.indexOf(copeInability));
        handleScore("difficultySleeping", DifficultySleepingEnum.options.indexOf(difficultySleeping));
        handleScore("sadness", SadnessEnum.options.indexOf(sadness));
        handleScore("crying", CryingEnum.options.indexOf(crying));
        handleScore("selfHarmThoughts", SelfHarmThoughtsEnum.options.indexOf(selfHarmThoughts));
    }, [laugh, enjoyment, selfBlame, anxiety, scared, copeInability, difficultySleeping, sadness, crying, selfHarmThoughts]);

    return (
        <>
            <div className="pt-6">
                <p className="font-semibold text-2xl">Patient Questions</p>
                <small>This assessment helps healthcare providers (HCPs) screen you for postpartum (after childbirth) depression.
                    Postpartum depression can happen to any mom, and this screening allows HCPs to provide you with helpful resources or treatment if needed.</small>
            </div>

            <div className="space-y-16 pt-12">
                <div className="">
                    <div className="mb-4">
                        <strong>We would like to know how you are feeling. Please choose the answer which comes closest to how you have felt <u>in the past 7 days</u>, not just how you feel today.</strong>
                    </div>
                    <div className="mb-2">Here is an example, already completed:</div>
                    <div className="mb-2">
                        <span className="font-semibold">I have felt happy:</span>
                    </div>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Yes, all the time</li>
                        <li><u>Yes, most of the time</u></li>
                        <li>No, not very often</li>
                        <li>No, not at all</li>
                    </ul>
                    <div>This would mean: <span className="font-semibold">“I have felt happy most of the time” during the past week.</span> Please complete the other questions in the same way.</div>
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
                                        value={option}
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
                                        value={option}
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
                                        value={option}
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
                                        value={option}
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
                                        value={option}
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
                                        value={option}
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
                            {DifficultySleepingEnum.options.map((option, index) => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("difficultySleeping")}
                                        type="radio"
                                        value={option}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{labelMapping.difficultySleeping[option]}</span>
                                </label>
                            ))}
                            {errors.difficultySleeping && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.difficultySleeping)}
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
                                        value={option}
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
                                        value={option}
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
                                        value={option}
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

                <div>
                    <p className="font-bold">Scoring:</p>
                    <p className="mb-4">
                        Responses are scored 0, 1, 2, or 3 according to increased severity of the symptom. Items marked with an asterisk (*) are reverse scored (i.e., 3, 2, 1, and 0). The total score is determined by adding together the scores for each of the 10 items.
                    </p>
                    <p className="mb-2">
                        <strong>Priority:</strong> Always look at item 10 (suicidal thoughts) and, if appropriate, assess the safety of the mother and infant/family.
                    </p>
                    <p className="mb-2">
                        <strong>Maximum Score:</strong> 30
                    </p>
                    <p className="mb-2">
                        <strong>Depression Risk:</strong> 10 or greater
                    </p>
                    <p className="mb-2">
                        Scores greater than 13 indicate the likelihood of depressive illness of varying severity; refer for further assessment and treatment as appropriate.
                    </p>
                    <p className="mb-2 text-lg font-bold">
                        <strong>Your Score:</strong> {totalScore}
                    </p>
                </div>
            </div>
        </>
    );
};

export default EdinburgPostnatalDepressionScaleQuestions;
