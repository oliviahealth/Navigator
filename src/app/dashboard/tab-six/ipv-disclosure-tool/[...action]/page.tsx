"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  IPVDisclosureScreeningToolSchema,
  IIPVDisclosureScreeningTool,
  ScreeningToolEnum,
} from "../definitions";
import useAppStore from "@/lib/useAppStore";
import {
  createIPVDisclosureScreeningTool,
  readIPVDisclosureScreeningTool,
  updateIPVDisclosureScreeningTool,
} from "../actions";

const IPVDisclosureScreeningToolForm: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  const action = params.actions?.[0];
  const submissionId = params.actions?.[1];

  const user = useAppStore((state) => state.user);
  const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);
  const setErrorMessage = useAppStore((state) => state.setErrorMessage);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IIPVDisclosureScreeningTool>({
    resolver: zodResolver(IPVDisclosureScreeningToolSchema),
  });

  const onSubmit = async (data: IIPVDisclosureScreeningTool) => {
    try {
      if (!user) {
        throw new Error("User not found");
      }

      let response;

      if (action === "new") {
        response = await createIPVDisclosureScreeningTool(data, user.id);
      } else if (action === "edit" && submissionId) {
        response = await updateIPVDisclosureScreeningTool(data, submissionId, user.id);
      } else {
        throw new Error("Invalid action or missing submissionId");
      }

      IPVDisclosureScreeningToolSchema.parse(response);
    } catch (error) {
      setErrorMessage(
        `Error: ${
          error instanceof Error
            ? error.message
            : "Something went wrong! Please try again later"
        }`
      );
      router.push("/dashboard");
      return;
    }

    setSuccessMessage("IPV Disclosure Screening Tool Form submitted successfully!");
    router.push("/dashboard");
  };

  useEffect(() => {
    const fetchAndPopulatePastSubmissionData = async () => {
      try {
        if (action !== "edit") {
          return;
        }

        if (!user) {
          throw new Error("User not found");
        }

        if (!submissionId) {
          throw new Error("Missing submissionId when fetching past submission");
        }

        const response = await readIPVDisclosureScreeningTool(submissionId, user.id);

        IPVDisclosureScreeningToolSchema.parse(response);
        reset(response);
      } catch (error) {
        console.error(error);
        setErrorMessage("Something went wrong! Please try again later");
        router.push("/dashboard");
      }
    };

    if (user) {
      fetchAndPopulatePastSubmissionData();
    }
  }, [user, action, submissionId, reset, router, setErrorMessage]);

  return (
    <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-4 [&>p]:pt-6 [&>p]:pb-1 [&>input, &>select]:px-4 pb-8">
        <p className="font-semibold text-2xl text-center">IPV Disclosure Screening Tool</p>

        <div className="flex flex-col justify-between">
          <label htmlFor="dateTaken" className="font-semibold pb-2 pt-4">Date Taken</label>
          <input
            type="date"
            {...register("dateTaken", { valueAsDate: true })}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.dateTaken && <span className="text-red-500">{errors.dateTaken.message}</span>}
        </div>

        <div className="flex flex-col justify-between">
          <label htmlFor="ipvScreeningDate" className="font-semibold pb-2 pt-4">IPV Screening Date</label>
          <input
            type="date"
            {...register("ipvScreeningDate", { valueAsDate: true })}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.ipvScreeningDate && <span className="text-red-500">{errors.ipvScreeningDate.message}</span>}
        </div>

        <div className="flex flex-col justify-between">
          <label htmlFor="screeningToolUsed" className="font-semibold pb-2 pt-4">Screening Tool Used</label>
          <select
            {...register("screeningToolUsed")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            {ScreeningToolEnum.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.screeningToolUsed && <span className="text-red-500">{errors.screeningToolUsed.message}</span>}
        </div>

        <div className="flex flex-col justify-between">
          <label htmlFor="totalScore" className="font-semibold pb-2 pt-4">Total Score</label>
          <input
            type="number"
            {...register("totalScore", { valueAsNumber: true })}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.totalScore && <span className="text-red-500">{errors.totalScore.message}</span>}
        </div>

        <div className="flex flex-col justify-between">
          <label htmlFor="ipvDisclosure" className="font-semibold pb-2 pt-4">IPV Disclosure</label>
          <select
            {...register("ipvDisclosure")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors.ipvDisclosure && <span className="text-red-500">{errors.ipvDisclosure.message}</span>}
        </div>

        <div className="flex flex-col justify-between">
          <label htmlFor="ipvDisclosureDate" className="font-semibold pb-2 pt-4">IPV Disclosure Date</label>
          <input
            type="date"
            {...register("ipvDisclosureDate", { valueAsDate: true })}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.ipvDisclosureDate && <span className="text-red-500">{errors.ipvDisclosureDate.message}</span>}
        </div>

        <div className="flex flex-col justify-between">
          <label htmlFor="notes" className="font-semibold pb-2 pt-4">Notes</label>
          <textarea
            {...register("notes")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            rows={4}
          />
          {errors.notes && <span className="text-red-500">{errors.notes.message}</span>}
        </div>

        <div className="flex justify-center mt-8">
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

export default IPVDisclosureScreeningToolForm;