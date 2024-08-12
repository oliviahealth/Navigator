"use client"

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    EthnicityEnum,
    GenderEnum,
    HealthInsuranceEnum,
    ITargetChildRecordInputs,
    RaceEnum,
    TargetChildRecordInputsSchema,
    WellChildVisitsEnum,
    YesNoEnum,
    labelMapping
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import { createTargetChildRecord, readTargetChildRecord, updateTargetChildRecord } from "../actions";

import { decryptSSN } from "../../../../../utils/encryption";

const TargetChildRecord: React.FC = () => {
    const router = useRouter();
    const { action } = useParams();

    const verb = action[0]
    const submissionId = action[1]

    const user = useAppStore(state => state.user);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ITargetChildRecordInputs>({
        resolver: zodResolver(TargetChildRecordInputsSchema),
        defaultValues: {
            otherHealthInsurance: null
        }
    });

    const [showOtherHealthInsurance, setShowOtherHealthInsurance] = useState<boolean>(false);
    const handleShowOtherHealthInsurance = (value: string) => {
        setShowOtherHealthInsurance(value === "Other");
        if (value !== "Other") {
            setValue("otherHealthInsurance", null);
        }
    };

    const childRace = watch("childRace", []);
    const [selectedChildRace, setSelectedChildRace] = useState("");
    useEffect(() => {
        if (Array.isArray(childRace)) {
            const includesNone = childRace.includes("Declined_to_identify");
            if (includesNone) {
                if (JSON.stringify(childRace) !== JSON.stringify(["Declined_to_identify"])) {
                    setValue("childRace", ["Declined_to_identify"]);
                }
                setSelectedChildRace("Declined_to_identify")
            } else if (childRace.length === 0) {
                setSelectedChildRace("");
            }
        }
    }, [childRace, setValue]);

    useEffect(() => {
        const fetchAndPopulatePastSubmissionData = async () => {
            try {
                if (verb !== 'edit') {
                    return;
                }

                if (!user) {
                    throw new Error("User not found");
                }

                if (!submissionId) {
                    throw new Error('Missing submissionId when fetching past submission');
                }

                const validResponse = await readTargetChildRecord(submissionId, user.id);
                const formattedResponse = {
                    ...validResponse,
                    dateCompleted: new Date(validResponse.dateCompleted).toISOString().slice(0, 10),
                    childDateOfBirth: new Date(validResponse.childDateOfBirth).toISOString().slice(0, 10),
                    childEnrollmentDate: new Date(validResponse.childEnrollmentDate).toISOString().slice(0, 10),
                    childSSN: validResponse.childSSN ? decryptSSN(validResponse.childSSN) : null
                };
                reset(formattedResponse);
                setShowOtherHealthInsurance(formattedResponse.healthInsurance === "Other");
            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');
                router.push('/dashboard');
            }
        };

        if (user && verb === 'edit' && submissionId) {
            fetchAndPopulatePastSubmissionData();
        }
    }, [user, verb, submissionId, reset, router, setErrorMessage]);

    const submit = async (data: ITargetChildRecordInputs) => {
        console.log()
        try {
            let response;

            if (!user) {
                throw new Error("User missing");
            }

            if (verb === 'new') {
                response = await createTargetChildRecord(data, user.id);
            } else {
                response = await updateTargetChildRecord(data, submissionId, user.id)
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');
            return;
        }

        setSuccessMessage('Target Child Record submitted successfully!')
        router.push('/dashboard')
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Target Child Enrollment & Summary Record</p>
                    <small>Olivia-Navigator: Target Child Record TouchPoint</small>
                </div>

                <div className="space-y-16 pt-12">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">Participant Name</p>
                                <input
                                    type="text"
                                    {...register("participantName")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                                {errors.participantName && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.participantName.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Case ID</p>
                                <input
                                    type="text"
                                    {...register("caseId")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                                {errors.caseId && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.caseId.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Date completed</p>
                                <input
                                    {...register("dateCompleted")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="date"
                                />
                                {errors.dateCompleted && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.dateCompleted.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Staff Name</p>
                                <input
                                    type="text"
                                    {...register("staffName")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                                {errors.staffName && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.staffName.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <p className="font-bold text-lg">Complete this form for each OLIVIA-NAVIGATOR Target Child during the first visit with the child.</p>
                    </div>

                    <div className="space-y-8">
                        <p className="text-lg font-bold"> Target Child Enrollment Information </p>
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">Child Name</p>
                                <input
                                    type="text"
                                    {...register("childName")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                                {errors.childName && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.childName.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Child DOB</p>
                                <input
                                    type="date"
                                    {...register("childDateOfBirth")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                                {errors.childDateOfBirth && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.childDateOfBirth.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Child Enrollment Date</p>
                                <div>
                                    <div><small>If Participant enrolled while pregnant with child: Child DOB </small></div>
                                    <div><small>If Participant is enrolling with child: Program Start Date </small></div>
                                </div>
                                <input
                                    type="date"
                                    {...register("childEnrollmentDate")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                                {errors.childEnrollmentDate && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.childEnrollmentDate.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Child SSN</p>
                                <input
                                    type="text"
                                    {...register("childSSN")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                                {errors.childSSN && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.childSSN.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Gestational Age at Birth (# of weeks)</p>
                                <input
                                    type="text"
                                    {...register("gestationalAgeAtBirth")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.gestationalAgeAtBirth && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.gestationalAgeAtBirth.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <p className="font-bold text-lg">Child characteristics</p>
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold"> Child Gender </p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {GenderEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("childGender")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.childGender && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.childGender.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Child Ethnicity</p>
                                <div className="space-y-2">
                                    {EthnicityEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register("childEthnicity")}
                                                className="form-radio"
                                                type="radio"
                                                value={option}
                                            />
                                            <span className="ml-2">{labelMapping.ethnicity[option]}</span>
                                        </label>
                                    ))}
                                    {errors.childEthnicity && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.childEthnicity.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Child Race</p>
                                <small>Check all that apply</small>
                                <div className="space-y-2">
                                    {RaceEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register("childRace")}
                                                className="form-checkbox"
                                                type="checkbox"
                                                value={option}
                                                checked={Array.isArray(childRace) && childRace.includes(option)}
                                                disabled={selectedChildRace === 'Declined_to_identify' && option !== 'Declined_to_identify'}
                                            />
                                            <span className="ml-2">{labelMapping.race[option]}</span>
                                        </label>
                                    ))}
                                    {errors.childRace && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.childRace.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold"> Is the participant the child's biological mother? </p>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center gap-x-12">
                                        {YesNoEnum.options.map(option => (
                                            <label key={option} className="inline-flex items-center">
                                                <input
                                                    {...register("isBiologicalMother")}
                                                    type="radio"
                                                    value={option}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.isBiologicalMother && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.isBiologicalMother.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Well-child visits completed to date</p>
                                <small>Check all that apply</small>
                                <div className="grid grid-cols-2 gap-2">
                                    {WellChildVisitsEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register("wellChildVisitsCompleted")}
                                                className="form-checkbox"
                                                type="checkbox"
                                                value={option}
                                            />
                                            <span className="ml-2">{option}</span>
                                        </label>
                                    ))}
                                    {errors.wellChildVisitsCompleted && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.wellChildVisitsCompleted.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <p className="text-lg font-bold">Complete this question if the Primary Caregiver was enrolled while pregnant with this child.</p>
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold"> What kind of health insurance coverage does your child have? </p>
                                <div className="space-y-2">
                                    {HealthInsuranceEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register("healthInsurance")}
                                                className="form-radio"
                                                type="radio"
                                                value={option}
                                                onChange={(e) => handleShowOtherHealthInsurance(e.target.value)}
                                            />
                                            <span className="ml-2">{labelMapping.healthInsurance[option]}</span>
                                        </label>
                                    ))}
                                    {errors.healthInsurance && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.healthInsurance.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {showOtherHealthInsurance && (
                                <div className="space-y-3">
                                    <p className="font-semibold">Please specify other:</p>
                                    <input
                                        type="text"
                                        {...register("otherHealthInsurance")}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    />
                                    {errors.otherHealthInsurance && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.otherHealthInsurance.message}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                    <hr className="border-t-1 border-gray-400 my-4" />
                    <div>
                        <p className="font-semibold pb-2 pt-8">Submission Label</p>
                        <textarea {...register("label")} className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                        {errors.label && (<span className="label-text-alt text-red-500">{errors.label.message}</span>)}
                    </div>
                    <div>
                        <p className="font-semibold pb-2 pt-8">Staff Notes</p>
                        <textarea {...register("staffNotes")} className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                        {errors.staffNotes && (<span className="label-text-alt text-red-500">{errors.staffNotes.message}</span>)}
                    </div>
                </div>

                    <div className="flex justify-center py-4">
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-x-2 w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto font-semibold"
                        >
                            {isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
                            Save
                        </button>
                    </div>
                </div>
            </form >
        </div >
    )
};

export default TargetChildRecord;