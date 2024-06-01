"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { states } from "../../../../../utils"

import {
    livingArrangementsEnum,
    maritalStatusEnum,
    labelMapping,
    ParticipantRecordForOthersInvolvedInputsSchema,
    IParticipantRecordForOthersInvolvedInputs,
    ParticipantRecordForOthersInvolvedResponseSchema,
    IParticipantRecordForOthersInvolvedResponse,
    deliveryModeEnum
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import { createParticipantRecordForOthersInvolved, readParticipantRecordForOthersInvolved, updateParticipantRecordForOthersInvolved } from "../actions";

const ParticipantRecordForOthersInvolved: React.FC = () => {
    const router = useRouter()
    const { action } = useParams();

    const verb = action[0];
    const submissionId = action[1];

    const user = useAppStore(state => state.user);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    const [showPostpartumLocationDate, setShowPostpartumLocationDate] = useState<boolean>(false);
    const handlePostpartumAttendance = (value: string, fieldIndex: number) => {
        if (value === 'Yes') {
            setShowPostpartumLocationDate(true);
            return;
        }

        setShowPostpartumLocationDate(false);
        setValue(`participantRecordForOthersEntries.${fieldIndex}.postpartumVisitLocation`, null);
        setValue(`participantRecordForOthersEntries.${fieldIndex}.postpartumVisitDate`, null);
    };

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue
    } = useForm<IParticipantRecordForOthersInvolvedInputs>({
        resolver: zodResolver(ParticipantRecordForOthersInvolvedInputsSchema),
        defaultValues: {
            participantRecordForOthersEntries: [
                {

                }
            ]
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "participantRecordForOthersEntries"
    });

    const addNewParticipantRecordForOthersInvolvedEntry = () => {
        append({
            name: '',
            dateOfBirth: '',
            currentLivingArrangement: null,
            streetAddress: '',
            city: '',
            state: '',
            zipCode: '',
            county: '',
            primaryPhoneNumber: '',
            emergencyContact: '',
            emergencyContactPhone: '',
            emergencyContactRelationship: '',
            maritalStatus: null,
            insurancePlan: '',
            effectiveDate: '',
            subscriberId: '',
            groupId: '',
            gestationalAge: '',
            dueDate: '',
            deliveryDate: '',
            plannedModeDelivery: null,
            actualModeDelivery: null,
            attendedPostpartumVisit: '',
            postpartumVisitLocation: '',
            postpartumVisitDate: '',
            totalNumPregnancies: '',
            numLiveBirths: '',
            numChildrenWithMother: '',
            priorComplications: null,
            ongoingMedicalProblems: ''
        })
    }

    const submit = async (data: IParticipantRecordForOthersInvolvedInputs) => {
        console.log(data)
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6 flex flex-col space-y-2">
                    <p className="font-semibold text-xl">{verb === 'new' ? 'New' : 'Edit'} Participant Record for Others Involved</p>
                    <small className="text-gray-500">For other people who may participate in the program, complete at initial intake and update as indicated.</small>
                    <small className="text-gray-500">Include anyone the client/participant states is directly or importantly involved in the care of the family (to include, as indicated, father of the child, parents of the mother, grandparents, adult siblings, etc.)</small>
                </div>

                <div className="pt-6">
                    <small className="text-gray-500">
                        Note: You do not have to complete all sections. If a question does not apply to you or you do not want to answer, feel free to write “N/A” for non-applicable.</small>
                </div>

                <div className="space-y-16 pt-12">
                    {fields.map((field, index) => {
                        return (
                            <div className="space-y-12">
                                <div className="flex justify-between">
                                    <p className="text-lg font-bold pt-8">
                                        Parent/Child Caregiver/Involved Relative Demographics {index + 1}
                                    </p>

                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="font-semibold text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                                        >
                                            - Remove Entry
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <p className="font-semibold">Name</p>
                                        <input
                                            {...register(`participantRecordForOthersEntries.${index}.name`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        />
                                        {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.name && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.participantRecordForOthersEntries[index]?.name?.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <p className="font-semibold">Date of Birth</p>
                                        <input
                                            {...register(`participantRecordForOthersEntries.${index}.dateOfBirth`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="date"
                                        />
                                        {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.dateOfBirth && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.participantRecordForOthersEntries[index]?.dateOfBirth?.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <p className="text-lg font-bold">Current Living Arrangement</p>
                                        <div className="flex flex-col space-y-2">
                                            {livingArrangementsEnum.options.map((status) => (
                                                <label key={status} className="inline-flex items-center">
                                                    <input
                                                        {...register(`participantRecordForOthersEntries.${index}.currentLivingArrangement`)}
                                                        type="radio"
                                                        value={status}
                                                        className="form-radio"
                                                    />
                                                    <span className="ml-2">{labelMapping[status]}</span>
                                                </label>
                                            ))}
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.currentLivingArrangement && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.currentLivingArrangement?.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-nowrap space-x-4" >
                                        <div className="flex flex-col flex-grow lg:w-full md:w-full sm:w-auto space-y-3">
                                            <p className="font-semibold  whitespace-nowrap">Street Address</p>
                                            <input
                                                {...register(`participantRecordForOthersEntries.${index}.streetAddress`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.streetAddress && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.streetAddress?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col flex-grow lg:w-3/4 md:w-3/4 sm:w-3/4 space-y-3">
                                            <p className="font-semibold">City</p>
                                            <input
                                                {...register(`participantRecordForOthersEntries.${index}.city`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.city && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.city?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col flex-grow lg:w-1/3 md:w-full sm:w-3/4 space-y-3">
                                            <p className="font-semibold">State</p>
                                            <select
                                                {...register(`participantRecordForOthersEntries.${index}.state`)}
                                                className="dropdown border border-gray-300 px-4 py-2 rounded-md w-full"
                                                defaultValue={'--'}
                                            >
                                                <option selected disabled>
                                                    --
                                                </option>
                                                {states.map((state) => (
                                                    <option key={state}>{state}</option>
                                                ))}
                                            </select>
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.state && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.state?.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-nowrap space-x-4">
                                        <div className="flex flex-col flex-grow space-y-3">
                                            <p className="font-semibold">Zip Code</p>
                                            <input
                                                {...register(`participantRecordForOthersEntries.${index}.zipCode`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.zipCode && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.zipCode?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col flex-grow space-y-3">
                                            <p className="font-semibold">County</p>
                                            <input
                                                {...register(`participantRecordForOthersEntries.${index}.county`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.county && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.county?.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <p className="text-lg font-bold">Primary Phone Number</p>
                                        <input
                                            {...register(`participantRecordForOthersEntries.${index}.primaryPhoneNumber`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        />
                                        {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.primaryPhoneNumber && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.participantRecordForOthersEntries[index]?.primaryPhoneNumber?.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-lg font-bold">Emergency Contact</p>
                                    <div className="space-y-4">
                                        <div className="flex flex-nowrap space-x-4">
                                            <div className="flex flex-col flex-grow space-y-3">
                                                <p className="font-semibold">Name</p>
                                                <input
                                                    {...register(`participantRecordForOthersEntries.${index}.emergencyContact`)}
                                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                />
                                                {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.emergencyContact && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersEntries[index]?.emergencyContact?.message}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-col flex-grow space-y-3">
                                                <p className="font-semibold">Phone Number</p>
                                                <input
                                                    {...register(`participantRecordForOthersEntries.${index}.emergencyContactPhone`)}
                                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                />
                                                {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.emergencyContactPhone && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersEntries[index]?.emergencyContactPhone?.message}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">Emergency Contact Relationship</p>
                                            <input
                                                {...register(`participantRecordForOthersEntries.${index}.emergencyContactRelationship`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.emergencyContactRelationship && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.emergencyContactRelationship?.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-lg font-bold">Insurance Status</p>

                                    <div className="space-y-4">
                                        <div className="space-y-3">
                                            <p className="font-semibold">Marital Status</p>
                                            <div className="flex flex-col gap-2">
                                                {maritalStatusEnum.options.map((status) => (
                                                    <label key={status} className="inline-flex items-center">
                                                        <input
                                                            {...register(`participantRecordForOthersEntries.${index}.maritalStatus`)}
                                                            type="radio"
                                                            value={status}
                                                            className="form-radio"
                                                        />
                                                        <span className="ml-2">{status}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.maritalStatus && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.maritalStatus?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">Insurance Plan</p>
                                            <input
                                                {...register(`participantRecordForOthersEntries.${index}.insurancePlan`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.insurancePlan && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.insurancePlan?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-nowrap space-x-4">
                                            <div className="flex flex-col flex-grow space-y-3">
                                                <p className="font-semibold">Effective Date</p>
                                                <input
                                                    {...register(`participantRecordForOthersEntries.${index}.effectiveDate`)}
                                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                    type="date"
                                                />
                                                {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.effectiveDate && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersEntries[index]?.effectiveDate?.message}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-col flex-grow space-y-3">
                                                <p className="font-semibold">Subscriber ID</p>
                                                <input
                                                    {...register(`participantRecordForOthersEntries.${index}.subscriberId`)}
                                                    className="border border-gray-300 px-4 py-2.5 rounded-md w-full"
                                                />
                                                {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.subscriberId && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersEntries[index]?.subscriberId?.message}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-col flex-grow space-y-3">
                                                <p className="font-semibold">Group ID</p>
                                                <input
                                                    {...register(`participantRecordForOthersEntries.${index}.groupId`)}
                                                    className="border border-gray-300 px-4 py-2.5 rounded-md w-full"
                                                />
                                                {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.groupId && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersEntries[index]?.groupId?.message}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-lg font-bold"> Prenatal Care (for current or most recent pregnancy) </p>

                                    <div className="space-y-4">
                                        <div className="space-y-3">
                                            <p className="font-semibold">Gestational Age at Entry of Care</p>
                                            <input
                                                {...register(`participantRecordForOthersEntries.${index}.gestationalAge`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.gestationalAge && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.gestationalAge?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">Due Date</p>
                                            <input
                                                {...register(`participantRecordForOthersEntries.${index}.dueDate`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                type="date"
                                            />
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.dueDate && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.dueDate?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">Delivery Date</p>
                                            <input
                                                {...register(`participantRecordForOthersEntries.${index}.deliveryDate`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                type="date"
                                            />
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.deliveryDate && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.deliveryDate?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">Planned Mode of Delivery</p>
                                            <div className="flex flex-col space-y-3">
                                                <div className="flex items-center gap-x-12">
                                                    {deliveryModeEnum.options.map((status) => (
                                                        <label key={status} className="inline-flex items-center">
                                                            <input
                                                                {...register(`participantRecordForOthersEntries.${index}.plannedModeDelivery`)}
                                                                type="radio"
                                                                value={status}
                                                                className="form-radio"
                                                            />
                                                            <span className="ml-2">{status}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.plannedModeDelivery && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersEntries[index]?.plannedModeDelivery?.message}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">Actual Mode of Delivery</p>
                                            <div className="flex flex-col space-y-3">
                                                <div className="flex items-center gap-x-12">
                                                    {deliveryModeEnum.options.map((status) => (
                                                        <label key={status} className="inline-flex items-center">
                                                            <input
                                                                {...register(`participantRecordForOthersEntries.${index}.actualModeDelivery`)}
                                                                type="radio"
                                                                value={status}
                                                                className="form-radio"
                                                            />
                                                            <span className="ml-2">{status}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.actualModeDelivery && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersEntries[index]?.actualModeDelivery?.message}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">Attended Postpartum Visit</p>
                                            <div className="flex flex-col space-y-3">
                                                <div className="flex items-center gap-x-12">
                                                    {['Yes', 'No'].map((status, idx) => (
                                                        <label key={idx} className="inline-flex items-center">
                                                            <input
                                                                {...register(`participantRecordForOthersEntries.${index}.attendedPostpartumVisit`)}
                                                                type="radio"
                                                                value={status}
                                                                className="form-radio"
                                                                onChange={(e) => handlePostpartumAttendance(e.target.value, index)}
                                                            />
                                                            <span className="ml-2">{status}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.attendedPostpartumVisit && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersEntries[index]?.attendedPostpartumVisit?.message}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {showPostpartumLocationDate && (
                                            <>
                                                <div className="space-y-3">
                                                    <p className="font-semibold">Postpartum Visit Location</p>
                                                    <input
                                                        {...register(`participantRecordForOthersEntries.${index}.postpartumVisitLocation`)}
                                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                    />
                                                    {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.postpartumVisitLocation && (
                                                        <span className="label-text-alt text-red-500">
                                                            {errors.participantRecordForOthersEntries[index]?.postpartumVisitLocation?.message}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="space-y-3">
                                                    <p className="font-medium">Date Completed</p>
                                                    <input
                                                        {...register(`participantRecordForOthersEntries.${index}.postpartumVisitDate`)}
                                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                        type="date"
                                                    />
                                                    {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.postpartumVisitDate && (
                                                        <span className="label-text-alt text-red-500">
                                                            {errors.participantRecordForOthersEntries[index]?.postpartumVisitDate?.message}
                                                        </span>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-lg font-bold">Obstetric History</p>

                                    <div className="space-y-4">
                                        <div className="space-y-3">
                                            <p className="font-semibold">Total Number of Pregnancies</p>
                                            <input type="text" {...register(`participantRecordForOthersEntries.${index}.totalNumPregnancies`)}
                                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.totalNumPregnancies && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.totalNumPregnancies?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">Number of Live Births</p>
                                            <input type="text" {...register(`participantRecordForOthersEntries.${index}.numLiveBirths`)}
                                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.numLiveBirths && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.numLiveBirths?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">Number of Children Living with Mother</p>
                                            <input type="text" {...register(`participantRecordForOthersEntries.${index}.numChildrenWithMother`)}
                                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.numChildrenWithMother && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.numChildrenWithMother?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">
                                                Please Explain Complications During Prior Pregnancies
                                            </p>
                                            <textarea
                                                {...register(`participantRecordForOthersEntries.${index}.priorComplications`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.priorComplications && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersEntries[index]?.priorComplications?.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-lg font-bold"> Medical Problems Requiring Ongoing Care </p>
                                    <div className="space-y-3">
                                        <p className="font-semibold">Diagnoses/Conditions</p>
                                        <textarea
                                            {...register(`participantRecordForOthersEntries.${index}.ongoingMedicalProblems`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        />
                                        {errors.participantRecordForOthersEntries && errors.participantRecordForOthersEntries[index]?.ongoingMedicalProblems && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.participantRecordForOthersEntries[index]?.ongoingMedicalProblems?.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="flex justify-center py-4">
                    <button
                        type="button"
                        onClick={addNewParticipantRecordForOthersInvolvedEntry}
                        className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                    >
                        + Add Communication Entry
                    </button>
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

export default ParticipantRecordForOthersInvolved;