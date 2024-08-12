import React from "react";
import { useFormContext } from "react-hook-form";
import { RaceEnum, YesNoEnum, getErrorMessage, labelMapping } from "../definitions";

const PregnantWomanHealthAndDiet: React.FC = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            <div className="pt-6">
                <p className="font-semibold text-2xl">Pregnant Woman's Health And Diet</p>
            </div>
            <div className="space-y-16 pt-12">
                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Today's Date</p>
                        <input
                            type="date"
                            {...register("todaysDate")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium"
                        />
                        {errors.todaysDate && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.todaysDate)}
                            </span>
                        )}
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">Your Name</p>
                        <input
                            type="text"
                            {...register("name")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium"
                        />
                        {errors.name && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.name)}
                            </span>
                        )}
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">How many grades of school have you completed?</p>
                        <input
                            type="text"
                            {...register("gradesCompleted")}
                            className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium"
                        />
                        {errors.gradesCompleted && (
                            <span className="label-text-alt text-red-500">
                                {getErrorMessage(errors.gradesCompleted)}
                            </span>
                        )}
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">Are you currently?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {['Married', 'Unmarried'].map((status, idx) => (
                                    <label key={idx} className="inline-flex items-center">
                                        <input
                                            {...register("currentlyMarried")}
                                            type="radio"
                                            value={status}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{status}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.currentlyMarried && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.currentlyMarried)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="font-semibold">The following questions are optional. Your answer will be used for group reporting purposes. If you do not answer, the staff will make a selection for you. This does not affect you receiving WIC or other benefits.</p>

                    <div className="space-y-3">
                        <p className="font-semibold">Are you Hispanic or Latino?</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center gap-x-12">
                                {YesNoEnum.options.map(option => (
                                    <label key={option} className="inline-flex items-center">
                                        <input
                                            {...register("hispanicLatino")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.hispanicLatino && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.hispanicLatino)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="font-semibold">Race</p>
                        <small>Select One or More</small>
                        <div className="space-y-2">
                            {RaceEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("race")}
                                        className="form-radio"
                                        type="checkbox"
                                        value={option}
                                    />
                                    <span className="ml-2">{labelMapping.race[option]}</span>
                                </label>
                            ))}
                            {errors.race && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.race)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PregnantWomanHealthAndDiet;