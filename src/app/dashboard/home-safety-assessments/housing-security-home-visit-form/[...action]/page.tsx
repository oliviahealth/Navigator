"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
  HousingSecurityHomeVisitResponseSchema,
  IHousingSecurityHomeVisitInputs,
  HousingSecurityHomeVisitInputsSchema
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import {
  createHousingSecurityHomeVisit,
  updateHousingSecurityHomeVisit
} from "../actions";

const HousingSecurityHomeVisit: React.FC = () => {
  const router = useRouter();
  const { action } = useParams();

  const verb = action[0];
  const submissionId = action[1];

  const user = useAppStore(state => state.user);

  const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);
  const setErrorMessage = useAppStore((state) => state.setErrorMessage);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IHousingSecurityHomeVisitInputs>({
    resolver: zodResolver(HousingSecurityHomeVisitInputsSchema),
    defaultValues: {
      erVisitSpecific: [{
        visitDate: null,
        visitReason: null
      }],
      wellChildVisitsSpecific: [{
        childName: '',
        wellChildVisitsCompleted: []
      }]
    }
  });

  const { fields: erVisitSpecificFields, append: addErVisitSpecific, remove: removeErVisitSpecific } = useFieldArray({
    control,
    name: 'erVisitSpecific',
  });

  const { fields: wellChildVisitsSpecificFields, append: addWellChildVisitSpecific, remove: removeWellChildVisitsSpecific } = useFieldArray({
    control,
    name: 'wellChildVisitsSpecific',
  });

  const addNewErVisit = () => {
    addErVisitSpecific({
      visitDate: null,
      visitReason: null
    })
  }

  const addNewWellChildVisit = () => {
    addWellChildVisitSpecific({
      childName: '',
      wellChildVisitsCompleted: []
    })
  }

  const [showErVisitSpecific, setShowErVisitSpecific] = useState(false);
  const [showWellChildVisitsSpecific, setShowWellChildVisitsSpecific] = useState(false);

  const handleErVisitChange = (value: string) => {
    if (value === 'Yes') {
      setShowErVisitSpecific(true);
    } else {
      setShowErVisitSpecific(false);
      setValue("erVisitSpecific", null);
    }
  };

  const handleWellChildVisitChange = (value: string) => {
    if (value === 'Yes') {
      setShowWellChildVisitsSpecific(true);
    } else {
      setShowWellChildVisitsSpecific(false);
      setValue("wellChildVisitsSpecific", null);
    }
  };

  const submit = async (data: IHousingSecurityHomeVisitInputs) => {
    try {
      let response;

      if (!user) {
        throw new Error("User missing");
      }

      if (verb === "new") {
        response = await createHousingSecurityHomeVisit(data, user.id);
      } else {
        response = await updateHousingSecurityHomeVisit(
          data,
          submissionId,
          user.id
        );
      }

      HousingSecurityHomeVisitResponseSchema.parse(response);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong! Please try again later");
      return;
    }

    setSuccessMessage("Housing Security Home Visit submitted successfully!");
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
            {verb === "new" ? "New" : "Edit"} Housing Security Home Visit Form
          </p>
        </div>

        <div className="space-y-16 pt-12">
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-3">
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
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-semibold">Case ID</p>
          <input
            {...register("caseId")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            type="text"
          />
          {errors.caseId?.message && (
            <span className="label-text-alt text-red-500">
              {errors.caseId.message}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <p className="font-semibold">Date of Visit</p>
          <input
            {...register("dateOfVisit", { valueAsDate: true })}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            type="date"
          />
          {errors.dateOfVisit && (
            <span className="label-text-alt text-red-500">
              {errors.dateOfVisit.message}
            </span>
          )}
        </div>

        <div className="space-y-3">
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

        <div className="space-y-3">
          <p className="font-semibold">Do you have health insurance coverage?</p>
          <div className="space-x-12">
            {["Yes", "No"].map((status, idx) => (
              <label key={idx} className="inline-flex items-center">
                <input
                  {...register(`healthInsurance`)}
                  type="radio"
                  value={status}
                  className="form-radio"
                />
                <span className="ml-2">{status}</span>
              </label>
            ))}
          </div>
          {errors.staffName?.message && (
            <span className="label-text-alt text-red-500">
              {errors.staffName.message}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <p className="font-semibold">Do you have concerns about your child's development, behavior or learning?</p>
          <div className="space-x-12">
            <label className="inline-flex items-center">
              <input
                {...register(`concerns`)}
                type="radio"
                value="Yes"
                className="form-radio"
              />
              <span className="ml-2">Yes</span>
            </label>

            <label className="inline-flex items-center">
              <input
                {...register(`concerns`)}
                type="radio"
                value="No"
                className="form-radio"
              />
              <span className="ml-2">No</span>
            </label>

            <label className="inline-flex items-center">
              <input
                {...register(`concerns`)}
                type="radio"
                value="Did_Not_Ask"
                className="form-radio"
              />
              <span className="ml-2">Did Not Ask</span>
            </label>
          </div>
          {errors.staffName?.message && (
            <span className="label-text-alt text-red-500">
              {errors.staffName.message}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <p className="font-semibold">Since our last visit, have you taken your child to the emergency room?</p>
          <div className="space-x-12">
            {["Yes", "No"].map((status, idx) => (
              <label key={idx} className="inline-flex items-center">
                <input
                  {...register(`erVisit`)}
                  type="radio"
                  value={status}
                  className="form-radio"
                  onChange={(e) => handleErVisitChange(e.target.value)}
                />
                <span className="ml-2">{status}</span>
              </label>
            ))}
          </div>
          {errors.staffName?.message && (
            <span className="label-text-alt text-red-500">
              {errors.staffName.message}
            </span>
          )}
          {showErVisitSpecific && (
            <div>
              {erVisitSpecificFields.map((field, index) => {
                return (
                  <div key={field.id} className="space-y-4">
                    <div className="flex justify-between items-center">
                      {(erVisitSpecificFields.length > 0) && (
                        <div className="w-full flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeErVisitSpecific(index)}
                            className="font-semibold text-red-600 px-4 py-2 rounded-md whitespace-nowrap"
                          >
                            - Remove Entry
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-between space-y-3">
                      <p className="font-semibold">ER Visit Date</p>

                      <input
                        {...register(`erVisitSpecific.${index}.visitDate`, { valueAsDate: true })}
                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        type="date"

                      />
                      {errors.erVisitSpecific && errors.erVisitSpecific[index]?.visitDate && (
                        <span className="label-text-alt text-red-500">
                          {errors.erVisitSpecific[index]?.visitDate?.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col justify-between space-y-3">
                      <p className="font-semibold">ER Visit Reason</p>

                      <div className="flex flex-row space-x-4">
                        <label className="inline-flex items-center pt-2">
                          <input
                            {...register(`erVisitSpecific.${index}.visitReason`)}
                            type="radio"
                            value="Injury"
                            className="form-radio"
                          />
                          <span className="ml-2">Injury</span>
                        </label>

                        <label className="inline-flex items-center pt-2">
                          <input
                            {...register(`erVisitSpecific.${index}.visitReason`)}
                            type="radio"
                            value="Other"
                            className="form-radio"
                          />
                          <span className="ml-2">Other</span>
                        </label>
                      </div>
                      {errors.erVisitSpecific && errors.erVisitSpecific[index]?.visitReason && (
                        <span className="label-text-alt text-red-500">
                          {errors.erVisitSpecific[index]?.visitReason?.message}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-center py-4">
                <button
                  type="button"
                  onClick={addNewErVisit}
                  className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                >
                  + Add ER Visit Entry
                </button>
              </div>

            </div>
          )}
        </div>

        <div className="space-y-3">
          <p className="font-semibold">Since our last visit, has your child had any well-child visits?</p>
          <div className="space-x-12">
            {["Yes", "No"].map((status, idx) => (
              <label key={idx} className="inline-flex items-center">
                <input
                  {...register(`wellChildVisits`)}
                  type="radio"
                  value={status}
                  className="form-radio"
                  onChange={(e) => handleWellChildVisitChange(e.target.value)}
                />
                <span className="ml-2">{status}</span>
              </label>
            ))}
          </div>
          {errors.wellChildVisits?.message && (
            <span className="label-text-alt text-red-500">
              {errors.wellChildVisits.message}
            </span>
          )}
          {showWellChildVisitsSpecific && (
            <div>
              {wellChildVisitsSpecificFields.map((field, index) => {
                return (
                  <div key={field.id} className="space-y-4">
                    <div className="flex justify-between items-center">
                      {(wellChildVisitsSpecificFields.length > 0) && (
                        <div className="w-full flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeWellChildVisitsSpecific(index)}
                            className="font-semibold text-red-600 px-4 py-2 rounded-md whitespace-nowrap"
                          >
                            - Remove Entry
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-between space-y-3">
                      <p className="font-semibold">Child Name</p>

                      <input
                        {...register(`wellChildVisitsSpecific.${index}.childName`)}
                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        type="text"
                      />
                      {errors.wellChildVisitsSpecific && errors.wellChildVisitsSpecific[index]?.childName && (
                        <span className="label-text-alt text-red-500">
                          {errors.wellChildVisitsSpecific[index]?.childName?.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col justify-between space-y-3">
                      <p className="font-semibold">Well Child Visits Completed</p>
                      <div className="grid grid-cols-3 gap-6">
                        {[
                          'Newborn', '3-7 days old', '2-4 weeks old', '2-3 months old', '4-5 months old',
                          '6-7 months old', '9-10 months old', '12-13 months old', '15-16 months old',
                          '18-19 months old', '2-2.5 years old', '3-3.5 years old', '4-4.5 years old'
                        ].map((status, idx) => (
                          <label key={idx} className="inline-flex items-center">
                            <input
                              {...register(`wellChildVisitsSpecific.${index}.wellChildVisitsCompleted`)}
                              type="checkbox"
                              value={status}
                              className="form-radio"
                            />
                            <span className="ml-2">{status}</span>
                          </label>
                        ))}
                      </div>

                      {errors.erVisitSpecific && errors.erVisitSpecific[index]?.visitReason && (
                        <span className="label-text-alt text-red-500">
                          {errors.erVisitSpecific[index]?.visitReason?.message}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-center py-4">
                <button
                  type="button"
                  onClick={addNewWellChildVisit}
                  className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                >
                  + Add Well-Child Visit Entry
                </button>
              </div>

            </div>
          )}
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
      </form>
    </div>
  );
};

export default HousingSecurityHomeVisit;
