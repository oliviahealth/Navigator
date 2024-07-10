"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  NewAssessmentFormInputsSchema,
  INewAssessmentFormInputs,
} from "../definitions";
import useAppStore from "@/lib/useAppStore";
import {
  createNewAssessmentFormEntry,
  readNewAssessmentFormEntry,
  updateNewAssessmentFormEntry,
} from "../actions";

const NewAssessmentForm: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  const action = params.actions?.[0] ?? "new";

  const verb = action;
  const submissionId = params.actions?.[1];

  // debugging
  // useEffect(() => {
  //   console.log("Params:", params);
  //   console.log("Action:", params.actions?.[0]);
  //   console.log("Submission ID:", params.actions?.[1]);
  // }, [params]);
  // console.log('Verb:', verb, 'Submission ID:', submissionId);

  const user = useAppStore((state) => state.user);
  const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);
  const setErrorMessage = useAppStore((state) => state.setErrorMessage);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INewAssessmentFormInputs>({
    resolver: zodResolver(NewAssessmentFormInputsSchema),
  });

  const onSubmit = async (data: INewAssessmentFormInputs) => {
    try {
      if (!user) {
        throw new Error("User not found");
      }

      let response;

      if (verb === "new") {
        response = await createNewAssessmentFormEntry(data, user.id);
      } else if (verb === "edit" && submissionId) {
        response = await updateNewAssessmentFormEntry(
          data,
          submissionId,
          user.id
        );
      } else if (verb === "edit" && !submissionId) {
        throw new Error("Missing submissionId for edit action");
      } else {
        throw new Error(`Invalid action: ${verb}`);
      }

      NewAssessmentFormInputsSchema.parse(response);
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

    setSuccessMessage("New Assessment submitted successfully!");
    router.push("/dashboard");
  };

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

        const response = await readNewAssessmentFormEntry(
          submissionId,
          user.id
        );

        NewAssessmentFormInputsSchema.parse(response);
      } catch (error) {
        console.error(error);
        setErrorMessage("Something went wrong! Please try again later");
        router.push("/dashboard");
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
          Multidimensional Scale
        </p>
        <div className="space-y-4">
          <div className="mt-4 p-4 bg-blue-100 rounded-md">
            <p className="font-medium text-center">
              MEASURE OF PERCEIVED ADEQUACY OF SOCIAL SUPPORT FROM THREE SOURCES
            </p>
            <p className="text-sm text-center mt-2">
              The Multidimensional Scale of Perceived Social Support (Zimet et
              al., 1988) is a 12-item measure of perceived adequacy of social
              support from three sources: family, friends, & significant other.
            </p>
            <p className="text-sm text-center mt-2">
              It uses a 5-point Likert scale (0 = strongly disagree, 5 =
              strongly agree).
            </p>
          </div>
        </div>
        <div className="py-2 space-y-4">
          <div className="flex flex-col justify-between">
            <label htmlFor="assessmentDate" className="font-semibold pb-2 pt-2">
              Assessment Date (mm/dd/yyyy)
            </label>
            <input
              type="date"
              {...register("assessmentDate")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.assessmentDate && (
              <span className="label-text-alt text-red-500">
                {errors.assessmentDate.message}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <label htmlFor="siteId" className="font-semibold pb-2 pt-2">
              Site ID (01-00 format)
            </label>
            <input
              type="text"
              {...register("siteId")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              placeholder="01-00"
            />
            {errors.siteId && (
              <span className="label-text-alt text-red-500">
                {errors.siteId.message}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <label htmlFor="participantId" className="font-semibold pb-2 pt-2">
              Participant ID
            </label>
            <input
              type="text"
              {...register("participantId")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.participantId && (
              <span className="label-text-alt text-red-500">
                {errors.participantId.message}
              </span>
            )}
          </div>
          <div className="flex flex-col justify-between">
            <label htmlFor="relation" className="font-semibold pb-2 pt-2">
              Relation (01-00 format)
            </label>
            <input
              type="text"
              {...register("relation")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              placeholder="01-00"
            />
            {errors.relation && (
              <span className="label-text-alt text-red-500">
                {errors.relation.message}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <label
              htmlFor="formCompletionStatus"
              className="font-semibold pb-2 pt-2"
            >
              Form Completion Status
            </label>
            <div className="flex items-center">
              <select
                {...register("formCompletionStatus")}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              >
                <option value="">Select status</option>
                <option value="1">1 = Form completed as required</option>
                <option value="2">2 = Participant refused</option>
                <option value="4">4 = Not enough time at the visit</option>
                <option value="5">5 = Participant did not attend visit</option>
              </select>
            </div>
            {errors.formCompletionStatus && (
              <span className="label-text-alt text-red-500">
                {errors.formCompletionStatus.message}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <label htmlFor="phase" className="font-semibold pb-2 pt-2">
              Phase
            </label>
            <div className="flex">
              <label className="mr-4">
                <input
                  type="radio"
                  {...register("phase")}
                  value="Baseline"
                  className="mr-2"
                />
                Baseline
              </label>
              <label>
                <input
                  type="radio"
                  {...register("phase")}
                  value="Post Randomization"
                  className="mr-2"
                />
                Post Randomization
              </label>
            </div>
            {errors.phase && (
              <span className="label-text-alt text-red-500">
                {errors.phase.message}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <label htmlFor="segment" className="font-semibold pb-2 pt-2">
              Segment (2 digit number)
            </label>
            <input
              type="text"
              {...register("segment")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              placeholder="00"
            />
            {errors.segment && (
              <span className="label-text-alt text-red-500">
                {errors.segment.message}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <label
              htmlFor="formCompletionLanguage"
              className="font-semibold pb-2 pt-2"
            >
              Form Completion Language
            </label>
            <div className="flex">
              <label className="mr-4">
                <input
                  type="radio"
                  {...register("formCompletionLanguage")}
                  value="English"
                  className="mr-2"
                />
                English
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  {...register("formCompletionLanguage")}
                  value="Spanish"
                  className="mr-2"
                />
                Spanish
              </label>
              <label>
                <input
                  type="radio"
                  {...register("formCompletionLanguage")}
                  value="Both"
                  className="mr-2"
                />
                Both
              </label>
            </div>
            {errors.formCompletionLanguage && (
              <span className="label-text-alt text-red-500">
                {errors.formCompletionLanguage.message}
              </span>
            )}
          </div>
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

export default NewAssessmentForm;
