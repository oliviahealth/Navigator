"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  ITenBsPostpartumAssesmentInputs,
  TenBsPostpartumAssesmentInputsSchema,
} from "../definitions";
import useAppStore from "@/lib/useAppStore";
import {
  createTenBsPostpartumAssesmentRecord,
  readTenBsPostpartumAssesmentRecord,
  updateTenBsPostpartumAssesmentRecord,
} from "../actions";

const TenBsPostpartumAssesmentRecord: React.FC = () => {
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
  } = useForm<ITenBsPostpartumAssesmentInputs>({
    resolver: zodResolver(TenBsPostpartumAssesmentInputsSchema),
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

        const validResponse = await readTenBsPostpartumAssesmentRecord(
          submissionId,
          user.id
        );

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

  const submit = async (data: ITenBsPostpartumAssesmentInputs) => {
    try {
      TenBsPostpartumAssesmentInputsSchema.parse(data);

      let response;

      if (!user) {
        throw new Error("User Missing");
      }

      if (verb === "new") {
        response = await createTenBsPostpartumAssesmentRecord(data, user.id);
      } else {
        response = await updateTenBsPostpartumAssesmentRecord(
          data,
          submissionId,
          user.id
        );
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong! Please try again later");

      router.push("/dashboard");

      return;
    }

    setSuccessMessage(
      "Ten B's Postpartum Assesment Form submitted successfully!"
    );
    router.push("/dashboard");
  };

  const renderCheckboxes = (
    fieldName: keyof typeof TenBsPostpartumAssesmentInputsSchema.shape,
    label: string
  ) => (
    <div className="flex items-center justify-between mb-2 ml-4">
      <label className="flex-grow">{label}</label>
      <div className="flex space-x-4">
        <label className="flex items-center">
          <input
            type="radio"
            {...register(fieldName)}
            value="Yes"
            className="mr-1"
          />
          Yes
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            {...register(fieldName)}
            value="No"
            className="mr-1"
          />
          No
        </label>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
      <form
        onSubmit={handleSubmit((data) => submit(data))}
        className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-6"
      >
        <h2 className="font-medium text-lg">
          10 B's: 1 month, 3/6/9/12 month postpartum appointment assessment
        </h2>

        <div className="space-y-2">
          <h3 className="font-medium">Baby</h3>
          {renderCheckboxes("physicalExamBaby", "Physical Exam")}
          {renderCheckboxes("feedingBaby", "Feeding")}
          {renderCheckboxes(
            "growthAndWeightGainBaby",
            "Growth and Weight Gain"
          )}
          <p className="ml-8 text-sm">• WHO growth chart</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Breasts</h3>
          {renderCheckboxes(
            "assessSupplyLatchMilkTransferPainBreasts",
            "Assess supply, latch, milk transfer, pain"
          )}
          {renderCheckboxes(
            "referLactationConsultantBreasts",
            "Refer to lactation consultant/public health nursing service"
          )}
          {renderCheckboxes(
            "educationCollectionStorageMilkBreasts",
            "Education on collection/storage of breast milk"
          )}
          {renderCheckboxes("mastisisSignsBreasts", "Mastitis signs")}
          <p className="ml-8 text-sm">
            • Fever, flu-like symptoms, erythema of breasts
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Bowels</h3>
          {renderCheckboxes(
            "constipationTreatementBowels",
            "Constipation treatment to reduce perineal pain"
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Bladder</h3>
          {renderCheckboxes(
            "urinaryIncontinenceBladder",
            "Urinary incontinence"
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Belly</h3>
          {renderCheckboxes("painBelly", "Pain")}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Bottom</h3>
          {renderCheckboxes(
            "perinealPainBotton",
            "Perineal pain should resolve by now"
          )}
          {renderCheckboxes("hemorrhoidsBottom", "Hemorrhoids")}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Bleeding</h3>
          {renderCheckboxes("finishedBleeding", "Should be finished by now")}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Baby blues/postpartum depression</h3>
          {renderCheckboxes(
            "screenBabyBluePostpartumDepression",
            "Screen for both of these"
          )}
          {renderCheckboxes("EPDStool", "EPDS tool")}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Birth control</h3>
          {renderCheckboxes("birthControl", "Discuss at this point")}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Blood work</h3>
          {renderCheckboxes("bloodwork", "If needed, refer")}
          <p className="ml-8 text-sm">• Diabetes, anemia, hormones, etc.</p>
        </div>
        <div className="space-y-4 mt-8">
          <h3 className="font-medium text-lg">Additional Resources:</h3>
          <a
            className="block px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200 ease-in-out"
            href="https://www.mass.gov/doc/a-guide-for-your-6-week-postpartum-checkup/download"
            target="_blank"
            rel="noopener noreferrer"
          >
            Guide for 6 Week Postpartum Checkup
          </a>
          <a
            className="block px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200 ease-in-out"
            href="http://www.perinatalservicesbc.ca/Documents/Resources/Checklists/PSBC_Postpartum_Checklist.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            PSBC Postpartum Checklist
          </a>
        </div>
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

export default TenBsPostpartumAssesmentRecord;
