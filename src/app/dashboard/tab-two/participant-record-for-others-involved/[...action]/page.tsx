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
                <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Participant Record for Others Involved </p>

                <p className="text-lg font-bold pt-8">Personal Information</p>

                <p className="font-semibold pb-2 pt-8">Name</p>
                <input
                    {...register('name')}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.name && (
                    <span className="label-text-alt text-red-500">
                        {errors.name.message}
                    </span>
                )}

                <p className="font-semibold pb-2 pt-8">Date of Birth</p>
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

                <p className="text-lg font-bold pt-8">Address and Contact Information</p>

                <p className="font-semibold pt-8">Current Living Arrangement</p>
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

                <div className="flex flex-nowrap space-x-4 py-6">
                    <div className="flex flex-col flex-grow lg:w-full md:w-full sm:w-auto">
                        <p className="font-semibold pb-2 whitespace-nowrap">Street Address</p>
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

                    <div className="flex flex-col flex-grow lg:w-3/4 md:w-3/4 sm:w-3/4">
                        <p className="font-semibold pb-2">City</p>
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

                    <div className="flex flex-col flex-grow lg:w-1/3 md:w-full sm:w-3/4">
                        <p className="font-semibold pb-2">State</p>
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
                    <div className="flex flex-col flex-grow">
                        <p className="font-semibold pb-2">Zip Code</p>
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

                    <div className="flex flex-col flex-grow">
                        <p className="font-semibold pb-2">County</p>
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

                <p className="font-semibold pb-2 pt-8">Primary Phone Number</p>
                <input
                    {...register('primaryPhoneNumber')}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.primaryPhoneNumber && (
                    <span className="label-text-alt text-red-500">
                        {errors.primaryPhoneNumber.message}
                    </span>
                )}

                <p className="font-semibold pb-2 pt-8">Phone Type:</p>
                <div className="flex flex-col gap-2">
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

                <p className="text-lg font-bold pt-8">Emergency Contact</p>
                <div className="flex flex-nowrap space-x-4">
                    <div className="flex flex-col flex-grow">
                        <p className="font-semibold pb-2 pt-8">Name</p>
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

                    <div className="flex flex-col flex-grow">
                        <p className="font-semibold pb-2 pt-8">Phone Number</p>
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

                <p className="font-semibold pb-2 pt-8">Emergency Contact Relationship</p>
                <input
                    {...register('emergencyContactRelationship')}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.emergencyContactRelationship && (
                    <span className="label-text-alt text-red-500">
                        {errors.emergencyContactRelationship.message}
                    </span>
                )}

                <p className="text-lg font-bold pt-8">Insurance Status</p>

                <p className="font-semibold pb-2 pt-8">Marital Status:</p>
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

                <div className="flex flex-nowrap space-x-4 pt-6">
                    <div className="flex flex-col flex-grow">
                        <p className="font-semibold pb-2">Effective Date</p>
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

                    <div className="flex flex-col flex-grow">
                        <p className="font-semibold pb-2">Subscriber ID</p>
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

                    <div className="flex flex-col flex-grow">
                        <p className="font-semibold pb-2">Group ID</p>
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

                <p className="text-lg font-bold pt-8"> Prenatal Care (for current or most recent pregnancy) </p>

                <p className="font-semibold pb-2 pt-8">Gestational Age at Entry of Care</p>
                <input
                    {...register('gestationalAge')}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.gestationalAge && (
                    <span className="label-text-alt text-red-500">
                        {errors.gestationalAge.message}
                    </span>
                )}

                <p className="font-semibold pb-2 pt-8">Anticipated Delivery Date</p>
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

                <p className="font-semibold pb-2 pt-8">Planned Mode of Delivery</p>
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

                <p className="font-semibold pb-2 pt-8">Actual Mode of Delivery</p>
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

                <p className="font-semibold pb-2 pt-8">Attended Postpartum Visit</p>
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

                {showPostpartumLocationDate && (
                    <>
                        <p className="font-semibold pb-2 pt-8">Postpartum Visit Location</p>
                        <input
                            {...register('postpartumVisitLocation')}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.postpartumVisitLocation && (
                            <span className="label-text-alt text-red-500">
                                {errors.postpartumVisitLocation.message}
                            </span>
                        )}

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
                    </>
                )}

                <p className="text-lg font-bold pt-8">Obstetric History</p>

                <p className="font-medium">Total Number of Pregnancies</p>
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

                <p className="font-medium">Number of Live Births</p>
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

                <p className="font-medium">Number of Children Living with Mother</p>
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

                <p className="font-medium">
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

                <p className="text-lg font-bold pt-8"> Medical Problems Requiring Ongoing Care </p>

                <p className="font-semibold pb-2 pt-8">Diagnoses/Conditions</p>
                <textarea
                    {...register('ongoingMedicalProblems')}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.ongoingMedicalProblems && (
                    <span className="label-text-alt text-red-500">
                        {errors.ongoingMedicalProblems.message}
                    </span>
                )}

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