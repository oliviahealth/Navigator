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
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Participant Demographics Record</p>
                    <small className="text-gray-500">Olivia-Navigator: To add participant or edit participant.</small>
                </div>

                <div className="space-y-16 pt-12">
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <p className="font-semibold">Program Start Date</p>
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

                        <div className="space-y-3" >
                            <p className="font-semibold">Case ID</p>
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

                        <div className="space-y-3">
                            <p className="font-semibold">Home Visitor Assigned</p>
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
                    </div>


                    <div className="space-y-8" >
                        <p className="text-lg font-bold"> Participant Enrollment Information </p>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">Name</p>
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

                            <div className="space-y-3">
                                <p className="font-semibold">Date of Birth</p>
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

                            <div className="space-y-3">
                                <p className="font-semibold">Address</p>
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

                            <div className="space-y-3">
                                <p className="font-semibold">ZIP Code</p>
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

                            <div className="space-y-3">
                                <p className="font-semibold">Phone</p>
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
                        </div>
                    </div>

                    <div className="space-y-5">
                        <p className="text-lg font-bold"> Participant Demographics </p>

                        <div className="space-y-8" >
                            <div className="space-y-3">
                                <p className="font-semibold">Gender</p>
                                <div className="space-y-2">
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

                            <div className="space-y-3">
                                <p className="font-semibold">Ethnicity</p>
                                <div className="space-y-2">
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

                            <div className="space-y-3">
                                <p className="font-semibold">Race</p>
                                <div className="space-y-2">
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

                            <div className="space-y-3">
                                <p className="font-semibold">Primary Language</p>
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

                            <div className="space-y-3">
                                <p className="font-semibold">Pregnancy Status At Enrollment</p>
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

                            <div className="space-y-3">
                                <p className="font-semibold">Marital Status</p>
                                <div className="space-y-2">
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

                            <div className="space-y-3">
                                <p className="font-semibold">LGBTQI+</p>
                                <div className="space-y-2">
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

                            <div className="space-y-3">
                                <p className="font-semibold">Insurance</p>
                                <div className="space-y-2">
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
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="flex flex-col space-y-2">
                            <p className="text-lg font-bold pt-8"> Priority Population Characteristics </p>
                            <small>This section can be completed using information from other recent assesments below. Home visitors may reword the questions as long as the data recorded meets the definition in the guidance.</small>
                            <small>These fields should be updated periodically (review at least two times per year.)</small>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <p className="font-semibold">Child Abuse</p>
                                <div className="space-y-2">
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

                            <div className="space-y-3">
                                <p className="font-semibold">Substance Abuse</p>
                                <div className="space-y-2">
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

                            <div className="space-y-3">
                                <p className="font-semibold">Tobacco Use In Home</p>
                                <div className="space-y-2">
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

                            <div className="space-y-3">
                                <p className="font-semibold">Low Student Achievement</p>
                                <div className="space-y-2">
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

                            <div className="space-y-3">
                                <p className="font-semibold">Developmental Delay</p>
                                <div className="space-y-2">
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

                            <div className="space-y-3">
                                <p className="font-semibold">US Armed Forces</p>
                                <div className="space-y-2">
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

                            <div className="space-y-3">
                                <p className="font-semibold">Re-enrollment with Gap in Service</p>
                                <div className="space-y-2">
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

                            <div className="space-y-3">
                                <p className="font-semibold">(NFP Only) Transfer From Another Site</p>
                                <div className="space-y-2">
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
                    </div>
                </div>

                <div className="flex justify-center py-4">
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-x-2 w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto font-semibold"
                    >
                        {/* {isSubmitting && <span className="loading loading-spinner loading-sm"></span>} */}
                        Save
                    </button>
                </div>
            </form>
        </div>
    )

}

export default ParticipantDemographicsRecord;