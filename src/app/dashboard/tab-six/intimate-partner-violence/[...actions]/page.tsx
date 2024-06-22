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
import { DeliveryMode } from "@prisma/client";

const IPVForm: React.FC = () => {
  const router = useRouter();
  const { action } = useParams();

  const verb = Array.isArray(action) ? action[0] : action;
  const submissionId = Array.isArray(action) ? action[1] : undefined;

  const user = useAppStore((state) => state.user);
  const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);
  const setErrorMessage = useAppStore((state) => state.setErrorMessage);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IIntimatePartnerViolenceFormInputs>({
    resolver: zodResolver(IntimatePartnerViolenceFormInputsSchema),
  });

  const onSubmit = async (data: IIntimatePartnerViolenceFormInputs) => {
    try {
      if (!user) {
        throw new Error("User not found");
      }

      let response;
      if (verb === "new") {
        response = await createIPVFormEntry(data, user.id);
      } else if (submissionId) {
        response = await updateIPVFormEntry(data, submissionId, user.id);
      } else {
        throw new Error("submissionId is undefined");
      }

      setSuccessMessage("IPV Form submitted successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong! Please try again later");
      router.push("/dashboard");
    }
  };

  const mapIPVStatusToString = (status: string): string => {
    const statusMap: Record<string, string> = {
      Never: "Never (1)",
      Rarely: "Rarely (2)",
      Sometimes: "Sometimes (3)",
      Fairly: "Fairly (4)",
      Often: "Often (5)",
      Frequently: "Frequently (6)",
    };
    return statusMap[status] || status;
  };

  const transformResponse = (response: Record<string, any>) => {
    const transformedResponse: Record<string, any> = { ...response };

    const fieldsToTransform = [
      "physicallyHurt",
      "insultOrTalkDown",
      "threatenWithHarm",
      "screamOrCurse",
      "feltUnsafe",
      "insultedOrTalkedDown",
      "threatenedHarm",
      "forcedSexualActivity",
    ];

    for (const field of fieldsToTransform) {
      if (field in response) {
        transformedResponse[field] = mapIPVStatusToString(response[field]);
      }
    }

    return transformedResponse;
  };

  useEffect(() => {
    const fetchAndPopulatePastSubmissionData = async () => {
      if (verb !== "edit" || !submissionId) {
        return;
      }

      try {
        if (!user) {
          throw new Error("User not found");
        }

        const response = await readIPVFormEntry(submissionId, user.id);
        const transformedResponse = transformResponse(response);

        reset(transformedResponse);
      } catch (error) {
        console.error(error);
        setErrorMessage("Something went wrong! Please try again later");
        router.push("/dashboard");
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
