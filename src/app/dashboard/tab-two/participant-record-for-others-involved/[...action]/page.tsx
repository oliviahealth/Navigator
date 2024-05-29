"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { states } from "../../../../../utils"

import {
    livingArrangementsEnum,
    phoneTypeEnum,
    maritalStatusEnum,
    labelMapping,
    ParticipantRecordForOthersInvolvedSchema,
    IParticipantRecordForOthersInvolvedInputs,
    ParticipantRecordForOthersInvolvedResponseSchema,
    IParticipantRecordForOthersInvolvedResponse
} from "../definitions";

import useAppStore from "@/lib/useAppStore";

const CommunicationLog: React.FC = () => {
    const router = useRouter()
    const { action } = useParams();

    const verb = action[0];
    const submissionId = action[1];

    const userId = useAppStore(state => state.userId);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    const [showPostpartumLocationDate, setShowPostpartumLocationDate] = useState<boolean>(false);
    const handlePostpartumAttendance = (value: string) => {
        if (value === 'Yes') {
            setShowPostpartumLocationDate(true);

            return;
        }

        setShowPostpartumLocationDate(false);
        setValue('postpartumVisitDate', null);
        setValue('postpartumVisitDate', null);
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue
    } = useForm<IParticipantRecordForOthersInvolvedInputs>({
        resolver: zodResolver(ParticipantRecordForOthersInvolvedSchema),
        defaultValues: {
        },
    });

    const submit = async (data: IParticipantRecordForOthersInvolvedInputs) => {
        console.log(data)
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Participant Record for Others Involved </p>
                    <small className="text-gray-500">For other people who may participate in the Program, Complete at initial intake and update as indicated.
                        Include anyone the client/Participant states is directly or importantly involved in the care of the family (to include, as indicated, father of the child, parents of the mother, grandparents, adult siblings, etc.)</small>
                </div>

                <div className="space-y-16 pt-12">
                    <div className="space-y-8">
                        <p className="text-lg font-bold">Personal Information</p>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">Name</p>
                                <input
                                    {...register('name')}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
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
                                    {...register('dateOfBirth')}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="date"
                                />
                                {errors.dateOfBirth && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.dateOfBirth.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="space-y-8">
                        <p className="text-lg font-bold">Address and Contact Information</p>


                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">Current Living Arrangement</p>
                                <div className="flex flex-col space-y-2">
                                    {livingArrangementsEnum.options.map((status) => (
                                        <label key={status} className="inline-flex items-center">
                                            <input
                                                {...register('currentLivingArrangement')}
                                                type="radio"
                                                value={status}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{labelMapping[status]}</span>
                                        </label>
                                    ))}

                                    {errors.currentLivingArrangement && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.currentLivingArrangement.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-nowrap space-x-4">
                                <div className="flex flex-col flex-grow lg:w-full md:w-full sm:w-auto space-y-3">
                                    <p className="font-semibold  whitespace-nowrap">Street Address</p>
                                    <input
                                        {...register('streetAddress')}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    />
                                    {errors.streetAddress && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.streetAddress.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col flex-grow lg:w-3/4 md:w-3/4 sm:w-3/4 space-y-3">
                                    <p className="font-semibold">City</p>
                                    <input
                                        {...register('city')}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    />
                                    {errors.city && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.city.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col flex-grow lg:w-1/3 md:w-full sm:w-3/4 space-y-3">
                                    <p className="font-semibold">State</p>
                                    <select
                                        {...register('state')}
                                        className="dropdown border border-gray-300 px-4 py-2 rounded-md w-full"
                                    >
                                        <option selected disabled>
                                            --
                                        </option>
                                        {states.map((state) => (
                                            <option key={state}>{state}</option>
                                        ))}
                                    </select>
                                    {errors.state && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.state.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-nowrap space-x-4">
                                <div className="flex flex-col flex-grow space-y-3">
                                    <p className="font-semibold">Zip Code</p>
                                    <input
                                        {...register('zipCode')}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    />
                                    {errors.zipCode && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.zipCode.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col flex-grow space-y-3">
                                    <p className="font-semibold">County</p>
                                    <input
                                        {...register('county')}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    />
                                    {errors.county && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.county.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Primary Phone Number</p>
                                <input
                                    {...register('primaryPhoneNumber')}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.primaryPhoneNumber && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.primaryPhoneNumber.message}
                                    </span>
                                )}
                            </div>

                            <p className="font-semibold">Phone Type:</p>
                            <div className="flex flex-col space-y-3">
                                {phoneTypeEnum.options.map((type) => (
                                    <label key={type} className="inline-flex items-center">
                                        <input
                                            {...register('phoneType')}
                                            type="radio"
                                            value={type}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{type}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.phoneType && (
                                <span className="label-text-alt text-red-500">
                                    {errors.phoneType.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <p className="text-lg font-bold">Emergency Contact</p>
                        <div className="space-y-4">
                            <div className="flex flex-nowrap space-x-4">
                                <div className="flex flex-col flex-grow space-y-3">
                                    <p className="font-semibold">Name</p>
                                    <input
                                        {...register('emergencyContact')}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    />
                                    {errors.emergencyContact && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.emergencyContact.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col flex-grow space-y-3">
                                    <p className="font-semibold">Phone Number</p>
                                    <input
                                        {...register('emergencyContactPhone')}
                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    />
                                    {errors.emergencyContactPhone && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.emergencyContactPhone.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Emergency Contact Relationship</p>
                                <input
                                    {...register('emergencyContactRelationship')}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.emergencyContactRelationship && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.emergencyContactRelationship.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <p className="text-lg font-bold">Insurance Status</p>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">Marital Status</p>
                                <div className="flex flex-col gap-2">
                                    {maritalStatusEnum.options.map((status) => (
                                        <label key={status} className="inline-flex items-center">
                                            <input
                                                {...register('maritalStatus')}
                                                type="radio"
                                                value={status}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{status}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.maritalStatus && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.maritalStatus.message}
                                    </span>
                                )}
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
                        <p className="text-lg font-bold"> Prenatal Care (for current or most recent pregnancy) </p>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">Gestational Age at Entry of Care</p>
                                <input
                                    {...register('gestationalAge')}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.gestationalAge && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.gestationalAge.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Anticipated Delivery Date</p>
                                <input
                                    {...register('anticipatedDeliveryDate')}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="date"
                                />
                                {errors.anticipatedDeliveryDate && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.anticipatedDeliveryDate.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Planned Mode of Delivery</p>
                                <div className="flex flex-col space-y-2">
                                    {['Vaginal', 'Cesarean'].map((status) => (
                                        <label key={status} className="inline-flex items-center">
                                            <input
                                                {...register('plannedModeDelivery')}
                                                type="radio"
                                                value={status}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{status}</span>
                                        </label>
                                    ))}
                                    {errors.plannedModeDelivery && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.plannedModeDelivery.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Actual Mode of Delivery</p>
                                <div className="flex flex-col space-y-2">
                                    {['Vaginal', 'Cesarean'].map((status) => (
                                        <label key={status} className="inline-flex items-center">
                                            <input
                                                {...register('actualModeDelivery')}
                                                type="radio"
                                                value={status}
                                                className="form-radio"
                                            />
                                            <span className="ml-2">{status}</span>
                                        </label>
                                    ))}
                                    {errors.actualModeDelivery && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.actualModeDelivery.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Attended Postpartum Visit</p>
                                <div className="flex flex-col space-y-2">
                                    {['Yes', 'No'].map((status, idx) => (
                                        <label key={idx} className="inline-flex items-center">
                                            <input
                                                {...register('attendedPostpartumVisit')}
                                                type="radio"
                                                value={status}
                                                className="form-radio"
                                                onChange={(e) => handlePostpartumAttendance(e.target.value)}
                                            />
                                            <span className="ml-2">{status}</span>
                                        </label>
                                    ))}
                                    {errors.attendedPostpartumVisit && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.attendedPostpartumVisit.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {showPostpartumLocationDate && (
                                <>
                                    <div className="space-y-3">
                                        <p className="font-semibold">Postpartum Visit Location</p>
                                        <input
                                            {...register('postpartumVisitLocation')}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        />
                                        {errors.postpartumVisitLocation && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.postpartumVisitLocation.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <p className="font-medium">Date Completed</p>
                                        <input
                                            {...register('postpartumVisitDate')}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="date"
                                        />
                                        {errors.postpartumVisitDate && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.postpartumVisitDate.message}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <p className="text-lg font-bold">Obstetric History</p>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">Total Number of Pregnancies</p>
                                <select
                                    {...register('totalNumPregnancies')}
                                    className="dropdown border rounded-md border-gray-300 p-3 font-medium"
                                >
                                    {Array.from({ length: 6 }, (_, i) => (
                                        <option key={i} value={i}>
                                            {i}
                                        </option>
                                    ))}
                                </select>
                                {errors.totalNumPregnancies && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.totalNumPregnancies.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Number of Live Births</p>
                                <select
                                    {...register('numLiveBirths')}
                                    className="dropdown border rounded-md border-gray-300 p-3 font-medium"
                                >
                                    {Array.from({ length: 7 }, (_, i) => (
                                        <option key={i} value={i}>
                                            {i}
                                        </option>
                                    ))}
                                </select>
                                {errors.numLiveBirths && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.numLiveBirths.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Number of Children Living with Mother</p>
                                <select
                                    {...register('numChildrenWithMother')}
                                    className="dropdown border rounded-md border-gray-300 p-3 font-medium"
                                >
                                    {Array.from({ length: 6 }, (_, i) => (
                                        <option key={i} value={i}>
                                            {i}
                                        </option>
                                    ))}
                                </select>
                                {errors.numChildrenWithMother && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.numChildrenWithMother.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">
                                    Please Explain Complications During Prior Pregnancies
                                </p>
                                <textarea
                                    {...register('priorComplications')}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.priorComplications && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.priorComplications.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <p className="text-lg font-bold"> Medical Problems Requiring Ongoing Care </p>
                        <div className="space-y-3">
                            <p className="font-semibold">Diagnoses/Conditions</p>
                            <textarea
                                {...register('ongoingMedicalProblems')}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            />
                            {errors.ongoingMedicalProblems && (
                                <span className="label-text-alt text-red-500">
                                    {errors.ongoingMedicalProblems.message}
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
    );
};

export default CommunicationLog;