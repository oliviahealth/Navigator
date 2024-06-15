import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { YesNoEnum, getErrorMessage, labelMapping, PregnancyTypeEnum, NotBreastfedDesiredLengthReasonsEnum, BreastfeedingMethodEnum } from "../definitions";

const BreastfeedingInformation: React.FC = () => {
    const { register, setValue, formState: { errors }, watch } = useFormContext();

    const [showPregnancyType, setShowPregnancyType] = useState<boolean>(false);
    const handleShowPregnancyType = (value: string) => {
        if (value === 'Yes') {
            setShowPregnancyType(true);
        } else {
            setShowPregnancyType(false);
            setValue("pregnancyType", null);
        }
    };

    const [showNotBreastfedDesiredLengthReasons, setShowNotBreastfedDesiredLengthReasons] = useState<boolean>(false);
    const handleShowNotBreastfedDesiredLengthReasons = (value: string) => {
        if (value === 'No') {
            setShowNotBreastfedDesiredLengthReasons(true);
        } else {
            setShowNotBreastfedDesiredLengthReasons(false);
            setValue("notBreastfedDesiredLengthReasons", null);
        }
    };

    const [notBreastfedDesiredLengthReasonsOtherSelected, setNotBreastfedDesiredLengthReasonsOtherSelected] = useState<boolean>(false);
    const notBreastfedDesiredLengthReasons = watch("notBreastfedDesiredLengthReasons", []);
    useEffect(() => {
        if (Array.isArray(notBreastfedDesiredLengthReasons)) {
            const includesOther = notBreastfedDesiredLengthReasons.includes("Other");
            setNotBreastfedDesiredLengthReasonsOtherSelected(includesOther);
            if (!includesOther) {
                setValue("notBreastfedDesiredLengthReasonsOther", null);
            }
        }
    }, [notBreastfedDesiredLengthReasons, setValue]);

    const [breastfeedingMethodOther, setBreastfeedingMethodOther] = useState<boolean>(false);
    const handleBreastfeedingMethodOther = (value: string) => {
        if (value === 'Other') {
            setBreastfeedingMethodOther(true);
        } else {
            setBreastfeedingMethodOther(false);
            setValue("breastfeedingMethodOther", null);
        }
    };

    return (
        <>
            <div className="pt-6">
                <p className="font-semibold text-2xl">Breastfeeding Information</p>
            </div>

            <div className="space-y-12 pt-16">

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Have you ever breastfed or pumped breast milk to feed any of your children?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("hasBreastfed")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.hasBreastfed && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.hasBreastfed)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">Are you currently breastfeeding or pumping breast milk?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("currentlyBreastfeeding")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.currentlyBreastfeeding && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.currentlyBreastfeeding)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">Is the baby less than one year old?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("babyLessThanOneYear")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.babyLessThanOneYear && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.babyLessThanOneYear)}
                                </span>
                            )}
                        </div>
                    </div>

                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Are you breastfeeding or pumping milk for more than one child?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("breastfeedingFromSamePregnancy")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                            onChange={(e) => handleShowPregnancyType(e.target.value)}
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.breastfeedingFromSamePregnancy && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.breastfeedingFromSamePregnancy)}
                                </span>
                            )}
                        </div>
                    </div>

                    {showPregnancyType && (
                        <div className="space-y-3">
                            <p className="font-semibold">Please specify:</p>
                            <div className="space-y-2">
                                {PregnancyTypeEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("pregnancyType")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.pregnancyType[option]}</span>
                                    </label>
                                ))}
                                {errors.pregnancyType && (
                                    <span className="label-text-alt text-red-500">
                                        {getErrorMessage(errors.pregnancyType)}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Did you breastfeed as long are you desired?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("breastfedDesiredLength")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                            onChange={(e) => handleShowNotBreastfedDesiredLengthReasons(e.target.value)}
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.breastfedDesiredLength && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.breastfedDesiredLength)}
                                </span>
                            )}
                        </div>
                    </div>

                    {showNotBreastfedDesiredLengthReasons && (
                        <div className="space-y-3">
                            <p className="font-semibold">If no, why?</p>
                            <div className="space-y-2">
                                {NotBreastfedDesiredLengthReasonsEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("notBreastfedDesiredLengthReasons")}
                                            type="checkbox"
                                            value={option}
                                            className="form-checkbox"
                                        />
                                        <span className="ml-2">{labelMapping.notBreastfedDesiredLengthReasons[option]}</span>
                                    </label>
                                ))}
                                {errors.notBreastfedDesiredLengthReasons && (
                                    <span className="label-text-alt text-red-500">
                                        {getErrorMessage(errors.notBreastfedDesiredLengthReasons)}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {showNotBreastfedDesiredLengthReasons && notBreastfedDesiredLengthReasonsOtherSelected && (
                        <div className="space-y-3">
                            <p className="font-semibold">Specify Other: </p>
                            <input
                                type="text"
                                {...register("notBreastfedDesiredLengthReasonsOther")}
                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                            {errors.notBreastfedDesiredLengthReasonsOther && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.notBreastfedDesiredLengthReasonsOther)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">What have you heard about breastfeeding?</p>
                        <input
                            type="text"
                            {...register("heardAboutBreastfeeding")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                        {errors.heardAboutBreastfeeding && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.heardAboutBreastfeeding)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-4">

                    <div className="space-y-3">
                        <p className="font-semibold">How are you thinking of feeding your baby?</p>
                        <div className="space-y-2">
                            {BreastfeedingMethodEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("breastfeedingMethod")}
                                        type="radio"
                                        value={option}
                                        className="form-radio"
                                        onChange={(e) => handleBreastfeedingMethodOther(e.target.value)}
                                    />
                                    <span className="ml-2">{labelMapping.breastfeedingMethod[option]}</span>
                                </label>
                            ))}
                            {errors.breastfeedingMethod && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.breastfeedingMethod)}
                                </span>
                            )}
                        </div>
                    </div>

                    {breastfeedingMethodOther && (
                        <div className="space-y-3">
                            <p className="font-semibold">Specify Other: </p>
                            <input
                                type="text"
                                {...register("breastfeedingMethodOther")}
                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                            {errors.breastfeedingMethodOther && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.breastfeedingMethodOther)}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="space-y-3">
                        <p className="font-semibold">What is your breastfeeding goal?</p>
                        <input
                            type="text"
                            {...register("breastfeedingGoal")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                        {errors.breastfeedingGoal && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.breastfeedingGoal)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Are you interested in receiving more information about breastfeeding?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("moreInformationInterest")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.moreInformationInterest && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.moreInformationInterest)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default BreastfeedingInformation;