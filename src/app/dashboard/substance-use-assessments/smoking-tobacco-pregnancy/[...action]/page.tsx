"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  SmokingTobaccoPregnancyInputSchema,
  SmokingTobaccoPregnancyResponseSchema,
  ISmokingTobaccoPregnancyInputs,
  SmokingTobaccoPregnancyLabelMapping,
  SmokingStatusEnum,
} from "../definitions";
import {
  createSmokingTobaccoPregnancyRecord,
  readSmokingTobaccoPregnancyRecord,
  updateSmokingTobaccoPregnancyRecord,
} from "../actions";
import useAppStore from "@/lib/useAppStore";

const SmokingTobaccoPregnancyForm: React.FC = () => {
  const router = useRouter();
  const { action } = useParams();

  const verb = action[0];
  const submissionId = action[1];

  const [currentStep, setCurrentStep] = useState(0);

  const user = useAppStore((state) => state.user);

  const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);
  const setErrorMessage = useAppStore((state) => state.setErrorMessage);

  // Array of steps to display in the wizard
  const steps = [
    {
      title: `Substance Use Assessments`,
      content: [
        `The Drug Abuse Screening Test (DAST-10) is a 10-item brief screening tool that can be administered by a clinician or self-administered.
        
        Each question requires a yes or no response, and the tool can be completed in less than 8 minutes. 
        
        This tool assesses drug use, not including alcohol or tobacco use, in the past 12 months.  `,
      ],
    },
    {
      title: `Substance Use Assessments`,
      content: [
        `I’m going to read you a list of questions concerning information about your potential involvement with drugs, excluding alcohol and tobacco, during the past 12 months.`,
      ],
    },
    {
      title: `Substance Use Assessments`,
      content: [
        `When the words “drug abuse” are used, they mean the use of prescribed or over‐the‐counter medications/drugs in excess of the directions and any non‐medical use of drugs.
        
        The various classes of drugs may include: cannabis (e.g., marijuana, hash), solvents, tranquilizers (e.g., Valium), barbiturates, cocaine, stimulants (e.g., speed), hallucinogens (e.g., LSD) or narcotics (e.g., heroin).
        
        Remember that the questions do not include alcohol or tobacco.  `,
      ],
    },
    {
      title: `Substance Use Assessments`,
      content: [
        `If you have difficulty with a statement, then choose the response that is mostly right.
        
        You may choose to answer or not answer any of the questions in this section.`,
      ],
    },
  ];

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ISmokingTobaccoPregnancyInputs>({
    resolver: zodResolver(SmokingTobaccoPregnancyInputSchema),
    defaultValues: {},
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

        const response = await readSmokingTobaccoPregnancyRecord(submissionId, user.id);
        reset(response)

      } catch (error) {
        console.error(error);
        setErrorMessage('Something went wrong! Please try again later');
        router.push('/dashboard/substance-use-assessments');
      }
    };

    if (user && verb === 'edit' && submissionId) {
      fetchAndPopulatePastSubmissionData();
    }
  }, [user, verb, submissionId, reset, router, setErrorMessage]);


  const submit = async (data: ISmokingTobaccoPregnancyInputs) => {
    try {
      if (!user) {
        throw new Error("User not found");
      }

      let response;

      if (verb === "new") {
        response = await createSmokingTobaccoPregnancyRecord(data, user.id);
      } else {
        response = await updateSmokingTobaccoPregnancyRecord(data, submissionId, user.id);
      }

    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong! Please try again later");
      router.push('/dashboard/substance-use-assessments');
      return;
    }

    setSuccessMessage("Smoking-Tobacco-Pregnancy Form submitted successfully!");
    router.push('/dashboard/substance-use-assessments');
  };

  return (
    <div className="w-full h-full flex flex-col items-center mt-2 text-base pt-20 ">
      <div className="flex flex-col items-center max-w-7xl">
        <div>
          <div className="mb-2 pl-24 pr-24">
            <h2 className="text-3xl font-semibold pl-8">
              {steps[currentStep].title}
            </h2>
            <div className="p-8">
              {steps[currentStep].content[0]
                .split("\n")
                .map((line: string, lineIndex: number) => (
                  <p key={lineIndex} className="mt-4 mb-4">
                    {line.trim()}
                  </p>
                ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mr-12">
            <button
              className="block md:flex button md:button-filled md:rounded-full gap-x-2"
              onClick={goBack}
              disabled={currentStep === 0}
            >
              Back
            </button>
            <button
              className="block md:flex button md:button-filled md:rounded-full gap-x-2"
              onClick={goForward}
              disabled={currentStep === steps.length - 1}
            >
              Continue
            </button>
          </div>

        </div>
      </div>
      {currentStep < steps.length - 1 && (
        <div className="flex justify-center space-x-4 mt-4">
          {steps.map((_, index) => (
            <button
              key={index}
              className="focus:outline-none button"
              onClick={() => setCurrentStep(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10">
        {currentStep === steps.length - 1 && ( // Display form on last step
          <form
            onSubmit={handleSubmit((data) => submit(data))}
            className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
          >
            <p className="font-medium text-xl">Smoking and Tobacco Use during Pregnancy</p>

            <p className="font-medium pt-6">Choose the statement that best describes your smoking status</p>
            {/* <div className="flex flex-col space-y-3"> */}

            <div className="space-y-3">
              <p className="font-semibold">Has your child had any involvement with Child Protective Service (CPS)</p>
              <div className="space-y-2">
                {SmokingStatusEnum.options.map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      {...register("smokingStatus")}
                      className="form-radio"
                      type="radio"
                      value={option}
                    />
                    <span className="ml-2">{SmokingTobaccoPregnancyLabelMapping.smokingStatus[option]}</span>
                  </label>
                ))}
                {errors.smokingStatus && (
                  <span className="label-text-alt text-red-500">
                    {errors.smokingStatus.message}
                  </span>
                )}
              </div>
            </div>
            {/* <label className="flex items-center">
                <input
                  type="radio"
                  value="NEVER"
                  {...register('smokingStatus')}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">I have NEVER smoked or have smoked less than 100 cigarettes in my lifetime.</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  value="NOT_BEFORE_AND_NOT_NOW"
                  {...register('smokingStatus')}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">I stopped smoking BEFORE I found out I was pregnant and am not smoking now.</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  value="NOT_AFTER_AND_NOT_NOW"
                  {...register('smokingStatus')}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">I stopped smoking AFTER I found out I was pregnant and I am not smoking now.</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  value="NOT_DURING_AND_NOT_NOW"
                  {...register('smokingStatus')}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">I stopped smoking during pregnancy but I am smoking now.</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  value="NOT_DURING_AND_NOW"
                  {...register('smokingStatus')}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">I smoked during pregnancy and I am smoking now. </span>
              </label>
            </div>
            {errors.smokingStatus && (
              <span className="label-text-alt text-red-500">
                {errors.smokingStatus?.message}
              </span>
            )} */}

            <div>
              <hr className="border-t-1 border-gray-400 my-4" />
              <div>
                <p className="font-semibold pb-2 pt-8">Submission Label</p>
                <textarea {...register("label")} className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                {errors.label && (<span className="label-text-alt text-red-500">{errors.label.message}</span>)}
              </div>
              <div>
                <p className="font-semibold pb-2 pt-8">Staff Notes</p>
                <textarea {...register("staffNotes")} className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                {errors.staffNotes && (<span className="label-text-alt text-red-500">{errors.staffNotes.message}</span>)}
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
        )}
      </div>
    </div>
  );
};

export default SmokingTobaccoPregnancyForm;