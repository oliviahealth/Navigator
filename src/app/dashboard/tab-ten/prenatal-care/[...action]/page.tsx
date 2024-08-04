"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAppStore from "@/lib/useAppStore";
import { IPrenatalCareInputs, PrenatalCareInputsSchema } from "../definitions";
import {
  createPrenatalCareRecord,
  readPrenatalCareRecord,
  updatePrenatalCareRecord,
} from "../actions";

const PrenatalCareRecord: React.FC = () => {
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
    formState: { errors, isSubmitting },
  } = useForm<IPrenatalCareInputs>({
    resolver: zodResolver(PrenatalCareInputsSchema),
  });

  useEffect(() => {
    const fetchAndPopulatePastSubmissionData = async () => {
      try {
        if (verb !== "edit") {
          return;
        }

        if (!submissionId) {
          throw new Error("Missing submissionId when fetching past submission");
        }

        if (!user) {
          throw new Error("Missing user");
        }

        const validResponse = await readPrenatalCareRecord(submissionId, user.id);

        reset(validResponse);
      } catch (error) {
        console.error(error);
        setErrorMessage("Something went wrong! Please try again later");

        router.push("/");
        return;
      }
    };

    fetchAndPopulatePastSubmissionData();
  }, []);

  const submit = async (data: IPrenatalCareInputs) => {
    try {
      PrenatalCareInputsSchema.parse(data);

      let response;

      if (!user) {
        throw new Error("User Missing");
      }

      if (verb === "new") {
        response = await createPrenatalCareRecord(data, user.id);
      } else {
        response = await updatePrenatalCareRecord(data, submissionId, user.id);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong! Please try again later");

      router.push("/dashboard");

      return;
    }

    setSuccessMessage("Prenatal Care Form submitted successfully");
    router.push("/dashboard");
  };

  return (
    <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
      <form
        onSubmit={handleSubmit((data) => submit(data))}
        className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-6"
      >
        <p className="font-medium">Ask these questions:</p>

        <p className="font-medium">If currently pregnant, do you attend regular visits with your OBcare provider?</p>
        <div className="space-x-12">
            {["Yes", "No"].map((status, idx) => (
              <label key={idx} className="inline-flex items-center">
                <input
                  {...register('attendRegularVisitsWithOBCare')}
                  type="radio"
                  value={status}
                  className="form-radio"
                />
                <span className="ml-2">{status}</span>
              </label>
            ))}
          </div>
        
        <p className="font-medium">When did you start your prenatal care?</p>
        <input
          {...register('prenatalCareStartDate', { valueAsDate: true })}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
          type="date"
        />

        <p className="font-medium">Provide the contact information for your prenatal care in the Care Provider section.</p>

        <p className="font-medium">How far do you have to drive to receive prenatal care?</p>
        <input
          {...register('drivingDistanceForPrenatalCare')}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
          type="text"
        />

        <p className="font-medium">Have you missed any prenatal appointments? If so, why?</p>
        <textarea
          {...register('haveMissedAppointments')}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
        />

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white bg-[#AFAFAFAF] px-20 py-2 rounded-md whitespace-nowrap hover:bg-[#9F9F9F] transition-colors duration-200 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrenatalCareRecord;
