"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  YesNoEnum,
  IPVScreeningResponseSchema,
  IIPVScreeningInputs,
  IPVScreeningInputsSchema,
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import {
  createIPVScreening,
  readIPVScreening,
  updateIPVScreening,
} from "../actions";

const IPVScreening: React.FC = () => {
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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IIPVScreeningInputs>({
    resolver: zodResolver(IPVScreeningInputsSchema),
  });

  useEffect(() => {
    const fetchAndPopulatePastSubmissionData = async () => {
      try {
        if (verb !== "edit") {
          return;
        }

        if (!user) {
          throw new Error("User not found");
        }

        if (!submissionId) {
          throw new Error("Missing submissionId when fetching past submission");
        }

        const response = await readIPVScreening(submissionId, user.id);

        const validResponse = IPVScreeningResponseSchema.parse(response);

        const formattedResponse = {
          ...validResponse,
          dateTaken: new Date(validResponse.dateTaken)
            .toISOString()
            .slice(0, 10),
          ipvScreeningDate: validResponse.ipvScreeningDate
            ? new Date(validResponse.ipvScreeningDate)
                .toISOString()
                .slice(0, 10)
            : null,
          ipvDisclosureDate: validResponse.ipvDisclosureDate
            ? new Date(validResponse.ipvDisclosureDate)
                .toISOString()
                .slice(0, 10)
            : null,
        };

        reset(formattedResponse);
      } catch (error) {
        console.error(error);
        setErrorMessage("Something went wrong! Please try again later");
        router.push("/dashboard");
      }
    };

    if (user && verb === "edit" && submissionId) {
      fetchAndPopulatePastSubmissionData();
    }
  }, [user, verb, submissionId, reset, router, setErrorMessage]);

  const submit = async (data: IIPVScreeningInputs) => {
    try {
      let response;

      if (!user) {
        throw new Error("User missing");
      }

      if (verb === "new") {
        response = await createIPVScreening(data, user.id);
      } else {
        response = await updateIPVScreening(data, submissionId, user.id);
      }

      IPVScreeningResponseSchema.parse(response);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong! Please try again later");
      return;
    }

    setSuccessMessage("IPV Screening submitted successfully!");
    router.push("/dashboard");
  };

  return (
    <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
      <form
        onSubmit={handleSubmit((data) => submit(data))}
        className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
      >
        <div className="pt-6">
          <p className="font-semibold text-2xl">
            IPV Disclosure Screening Tool
          </p>
        </div>

        <div className="space-y-8 pt-8">
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="font-semibold">Date Taken</p>
              <input
                {...register("dateTaken")}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                type="date"
              />
              {errors.dateTaken && (
                <span className="label-text-alt text-red-500">
                  {errors.dateTaken.message}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <p className="font-semibold">IPV Screening Date</p>
              <input
                {...register("ipvScreeningDate")}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                type="date"
              />
              {errors.ipvScreeningDate && (
                <span className="label-text-alt text-red-500">
                  {errors.ipvScreeningDate.message}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <p className="font-semibold">Screening Tool Used</p>
              <input
                {...register("screeningToolUsed")}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
              {errors.screeningToolUsed && (
                <span className="label-text-alt text-red-500">
                  {errors.screeningToolUsed.message}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <p className="font-semibold">Total Score</p>
              <input
                {...register("totalScore")}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                type="number"
              />
              {errors.totalScore && (
                <span className="label-text-alt text-red-500">
                  {errors.totalScore.message}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <p className="font-semibold">IPV Disclosure</p>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-x-12">
                  {YesNoEnum.options.map((status) => (
                    <label key={status} className="inline-flex items-center">
                      <input
                        {...register("ipvDisclosure")}
                        type="radio"
                        value={status}
                        className="form-radio"
                      />
                      <span className="ml-2">{status}</span>
                    </label>
                  ))}
                </div>
                {errors.ipvDisclosure && (
                  <span className="label-text-alt text-red-500">
                    {errors.ipvDisclosure.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-semibold">IPV Disclosure Date</p>
              <input
                {...register("ipvDisclosureDate")}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                type="date"
              />
              {errors.ipvDisclosureDate && (
                <span className="label-text-alt text-red-500">
                  {errors.ipvDisclosureDate.message}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <p className="font-semibold">Notes</p>
              <textarea
                {...register("notes")}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                placeholder="Optional comments"
              />
              {errors.notes && (
                <span className="label-text-alt text-red-500">
                  {errors.notes.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center py-4">
            <button
              type="submit"
              className="flex items-center justify-center gap-x-2 w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto font-semibold"
            >
              {isSubmitting && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IPVScreening;
