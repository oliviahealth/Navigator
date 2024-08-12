'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';

import { DeliveryHistoryInformationFormInputsSchema, IDeliveryHistoryInformationFormInputs, YesNoEnum } from '../definitions';
import useAppStore from '@/lib/useAppStore';
import {
    createDeliveryHistoryInformationForm,
    readDeliveryHistoryInformationForm,
    updateDeliveryHistoryInformationForm,
} from '../actions';

const DeliveryHistoryInformationForm: React.FC = () => {
    const router = useRouter();
    const { action } = useParams();

    const verb = action[0];
    const submissionId = action[1];

    const user = useAppStore((state) => state.user);

    const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);
    const setErrorMessage = useAppStore((state) => state.setErrorMessage);

    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<IDeliveryHistoryInformationFormInputs>({
        resolver: zodResolver(DeliveryHistoryInformationFormInputsSchema),
        defaultValues: {
            deliveries: [{
                estimatedDeliveryDate: '',
                actualDeliveryDate: '',
                deliveryResultInBirth: undefined,
                enrolledAsTargetChild: null
            }],
        },
    });

    const [showEnrolledAsTargetChild, setShowEnrolledAsTargetChild] = useState<boolean[]>([]);
    const handleShowEnrolledAsTargetChild = (index: number, value: string) => {
        setShowEnrolledAsTargetChild(prevState => {
            const newState = [...prevState];
            newState[index] = value === "Yes";
            return newState;
        });

        if (value === "No") {
            setValue(`deliveries.${index}.enrolledAsTargetChild`, null)
        }
    };

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'deliveries',
    });

    const addNewDelivery = () => {
        append({
            estimatedDeliveryDate: "",
            actualDeliveryDate: "",
            deliveryResultInBirth: null,
            enrolledAsTargetChild: null
        });
    };

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

                const response = await readDeliveryHistoryInformationForm(submissionId, user.id);

                const formattedData = {
                    ...response,
                    dateCompleted: new Date(response.dateCompleted).toISOString().split('T')[0],
                    deliveries: response.deliveries.map(delivery => ({
                        ...delivery,
                        estimatedDeliveryDate: new Date(delivery.estimatedDeliveryDate).toISOString().split('T')[0],
                        actualDeliveryDate: new Date(delivery.actualDeliveryDate).toISOString().split('T')[0],
                    }))
                }
                response.deliveries.forEach((value, index) => {
                    setShowEnrolledAsTargetChild(prevState => {
                        const newState = [...prevState];
                        newState[index] = value.deliveryResultInBirth === "Yes";
                        return newState;
                    });
                });
                reset(formattedData);
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

    const submit = async (data: IDeliveryHistoryInformationFormInputs) => {
        console.log(data)
        try {
            DeliveryHistoryInformationFormInputsSchema.parse(data);

            let response;
            if (!user) {
                throw new Error('User missing');
            }

            if (verb === 'new') {
                response = await createDeliveryHistoryInformationForm(data, user.id);
            } else {
                response = await updateDeliveryHistoryInformationForm(data, submissionId, user.id);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            router.push('/dashboard');

            return;
        }

        setSuccessMessage('Delivery History Information Form submitted successfully!');
        router.push('/dashboard');
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >

                <div className="pb-6 pt-6 flex flex-col">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Delivery History Information Form </p>
                    <small className="text-gray-600">Olivia-Navigator: Delivery Information TouchPoint</small>
                </div>

                <div className="space-y-8 pt-10">

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="font-semibold">Participant Name</p>
                            <input
                                {...register("participantName")}
                                className="border border-gray-300 px-4 py-3 rounded-md w-full"
                                type="text"
                            />
                            {errors.participantName && (
                                <span className="text-red-500 text-sm">
                                    {errors.participantName.message}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <p className="font-semibold">Case ID</p>
                            <input
                                {...register("caseId")}
                                className="border border-gray-300 px-4 py-3 rounded-md w-full"
                                type="text"
                            />
                            {errors.caseId && (
                                <span className="text-red-500 text-sm">
                                    {errors.caseId.message}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <p className="font-semibold">Date Completed</p>
                            <input
                                {...register("dateCompleted")}
                                className="border border-gray-300 px-4 py-3 rounded-md w-full"
                                type="date"
                            />
                            {errors.dateCompleted && (
                                <span className="text-red-500 text-sm">
                                    {errors.dateCompleted.message}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <p className="font-semibold">Staff Name</p>
                            <input
                                {...register("staffName")}
                                className="border border-gray-300 px-4 py-3 rounded-md w-full"
                                type="text"
                            />
                            {errors.staffName && (
                                <span className="text-red-500 text-sm">
                                    {errors.staffName.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="text-gray-700 pt-8">
                        Complete this form for each delivery that occurs after Participant enrollment, regardless of outcome or whether the child will be enrolled in the program. In the case of multiple births, complete a table for each delivery and enter a separate TouchPoint for each table.
                    </div>

                    <p className="font-semibold text-xl">Deliveries</p>
                    {fields.map((field, index) => {
                        return (
                            <div key={field.id} className="space-y-8">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-lg">Delivery #{index + 1}</p>
                                        {fields.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="text-red-600 bg-red-100 hover:bg-red-200 px-3 py-1 font-semibold rounded-md"
                                            >
                                                - Remove Delivery
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <p className="font-semibold">Estimate Date of Delivery</p>
                                        <input
                                            {...register(`deliveries.${index}.estimatedDeliveryDate`)}
                                            className="border border-gray-300 px-4 py-3 rounded-md w-full"
                                            type="date"
                                        />
                                        {errors.deliveries && errors.deliveries[index]?.estimatedDeliveryDate && (
                                            <span className="text-red-500 text-sm">
                                                {errors.deliveries[index]?.estimatedDeliveryDate?.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <p className="font-semibold">Actual Date of Delivery</p>
                                        <input
                                            {...register(`deliveries.${index}.actualDeliveryDate`)}
                                            className="border border-gray-300 px-4 py-3 rounded-md w-full"
                                            type="date"
                                        />
                                        {errors.deliveries && errors.deliveries[index]?.actualDeliveryDate && (
                                            <span className="text-red-500 text-sm">
                                                {errors.deliveries[index]?.actualDeliveryDate?.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <p className="font-semibold">Did the delivery result in a live birth?</p>
                                        <div className="flex space-x-4">
                                            {YesNoEnum.options.map(option => (
                                                <label key={option} className="inline-flex items-center">
                                                    <input
                                                        {...register(`deliveries.${index}.deliveryResultInBirth`)}
                                                        type="radio"
                                                        value={option}
                                                        className="form-radio"
                                                        onChange={(e) => handleShowEnrolledAsTargetChild(index, e.target.value)}
                                                    />
                                                    <span className="ml-2">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.deliveries && errors.deliveries[index]?.deliveryResultInBirth && (
                                            <span className="text-red-500 text-sm">
                                                {errors.deliveries[index]?.deliveryResultInBirth?.message}
                                            </span>
                                        )}
                                    </div>

                                    {showEnrolledAsTargetChild[index] && (
                                        <div className="space-y-2">
                                            <p className="font-semibold">If yes, is the newborn enrolled as a OLIVIA-NAVIGATOR target child in the program?</p>
                                            <div className="flex space-x-4">
                                                {YesNoEnum.options.map(option => (
                                                    <label key={option} className="inline-flex items-center">
                                                        <input
                                                            {...register(`deliveries.${index}.enrolledAsTargetChild`)}
                                                            type="radio"
                                                            value={option}
                                                            className="form-radio"
                                                        />
                                                        <span className="ml-2">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.deliveries && errors.deliveries[index]?.enrolledAsTargetChild && (
                                                <span className="text-red-500 text-sm">
                                                    {errors.deliveries[index]?.enrolledAsTargetChild?.message}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center py-6">
                    <button
                        type="button"
                        onClick={addNewDelivery}
                        className="text-green-600 bg-green-100 hover:bg-green-200 px-6 py-3 font-semibold rounded-md"
                    >
                        + Add New Delivery
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

export default DeliveryHistoryInformationForm;