"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  IntimatePartnerViolenceFormInputsSchema,
  IIntimatePartnerViolenceFormInputs,
  IPVStatusEnum,
} from "../definitions";
import useAppStore from "@/lib/useAppStore";
import {
  createIPVFormEntry,
  readIPVFormEntry,
  updateIPVFormEntry,
} from "../actions";


const IPVForm: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  
  console.log(params); // for debugging

  
  const action = params.actions?.[0];
  
  
  const verb = action;
  const submissionId = params.actions?.[1];

  const user = useAppStore((state) => state.user);
  const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);
  const setErrorMessage = useAppStore((state) => state.setErrorMessage);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IIntimatePartnerViolenceFormInputs>({
    resolver: zodResolver(IntimatePartnerViolenceFormInputsSchema),
  });

  const onSubmit = async (data: IIntimatePartnerViolenceFormInputs) => {
    try {
      if (!user) {
        throw new Error('User not found');
      }
  
      let response;
  
      if (verb === 'new') {
        response = await createIPVFormEntry(data, user.id);
      } else if (verb === 'edit' && submissionId) {
        response = await updateIPVFormEntry(data, submissionId, user.id);
      } else {
        throw new Error('Invalid action or missing submissionId');
      }
  
      
      IntimatePartnerViolenceFormInputsSchema.parse(response);
    } catch (error) {
      console.error(error);
      setErrorMessage(`Error: ${error instanceof Error ? error.message : "Something went wrong! Please try again later"}`);
      router.push('/dashboard');
      return;
    }
  
    setSuccessMessage('IPV Form submitted successfully!');
    router.push('/dashboard');
  };


  useEffect(() => {
    const fetchAndPopulatePastSubmissionData = async () => {
      try {
        if (verb !== 'edit') {
          return;
        }
  
        if (!user) {
          throw new Error('User not found');
        }
  
        if (!submissionId) {
          throw new Error('Missing submissionId when fetching past submission');
        }
  
        const response = await readIPVFormEntry(submissionId, user.id);
  
        
        IntimatePartnerViolenceFormInputsSchema.parse(response);
      } catch (error) {
        console.error(error);
        setErrorMessage('Something went wrong! Please try again later');
        router.push('/dashboard');
        return;
      }
    };
  
    if (!user) return;
  
    fetchAndPopulatePastSubmissionData();
  }, [user, verb, submissionId, reset, router, setErrorMessage]); 
  return (
    <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-4 [&>p]:pt-6 [&>p]:pb-1 [&>input, &>select]:px-4 pb-8"
      >
        <p className="font-semibold text-2xl text-center">
          Intimate Partner Violence Assessment
        </p>
        <p className="text-xl text-center mt-2">
          Hurt, Insulted, Threatened with Harm and Screamed (HITS) Domestic
          Violence Screening Tool
        </p>
        <p className="font-semibold text-lg mt-2">
          How often does your partner:
        </p>
        <div className="py-2 space-y-4">
          <div className="flex flex-col justify-between">
            <label htmlFor="physicallyHurt" className="font-semibold pb-2 pt-2">
              1. Physically Hurt
            </label>
            <select
              {...register("physicallyHurt")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              {IPVStatusEnum.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.physicallyHurt && (
              <span className="label-text-alt text-red-500">
                {errors.physicallyHurt.message}
              </span>
            )}
          </div>
          <div className="flex flex-col justify-between">
            <label
              htmlFor="insultOrTalkDown"
              className="font-semibold pb-2 pt-4"
            >
              2. Insult or Talk Down
            </label>
            <select
              {...register("insultOrTalkDown")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              {IPVStatusEnum.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.insultOrTalkDown && (
              <span className="label-text-alt text-red-500">
                {errors.insultOrTalkDown.message}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <label
              htmlFor="threatenWithHarm"
              className="font-semibold pb-2 pt-4"
            >
              3. Threaten With Harm
            </label>
            <select
              {...register("threatenWithHarm")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              {IPVStatusEnum.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.threatenWithHarm && (
              <span className="label-text-alt text-red-500">
                {errors.threatenWithHarm.message}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <label htmlFor="screamOrCurse" className="font-semibold pb-2 pt-4">
              4. Scream or Curse
            </label>
            <select
              {...register("screamOrCurse")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              {IPVStatusEnum.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.screamOrCurse && (
              <span className="label-text-alt text-red-500">
                {errors.screamOrCurse.message}
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow mb-16">
          <p className="text-lg text-center">
            Scoring: Each item is scored from 1-5. Range between 4-20. A score
            greater than 10 signifies that you are at risk of domestic violence
            abuse, and should seek counseling or help from a domestic violence
            resource center.
          </p>
        </div>
        <div className="flex justify-center mt-12">
          <button
            type="submit"
            className="font-semibold bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default IPVForm;
