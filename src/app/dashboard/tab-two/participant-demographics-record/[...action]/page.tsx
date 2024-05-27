"use client"

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
    ParticipantDemographicsRecordInputsSchema,
    IParticipantDemographicsRecordInputs,
    raceEnum,
    maritalStatusEnum,
    insuranceEnum,
    pregnancyStatusAtEnrollmentEnum,
    ethnicityEnum,
    lgbtqiPlusEnum,
    labelMapping
} from "../definitions";

import useAppStore from "@/lib/useAppStore";

const ParticipantDemographicsRecord: React.FC = () => {
    const router = useRouter();
    const { action } = useParams();

    const verb = action[0]
    const submissionId = action[1]

    const userId = useAppStore(state => state.userId);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IParticipantDemographicsRecordInputs>({
        resolver: zodResolver(ParticipantDemographicsRecordInputsSchema),
    });

    // temporary
    const submit = async (data: IParticipantDemographicsRecordInputs) => {
        console.log(data)
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Participant Demographics Record</p>

                <div className="py-6 space-y-4">

                    <div className="flex flex-col justify-between">
                        <p className="font-semibold pb-2 pt-4">Program Start Date</p>
                        <input
                            {...register("programStartDate")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            type="date"
                        />
                        {errors.programStartDate && (
                            <span className="label-text-alt text-red-500">
                                {errors.programStartDate.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-4">Case ID</p>
                        <input
                            {...register("caseId")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            type="text"
                        />
                        {errors.caseId && (
                            <span className="label-text-alt text-red-500">
                                {errors.caseId.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-4">Home Visitor Assigned</p>
                        <input
                            {...register("homeVisitorAssigned")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            type="text"
                        />
                        {errors.homeVisitorAssigned && (
                            <span className="label-text-alt text-red-500">
                                {errors.homeVisitorAssigned.message}
                            </span>
                        )}
                    </div>


                    <p className="text-lg font-bold pt-8"> Participant Enrollment Information </p>

                    <div>
                        <p className="font-semibold pb-2 pt-4">Name</p>
                        <input
                            {...register("name")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            type="text"
                        />
                        {errors.name && (
                            <span className="label-text-alt text-red-500">
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-4">Date of Birth</p>
                        <input
                            {...register("dateOfBirth")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            type="date"
                        />
                        {errors.dateOfBirth && (
                            <span className="label-text-alt text-red-500">
                                {errors.dateOfBirth.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-4">Address</p>
                        <input
                            {...register("address")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            type="text"
                        />
                        {errors.address && (
                            <span className="label-text-alt text-red-500">
                                {errors.address.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-4">ZIP Code</p>
                        <input
                            {...register("zipCode")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            type="text"
                        />
                        {errors.zipCode && (
                            <span className="label-text-alt text-red-500">
                                {errors.zipCode.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-4">Phone</p>
                        <input
                            {...register("phoneNumber")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            type="text"
                        />
                        {errors.phoneNumber && (
                            <span className="label-text-alt text-red-500">
                                {errors.phoneNumber.message}
                            </span>
                        )}
                    </div>

                    <p className="text-lg font-bold pt-8"> Participant Demographics </p>

                    <div>
                        <p className="font-semibold pb-2 pt-8">Gender</p>
                        <div className="space-y-3">
                            {["Female", "Male"].map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("gender")}
                                        className="form-radio"
                                        type="radio"
                                        value={option}
                                    />
                                    <span className="ml-2">{option}</span>
                                </label>
                            ))}
                            {errors.gender && (
                                <span className="label-text-alt text-red-500">
                                    {errors.gender.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-8">Ethnicity</p>
                        <div className="space-y-3">
                            {ethnicityEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("ethnicity")}
                                        className="form-radio"
                                        type="radio"
                                        value={option}
                                    />
                                    <span className="ml-2">{labelMapping.ethnicity[option]}</span>
                                </label>
                            ))}
                            {errors.ethnicity && (
                                <span className="label-text-alt text-red-500">
                                    {errors.ethnicity.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-8">Race</p>
                        <div className="space-y-3">
                            {raceEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("race")}
                                        className="form-radio"
                                        type="radio"
                                        value={option}
                                    />
                                    <span className="ml-2">{labelMapping.race[option]}</span>
                                </label>
                            ))}
                            {errors.race && (
                                <span className="label-text-alt text-red-500">
                                    {errors.race.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-4">Primary Language</p>
                        <input
                            {...register("primaryLanguage")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            type="text"
                        />
                        {errors.primaryLanguage && (
                            <span className="label-text-alt text-red-500">
                                {errors.primaryLanguage.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-8">Pregnancy Status At Enrollment</p>
                        <div className="space-y-3">
                            {pregnancyStatusAtEnrollmentEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("pregnancyStatusAtEnrollment")}
                                        className="form-radio"
                                        type="radio"
                                        value={option}
                                    />
                                    <span className="ml-2">{labelMapping.pregnancyStatusAtEnrollment[option]}</span>
                                </label>
                            ))}
                            {errors.pregnancyStatusAtEnrollment && (
                                <span className="label-text-alt text-red-500">
                                    {errors.pregnancyStatusAtEnrollment.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-8">Marital Status</p>
                        <div className="space-y-3">
                            {maritalStatusEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("maritalStatus")}
                                        className="form-radio"
                                        type="radio"
                                        value={option}
                                    />
                                    <span className="ml-2">{labelMapping.maritalStatus[option]}</span>
                                </label>
                            ))}
                            {errors.maritalStatus && (
                                <span className="label-text-alt text-red-500">
                                    {errors.maritalStatus.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-8">LGBTQI+</p>
                        <div className="space-y-3">
                            {lgbtqiPlusEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("lgbtqiPlus")}
                                        className="form-radio"
                                        type="radio"
                                        value={option}
                                    />
                                    <span className="ml-2">{labelMapping.lgbtqiPlus[option]}</span>
                                </label>
                            ))}
                            {errors.lgbtqiPlus && (
                                <span className="label-text-alt text-red-500">
                                    {errors.lgbtqiPlus.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-8">Insurance</p>
                        <div className="space-y-3">
                            {insuranceEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("insurance")}
                                        className="form-radio"
                                        type="radio"
                                        value={option}
                                    />
                                    <span className="ml-2">{labelMapping.insurance[option]}</span>
                                </label>
                            ))}
                            {errors.insurance && (
                                <span className="label-text-alt text-red-500">
                                    {errors.insurance.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <p className="text-lg font-bold pt-8"> Priority Population Characteristics </p>

                    <div>
                        <p className="font-semibold pb-2 pt-8">Child Abuse</p>
                        <div className="space-y-3">
                            {["Yes", "No"].map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("childAbuse")}
                                        className="form-radio"
                                        type="radio"
                                        value={option}
                                    />
                                    <span className="ml-2">{option}</span>
                                </label>
                            ))}
                            {errors.childAbuse && (
                                <span className="label-text-alt text-red-500">
                                    {errors.childAbuse.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-8">Substance Abuse</p>
                        <div className="space-y-3">
                            {["Yes", "No"].map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("substanceAbuse")}
                                        className="form-radio"
                                        type="radio"
                                        value={option}
                                    />
                                    <span className="ml-2">{option}</span>
                                </label>
                            ))}
                            {errors.substanceAbuse && (
                                <span className="label-text-alt text-red-500">
                                    {errors.substanceAbuse.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-8">Tobacco Use In Home</p>
                        <div className="space-y-3">
                            {["Yes", "No"].map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("tobaccoUse")}
                                        className="form-radio"
                                        type="radio"
                                        value={option}
                                    />
                                    <span className="ml-2">{option}</span>
                                </label>
                            ))}
                            {errors.tobaccoUse && (
                                <span className="label-text-alt text-red-500">
                                    {errors.tobaccoUse.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-8">Low Student Achievement</p>
                        <div className="space-y-3">
                            {["Yes", "No"].map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("lowStudentAchievement")}
                                        className="form-radio"
                                        type="radio"
                                        value={option}
                                    />
                                    <span className="ml-2">{option}</span>
                                </label>
                            ))}
                            {errors.lowStudentAchievement && (
                                <span className="label-text-alt text-red-500">
                                    {errors.lowStudentAchievement.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-8">Developmental Delay</p>
                        <div className="space-y-3">
                            {["Yes", "No"].map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("developmentalDelay")}
                                        className="form-radio"
                                        type="radio"
                                        value={option}
                                    />
                                    <span className="ml-2">{option}</span>
                                </label>
                            ))}
                            {errors.developmentalDelay && (
                                <span className="label-text-alt text-red-500">
                                    {errors.developmentalDelay.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-8">US Armed Forces</p>
                        <div className="space-y-3">
                            {["Yes", "No"].map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("USArmedForces")}
                                        className="form-radio"
                                        type="radio"
                                        value={option}
                                    />
                                    <span className="ml-2">{option}</span>
                                </label>
                            ))}
                            {errors.USArmedForces && (
                                <span className="label-text-alt text-red-500">
                                    {errors.USArmedForces.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-8">Re-enrollment with Gap in Service</p>
                        <div className="space-y-3">
                            {["Yes", "No"].map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("reenrollmentWithGap")}
                                        className="form-radio"
                                        type="radio"
                                        value={option}
                                    />
                                    <span className="ml-2">{option}</span>
                                </label>
                            ))}
                            {errors.reenrollmentWithGap && (
                                <span className="label-text-alt text-red-500">
                                    {errors.reenrollmentWithGap.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-8">(NFP Only) Transfer From Another Site</p>
                        <div className="space-y-3">
                            {["Yes", "No"].map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("transferFromAnotherSite")}
                                        className="form-radio"
                                        type="radio"
                                        value={option}
                                    />
                                    <span className="ml-2">{option}</span>
                                </label>
                            ))}
                            {errors.transferFromAnotherSite && (
                                <span className="label-text-alt text-red-500">
                                    {errors.transferFromAnotherSite.message}
                                </span>
                            )}
                        </div>
                    </div>

                </div>

                <button
                    type="submit"
                    className="flex items-center justify-center gap-x-2 w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto font-semibold"
                >
                    {/* {isSubmitting && <span className="loading loading-spinner loading-sm"></span>} */}
                    Save
                </button>
            </form>
        </div>
    )

}

export default ParticipantDemographicsRecord;