"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAppStore from "@/lib/useAppStore";
import PregnantWomanHealthAndDiet from "../forms/PregnantWomanHealthAndDietQuestions";
import PregnancyInformation from "../forms/PregnancyInformation";
import { INutritionHistoryAndAssessmentInputs, NutritionHistoryAndAssessmentInputSchema } from "../definitions";
import MedicalInformation from "../forms/MedicalInformation";
import BreastfeedingInformation from "../forms/BreastfeedingInformation";
import BreastfeedingAssessment from "../forms/BreastfeedingAssessment";
import NutritionHistory from "../forms/NutritionHistory";

const NutritionHistoryAndAssessment: React.FC = () => {
    const router = useRouter();
    // const { action } = router.query;

    // const verb = action ? action[0] : null;
    // const submissionId = action ? action[1] : null;

    const user = useAppStore(state => state.user);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    const [showErrors, setShowErrors] = useState(false);

    const [currentStep, setCurrentStep] = useState(0);

    const goBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const lastStep = 6;

    const goForward = () => {
        if (currentStep < lastStep) {
            setCurrentStep(currentStep + 1);
        } else {
            // Submit data or navigate to a different route
        }
    };

    const methods = useForm<INutritionHistoryAndAssessmentInputs>({
        resolver: zodResolver(NutritionHistoryAndAssessmentInputSchema),
    });

    const submit = (data: any) => {
        setShowErrors(true);
        alert("Nutrition History and Assessment submitted successfully");
        console.log(data);
    };

    return (
        <div className={`w-full h-full flex flex-col items-center p-2 mt-2 text-base ${currentStep < lastStep ? "pt-20" : "pt-4"} px-32`}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => submit(data))} className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2">
                    <div className="flex flex-col items-center">
                        {currentStep === 0 && (
                            <PregnantWomanHealthAndDiet />
                        )}
                        {currentStep === 1 && (
                            <PregnancyInformation />
                        )}
                        {currentStep === 2 && (
                            <MedicalInformation />
                        )}
                        {currentStep === 3 && (
                            <BreastfeedingInformation />
                        )}
                        {currentStep === 4 && (
                            <BreastfeedingAssessment />
                        )}
                        {currentStep === 5 && (
                            <NutritionHistory />
                        )}
                    </div>

                    {currentStep === lastStep - 1 && (
                        <button type="submit" className="flex items-center justify-center gap-x-2 w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto font-semibold">
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
                {currentStep !== lastStep - 1 && (
                    <button className="block md:flex button md:button-filled md:rounded-full gap-x-2" onClick={goForward}>
                        Continue
                    </button>
                )}

            </div>
        </div>
    );
};

export default NutritionHistoryAndAssessment;
