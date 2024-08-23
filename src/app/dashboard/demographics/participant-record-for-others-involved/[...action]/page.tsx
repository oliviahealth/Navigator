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
    ParticipantRecordForOthersInvolvedResponseSchema,
    deliveryModeEnum,
    IParticipantRecordForOthersInvolvedInputs,
    IParticipantRecordForOthersEntry
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

    const [showPostpartumLocationDate, setShowPostpartumLocationDate] = useState<boolean[]>([]);

    const handlePostpartumAttendance = (value: string, fieldIndex: number) => {
        setShowPostpartumLocationDate(prev => {
            const newState = [...prev];
            if (value === 'Yes') {
                newState[fieldIndex] = true;
            } else {
                newState[fieldIndex] = false;
                setValue(`participantRecordForOthersInvolvedEntries.${fieldIndex}.postpartumVisitLocation`, '');
                setValue(`participantRecordForOthersInvolvedEntries.${fieldIndex}.postpartumVisitDate`, '');
            }
            return newState;
        });
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
            participantRecordForOthersInvolvedEntries: [
                {
                    name: '',
                    dateOfBirth: undefined,
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
                    // postpartumVisitLocation: '',
                    // postpartumVisitDate: '',
                    totalNumPregnancies: '',
                    numLiveBirths: '',
                    numChildrenWithMother: '',
                    priorComplications: null,
                    ongoingMedicalProblems: ''
                }
            ]
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "participantRecordForOthersInvolvedEntries"
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
            ongoingMedicalProblems: '',
        })
    }

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

                const response = await readParticipantRecordForOthersInvolved(submissionId, user.id);
                const formattedEntries = response.participantRecordForOthersInvolvedEntries.map(entry => ({
                    ...entry,
                    dateOfBirth: new Date(entry.dateOfBirth).toISOString().split('T')[0],
                    effectiveDate: new Date(entry.effectiveDate).toISOString().split('T')[0],
                    dueDate: new Date(entry.dueDate).toISOString().split('T')[0],
                    deliveryDate: new Date(entry.deliveryDate).toISOString().split('T')[0],
                    postpartumVisitDate: entry.postpartumVisitDate ? new Date(entry.postpartumVisitDate).toISOString().split('T')[0] : null,
                }));
                reset({
                    participantRecordForOthersInvolvedEntries: formattedEntries,
                    label: response.label,
                    staffNotes: response.staffNotes
                });

                setShowPostpartumLocationDate(response.participantRecordForOthersInvolvedEntries.map(entry => entry.attendedPostpartumVisit === 'Yes'));
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

    const submit = async (data: IParticipantRecordForOthersInvolvedInputs) => {
        try {
            let response;

            if (!user) {
                throw new Error('User not found');
            }

            if (verb === 'new') {
                response = await createParticipantRecordForOthersInvolved(data, user.id);
            } else {
                response = await updateParticipantRecordForOthersInvolved(data, submissionId, user.id);
            }

            ParticipantRecordForOthersInvolvedResponseSchema.parse(response);
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            router.push('/dashboard')

            return;
        }

        setSuccessMessage('Participant Record For Others Involved submitted successfully!')
        router.push('/dashboard')
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

                <div className="space-y-16 pt-12">
                    {fields.map((field, index) => {
                        return (
                            <div key={field.id} className="space-y-12">
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold pb-2 pt-8">Name</p>

                                            {fields.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="font-semibold text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                                                >
                                                    - Remove Entry
                                                </button>
                                            )}
                                        </div>
                                        <input
                                            {...register(`participantRecordForOthersInvolvedEntries.${index}.name`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        />
                                        {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.name && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.participantRecordForOthersInvolvedEntries[index]?.name?.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <p className="font-semibold">Date of Birth</p>
                                        <input
                                            {...register(`participantRecordForOthersInvolvedEntries.${index}.dateOfBirth`, { valueAsDate: true })}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            type="date"
                                        />
                                        {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.dateOfBirth && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.participantRecordForOthersInvolvedEntries[index]?.dateOfBirth?.message}
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
                                                        {...register(`participantRecordForOthersInvolvedEntries.${index}.currentLivingArrangement`)}
                                                        type="radio"
                                                        value={status}
                                                        className="form-radio"
                                                    />
                                                    <span className="ml-2">{labelMapping[status]}</span>
                                                </label>
                                            ))}
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.currentLivingArrangement && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.currentLivingArrangement?.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-nowrap space-x-4" >
                                        <div className="flex flex-col flex-grow lg:w-full md:w-full sm:w-auto space-y-3">
                                            <p className="font-semibold  whitespace-nowrap">Street Address</p>
                                            <input
                                                {...register(`participantRecordForOthersInvolvedEntries.${index}.streetAddress`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.streetAddress && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.streetAddress?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col flex-grow lg:w-3/4 md:w-3/4 sm:w-3/4 space-y-3">
                                            <p className="font-semibold">City</p>
                                            <input
                                                {...register(`participantRecordForOthersInvolvedEntries.${index}.city`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.city && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.city?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col flex-grow lg:w-1/3 md:w-full sm:w-3/4 space-y-3">
                                            <p className="font-semibold">State</p>
                                            <select
                                                {...register(`participantRecordForOthersInvolvedEntries.${index}.state`)}
                                                className="dropdown border border-gray-300 px-4 py-2 rounded-md w-full"
                                                defaultValue={'--'}
                                            >
                                                <option value="--" disabled>--</option>
                                                {states.map((state) => (
                                                    <option key={state} value={state}>{state}</option>
                                                ))}
                                            </select>
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.state && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.state?.message}
                                                </span>
                                            )}
                                        </div>

                                    </div>

                                    <div className="flex flex-nowrap space-x-4">
                                        <div className="flex flex-col flex-grow space-y-3">
                                            <p className="font-semibold">Zip Code</p>
                                            <input
                                                {...register(`participantRecordForOthersInvolvedEntries.${index}.zipCode`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.zipCode && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.zipCode?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col flex-grow space-y-3">
                                            <p className="font-semibold">County</p>
                                            <input
                                                {...register(`participantRecordForOthersInvolvedEntries.${index}.county`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.county && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.county?.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <p className="text-lg font-bold">Primary Phone Number</p>
                                        <input
                                            {...register(`participantRecordForOthersInvolvedEntries.${index}.primaryPhoneNumber`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        />
                                        {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.primaryPhoneNumber && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.participantRecordForOthersInvolvedEntries[index]?.primaryPhoneNumber?.message}
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
                                                    {...register(`participantRecordForOthersInvolvedEntries.${index}.emergencyContact`)}
                                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                />
                                                {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.emergencyContact && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersInvolvedEntries[index]?.emergencyContact?.message}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-col flex-grow space-y-3">
                                                <p className="font-semibold">Phone Number</p>
                                                <input
                                                    {...register(`participantRecordForOthersInvolvedEntries.${index}.emergencyContactPhone`)}
                                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                />
                                                {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.emergencyContactPhone && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersInvolvedEntries[index]?.emergencyContactPhone?.message}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">Emergency Contact Relationship</p>
                                            <input
                                                {...register(`participantRecordForOthersInvolvedEntries.${index}.emergencyContactRelationship`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.emergencyContactRelationship && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.emergencyContactRelationship?.message}
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
                                                            {...register(`participantRecordForOthersInvolvedEntries.${index}.maritalStatus`)}
                                                            type="radio"
                                                            value={status}
                                                            className="form-radio"
                                                        />
                                                        <span className="ml-2">{status}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.maritalStatus && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.maritalStatus?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">Insurance Plan</p>
                                            <input
                                                {...register(`participantRecordForOthersInvolvedEntries.${index}.insurancePlan`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.insurancePlan && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.insurancePlan?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-nowrap space-x-4">
                                            <div className="flex flex-col flex-grow space-y-3">
                                                <p className="font-semibold">Effective Date</p>
                                                <input
                                                    {...register(`participantRecordForOthersInvolvedEntries.${index}.effectiveDate`, { valueAsDate: true })}
                                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                    type="date"
                                                />
                                                {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.effectiveDate && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersInvolvedEntries[index]?.effectiveDate?.message}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-col flex-grow space-y-3">
                                                <p className="font-semibold">Subscriber ID</p>
                                                <input
                                                    {...register(`participantRecordForOthersInvolvedEntries.${index}.subscriberId`)}
                                                    className="border border-gray-300 px-4 py-2.5 rounded-md w-full"
                                                />
                                                {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.subscriberId && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersInvolvedEntries[index]?.subscriberId?.message}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-col flex-grow space-y-3">
                                                <p className="font-semibold">Group ID</p>
                                                <input
                                                    {...register(`participantRecordForOthersInvolvedEntries.${index}.groupId`)}
                                                    className="border border-gray-300 px-4 py-2.5 rounded-md w-full"
                                                />
                                                {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.groupId && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersInvolvedEntries[index]?.groupId?.message}
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
                                                {...register(`participantRecordForOthersInvolvedEntries.${index}.gestationalAge`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.gestationalAge && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.gestationalAge?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">Due Date</p>
                                            <input
                                                {...register(`participantRecordForOthersInvolvedEntries.${index}.dueDate`, { valueAsDate: true })}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                type="date"
                                            />
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.dueDate && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.dueDate?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">Delivery Date</p>
                                            <input
                                                {...register(`participantRecordForOthersInvolvedEntries.${index}.deliveryDate`, { valueAsDate: true })}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                type="date"
                                            />
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.deliveryDate && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.deliveryDate?.message}
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
                                                                {...register(`participantRecordForOthersInvolvedEntries.${index}.plannedModeDelivery`)}
                                                                type="radio"
                                                                value={status}
                                                                className="form-radio"
                                                            />
                                                            <span className="ml-2">{status}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.plannedModeDelivery && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersInvolvedEntries[index]?.plannedModeDelivery?.message}
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
                                                                {...register(`participantRecordForOthersInvolvedEntries.${index}.actualModeDelivery`)}
                                                                type="radio"
                                                                value={status}
                                                                className="form-radio"
                                                            />
                                                            <span className="ml-2">{status}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.actualModeDelivery && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersInvolvedEntries[index]?.actualModeDelivery?.message}
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
                                                                {...register(`participantRecordForOthersInvolvedEntries.${index}.attendedPostpartumVisit`)}
                                                                type="radio"
                                                                value={status}
                                                                className="form-radio"
                                                                onChange={(e) => handlePostpartumAttendance(e.target.value, index)}
                                                            />
                                                            <span className="ml-2">{status}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.attendedPostpartumVisit && (
                                                    <span className="label-text-alt text-red-500">
                                                        {errors.participantRecordForOthersInvolvedEntries[index]?.attendedPostpartumVisit?.message}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {showPostpartumLocationDate[index] && (
                                            <>
                                                <div className="space-y-3">
                                                    <p className="font-semibold">Postpartum Visit Location</p>
                                                    <input
                                                        {...register(`participantRecordForOthersInvolvedEntries.${index}.postpartumVisitLocation`)}
                                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                    />
                                                    {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.postpartumVisitLocation && (
                                                        <span className="label-text-alt text-red-500">
                                                            {errors.participantRecordForOthersInvolvedEntries[index]?.postpartumVisitLocation?.message}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="space-y-3">
                                                    <p className="font-medium">Date Completed</p>
                                                    <input
                                                        {...register(`participantRecordForOthersInvolvedEntries.${index}.postpartumVisitDate`, { valueAsDate: true })}
                                                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                                        type="date"
                                                    />
                                                    {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.postpartumVisitDate && (
                                                        <span className="label-text-alt text-red-500">
                                                            {errors.participantRecordForOthersInvolvedEntries[index]?.postpartumVisitDate?.message}
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
                                            <input type="text" {...register(`participantRecordForOthersInvolvedEntries.${index}.totalNumPregnancies`)}
                                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.totalNumPregnancies && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.totalNumPregnancies?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">Number of Live Births</p>
                                            <input type="text" {...register(`participantRecordForOthersInvolvedEntries.${index}.numLiveBirths`)}
                                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.numLiveBirths && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.numLiveBirths?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">Number of Children Living with Mother</p>
                                            <input type="text" {...register(`participantRecordForOthersInvolvedEntries.${index}.numChildrenWithMother`)}
                                                className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.numChildrenWithMother && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.numChildrenWithMother?.message}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <p className="font-semibold">
                                                Please Explain Complications During Prior Pregnancies
                                            </p>
                                            <textarea
                                                {...register(`participantRecordForOthersInvolvedEntries.${index}.priorComplications`)}
                                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                            />
                                            {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.priorComplications && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.participantRecordForOthersInvolvedEntries[index]?.priorComplications?.message}
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
                                            {...register(`participantRecordForOthersInvolvedEntries.${index}.ongoingMedicalProblems`)}
                                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                        />
                                        {errors.participantRecordForOthersInvolvedEntries && errors.participantRecordForOthersInvolvedEntries[index]?.ongoingMedicalProblems && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.participantRecordForOthersInvolvedEntries[index]?.ongoingMedicalProblems?.message}
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

                <div className="pt-6">
                    <hr className="border-t-1 border-gray-400 my-4" />
                    <div>
                        <p className="font-semibold pb-2 pt-8">Submission Label</p>
                        <textarea
                            {...register("label")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.label && (
                            <span className="label-text-alt text-red-500">
                                {errors.label.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold pb-2 pt-8">Staff Notes</p>
                        <textarea
                            {...register("staffNotes")}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.staffNotes && (
                            <span className="label-text-alt text-red-500">
                                {errors.staffNotes.message}
                            </span>
                        )}
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

export default ParticipantRecordForOthersInvolved;