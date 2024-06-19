import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
    getErrorMessage,
    labelMapping,
    TimeframeEnum,
    SelfHarmThoughtsEnum,
} from "../definitions";

const EdinburgResultsTouchpoint: React.FC = () => {
    const { register, formState: { errors }, setValue, watch } = useFormContext();

    const selectedOption = watch("selfHarmThoughts");

    const [disabledOptions, setDisabledOptions] = useState(['']);

    useEffect(() => {
        setDisabledOptions(SelfHarmThoughtsEnum.options.filter(opt => opt !== selectedOption));
    }, [selectedOption]);

    const isOptionDisabled = (option: string) => {
        return disabledOptions.includes(option);
    };

    return (
        <>
            <div className="pt-6">
                <p className="font-semibold text-2xl">Results TouchPoint</p>
                <small>This is a short assessment to better understand how you are involved (if at all) in religion or religious practices.</small>
            </div>

            <div className="space-y-16 pt-12">

                <div>
                    <div>Complete this form to record the results of the EPDS required for OLIVIA-NAVIGATOR.</div>
                </div>

                <div className="space-y-4">

                    <div className="space-y-3">
                        <p className="font-semibold">Participant Name</p>
                        <input
                            type="text"
                            {...register("participantName")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                        {errors.participantName && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.participantName)}
                            </span>
                        )}
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">Case Id</p>
                        <input
                            type="text"
                            {...register("caseId")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                        {errors.caseId && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.caseId)}
                            </span>
                        )}
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">Date completed</p>
                        <input
                            type="date"
                            {...register("dateCompleted")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                        {errors.dateCompleted && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.dateCompleted)}
                            </span>
                        )}
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">Staff Name</p>
                        <input
                            type="text"
                            {...register("staffName")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                        {errors.staffName && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.staffName)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Timeframe</p>
                        <div className="flex flex-col space-y-3">
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
                            {errors.timeframe && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.timeframe)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">Answer to #10</p>
                        <div className="space-y-2">
                            {SelfHarmThoughtsEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("selfHarmThoughts")}
                                        type="radio"
                                        value={option}
                                        className="form-radio"
                                        disabled={isOptionDisabled(option)}
                                    />
                                    <span className="ml-2">{labelMapping.selfHarmThoughts[option]}</span>
                                </label>
                            ))}
                            {errors.answerToTen && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.answerToTen)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">Total Score</p>
                        <input
                            type="text"
                            disabled
                            {...register("totalScore")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                        {errors.totalScore && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.totalScore)}
                            </span>
                        )}
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">Notes</p>
                        <textarea
                            {...register("notes")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                        {errors.notes && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.notes)}
                            </span>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default EdinburgResultsTouchpoint;