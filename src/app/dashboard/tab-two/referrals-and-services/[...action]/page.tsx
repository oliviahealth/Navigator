"use client"

import React, { useEffect } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";

import {
    ReferralsAndServicesInputsSchema,
    IReferralsAndServicesInputs,
    ReferralsAndServicesResponseSchema,
    displayNames
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import { createReferralsAndServices, readReferralsAndServices, updateReferralsAndServices } from "../actions";

const ReferralsAndServices: React.FC = () => {
    const router = useRouter();
    const { action } = useParams();

    const verb = action[0]
    const submissionId = action[1]

    const user = useAppStore(state => state.user);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<IReferralsAndServicesInputs>({
        resolver: zodResolver(ReferralsAndServicesInputsSchema),
    });

    const {
        fields: supportServicesOtherFields,
        append: appendSupportServicesOther,
        remove: removeSupportServicesOther,
    } = useFieldArray({
        control,
        name: 'supportServicesOther',
    });

    const {
        fields: foodNutritionOtherFields,
        append: appendFoodNutritionOther,
        remove: removeFoodNutritionOther,
    } = useFieldArray({
        control,
        name: 'foodNutritionOther',
    });

    const {
        fields: healthcareOtherFields,
        append: appendHealthcareOther,
        remove: removeHealthcareOther,
    } = useFieldArray({
        control,
        name: 'healthcareOther',
    });

    const {
        fields: substanceUseTreatmentOtherFields,
        append: appendSubstanceUseTreatmentOther,
        remove: removeSubstanceUseTreatmentOther,
    } = useFieldArray({
        control,
        name: 'substanceUseTreatmentOther',
    });

    const {
        fields: childRelatedOtherFields,
        append: appendChildRelatedOther,
        remove: removeChildRelatedOther,
    } = useFieldArray({
        control,
        name: 'childRelatedOther',
    });

    const {
        fields: legalAssistanceOtherFields,
        append: appendLegalAssistanceOther,
        remove: removeLegalAssistanceOther,
    } = useFieldArray({
        control,
        name: 'legalAssistanceOther',
    });

    const addNewSupportService = () =>
        appendSupportServicesOther({
            serviceStatus: '',
            organization: '',
            organizationContactInformation: '',
            name: '',
        });

    const addNewFoodService = () =>
        appendFoodNutritionOther({
            serviceStatus: '',
            organization: '',
            organizationContactInformation: '',
            name: '',
        });

    const addNewHealthcareService = () =>
        appendHealthcareOther({
            serviceStatus: '',
            organization: '',
            organizationContactInformation: '',
            name: '',
        });

    const addNewSubstanceUseTreatmentService = () =>
        appendSubstanceUseTreatmentOther({
            serviceStatus: '',
            organization: '',
            organizationContactInformation: '',
            name: '',
        });

    const addNewChildRelatedService = () =>
        appendChildRelatedOther({
            serviceStatus: '',
            organization: '',
            organizationContactInformation: '',
            name: '',
        });

    const addNewLegalAssistanceService = () =>
        appendLegalAssistanceOther({
            serviceStatus: '',
            organization: '',
            organizationContactInformation: '',
            name: '',
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

                if (!user) {
                    throw new Error('Missing user');
                }

                const response = await readReferralsAndServices(submissionId, user.id);

                const validResponse = ReferralsAndServicesResponseSchema.parse(response);

                reset(validResponse);

            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');

                router.push('/');

                return;
            }
        }

        fetchAndPopulatePastSubmissionData()
    }, [])

    const submit = async (data: IReferralsAndServicesInputs) => {

        try {
            let response;

            if (!user) {
                throw new Error("User missing");
            }

            if (verb === 'new') {
                response = await createReferralsAndServices(data, user.id);
            } else {
                response = await updateReferralsAndServices(data, submissionId, user.id)
            }

            ReferralsAndServicesResponseSchema.parse(response);
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            return;
        }

        setSuccessMessage('Referrals & Services submitted successfully!')
        router.push('/dashboard');
    };

    const generateFormFields = (
        keys: string[],
        errors: FieldErrors<IReferralsAndServicesInputs>
    ) => {
        return keys.map((key, index) => (
            <div key={index}>
                <p className="font-bold text-lg pt-6">{displayNames[key]}</p>
                <p className="font-semibold pt-2">Status</p>
                <div className="flex flex-col space y-2">
                    {[
                        'Discussed',
                        'Needed',
                        'Referred',
                        'Participating',
                        'Completed',
                    ].map((status) => (
                        <label key={status} className="inline-flex items-center pt-2">
                            <input
                                {...register(
                                    `${key}.serviceStatus` as keyof IReferralsAndServicesInputs
                                )}
                                type="radio"
                                value={status}
                                className="form-radio"
                            />
                            <span className="ml-2">{status}</span>
                        </label>
                    ))}
                </div>
                {/* @ts-expect-error: Overriding ts checks */}
                {errors[key]?.serviceStatus && (
                    <span className="label-text-alt text-red-500">
                        {/* @ts-expect-error: Overriding ts checks */}
                        {errors[key]?.serviceStatus.message}
                    </span>
                )}

                <p className="font-semibold pt-6">Organization</p>
                <input
                    {...register(
                        `${key}.organization` as keyof IReferralsAndServicesInputs
                    )}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {/* @ts-expect-error: Overriding ts checks */}
                {errors[key]?.organization && (
                    <span className="label-text-alt text-red-500">
                        {/* @ts-expect-error: Overriding ts checks */}
                        {errors[key]?.organization.message}
                    </span>
                )}
                <p className="font-semibold pt-6">Organization Contact Information</p>
                <input
                    {...register(
                        `${key}.organizationContactInformation` as keyof IReferralsAndServicesInputs
                    )}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {/* @ts-expect-error: Overriding ts checks */}
                {errors[key]?.organizationContactInformation && (
                    <span className="label-text-alt text-red-500">
                        {/* @ts-expect-error: Overriding ts checks */}
                        {errors[key]?.organizationContactInformation.message}
                    </span>
                )}
            </div>
        ));
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Referrals & Services </p>
                    <div>
                        <small> Check box(es) for all applicable services currently engaged and new referrals needed for the family.</small>
                    </div>
                    <div>
                        <small>Complete with Participant. </small>
                    </div>
                    <small>Follow up as indicated with Provider, Social Worker, Case Manager, Recovery Coach, etc.</small>
                </div>

                <p className="font-bold text-xl pt-6">SUPPORT SERVICES</p>
                {generateFormFields(Object.keys(displayNames).slice(0, 8), errors)}


                <p className="font-bold text-xl pt-6">Additional Support Services</p>
                {supportServicesOtherFields.map((field, index) => (
                    <div key={field.id}>
                        <p className="font-bold text-lg pt-6">Additional Support Service #{index + 1}</p>
                        <div className="flex justify-between items-center pb-4">
                            <p className="font-semibold pb-2 pt-8">Name</p>
                            <button
                                type="button"
                                onClick={() => removeSupportServicesOther(index)}
                                className="text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                            >
                                - Remove Service
                            </button>
                        </div>
                        <input
                            {...register(`supportServicesOther.${index}.name`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.supportServicesOther &&
                            errors.supportServicesOther[index]?.name && (
                                <span className="label-text-alt text-red-500">
                                    {errors.supportServicesOther[index]?.name?.message}
                                </span>
                            )}

                        <p className="font-semibold pt-6">Status</p>
                        <div className="flex flex-col space y-2">
                            {[
                                'Discussed',
                                'Needed',
                                'Referred',
                                'Participating',
                                'Completed',
                            ].map((status) => (
                                <label key={status} className="inline-flex items-center pt-2">
                                    <input
                                        {...register(
                                            `supportServicesOther.${index}.serviceStatus`
                                        )}
                                        type="radio"
                                        value={status}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{status}</span>
                                </label>
                            ))}
                        </div>
                        {errors.supportServicesOther &&
                            errors.supportServicesOther[index]?.serviceStatus && (
                                <span className="label-text-alt text-red-500">
                                    {
                                        errors.supportServicesOther[index]?.serviceStatus
                                            ?.message
                                    }
                                </span>
                            )}

                        <p className="font-semibold py-6">Organization</p>
                        <input
                            {...register(`supportServicesOther.${index}.organization`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.supportServicesOther &&
                            errors.supportServicesOther[index]?.organization && (
                                <span className="label-text-alt text-red-500">
                                    {errors.supportServicesOther[index]?.organization?.message}
                                </span>
                            )}

                        <p className="font-semibold py-6">
                            Organization Contact Information
                        </p>
                        <input
                            {...register(
                                `supportServicesOther.${index}.organizationContactInformation`
                            )}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.supportServicesOther &&
                            errors.supportServicesOther[index]
                                ?.organizationContactInformation && (
                                <span className="label-text-alt text-red-500">
                                    {
                                        errors.supportServicesOther[index]
                                            ?.organizationContactInformation?.message
                                    }
                                </span>
                            )}
                    </div>
                ))}

                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={addNewSupportService}
                        className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                    >
                        + Add Service
                    </button>
                </div>

                <p className="font-bold text-xl pt-6">FOOD & NUTRITION</p>
                {generateFormFields(Object.keys(displayNames).slice(8, 13), errors)}

                <p className="font-bold text-xl pt-6">Additional Food & Nutrition Services</p>
                {foodNutritionOtherFields.map((field, index) => (
                    <div key={field.id}>
                        <p className="font-bold text-lg pt-6">Additional Food & Nutrition Service #{index + 1}</p>
                        <div className="flex justify-between items-center">
                            <p className="font-semibold pb-2 pt-8">Name</p>
                            <button
                                type="button"
                                onClick={() => removeFoodNutritionOther(index)}
                                className="text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                            >
                                - Remove Service
                            </button>
                        </div>
                        <input
                            {...register(`foodNutritionOther.${index}.name`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.foodNutritionOther &&
                            errors.foodNutritionOther[index]?.name && (
                                <span className="label-text-alt text-red-500">
                                    {errors.foodNutritionOther[index]?.name?.message}
                                </span>
                            )}

                        <p className="font-semibold pt-6">Status</p>
                        <div className="flex flex-col space y-2">
                            {[
                                'Discussed',
                                'Needed',
                                'Referred',
                                'Participating',
                                'Completed',
                            ].map((status) => (
                                <label key={status} className="inline-flex items-center pt-2">
                                    <input
                                        {...register(
                                            `foodNutritionOther.${index}.serviceStatus`
                                        )}
                                        type="radio"
                                        value={status}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{status}</span>
                                </label>
                            ))}
                        </div>
                        {errors.foodNutritionOther &&
                            errors.foodNutritionOther[index]?.serviceStatus && (
                                <span className="label-text-alt text-red-500">
                                    {errors.foodNutritionOther[index]?.serviceStatus?.message}
                                </span>
                            )}

                        <p className="font-semibold pt-6">Organization</p>
                        <input
                            {...register(`foodNutritionOther.${index}.organization`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.foodNutritionOther &&
                            errors.foodNutritionOther[index]?.organization && (
                                <span className="label-text-alt text-red-500">
                                    {errors.foodNutritionOther[index]?.organization?.message}
                                </span>
                            )}

                        <p className="font-semibold pt-6">
                            Organization Contact Information
                        </p>
                        <input
                            {...register(
                                `foodNutritionOther.${index}.organizationContactInformation`
                            )}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.foodNutritionOther &&
                            errors.foodNutritionOther[index]
                                ?.organizationContactInformation && (
                                <span className="label-text-alt text-red-500">
                                    {
                                        errors.foodNutritionOther[index]
                                            ?.organizationContactInformation?.message
                                    }
                                </span>
                            )}
                    </div>
                ))}

                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={addNewFoodService}
                        className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                    >
                        + Add Service
                    </button>
                </div>

                <p className="font-bold text-xl pt-6">HEALTHCARE</p>
                {generateFormFields(Object.keys(displayNames).slice(13, 18), errors)}

                <p className="font-bold text-xl pt-6">
                    Additional Healthcare Services
                </p>
                {healthcareOtherFields.map((field, index) => (
                    <div key={field.id}>
                        <p className="font-bold text-lg pt-6">
                            Additional Healthcare Service #{index + 1}
                        </p>
                        <div className="flex justify-between items-center py-6">
                            <p className="font-semibold pb-2 pt-8">Name</p>
                            <button
                                type="button"
                                onClick={() => removeHealthcareOther(index)}
                                className="text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                            >
                                - Remove Service
                            </button>
                        </div>
                        <input
                            {...register(`healthcareOther.${index}.name`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.healthcareOther &&
                            errors.healthcareOther[index]?.name && (
                                <span className="label-text-alt text-red-500">
                                    {errors.healthcareOther[index]?.name?.message}
                                </span>
                            )}

                        <p className="font-semibold pt-6">Status</p>
                        <div className="flex flex-col space y-2">
                            {[
                                'Discussed',
                                'Needed',
                                'Referred',
                                'Participating',
                                'Completed',
                            ].map((status) => (
                                <label key={status} className="inline-flex items-center pt-2">
                                    <input
                                        {...register(`healthcareOther.${index}.serviceStatus`)}
                                        type="radio"
                                        value={status}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{status}</span>
                                </label>
                            ))}
                        </div>
                        {errors.healthcareOther &&
                            errors.healthcareOther[index]?.serviceStatus && (
                                <span className="label-text-alt text-red-500">
                                    {errors.healthcareOther[index]?.serviceStatus?.message}
                                </span>
                            )}

                        <p className="font-semibold pt-6">Organization {index + 1}</p>
                        <input
                            {...register(`healthcareOther.${index}.organization`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.healthcareOther &&
                            errors.healthcareOther[index]?.organization && (
                                <span className="label-text-alt text-red-500">
                                    {errors.healthcareOther[index]?.organization?.message}
                                </span>
                            )}

                        <p className="font-semibold pt-6">
                            Organization Contact Information
                        </p>
                        <input
                            {...register(
                                `healthcareOther.${index}.organizationContactInformation`
                            )}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.healthcareOther &&
                            errors.healthcareOther[index]
                                ?.organizationContactInformation && (
                                <span className="label-text-alt text-red-500">
                                    {
                                        errors.healthcareOther[index]
                                            ?.organizationContactInformation?.message
                                    }
                                </span>
                            )}
                    </div>
                ))}

                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={addNewHealthcareService}
                        className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                    >
                        + Add Service
                    </button>
                </div>

                <p className="font-semibold text-xl pt-6">
                    SUBSTANCE USE SERVICES
                </p>
                {generateFormFields(Object.keys(displayNames).slice(18, 24), errors)}

                <p className="font-bold text-xl pt-6">
                    Additional Substance Use Treatment Services
                </p>
                {substanceUseTreatmentOtherFields.map((field, index) => (
                    <div key={field.id}>
                        <p className="font-bold text-lg pt-6">
                            Additional Substance Use Treatment Service #{index + 1}
                        </p>
                        <div className="flex justify-between items-center py-6">
                            <p className="font-semibold pb-2 pt-8">Name</p>
                            <button
                                type="button"
                                onClick={() => removeSubstanceUseTreatmentOther(index)}
                                className="text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                            >
                                - Remove Service
                            </button>
                        </div>
                        <input
                            {...register(`substanceUseTreatmentOther.${index}.name`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.substanceUseTreatmentOther &&
                            errors.substanceUseTreatmentOther[index]?.name && (
                                <span className="label-text-alt text-red-500">
                                    {errors.substanceUseTreatmentOther[index]?.name?.message}
                                </span>
                            )}

                        <p className="font-semibold pt-6">Status</p>
                        <div className="flex flex-col space y-2">
                            {[
                                'Discussed',
                                'Needed',
                                'Referred',
                                'Participating',
                                'Completed',
                            ].map((status) => (
                                <label key={status} className="inline-flex items-center pt-2">
                                    <input
                                        {...register(
                                            `substanceUseTreatmentOther.${index}.serviceStatus`
                                        )}
                                        type="radio"
                                        value={status}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{status}</span>
                                </label>
                            ))}
                        </div>
                        {errors.substanceUseTreatmentOther &&
                            errors.substanceUseTreatmentOther[index]?.serviceStatus && (
                                <span className="label-text-alt text-red-500">
                                    {
                                        errors.substanceUseTreatmentOther[index]?.serviceStatus
                                            ?.message
                                    }
                                </span>
                            )}

                        <p className="font-semibold pt-6">Organization {index + 1}</p>
                        <input
                            {...register(
                                `substanceUseTreatmentOther.${index}.organization`
                            )}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.substanceUseTreatmentOther &&
                            errors.substanceUseTreatmentOther[index]?.organization && (
                                <span className="label-text-alt text-red-500">
                                    {
                                        errors.substanceUseTreatmentOther[index]?.organization
                                            ?.message
                                    }
                                </span>
                            )}

                        <p className="font-semibold pt-6">
                            Organization Contact Information
                        </p>
                        <input
                            {...register(
                                `substanceUseTreatmentOther.${index}.organizationContactInformation`
                            )}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.substanceUseTreatmentOther &&
                            errors.substanceUseTreatmentOther[index]
                                ?.organizationContactInformation && (
                                <span className="label-text-alt text-red-500">
                                    {
                                        errors.substanceUseTreatmentOther[index]
                                            ?.organizationContactInformation?.message
                                    }
                                </span>
                            )}
                    </div>
                ))}

                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={addNewSubstanceUseTreatmentService}
                        className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                    >
                        + Add Service
                    </button>
                </div>

                <p className="font-bold text-xl pt-6">CHILD RELATED</p>
                {generateFormFields(Object.keys(displayNames).slice(24, 29), errors)}

                <p className="font-bold text-xl pt-6">
                    Additional Child Related Services
                </p>
                {childRelatedOtherFields.map((field, index) => (
                    <div key={field.id}>
                        <p className="font-bold text-lg pt-6">
                            Additional Child Related Service #{index + 1}
                        </p>
                        <div className="flex justify-between items-center py-6">
                            <p className="font-semibold pb-2 pt-8">Name</p>
                            <button
                                type="button"
                                onClick={() => removeChildRelatedOther(index)}
                                className="text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                            >
                                - Remove Service
                            </button>
                        </div>
                        <input
                            {...register(`childRelatedOther.${index}.name`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.childRelatedOther &&
                            errors.childRelatedOther[index]?.name && (
                                <span className="label-text-alt text-red-500">
                                    {errors.childRelatedOther[index]?.name?.message}
                                </span>
                            )}
                        <p className="font-semibold pt-6">Status</p>
                        <div className="flex flex-col space y-2">
                            {[
                                'Discussed',
                                'Needed',
                                'Referred',
                                'Participating',
                                'Completed',
                            ].map((status) => (
                                <label key={status} className="inline-flex items-center pt-2">
                                    <input
                                        {...register(`childRelatedOther.${index}.serviceStatus`)}
                                        type="radio"
                                        value={status}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{status}</span>
                                </label>
                            ))}
                        </div>{' '}
                        {errors.childRelatedOther &&
                            errors.childRelatedOther[index]?.serviceStatus && (
                                <span className="label-text-alt text-red-500">
                                    {errors.childRelatedOther[index]?.serviceStatus?.message}
                                </span>
                            )}
                        <p className="font-semibold pt-6">Organization {index + 1}</p>
                        <input
                            {...register(`childRelatedOther.${index}.organization`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.childRelatedOther &&
                            errors.childRelatedOther[index]?.organization && (
                                <span className="label-text-alt text-red-500">
                                    {errors.childRelatedOther[index]?.organization?.message}
                                </span>
                            )}
                        <p className="font-semibold pt-6">
                            Organization Contact Information
                        </p>
                        <input
                            {...register(
                                `childRelatedOther.${index}.organizationContactInformation`
                            )}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.childRelatedOther &&
                            errors.childRelatedOther[index]
                                ?.organizationContactInformation && (
                                <span className="label-text-alt text-red-500">
                                    {
                                        errors.childRelatedOther[index]
                                            ?.organizationContactInformation?.message
                                    }
                                </span>
                            )}
                    </div>
                ))}

                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={addNewChildRelatedService}
                        className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                    >
                        + Add Service
                    </button>
                </div>

                <p className="font-bold text-xl pt-6">LEGAL ASSISTANCE</p>
                {generateFormFields(Object.keys(displayNames).slice(29, 32), errors)}

                <p className="font-bold text-xl pt-6">
                    Additional Legal Assistance Services
                </p>
                {legalAssistanceOtherFields.map((field, index) => (
                    <div key={field.id}>
                        <p className="font-bold text-lg pt-6">
                            Additional Legal Assistance Service #{index + 1}
                        </p>
                        <div className="flex justify-between items-center py-6">
                            <p className="font-semibold pb-2 pt-8">Name</p>
                            <button
                                type="button"
                                onClick={() => removeLegalAssistanceOther(index)}
                                className="text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                            >
                                - Remove Service
                            </button>
                        </div>
                        <input
                            {...register(`legalAssistanceOther.${index}.name`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.legalAssistanceOther &&
                            errors.legalAssistanceOther[index]?.name && (
                                <span className="label-text-alt text-red-500">
                                    {errors.legalAssistanceOther[index]?.name?.message}
                                </span>
                            )}

                        <p className="font-semibold pt-6">Status</p>
                        <div className="flex flex-col space y-2">
                            {[
                                'Discussed',
                                'Needed',
                                'Referred',
                                'Participating',
                                'Completed',
                            ].map((status) => (
                                <label key={status} className="inline-flex items-center pt-2">
                                    <input
                                        {...register(
                                            `legalAssistanceOther.${index}.serviceStatus`
                                        )}
                                        type="radio"
                                        value={status}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{status}</span>
                                </label>
                            ))}
                        </div>
                        {errors.legalAssistanceOther &&
                            errors.legalAssistanceOther[index]?.serviceStatus && (
                                <span className="label-text-alt text-red-500">
                                    {
                                        errors.legalAssistanceOther[index]?.serviceStatus
                                            ?.message
                                    }
                                </span>
                            )}

                        <p className="font-semibold pt-6">Organization</p>
                        <input
                            {...register(`legalAssistanceOther.${index}.organization`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.legalAssistanceOther &&
                            errors.legalAssistanceOther[index]?.organization && (
                                <span className="label-text-alt text-red-500">
                                    {errors.legalAssistanceOther[index]?.organization?.message}
                                </span>
                            )}

                        <p className="font-semibold pt-6">
                            Organization Contact Information
                        </p>
                        <input
                            {...register(
                                `legalAssistanceOther.${index}.organizationContactInformation`
                            )}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.legalAssistanceOther &&
                            errors.legalAssistanceOther[index]
                                ?.organizationContactInformation && (
                                <span className="label-text-alt text-red-500">
                                    {
                                        errors.legalAssistanceOther[index]
                                            ?.organizationContactInformation?.message
                                    }
                                </span>
                            )}
                    </div>
                ))}

                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={addNewLegalAssistanceService}
                        className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                    >
                        + Add Service
                    </button>
                </div>

                <p className="font-semibold text-xl pt-6">Additional Notes</p>
                <textarea
                    {...register('additionalNotes')}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />

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

export default ReferralsAndServices;