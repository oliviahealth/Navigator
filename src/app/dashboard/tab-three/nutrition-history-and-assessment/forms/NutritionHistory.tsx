import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { NumMonthsPregnantEnum, NumMonthsPregnantTwentyWeeksEnum, CurrentPregnancyInfoEnum, PreviousPregnancyInfoEnum, YesNoEnum, getErrorMessage, labelMapping, NumPerDayEnum, AppetiteEnum, EverydayFoodEnum, HighRiskFoodEnum, DietsAndSupplementsEnum } from "../definitions";

const NutritionHistory: React.FC = () => {
    const { register, setValue, watch, formState: { errors } } = useFormContext();

    const [showSpecialDietType, setShowSpecialDietType] = useState<boolean>(false);
    const handleShowSpecialDietType = (value: string) => {
        if (value === 'Yes') {
            setShowSpecialDietType(true);
        } else {
            setShowSpecialDietType(false);
            setValue("specialDietType", null);
        }
    };

    const [showFoodAllergies, setShowFoodAllergies] = useState<boolean>(false);
    const handleShowFoodAllergies = (value: string) => {
        if (value === 'Yes') {
            setShowFoodAllergies(true);
        } else {
            setShowFoodAllergies(false);
            setValue("foodAllergiesType", null);
        }
    };

    const consumeEveryday = watch("consumeEveryday", []);

    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionChange = (value: string) => {
        if (value === 'None_apply') {
            setSelectedOption(prev => prev === value ? '' : value);
        } else {
            setSelectedOption('');
        }
    };

    const dietsAndSupplements = watch("dietsAndSupplements", []) || [];
    useEffect(() => {
        if (selectedOption === 'None_apply') {
            setValue('dietsAndSupplements', ['None_apply']);
        }
    }, [selectedOption, setValue]);

    return (
        <>
            <div className="pt-6">
                <p className="font-semibold text-2xl">Nutrition History</p>
            </div>

            <div className="space-y-12 pt-16">

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Number of meals per day</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-11">
                                {NumPerDayEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("numMealsPerDay")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.numPerDay[option]}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.numMealsPerDay && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.numMealsPerDay)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Number of snacks per day</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-11">
                                {NumPerDayEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("numSnacksPerDay")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.numPerDay[option]}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.numSnacksPerDay && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.numSnacksPerDay)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Milk per day</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-11">
                                {NumPerDayEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("milkPerDay")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.numPerDay[option]}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.milkPerDay && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.milkPerDay)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Appetite</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {AppetiteEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("appetite")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.appetite && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.appetite)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Special Diet</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("hasSpecialDiet")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                            onChange={(e) => handleShowSpecialDietType(e.target.value)}
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.hasSpecialDiet && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.hasSpecialDiet)}
                                </span>
                            )}
                        </div>
                    </div>

                    {showSpecialDietType && (
                        <div className="space-y-3">
                            <p className="font-semibold">What kind?</p>
                            <input
                                type="text"
                                {...register("specialDietType")}
                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                            {errors.specialDietType && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.specialDietType)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Fast food per week</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-11">
                                {NumPerDayEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("fastFoodPerWeek")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping.numPerDay[option]}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.fastFoodPerWeek && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.fastFoodPerWeek)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Food allergies</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("hasFoodAllergies")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                            onChange={(e) => handleShowFoodAllergies(e.target.value)}
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.hasFoodAllergies && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.hasFoodAllergies)}
                                </span>
                            )}
                        </div>
                    </div>

                    {showFoodAllergies && (
                        <div className="space-y-3">
                            <p className="font-semibold">What kind?</p>
                            <input
                                type="text"
                                {...register("foodAllergiesType")}
                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                            {errors.foodAllergiesType && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.foodAllergiesType)}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Consume every day or most days?</p>
                        {EverydayFoodEnum.options.map(option => (
                            <React.Fragment key={option}>
                                <label className="flex items-center">
                                    <input
                                        {...register("consumeEveryday")}
                                        type="checkbox"
                                        value={option}
                                    />
                                    <span className="ml-2">{labelMapping.everydayFood[option]}</span>
                                </label>
                                {consumeEveryday.includes('Milk') && option === 'Milk' && (
                                    <div className="space-y-3">
                                        <p className="font-semibold">What kind of milk?</p>
                                        <input
                                            type="text"
                                            {...register("milkType")}
                                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium"
                                        />
                                        {errors.milkType && (
                                            <span className="label-text-alt text-red-500">
                                                {getErrorMessage(errors.milkType)}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                        {errors.consumeEveryday && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.consumeEveryday)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">High Risk Food</p>
                        <small>Check all that apply</small>
                        <div className="grid grid-cols-2 gap-2">
                            {HighRiskFoodEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("highRiskFood")}
                                        type="checkbox"
                                        value={option}
                                        onChange={(e) => handleOptionChange(e.target.value)}
                                        disabled={selectedOption === 'None_apply' && option !== 'None_apply'}
                                    />
                                    <span className="ml-2">{labelMapping.highRiskFood[option]}</span>
                                </label>
                            ))}
                        </div>
                        {errors.highRiskFood && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.highRiskFood)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Diets and Supplements</p>
                        {DietsAndSupplementsEnum.options.map(option => (
                            <React.Fragment key={option}>
                                <label className="flex items-center">
                                    <input
                                        {...register("dietsAndSupplements")}
                                        type="checkbox"
                                        value={option}
                                        onChange={(e) => {
                                            handleOptionChange(e.target.value);
                                            const updatedValue = e.target.checked
                                                ? [...dietsAndSupplements, e.target.value]
                                                : dietsAndSupplements.filter((v: String) => v !== e.target.value);

                                            setValue("dietsAndSupplements", updatedValue);
                                        }}
                                        disabled={selectedOption === 'None_apply' && option !== 'None_apply'}
                                    />
                                    <span className="ml-2">{labelMapping.dietsAndSupplements[option]}</span>
                                </label>
                                {dietsAndSupplements.includes('Vitamin_supplement') && option === 'Vitamin_supplement' && (
                                    <div className="space-y-3">
                                        <p className="font-semibold">What kind?</p>
                                        <input
                                            type="text"
                                            {...register("vitaminSupplementsType")}
                                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium"
                                        />
                                        {errors.vitaminSupplementsType && (
                                            <span className="label-text-alt text-red-500">
                                                {getErrorMessage(errors.vitaminSupplementsType)}
                                            </span>
                                        )}
                                    </div>
                                )}
                                {dietsAndSupplements.includes('Herbal_supplement') && option === 'Herbal_supplement' && (
                                    <div className="space-y-3">
                                        <p className="font-semibold">What kind?</p>
                                        <input
                                            type="text"
                                            {...register("herbalSupplementsType")}
                                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium"
                                        />
                                        {errors.herbalSupplementsType && (
                                            <span className="label-text-alt text-red-500">
                                                {getErrorMessage(errors.herbalSupplementsType)}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                        {errors.dietsAndSupplements && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.dietsAndSupplements)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Staff Notes</p>
                        <input
                            type="text"
                            {...register("staffNotes")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                        {errors.staffNotes && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.staffNotes)}
                            </span>
                        )}
                    </div>

                </div >
            </div>

        </>
    );
};

export default NutritionHistory;