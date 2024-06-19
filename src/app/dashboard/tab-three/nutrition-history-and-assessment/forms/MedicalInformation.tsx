import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
    YesNoEnum,
    getErrorMessage,
    labelMapping,
    TimesTakenMultivitaminEnum,
    YesNoUnknownEnum, CigarettesEnum,
    HouseholdSmokingEnum,
    AlcoholBeforePregnancyEnum,
    SubstanceUseEnum,
    INutritionHistoryAndAssessmentInputs
} from "../definitions";

const MedicalInformation: React.FC<{ formData: INutritionHistoryAndAssessmentInputs | null }> = ({ formData }) => {
    const { register, setValue, formState: { errors } } = useFormContext();

    const [showMedications, setShowMedications] = useState<boolean>(false);
    const handleShowMedications = (value: string) => {
        if (value === 'Yes') {
            setShowMedications(true);
        } else {
            setShowMedications(false);
            setValue("medications", null);
        }
    };

    const [showSideEffects, setShowSideEffects] = useState<boolean>(false);
    const handleShowSideEffects = (value: string) => {
        if (value === 'Yes') {
            setShowSideEffects(true);
        } else {
            setShowSideEffects(false);
            setValue("sideEffects", null);
        }
    };

    const [showDentalProblems, setShowDentalProblems] = useState<boolean>(false);
    const handleShowDentalProblems = (value: string) => {
        if (value === 'Yes') {
            setShowDentalProblems(true);
        } else {
            setShowDentalProblems(false);
            setValue("dentalProblems", null);
        }
    };

    const [showSpecifiedTimesTakenMultivitamin, setShowSpecifiedTimesTakenMultivitamin] = useState<boolean>(false);
    const handleShowSpecifiedTimesTakenMultivitamin = (value: string) => {
        if (value === 'Specify_number_of_times') {
            setShowSpecifiedTimesTakenMultivitamin(true);
        } else {
            setShowSpecifiedTimesTakenMultivitamin(false);
            setValue("specifiedTimesTakenMultivitamin", null);
        }
    };

    const [showSpecifiedNumCigarettesBeforePregnancy, setShowSpecifiedNumCigarettesBeforePregnancy] = useState<boolean>(false);
    const handleShowSpecifiedNumCigarettesBeforePregnancy = (value: string) => {
        if (value === 'Specified_number') {
            setShowSpecifiedNumCigarettesBeforePregnancy(true);
        } else {
            setShowSpecifiedNumCigarettesBeforePregnancy(false);
            setValue("specifiedNumCigarettesBeforePregnancy", null);
        }
    };

    const [showSpecifiedNumCigarettesNow, setShowSpecifiedNumCigarettesNow] = useState<boolean>(false);
    const handleShowSpecifiedNumCigarettesNow = (value: string) => {
        if (value === 'Specified_number') {
            setShowSpecifiedNumCigarettesNow(true);
        } else {
            setShowSpecifiedNumCigarettesNow(false);
            setValue("specifiedNumCigarettesSmokedNow", null);
        }
    };

    const [showSpecifiedNumDrinks, setShowSpecifiedNumDrinks] = useState<boolean>(false);
    const handleShowSpecifiedNumDrinks = (value: string) => {
        if (value === 'Specified_number') {
            setShowSpecifiedNumDrinks(true);
        } else {
            setShowSpecifiedNumDrinks(false);
            setValue("specifiedNumDrinks", null);
        }
    };

    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionChange = (value: string) => {
        if (value === 'None') {
            setSelectedOption(prev => prev === value ? '' : value);
        } else {
            setSelectedOption('');
        }
    };

    useEffect(() => {
        if (formData) {
            setShowMedications(formData.takesMedication === 'Yes');
            setShowSideEffects(formData.hasSideEffects === 'Yes');
            setShowDentalProblems(formData.hasDentalProblems === 'Yes');
            setShowSpecifiedTimesTakenMultivitamin(formData.timesTakenMultivitaminOptions === 'Specify_number_of_times');
            setShowSpecifiedNumCigarettesBeforePregnancy(formData.cigarettesBeforePregnancy === 'Specified_number');
            setShowSpecifiedNumCigarettesNow(formData.cigarettesSmokedNow === 'Specified_number');
            setShowSpecifiedNumDrinks(formData.alcoholBeforePregnancy === 'Specified_number');
            setSelectedOption(formData.substanceUse.includes('None') ? 'None' : '');
        }
    }, [formData]);

    return (
        <>
            <div className="pt-6">
                <p className="font-semibold text-2xl">Medical Information</p>
            </div>

            <div className="space-y-12 pt-16">

                <div className="space-y-4">
                    <p className="font-semibold">Medical conditions/recent illnesses:</p>
                    <span>WIC staff will give you a list of medical conditions to review.</span>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Medications (prescription or non-prescription)?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("takesMedication")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                            onChange={(e) => handleShowMedications(e.target.value)}
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.takesMedication && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.takesMedication)}
                                </span>
                            )}
                        </div>
                    </div>

                    {showMedications && (
                        <div className="space-y-3">
                            <input
                                type="text"
                                {...register("medications")}
                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                            {errors.medications && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.medications)}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="space-y-3">
                        <p className="font-semibold">Any side effects?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("hasSideEffects")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                            onChange={(e) => handleShowSideEffects(e.target.value)}
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.hasSideEffects && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.hasSideEffects)}
                                </span>
                            )}
                        </div>
                    </div>

                    {showSideEffects && (
                        <div className="space-y-3">
                            <input
                                type="text"
                                {...register("sideEffects")}
                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                            {errors.sideEffects && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.sideEffects)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Dental problems affecting eating?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("hasDentalProblems")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                            onChange={(e) => handleShowDentalProblems(e.target.value)}
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.hasDentalProblems && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.hasDentalProblems)}
                                </span>
                            )}
                        </div>
                    </div>

                    {showDentalProblems && (
                        <div className="space-y-3">
                            <input
                                type="text"
                                {...register("dentalProblems")}
                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                            {errors.dentalProblems && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.dentalProblems)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">In the month before this pregnancy, how many times did you take a multivitamin? </p>
                        <div className="space-y-2">
                            {TimesTakenMultivitaminEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("timesTakenMultivitaminOptions")}
                                        type="radio"
                                        value={option}
                                        className="form-radio"
                                        onChange={(e) => handleShowSpecifiedTimesTakenMultivitamin(e.target.value)}
                                    />
                                    <span className="ml-2">{labelMapping.timesTakenMultivitamin[option]}</span>
                                </label>
                            ))}
                            {errors.timesTakenMultivitaminOptions && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.timesTakenMultivitaminOptions)}
                                </span>
                            )}
                        </div>
                    </div>

                    {showSpecifiedTimesTakenMultivitamin && (
                        <div className="space-y-3">
                            <input
                                type="text"
                                {...register("specifiedTimesTakenMultivitamin")}
                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                            {errors.dentalProblems && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.specifiedTimesTakenMultivitamin)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Have you taken any vitamins or minerals in the past month?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoUnknownEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("hasTakenVitaminsMinerals")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.hasTakenVitaminsMinerals && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.hasTakenVitaminsMinerals)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">In the 3 months before you were pregnant, how many cigarettes did you smoke on an average day? (20 cigarettes = 1 pack)</p>
                        <div className="space-y-2">
                            {CigarettesEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("cigarettesBeforePregnancy")}
                                        type="radio"
                                        value={option}
                                        className="form-radio"
                                        onChange={(e) => handleShowSpecifiedNumCigarettesBeforePregnancy(e.target.value)}
                                    />
                                    <span className="ml-2">{labelMapping.cigarettes[option]}</span>
                                </label>
                            ))}
                            {errors.cigarettesBeforePregnancy && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.cigarettesBeforePregnancy)}
                                </span>
                            )}
                        </div>
                    </div>

                    {showSpecifiedNumCigarettesBeforePregnancy && (
                        <div className="space-y-3">
                            <input
                                type="text"
                                {...register("specifiedNumCigarettesBeforePregnancy")}
                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                            {errors.specifiedNumCigarettesBeforePregnancy && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.specifiedNumCigarettesBeforePregnancy)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">How many cigarettes do you smoke on an average day now?</p>
                        <div className="space-y-2">
                            {CigarettesEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("cigarettesSmokedNow")}
                                        type="radio"
                                        value={option}
                                        className="form-radio"
                                        onChange={(e) => handleShowSpecifiedNumCigarettesNow(e.target.value)}
                                    />
                                    <span className="ml-2">{labelMapping.cigarettes[option]}</span>
                                </label>
                            ))}
                            {errors.cigarettesSmokedNow && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.cigarettesSmokedNow)}
                                </span>
                            )}
                        </div>
                    </div>

                    {showSpecifiedNumCigarettesNow && (
                        <div className="space-y-3">
                            <input
                                type="text"
                                {...register("specifiedNumCigarettesSmokedNow")}
                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                            {errors.specifiedNumCigarettesSmokedNow && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.specifiedNumCigarettesSmokedNow)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Does anyone else living inside your household smoke inside the home?</p>
                        <div className="space-y-2">
                            {HouseholdSmokingEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("householdSmoking")}
                                        type="radio"
                                        value={option}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{labelMapping.householdSmoking[option]}</span>
                                </label>
                            ))}
                            {errors.householdSmoking && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.householdSmoking)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">In the 3 months before you got pregnant, how many alcoholic drinks (beer, wine, liquor, wine coolers) did you have in an average week?</p>
                        <div className="space-y-2">
                            {AlcoholBeforePregnancyEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("alcoholBeforePregnancy")}
                                        type="radio"
                                        value={option}
                                        className="form-radio"
                                        onChange={(e) => handleShowSpecifiedNumDrinks(e.target.value)}
                                    />
                                    <span className="ml-2">{labelMapping.alcohol[option]}</span>
                                </label>
                            ))}
                            {errors.alcoholBeforePregnancy && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.alcoholBeforePregnancy)}
                                </span>
                            )}
                        </div>
                    </div>

                    {showSpecifiedNumDrinks && (
                        <div className="space-y-3">
                            <input
                                type="text"
                                {...register("specifiedNumDrinks")}
                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                            {errors.specifiedNumDrinks && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.specifiedNumDrinks)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Alcohol during pregnancy?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("alcoholDuringPregnancy")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.alcoholDuringPregnancy && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.alcoholDuringPregnancy)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Are you currently?</p>
                        <small>Check all that apply</small>
                        {SubstanceUseEnum.options.map(option => (
                            <label key={option} className="flex items-center">
                                <input
                                    {...register("substanceUse")}
                                    type="checkbox"
                                    value={option}
                                    onChange={(e) => handleOptionChange(e.target.value)}
                                    disabled={selectedOption === 'None' && option !== 'None'}
                                />
                                <span className="ml-2">{labelMapping.substanceUse[option]}</span>
                            </label>
                        ))}
                        {errors.substanceUse && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.substanceUse)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Any other physical disability, mental health condition or
                            intellectual disability limiting ability to make
                            appropriate feeding decisions and/or prepare food?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("disabilityLimitingFeedingDecisions")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.disabilityLimitingFeedingDecisions && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.disabilityLimitingFeedingDecisions)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default MedicalInformation;