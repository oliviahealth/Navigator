"use client"

import React, { useEffect } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    ParticipantDemographicsFormInputsSchema,
    IParticipantDemographicsFormInputs,
    RaceEnum,
    MaritalStatusEnum,
    InsuranceEnum,
    PregnancyStatusAtEnrollmentEnum,
    EthnicityEnum,
    LgbtqiPlusEnum,
    labelMapping,
    ParticipantDemographicsFormResponseSchema
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import { createParticipantDemographicsRecord, readParticipantDemographicsRecord, updateParticipantDemographicsRecord } from "../actions";

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
        reset,
        formState: { errors, isSubmitting },
    } = useForm<IParticipantDemographicsFormInputs>({
        resolver: zodResolver(ParticipantDemographicsFormInputsSchema),
    });

    useEffect(() => {
        const fetchAndPopulatePastSubmissionData = async () => {
            try {
                if (verb !== 'edit') {
                    return;
                }

                if (!submissionId) {
                    throw new Error('Missing submissionId when fetching past submission');
                }

                const response = await readParticipantDemographicsRecord(submissionId, userId);

                const validResponse = ParticipantDemographicsFormResponseSchema.parse(response);

                const formattedData = {
                    ...validResponse,
                    participantDateOfBirth: new Date(validResponse.participantDateOfBirth).toISOString().split('T')[0], // Format as YYYY-MM-DD
                    programStartDate: new Date(validResponse.programStartDate).toISOString().split('T')[0], // Format as YYYY-MM-DD
                };

                reset(formattedData);

            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');

                router.push('/');

                return;
            }
        }

        fetchAndPopulatePastSubmissionData()
    }, [])

    const submit = async (ParticipantDemographicsRecordData: IParticipantDemographicsFormInputs) => {
        console.log(ParticipantDemographicsRecordData)

        try {
            let response;

            if (verb === 'new') {
                response = await createParticipantDemographicsRecord(ParticipantDemographicsRecordData, userId);
            } else {
                response = await updateParticipantDemographicsRecord(ParticipantDemographicsRecordData, submissionId, userId)
            }

            ParticipantDemographicsFormResponseSchema.parse(response);
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            router.push('/dashboard');

            return;
        }

        setSuccessMessage('Participant Demographics Record submitted successfully!')
        router.push('/dashboard');
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
                            {...register("participantName")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            type="text"
                        />
                        {errors.participantName && (
                            <span className="label-text-alt text-red-500">
                                {errors.participantName.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-4">Date of Birth</p>
                        <input
                            {...register("participantDateOfBirth")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            type="date"
                        />
                        {errors.participantDateOfBirth && (
                            <span className="label-text-alt text-red-500">
                                {errors.participantDateOfBirth.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-4">Address</p>
                        <input
                            {...register("participantAddress")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            type="text"
                        />
                        {errors.participantAddress && (
                            <span className="label-text-alt text-red-500">
                                {errors.participantAddress.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-4">ZIP Code</p>
                        <input
                            {...register("participantZipCode")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            type="text"
                        />
                        {errors.participantZipCode && (
                            <span className="label-text-alt text-red-500">
                                {errors.participantZipCode.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-4">Phone</p>
                        <input
                            {...register("participantPhoneNumber")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            type="text"
                        />
                        {errors.participantPhoneNumber && (
                            <span className="label-text-alt text-red-500">
                                {errors.participantPhoneNumber.message}
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
                            {EthnicityEnum.options.map(option => (
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
                            {RaceEnum.options.map(option => (
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
                            {PregnancyStatusAtEnrollmentEnum.options.map(option => (
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
                            {MaritalStatusEnum.options.map(option => (
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
                            {LgbtqiPlusEnum.options.map(option => (
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
                            {InsuranceEnum.options.map(option => (
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
                    {isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
                    Save
                </button>
            </form>
        </div>
    )

}

export default ParticipantDemographicsRecord;