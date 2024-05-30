"use client"

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    ChildDemographicsRecordInputsSchema,
    ChildDemographicsRecordResponseSchema,
    IChildDemographicsRecordInputs,
    YesNoEnum,
    childLivingWithEnum,
    childProtectiveServiceEnum,
    labelMapping,
    sexEnum
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import { createChildDemographicsRecord, readChildDemographicsRecord, updateChildDemographicsRecord } from "../actions";

const ChildDemographicsRecord: React.FC = () => {
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
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<IChildDemographicsRecordInputs>({
        resolver: zodResolver(ChildDemographicsRecordInputsSchema),
    });

    const [childLivingWithOtherSelected, setChildLivingWithOtherSelected] = useState<boolean>(false);
    const childLivingWith = watch("childLivingWith", []);

    useEffect(() => {
        if (Array.isArray(childLivingWith)) {
            const includesOther = childLivingWith.includes("Other");
            setChildLivingWithOtherSelected(includesOther);
            if (!includesOther) {
                setValue("childLivingWithOther", null);
            }
        }
    }, [childLivingWith, setValue]);

    const [nicuStay, setNicuStay] = useState<boolean>(false);
    const handleNICUStay = (value: string) => {
        const isNicuStay = value === 'Yes';
        setNicuStay(value === 'Yes');

        if (!isNicuStay) {
            setValue('nicuStayLength', null);
        }
    };

    const [prenatalDrugExposure, setPrenatalDrugExposure] = useState<boolean>(false);
    const handlePrenatalDrugExposure = (value: string) => {
        const isPrenatalDrugExposure = value === 'Yes';
        setPrenatalDrugExposure(isPrenatalDrugExposure);

        if (!isPrenatalDrugExposure) {
            setValue('prenatalDrug', null);
        }
    };

    useEffect(() => {
        const fetchAndPopulatePastSubmissionData = async () => {
            try {
                if (verb !== 'edit') {
                    return;
                }

                if (!submissionId) {
                    throw new Error('Missing submissionId when fetching past submission');
                }

                const response = await readChildDemographicsRecord(submissionId, userId);

                const validResponse = ChildDemographicsRecordResponseSchema.parse(response);

                const formattedData = {
                    ...validResponse,
                    dateOfBirth: new Date(validResponse.dateOfBirth).toISOString().split('T')[0], // Format as YYYY-MM-DD
                    effectiveDate: new Date(validResponse.effectiveDate).toISOString().split('T')[0], // Format as YYYY-MM-DD
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

    const submit = async (ChildDemographicsRecordData: IChildDemographicsRecordInputs) => {
        console.log("input: ", ChildDemographicsRecordData)

        try {
            let response;

            if (verb === 'new') {
                response = await createChildDemographicsRecord(ChildDemographicsRecordData, userId);
                console.log("response: ", response);
            } else {
                response = await updateChildDemographicsRecord(ChildDemographicsRecordData, submissionId, userId)
            }

            ChildDemographicsRecordResponseSchema.parse(response);
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            return;
        }

        setSuccessMessage('Child Demographics Record submitted successfully!')
        router.push('/dashboard');
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Child Demographics Record</p>
                </div>

                <div className="space-y-16 pt-12">
                    <div className="space-y-8">
                        <div>
                            <p className="text-lg font-bold"> Child Demographics </p>
                            <p className="font-medium">  (Child enrolled in program, not siblings) </p>
                        </div>
                        <div className="space-y-4">

                            <div className="space-y-3">
                                <p className="font-semibold">Name</p>
                                <input
                                    {...register("childName")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="text"
                                />
                                {errors.childName && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.childName.message}
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
                                <p className="font-semibold">Sex</p>
                                <div className="space-y-2">
                                    {sexEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register("sex")}
                                                className="form-radio"
                                                type="radio"
                                                value={option}
                                            />
                                            <span className="ml-2">{option}</span>
                                        </label>
                                    ))}
                                    {errors.sex && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.sex.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Child Living With</p>
                                <div className="space-y-2">
                                    {childLivingWithEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register("childLivingWith")}
                                                className="form-checkbox"
                                                type="checkbox"
                                                value={option}
                                            />
                                            <span className="ml-2">{labelMapping.childLivingWith[option]}</span>
                                        </label>
                                    ))}
                                    {errors.childLivingWith && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.childLivingWith.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {childLivingWithOtherSelected && (
                                <div className="space-y-3">
                                    <p className="font-semibold">Please specify other</p>
                                    <input
                                        {...register("childLivingWithOther")}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        type="text"
                                    />
                                    {errors.childLivingWithOther && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.childLivingWithOther.message}
                                        </span>
                                    )}
                                </div>
                            )}

                            <div className="space-y-3">
                                <p className="font-semibold">Parent 1 Name</p>
                                <input
                                    {...register("parentOneName")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="text"
                                />
                                {errors.parentOneName && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.parentOneName.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Involved in the child's life? </p>
                                <div className="space-y-2">
                                    {YesNoEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register("parentOneInvolvedInLife")}
                                                className="form-radio"
                                                type="radio"
                                                value={option}
                                            />
                                            <span className="ml-2">{option}</span>
                                        </label>
                                    ))}
                                    {errors.parentOneInvolvedInLife && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.parentOneInvolvedInLife.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Parent 2 Name</p>
                                <input
                                    {...register("parentTwoName")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="text"
                                />
                                {errors.parentTwoName && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.parentTwoName.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Involved in the child's life? </p>
                                <div className="space-y-2">
                                    {YesNoEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register("parentTwoInvolvedInLife")}
                                                className="form-radio"
                                                type="radio"
                                                value={option}
                                            />
                                            <span className="ml-2">{option}</span>
                                        </label>
                                    ))}
                                    {errors.parentTwoInvolvedInLife && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.parentTwoInvolvedInLife.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Insurance Plan</p>
                                <input
                                    {...register('insurancePlan')}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.insurancePlan && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.insurancePlan.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-nowrap space-x-4">
                                <div className="flex flex-col flex-grow space-y-3">
                                    <p className="font-semibold">Effective Date</p>
                                    <input
                                        {...register('effectiveDate')}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        type="date"
                                    />
                                    {errors.effectiveDate && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.effectiveDate.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col flex-grow space-y-3">
                                    <p className="font-semibold">Subscriber ID</p>
                                    <input
                                        {...register('subscriberId')}
                                        className="border border-gray-300 px-4 py-2.5 rounded-md w-full"
                                    />
                                    {errors.subscriberId && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.subscriberId.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col flex-grow space-y-3">
                                    <p className="font-semibold">Group ID</p>
                                    <input
                                        {...register('groupId')}
                                        className="border border-gray-300 px-4 py-2.5 rounded-md w-full"
                                    />
                                    {errors.groupId && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.groupId.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <p className="text-lg font-bold"> Medical History </p>
                        <div className="space-y-4">

                            <div className="space-y-3">
                                <p className="font-semibold">Primary Care Provider</p>
                                <input
                                    {...register("primaryCareProvider")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="text"
                                />
                                {errors.primaryCareProvider && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.primaryCareProvider.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Primary Care Provider Phone Number</p>
                                <input
                                    {...register("primaryCareProviderPhone")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="text"
                                />
                                {errors.primaryCareProviderPhone && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.primaryCareProviderPhone.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Birth Weight</p>
                                <input
                                    {...register("birthWeight")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="text"
                                />
                                {errors.birthWeight && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.birthWeight.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Gestational Age At Birth</p>
                                <input
                                    {...register("gestationalAgeAtBirth")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="text"
                                />
                                {errors.gestationalAgeAtBirth && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.gestationalAgeAtBirth.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                                <div className="flex flex-col flex-grow space-y-3 md:w-1/2">
                                    <p className="font-semibold">NICU Stay</p>
                                    <div className="space-y-2">
                                        {YesNoEnum.options.map(option => (
                                            <label key={option} className="flex items-center">
                                                <input
                                                    {...register("nicuStay")}
                                                    className="form-radio"
                                                    type="radio"
                                                    value={option}
                                                    onChange={(e) => handleNICUStay(e.target.value)}
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                        {errors.nicuStay && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.nicuStay.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {nicuStay && (
                                    <div className="flex flex-col flex-grow space-y-3 md:w-1/2">
                                        <p className="font-semibold">Length of Stay (Days)</p>
                                        <input
                                            {...register("nicuStayLength")}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="text"
                                        />
                                        {errors.gestationalAgeAtBirth && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.gestationalAgeAtBirth.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                                <div className="flex flex-col flex-grow space-y-3 md:w-1/2">
                                    <p className="font-semibold">Prenatal Drug Exposure</p>
                                    <div className="space-y-2">
                                        {YesNoEnum.options.map(option => (
                                            <label key={option} className="flex items-center">
                                                <input
                                                    {...register("prenatalDrugExposure")}
                                                    className="form-radio"
                                                    type="radio"
                                                    value={option}
                                                    onChange={(e) => handlePrenatalDrugExposure(e.target.value)}
                                                />
                                                <span className="ml-2">{option}</span>
                                            </label>
                                        ))}
                                        {errors.prenatalDrugExposure && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.prenatalDrugExposure.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {prenatalDrugExposure && (
                                    <div className="flex flex-col flex-grow space-y-3 md:w-1/2">
                                        <p className="font-semibold">Prenatal Drug</p>
                                        <input
                                            {...register("prenatalDrug")}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="text"
                                        />
                                        {errors.prenatalDrug && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.prenatalDrug.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Medical Complications At Birth</p>
                                <input
                                    {...register("medicalComplicationsAtBirth")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="text"
                                />
                                {errors.medicalComplicationsAtBirth && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.medicalComplicationsAtBirth.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Ongoing Medical Issues and Diagnoses</p>
                                <input
                                    {...register("ongoingMedicalIssues")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="text"
                                />
                                {errors.ongoingMedicalIssues && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.ongoingMedicalIssues.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Ongoing Medications</p>
                                <textarea
                                    {...register("ongoingMedications")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.ongoingMedications && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.ongoingMedications.message}
                                    </span>
                                )}

                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Do you have any concerns about this child’s physical, mental, or behavioral health?</p>
                                <textarea
                                    {...register("healthConcerns")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.healthConcerns && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.healthConcerns.message}
                                    </span>
                                )}
                            </div>

                        </div>
                    </div>

                    <div className="space-y-8">
                        <p className="text-lg font-bold">Related History and Community Linkage</p>

                        <div className="space-y-4">

                            <div className="space-y-3">
                                <p className="font-semibold">List any difficulties or services this child has received (difficulties breastfeeding, failure to thrive, etc.)</p>
                                <input
                                    {...register("difficultiesServicesReceived")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="text"
                                />
                                {errors.difficultiesServicesReceived && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.difficultiesServicesReceived.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Does your child have a relationship with a lactation consultant or other provider? </p>
                                <div className="space-y-2">
                                    {YesNoEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register("lactationConsultant")}
                                                className="form-radio"
                                                type="radio"
                                                value={option}
                                            />
                                            <span className="ml-2">{option}</span>
                                        </label>
                                    ))}
                                    {errors.lactationConsultant && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.lactationConsultant.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Is your child involved with the court/legal system?</p>
                                <div className="space-y-2">
                                    {YesNoEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register("legalSystemInvolvement")}
                                                className="form-radio"
                                                type="radio"
                                                value={option}
                                            />
                                            <span className="ml-2">{option}</span>
                                        </label>
                                    ))}
                                    {errors.legalSystemInvolvement && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.legalSystemInvolvement.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Has your child had any involvement with Child Protective Service (CPS)</p>
                                <div className="space-y-2">
                                    {childProtectiveServiceEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register("childProtectiveService")}
                                                className="form-radio"
                                                type="radio"
                                                value={option}
                                            />
                                            <span className="ml-2">{labelMapping.childProtectiveService[option]}</span>
                                        </label>
                                    ))}
                                    {errors.childProtectiveService && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.childProtectiveService.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Caseworker</p>
                                <input
                                    {...register("caseworker")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="text"
                                />
                                {errors.caseworker && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.caseworker.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Caseworker Phone Number</p>
                                <input
                                    {...register("caseworkerPhoneNumber")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="text"
                                />
                                {errors.caseworkerPhoneNumber && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.caseworkerPhoneNumber.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Other Important Information</p>
                                <input
                                    {...register("importantInformation")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="text"
                                />
                                {errors.importantInformation && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.importantInformation.message}
                                    </span>
                                )}
                            </div>
                        </div>
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
            </form >
        </div >
    )

}

export default ChildDemographicsRecord;