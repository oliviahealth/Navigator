"use client"

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    deliveryModeEnum,
    IParentalMedicalHistoryInputs,
    ParentalMedicalHistoryInputsSchema
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import { createParentalMedicalHistory, readParentalMedicalHistory, updateParentalMedicalHistory } from "../actions";

const ParentalMedicalHistory: React.FC = () => {
    const router = useRouter();
    const { action } = useParams();

    const verb = action[0]
    const submissionId = action[1]

    const user = useAppStore(state => state.user);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    const [showPostpartumLocationDate, setShowPostpartumLocationDate] = useState<boolean>(false);

    const handlePostpartumAttendance = (value: string) => {
        if (value === 'Yes') {
            setShowPostpartumLocationDate(true);
        } else {
            setShowPostpartumLocationDate(false);
            setValue("postpartumVisitLocation", '');
            setValue("postpartumVisitDate", '');
        }
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<IParentalMedicalHistoryInputs>({
        resolver: zodResolver(ParentalMedicalHistoryInputsSchema),
    });

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

                const validResponse = await readParentalMedicalHistory(submissionId, user.id);

                const formattedResponse = {
                    ...validResponse,
                    dueDate: new Date(validResponse.dueDate).toISOString().slice(0, 10),
                    deliveryDate: new Date(validResponse.deliveryDate).toISOString().slice(0, 10),
                    postpartumVisitDate: validResponse.postpartumVisitDate ? new Date(validResponse.postpartumVisitDate).toISOString().slice(0, 10) : null,
                };

                reset(formattedResponse);

                setShowPostpartumLocationDate(validResponse.attendedPostpartumVisit === 'Yes');
            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');
                router.push('/dashboard/medical-and-nutrition-history/');
            }
        };

        if (user && verb === 'edit' && submissionId) {
            fetchAndPopulatePastSubmissionData();
        }
    }, [user, verb, submissionId, reset, router, setErrorMessage]);

    const submit = async (data: IParentalMedicalHistoryInputs) => {
        try {
            let response;

            if (!user) {
                throw new Error("User missing");
            }

            if (verb === 'new') {
                response = await createParentalMedicalHistory(data, user.id);
            } else {
                response = await updateParentalMedicalHistory(data, submissionId, user.id)
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');
            return;
        }

        setSuccessMessage('Parental Medical History submitted successfully!')
        router.push('/dashboard/medical-and-nutrition-history/');
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Parental Medical History</p>
                </div>

                <div className="space-y-16 pt-12">
                    <div className="space-y-4">
                        <p className="text-lg font-bold"> Prenatal Care (for current or most recent pregnancy) </p>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">Gestational Age at Entry of Care</p>
                                <input
                                    {...register("gestationalAge")}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                                {errors.gestationalAge && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.gestationalAge.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Due Date</p>
                                <input
                                    {...register("dueDate", { valueAsDate: true })}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="date"
                                />
                                {errors.dueDate && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.dueDate.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Delivery Date</p>
                                <input
                                    {...register("deliveryDate", { valueAsDate: true })}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="date"
                                />
                                {errors.deliveryDate && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.deliveryDate.message}
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
                                                    {...register("plannedModeDelivery")}
                                                    type="radio"
                                                    value={status}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">{status}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.plannedModeDelivery && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.plannedModeDelivery.message}
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
                                                    {...register("actualModeDelivery")}
                                                    type="radio"
                                                    value={status}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">{status}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.actualModeDelivery && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.actualModeDelivery.message}
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
                                                    {...register("attendedPostpartumVisit")}
                                                    type="radio"
                                                    value={status}
                                                    className="form-radio"
                                                    onChange={(e) => handlePostpartumAttendance(e.target.value)}
                                                />
                                                <span className="ml-2">{status}</span>
                                            </label>
                                        ))}
                                    </div>
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
                                            {...register("postpartumVisitLocation")}
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
                                            {...register("postpartumVisitDate")}
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

                    <div className="space-y-4">
                        <p className="text-lg font-bold">Obstetric History</p>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="font-semibold">Total Number of Pregnancies</p>
                                <small>See GPTAL below, these total numbers should match.</small>
                                <input type="text" {...register("totalNumPregnancies")}
                                    className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium"
                                />
                                {errors.totalNumPregnancies && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.totalNumPregnancies.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Number of Children Currently Living with You</p>
                                <input type="text" {...register("numChildrenWithMother")}
                                    className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                                {errors.numChildrenWithMother && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.numChildrenWithMother.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Dates of Prior Pregnancies</p>
                                <input type="text" {...register("priorPregnancyDates")}
                                    className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                                {errors.priorPregnancyDates && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.priorPregnancyDates.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Outcomes of Prior Pregnancies</p>
                                <input type="text" {...register("priorPregnancyOutcomes")}
                                    className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                                {errors.priorPregnancyOutcomes && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.priorPregnancyOutcomes.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Gravida</p>
                                <small>Total number of pregnancies</small>
                                <input type="text" {...register("gravida")}
                                    className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                                {errors.gravida && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.gravida.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Term</p>
                                <small>Total number of deliveries, @ 37 weeks or higher</small>
                                <input type="text" {...register("term")}
                                    className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                                {errors.term && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.term.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Preterm</p>
                                <small>Total number of deliveries between  20 & 36 weeks</small>
                                <input type="text" {...register("preterm")}
                                    className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                                {errors.preterm && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.preterm.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Abortions</p>
                                <small>Total number of Miscarriages and/or Elective Abortions</small>
                                <input type="text" {...register("abortions")}
                                    className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                                {errors.abortions && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.abortions.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Living</p>
                                <small>Total number of living children</small>
                                <input type="text" {...register("living")}
                                    className="w-full dropdown border rounded-md border-gray-300 p-3 font-medium" />
                                {errors.living && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.living.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">
                                    Describe Any Complications During Prior Pregnancies
                                </p>
                                <textarea
                                    {...register("priorComplications")}
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

                    <div className="space-y-4">
                        <p className="text-lg font-bold"> Medical Problems Requiring Ongoing Care </p>
                        <small>Complete with: OB/GYN or Primary Care Provider</small>
                        <div className="space-y-3">
                            <p className="font-semibold">Diagnoses/Conditions</p>
                            <textarea
                                {...register("ongoingMedicalProblems")}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            />
                            {errors.ongoingMedicalProblems && (
                                <span className="label-text-alt text-red-500">
                                    {errors.ongoingMedicalProblems.message}
                                </span>
                            )}
                        </div>

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

}

export default ParentalMedicalHistory;