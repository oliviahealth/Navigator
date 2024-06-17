"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAppStore from "@/lib/useAppStore";
import { IEdinburgPostnatalDepressionScaleInputs, EdinburgPostnatalDepressionScaleInputsSchema, EdinburgPostnatalDepressionScaleResponseSchema, pages } from "../definitions";
import { createEdinburgPostnatalDepressionScale, readEdinburgPostnatalDepressionScale, updateEdinburgPostnatalDepressionScale } from "../actions";
import EdinburgPostnatalDepressionScaleQuestions from "../forms/EdinburgPostnatalDepressionScaleQuestions";
import EdinburgResultsTouchpoint from "../forms/EdinburgResultsTouchpoint";

const EdinburgPostnatalDepressionScale: React.FC = () => {
    const router = useRouter();
    const { action } = useParams();

    const verb = action[0];
    const submissionId = action[1];

    const user = useAppStore(state => state.user);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<IEdinburgPostnatalDepressionScaleInputs | null>(null);

    const goBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const goForward = async (step: number) => {
        const isValid = await methods.trigger(pages[step]);
        if (isValid && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const methods = useForm<IEdinburgPostnatalDepressionScaleInputs>({
        resolver: zodResolver(EdinburgPostnatalDepressionScaleInputsSchema),
        defaultValues: {
            notes: null
        }
    });

    const { reset } = methods;

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

                const response = await readEdinburgPostnatalDepressionScale(submissionId, user.id);
                const validResponse = EdinburgPostnatalDepressionScaleResponseSchema.parse(response);

                const formattedData = {
                    ...validResponse,
                    dateCompleted: new Date(validResponse.dateCompleted).toISOString().split('T')[0], // Format as YYYY-MM-DD
                };
                reset(formattedData);
                setFormData(formattedData);
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

    const submit = async (data: IEdinburgPostnatalDepressionScaleInputs) => {
        try {
            let response;

            if (!user) {
                throw new Error("User not found");
            }

            if (verb === 'new') {
                response = await createEdinburgPostnatalDepressionScale(data, user.id);
            } else {
                response = await updateEdinburgPostnatalDepressionScale(data, submissionId, user.id)
            }

            EdinburgPostnatalDepressionScaleInputsSchema.parse(response);
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            return;
        }

        setSuccessMessage('Edinburg Postnatal Depression Scale submitted successfully!')
        router.push('/dashboard')
    };

    const steps = [
        <EdinburgPostnatalDepressionScaleQuestions formData={formData} />,
        <EdinburgResultsTouchpoint formData={formData} />,
    ];

    return (
        <div className={`w-full h-full flex flex-col items-center p-2 mt-2 text-base ${currentStep < 5 ? "pt-20" : "pt-4"} px-32`}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => submit(data))} className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2">
                    <div className="flex flex-col items-center">
                        {steps[currentStep]}
                    </div>

                    {currentStep === steps.length - 1 && (
                        <button type="submit" className="flex items-center justify-center gap-x-2 w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto font-semibold mt-4">
                            Save
                        </button>
                    )}
                </form>
            </FormProvider>
            <div className="flex justify-center space-x-4 mt-8">
                {currentStep !== 0 && (
                    <button className="block md:flex button md:button-filled md:rounded-full gap-x-2" onClick={goBack}>
                        Back
                    </button>
                )}
                {currentStep !== steps.length - 1 && (
                    <button className="block md:flex button md:button-filled md:rounded-full gap-x-2" onClick={() => goForward(currentStep)}>
                        Continue
                    </button>
                )}
            </div>
        </div>
    );
};

export default EdinburgPostnatalDepressionScale;