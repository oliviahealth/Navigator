import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
    NumMonthsPregnantEnum,
    NumMonthsPregnantTwentyWeeksEnum,
    CurrentPregnancyInfoEnum,
    PreviousPregnancyInfoEnum,
    YesNoEnum,
    getErrorMessage,
    labelMapping,
    INutritionHistoryAndAssessmentInputs
} from "../definitions";

const PregnancyInformation: React.FC<{ formData: INutritionHistoryAndAssessmentInputs | null }> = ({ formData }) => {
    const { register, setValue, formState: { errors } } = useFormContext();

    const [showNumPregnancies, setShowNumPregnancies] = useState<boolean>(false);
    const handleShowNumPregnancies = (value: string) => {
        if (value === 'Number_of_pregnancies') {
            setShowNumPregnancies(true);
        } else {
            setShowNumPregnancies(false);
            setValue("numPregnanciesTwentyWeeks", '');
        }
    };

    const [selectedCurrentPregnancyInfo, setSelectedCurrentPregnancyInfo] = useState('');
    const handleCurrentPregnancyInfo = (value: string) => {
        if (value === 'None_Apply') {
            setSelectedCurrentPregnancyInfo(prev => prev === value ? '' : value);
        } else {
            setSelectedCurrentPregnancyInfo('');
        }
    };

    const [selectedPreviousPregnancyInfo, setSelectedPreviousPregnancyInfo] = useState('');
    const handlePreviousPregnancyInfo = (value: string) => {
        if (value === 'None_Apply') {
            setSelectedPreviousPregnancyInfo(prev => prev === value ? '' : value);
        } else {
            setSelectedPreviousPregnancyInfo('');
        }
    };

    useEffect(() => {
        if (formData) {
            setShowNumPregnancies(formData.timesPregnantTwentyWeeks === 'Number_of_pregnancies');
            setSelectedCurrentPregnancyInfo(formData.currentPregnancyInfo.includes('None_Apply') ? 'None_Apply' : '');
            setSelectedPreviousPregnancyInfo(formData.previousPregnancyInfo.includes('None_Apply') ? 'None_Apply' : '');
        }
    }, [formData]);

    return (
        <>
            <div className="pt-6">
                <p className="font-semibold text-2xl">Pregnancy Information</p>
            </div>

            <div className="space-y-12 pt-16">
                <div className="space-y-4">

                    <div className="space-y-3">
                        <p className="font-semibold">When was the date of your last menstrual period?</p>
                        <input
                            type="date"
                            {...register("lastMenstrualPeriod")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                        {errors.lastMenstrualPeriod && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.lastMenstrualPeriod)}
                            </span>
                        )}
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">When is your baby due?</p>
                        <input
                            type="date"
                            {...register("dueDate")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                        {errors.dueDate && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.dueDate)}
                            </span>
                        )}
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">What was your weight just before you became pregnant with this baby?</p>
                        <input
                            type="text"
                            {...register("weightBeforePregnancy")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                        {errors.weightBeforePregnancy && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.weightBeforePregnancy)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Number of pregnancies (including this pregnancy)</p>
                        <input
                            type="text"
                            {...register("numPregnancies")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                        {errors.numPregnancies && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.numPregnancies)}
                            </span>
                        )}
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">Number of live babies (not including this pregnancy)</p>
                        <input
                            type="text"
                            {...register("numLiveBabies")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                        {errors.numLiveBabies && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.numLiveBabies)}
                            </span>
                        )}
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">How many times have you been pregnant for 20 weeks or more before this pregnancy?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {NumMonthsPregnantTwentyWeeksEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("timesPregnantTwentyWeeks")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                            onChange={(e) => handleShowNumPregnancies(e.target.value)}
                                        />
                                        <span className="ml-2">{labelMapping.numMonthsPregnantTwentyWeeks[option]}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.timesPregnantTwentyWeeks && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.timesPregnantTwentyWeeks)}
                                </span>
                            )}
                        </div>
                    </div>

                    {showNumPregnancies && (
                        <div className="space-y-3">
                            <input
                                type="text"
                                {...register("numPregnanciesTwentyWeeks")}
                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                            {errors.numPregnanciesTwentyWeeks && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.numPregnanciesTwentyWeeks)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">How many months were you pregnant when you had your first visit for prenatal care from a doctor or a certified nurse midwife for this current/most recent pregnancy?</p>
                        <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                                {NumMonthsPregnantEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("numMonthsPregnant")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.numMonthsPregnant[option]}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.numMonthsPregnant && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.numMonthsPregnant)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">For this pregnancy, check all that apply.</p>
                        <div className="grid grid-cols-2 gap-5">
                            {CurrentPregnancyInfoEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("currentPregnancyInfo")}
                                        type="checkbox"
                                        value={option}
                                        onChange={(e) => handleCurrentPregnancyInfo(e.target.value)}
                                        disabled={selectedCurrentPregnancyInfo === 'None_Apply' && option !== 'None_Apply'}
                                    />
                                    <span className="ml-2">{labelMapping.currentPregnancyInfo[option]}</span>
                                </label>
                            ))}
                        </div>
                        {errors.currentPregnancyInfo && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.currentPregnancyInfo)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold"> How many times have you seen your health provider for this pregnancy?</p>
                        <input
                            type="text"
                            {...register("timesSeenHealthProvider")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                        {errors.timesSeenHealthProvider && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.timesSeenHealthProvider)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Have you been offered a blood test for HIV?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("hivBloodTest")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.hivBloodTest && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.hivBloodTest)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">For any previous pregnancies, please check all that occurred.</p>
                        {PreviousPregnancyInfoEnum.options.map(option => (
                            <label key={option} className="flex items-center">
                                <input
                                    {...register("previousPregnancyInfo")}
                                    type="checkbox"
                                    value={option}
                                    onChange={(e) => handlePreviousPregnancyInfo(e.target.value)}
                                    disabled={selectedPreviousPregnancyInfo === 'None_Apply' && option !== 'None_Apply'}
                                />
                                <span className="ml-2">{labelMapping.previousPregnancyInfo[option]}</span>
                            </label>
                        ))}
                        {errors.previousPregnancyInfo && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.previousPregnancyInfo)}
                            </span>
                        )}
                    </div>
                </div>
            </div >
        </>
    );
};

export default PregnancyInformation;