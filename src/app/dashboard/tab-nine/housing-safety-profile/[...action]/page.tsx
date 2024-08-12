"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  HouseholdHousingSafetyProfileInputsSchema,
  IHouseholdHousingSafetyProfileInputs,
  TimeframeEnum,
  InsuranceTypeEnum,
  EducationLevelEnum,
  EmploymentStatusEnum,
  YesNoEnum,
  HousingStatusEnum,
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import {
  createHouseholdHousingSafetyProfile,
  readHouseholdHousingSafetyProfile,
  updateHouseholdHousingSafetyProfile,
} from "../actions";

const HouseholdHousingSafetyProfile: React.FC = () => {
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
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IHouseholdHousingSafetyProfileInputs>({
    resolver: zodResolver(HouseholdHousingSafetyProfileInputsSchema),
  });

  const watchHighSchoolDiploma = watch("highSchoolDiploma");
  const watchUsesTobacco = watch("usesTobacco");
  const watchCurrentlyPregnant = watch("currentlyPregnant");
  const watchInsuranceType = watch("insuranceType");

  useEffect(() => {
    setValue("yearlyHouseholdIncome", null);
    setValue("incomeUndeterminedReason", null);
  }, []);

  const submit = async (data: IHouseholdHousingSafetyProfileInputs) => {
    try {
      let response;

      if (!user) {
        throw new Error("User missing");
      }

      if (verb === "new") {
        response = await createHouseholdHousingSafetyProfile(data, user.id);
      } else {
        response = await updateHouseholdHousingSafetyProfile(
          data,
          submissionId,
          user.id
        );
      }

      HouseholdHousingSafetyProfileInputsSchema.parse(response);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong! Please try again later");
      return;
    }

    setSuccessMessage(
      "Household Housing Safety Profile submitted successfully!"
    );
    router.push("/dashboard");
  };

  return (
    <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
      <form
        onSubmit={handleSubmit((data) => submit(data))}
        className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-4 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
      >
        <div className="pt-6">
          <p className="font-semibold text-2xl">
            {verb === "new" ? "New" : "Edit"} Household Housing Safety Profile
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-4">
            <p className="font-semibold">Participant Name</p>
            <input
              {...register("participantName")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.participantName?.message && (
              <span className="label-text-alt text-red-500">
                {errors.participantName.message}
              </span>
            )}
          </div>
          <div className="space-y-4">
            <p className="font-semibold">Case ID</p>
            <input
              {...register("caseId")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.caseId?.message && (
              <span className="label-text-alt text-red-500">
                {errors.caseId.message}
              </span>
            )}
          </div>
          <div className="space-y-4">
            <p className="font-semibold">Date Completed</p>
            <input
              {...register("dateCompleted", { valueAsDate: true })}
              type="date"
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.dateCompleted?.message && (
              <span className="label-text-alt text-red-500">
                {errors.dateCompleted.message}
              </span>
            )}
          </div>
          <div className="space-y-4">
            <p className="font-semibold">Staff Name</p>
            <input
              {...register("staffName")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.staffName?.message && (
              <span className="label-text-alt text-red-500">
                {errors.staffName.message}
              </span>
            )}
          </div>
          <div className="space-y-4">
            <p className="font-semibold">Timeframe</p>
            <div className="space-x-4">
              {Object.values(TimeframeEnum.Values).map((timeframe) => (
                <label key={timeframe} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register("timeframe")}
                    value={timeframe}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{timeframe}</span>
                </label>
              ))}
            </div>
            {errors.timeframe?.message && (
              <span className="label-text-alt text-red-500">
                {errors.timeframe.message}
              </span>
            )}
          </div>
          <div className="space-y-4">
            <p className="font-semibold">
              What kind of health insurance coverage do you have?
            </p>
            <select
              {...register("insuranceType")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              <option value="">Select insurance type</option>
              {Object.values(InsuranceTypeEnum.Values).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.insuranceType?.message && (
              <span className="label-text-alt text-red-500">
                {errors.insuranceType.message}
              </span>
            )}
            {watchInsuranceType === "Other insurance" && (
              <input
                {...register("otherInsurance")}
                placeholder="Specify other insurance"
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
            )}
          </div>
          <div className="space-y-4">
            <p className="font-semibold">
              Do you have a high school diploma or GED?
            </p>
            <div className="space-x-4">
              {Object.values(YesNoEnum.Values).map((value) => (
                <label key={value} className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register("highSchoolDiploma")}
                    value={value}
                    className="form-radio"
                  />
                  <span className="ml-2">{value}</span>
                </label>
              ))}
            </div>
            {errors.highSchoolDiploma?.message && (
              <span className="label-text-alt text-red-500">
                {errors.highSchoolDiploma.message}
              </span>
            )}
          </div>
          {watchHighSchoolDiploma === "Yes" && (
            <div className="space-y-4">
              <p className="font-semibold">
                If yes, what is the highest level of education completed?
              </p>
              <select
                {...register("highestEducation")}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              >
                <option value="">Select education level</option>
                {Object.values(EducationLevelEnum.Values).map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.highestEducation?.message && (
                <span className="label-text-alt text-red-500">
                  {errors.highestEducation.message}
                </span>
              )}
            </div>
          )}
          <div className="space-y-4">
            <p className="font-semibold">
              Are you currently enrolled in any type of school or training
              program?
            </p>
            <div className="space-x-4">
              {Object.values(YesNoEnum.Values).map((value) => (
                <label key={value} className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register("currentlyEnrolled")}
                    value={value}
                    className="form-radio"
                  />
                  <span className="ml-2">{value}</span>
                </label>
              ))}
            </div>
            {errors.currentlyEnrolled?.message && (
              <span className="label-text-alt text-red-500">
                {errors.currentlyEnrolled.message}
              </span>
            )}
            {watch("currentlyEnrolled") === "Yes" && (
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register("middleHighSchoolGED")}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Middle/High School/GED prep</span>
                </label>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <p className="font-semibold">What is your employment status?</p>
            <select
              {...register("employmentStatus")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              <option value="">Select employment status</option>
              {Object.values(EmploymentStatusEnum.Values).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.employmentStatus?.message && (
              <span className="label-text-alt text-red-500">
                {errors.employmentStatus.message}
              </span>
            )}
          </div>
          <div className="space-y-4">
            <p className="font-semibold">Do you use tobacco?</p>
            <div className="space-x-4">
              {Object.values(YesNoEnum.Values).map((value) => (
                <label key={value} className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register("usesTobacco")}
                    value={value}
                    className="form-radio"
                  />
                  <span className="ml-2">{value}</span>
                </label>
              ))}
            </div>
            {errors.usesTobacco?.message && (
              <span className="label-text-alt text-red-500">
                {errors.usesTobacco.message}
              </span>
            )}
          </div>
          {watchUsesTobacco === "Yes" && (
            <div className="space-y-4">
              <p className="font-semibold">
                If yes, are you currently receiving tobacco cessation services?
              </p>
              <div className="space-x-4">
                {Object.values(YesNoEnum.Values).map((value) => (
                  <label key={value} className="inline-flex items-center">
                    <input
                      type="radio"
                      {...register("tobaccoCessationServices")}
                      value={value}
                      className="form-radio"
                    />
                    <span className="ml-2">{value}</span>
                  </label>
                ))}
              </div>
              {errors.tobaccoCessationServices?.message && (
                <span className="label-text-alt text-red-500">
                  {errors.tobaccoCessationServices.message}
                </span>
              )}
            </div>
          )}
          <div className="space-y-4">
            <p className="font-semibold">
              For Female Participants Only: Are you currently pregnant?
            </p>
            <div className="space-x-4">
              {Object.values(YesNoEnum.Values).map((value) => (
                <label key={value} className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register("currentlyPregnant")}
                    value={value}
                    className="form-radio"
                  />
                  <span className="ml-2">{value}</span>
                </label>
              ))}
            </div>
            {errors.currentlyPregnant?.message && (
              <span className="label-text-alt text-red-500">
                {errors.currentlyPregnant.message}
              </span>
            )}
          </div>
          {watchCurrentlyPregnant === "No" && (
            <div className="space-y-4">
              <p className="font-semibold">
                If no, would you like to become pregnant in the next year?
              </p>
              <div className="space-x-4">
                {Object.values(YesNoEnum.Values).map((value) => (
                  <label key={value} className="inline-flex items-center">
                    <input
                      type="radio"
                      {...register("wantPregnant")}
                      value={value}
                      className="form-radio"
                    />
                    <span className="ml-2">{value}</span>
                  </label>
                ))}
              </div>
              {errors.wantPregnant?.message && (
                <span className="label-text-alt text-red-500">
                  {errors.wantPregnant.message}
                </span>
              )}
            </div>
          )}
          <div className="space-y-4">
            <p className="font-semibold">
              During the past 12 months, what was your yearly total household
              income before taxes?
            </p>
            <input
              type="number"
              {...register("yearlyHouseholdIncome", { valueAsNumber: true })}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.yearlyHouseholdIncome?.message && (
              <span className="label-text-alt text-red-500">
                {errors.yearlyHouseholdIncome.message}
              </span>
            )}
          </div>
          <div className="space-y-4">
            <p className="font-semibold">
              If income cannot be determined, indicate the primary reason:
            </p>
            <select
              {...register("incomeUndeterminedReason")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              <option value="">Select reason</option>
              <option value="Key family member would not share">
                Key family member would not share
              </option>
              <option value="Participant is in foster care">
                Participant is in foster care
              </option>
              <option value="Other">Other</option>
            </select>
            {errors.incomeUndeterminedReason?.message && (
              <span className="label-text-alt text-red-500">
                {errors.incomeUndeterminedReason.message}
              </span>
            )}
            {watch("incomeUndeterminedReason") === "Other" && (
              <input
                {...register("otherIncomeUndeterminedReason")}
                placeholder="Specify other reason"
                className="border border-gray-300 px-4 py-2 rounded-md w-full mt-2"
              />
            )}
          </div>
          <div className="space-y-4">
            <p className="font-semibold">
              How many people depend on this income?
            </p>
            <input
              type="number"
              {...register("dependentsCount", { valueAsNumber: true })}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.dependentsCount?.message && (
              <span className="label-text-alt text-red-500">
                {errors.dependentsCount.message}
              </span>
            )}
          </div>
          <div className="space-y-4">
            <p className="font-semibold">
              Which of the following best describes the family's housing
              situation?
            </p>
            <select
              {...register("housingStatus")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              <option value="">Select housing status</option>
              <optgroup label="Not Homeless">
                {[
                  "Owns or shares own home",
                  "Rents or shares rented home",
                  "Lives in public housing",
                  "Lives with parent/family member",
                  "Some other arrangement",
                ].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Homeless">
                {[
                  "Sharing housing",
                  "Lives in a shelter",
                  "Some other arrangement",
                ].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </optgroup>
            </select>
            {errors.housingStatus?.message && (
              <span className="label-text-alt text-red-500">
                {errors.housingStatus.message}
              </span>
            )}
          </div>
          <div>
            <hr className="border-t-1 border-gray-400 my-4" />
            <div>
              <p className="font-semibold pb-2 pt-8">Submission Label</p>
              <textarea
                {...register("label")}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
              {errors.label && (
                <span className="label-text-alt text-red-500">
                  {errors.label.message}
                </span>
              )}
            </div>
            <div>
              <p className="font-semibold pb-2 pt-8">Staff Notes</p>
              <textarea
                {...register("staffNotes")}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
              {errors.staffNotes && (
                <span className="label-text-alt text-red-500">
                  {errors.staffNotes.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-center py-4">
            <button
              type="submit"
              className="flex items-center justify-center gap-x-2 w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto font-semibold"
              disabled={isSubmitting}
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

export default HouseholdHousingSafetyProfile;
