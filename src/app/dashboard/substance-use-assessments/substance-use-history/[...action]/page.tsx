"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  createSubstanceUseHistory,
  readSubstanceUseHistory,
  updateSubstanceUseHistory,
} from "../actions";
import {
  ISubstanceUseHistoryInput,
  SubstanceUseHistoryInputSchema,
} from "../definitions";
import useAppStore from "@/lib/useAppStore";

const SubstanceUseHistory: React.FC = () => {
  const router = useRouter();
  const { action } = useParams();

  const verb = action[0];
  const submissionId = action[1];

  const user = useAppStore((state) => state.user);
  const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);
  const setErrorMessage = useAppStore((state) => state.setErrorMessage);

  const [showMatDetails, setShowMatDetails] = useState(false);
  const [showAddictionServiceDetails, setShowAddictionServiceDetails] =
    useState(false);

  type DrugVisibilityState = {
    [key: string]: boolean;
  };

  const [showDrugDate, setShowDrugDate] = useState<DrugVisibilityState>({
    alcohol: false,
    benzodiazepines: false,
    cocaine: false,
    heroin: false,
    kush: false,
    marijuana: false,
    methamphetamine: false,
    prescription_drugs: false,
    tobacco: false,
  });

  const handleDrugDate = (drug: keyof DrugVisibilityState, value: string) => {
    setShowDrugDate((prevState) => ({
      ...prevState,
      [drug]: value === "Yes",
    }));
    if (value === "No") {
      setValue(`${drug}_ever_used` as keyof ISubstanceUseHistoryInput, "No");
      setValue(
        `${drug}_date_last_used` as keyof ISubstanceUseHistoryInput,
        null
      );
      setValue(
        `${drug}_used_during_pregnancy` as keyof ISubstanceUseHistoryInput,
        null
      );
    }
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<ISubstanceUseHistoryInput>({
    resolver: zodResolver(SubstanceUseHistoryInputSchema),
    defaultValues: {
      other_drugs: [],
      medications: [
        {
          medication: "",
          dose: "",
          date: null,
        },
      ],
    },
  });

  const {
    fields: otherDrugFields,
    append: appendOtherDrug,
    remove: removeOtherDrug,
  } = useFieldArray({
    control,
    name: "other_drugs",
  });

  const {
    fields: medicationFields,
    append: appendMedication,
    remove: removeMedication,
  } = useFieldArray({
    control,
    name: "medications",
  });

  const handleShowMatDetails = (value: string) => {
    setShowMatDetails(value !== "Never");
    if (value !== "Never") {
      setValue("date_used_mat", null);
      setValue("mat_clinic_name", null);
      setValue("mat_clinic_phone", null);
    } else {
      setValue('medications', []);
    }
  };

  const handleShowAddictionServiceDetails = (value: string) => {
    setShowAddictionServiceDetails(value !== "Never");
    if (value !== "Never") {
      setValue("date_used_medicine_service", null);
      setValue("addiction_medicine_clinic", null);
      setValue("addiction_medicine_clinic_phone", null);
    }
  };

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

        const response = await readSubstanceUseHistory(submissionId, user.id);
        reset(response)

        setShowAddictionServiceDetails(response.used_addiction_medicine_services !== "Never")
        setShowMatDetails(response.mat_engaged !== "Never")

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

  const submit = async (data: ISubstanceUseHistoryInput) => {
    try {
      if (!user) {
        throw new Error("User not found");
      }

      let response;

      if (verb === "new") {
        response = await createSubstanceUseHistory(data, user.id);
      } else {
        response = await updateSubstanceUseHistory(data, submissionId, user.id);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong! Please try again later");

      router.push("/dashboard/substance-use-assessments");

      return;
    }

    setSuccessMessage("Substance Use History submitted successfully!");
    router.push("/dashboard/substance-use-assessments");
  };

  const addNewSubstance = () => {
    appendOtherDrug({
      drug_used: "",
      used_during_pregnancy: null,
      date_last_used: "",
      notes: "",
    });
  };

  return (
    <div className="flex justify-center w-full p-2 mt-2 text-base font-OpenSans">
      <form
        onSubmit={handleSubmit((data) => submit(data))}
        className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-1 [&>p]:pt-6 [&>p]:pb-1 [&>input,&>textarea]:px-4"
      >
        <div className="pb-4 pt-4 flex flex-col">
          <p className="font-medium text-xl">Substance Use History</p>
          <small className="text-gray-500">
            Update at each encounter/visit
          </small>
          <small className="text-gray-500">Complete with participant</small>
          <small className="text-gray-500">
            Follow up as indicated with provider, social worker, case manager,
            recovery coach etc..
          </small>
        </div>

        <div className="w-full h-px bg-gray-300"></div>
        {(
          [
            "alcohol",
            "benzodiazepines",
            "cocaine",
            "heroin",
            "kush",
            "marijuana",
            "methamphetamine",
            "prescription_drugs",
            "tobacco",
          ] as const
        ).map((drug) => (
          <div key={drug} className="py-6">
            <div className="flex flex-nowrap space-x-4">
              <div className="flex flex-col space-y-2 flex-grow">
                <p className="font-medium">
                  Have they used{" "}
                  {drug === "prescription_drugs"
                    ? "Prescription Drugs"
                    : drug.charAt(0).toUpperCase() + drug.slice(1)}
                  ?
                </p>
                {["Yes", "No"].map((status) => (
                  <label key={status} className="inline-flex items-center">
                    <input
                      {...register(`${drug}_ever_used`)}
                      className="mr-2"
                      type="radio"
                      value={status}
                      onChange={(e) => handleDrugDate(drug, e.target.value)}
                    />
                    {status}
                  </label>
                ))}
                {errors[`${drug}_ever_used`] && (
                  <span className="label-text-alt text-red-500">
                    {errors[`${drug}_ever_used`]?.message}
                  </span>
                )}
              </div>
              {showDrugDate[drug] && (
                <div className="flex flex-col space-y-2 flex-grow">
                  <p className="font-medium">Used during Pregnancy?</p>
                  {["Yes", "No"].map((status) => (
                    <label key={status} className="inline-flex items-center">
                      <input
                        {...register(`${drug}_used_during_pregnancy`)}
                        className="mr-2"
                        type="radio"
                        value={status}
                      />
                      {status}
                    </label>
                  ))}
                  {errors[`${drug}_used_during_pregnancy`] && (
                    <span className="label-text-alt text-red-500">
                      {errors[`${drug}_used_during_pregnancy`]?.message}
                    </span>
                  )}
                </div>
              )}
            </div>
            {showDrugDate[drug] && (
              <div>
                <p className="font-medium pt-6">Date Last Used</p>
                <input
                  {...register(`${drug}_date_last_used`, {
                    valueAsDate: true, // Ensures the date is interpreted as an ISO-8601 date object
                  })}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                  type="date"
                />
                {errors[`${drug}_date_last_used`] && (
                  <span className="label-text-alt text-red-500">
                    {errors[`${drug}_date_last_used`]?.message}
                  </span>
                )}
              </div>
            )}
            <p className="font-medium pt-6">Notes</p>
            <textarea
              {...register(`${drug}_notes`)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors[`${drug}_notes`] && (
              <span className="label-text-alt text-red-500">
                {errors[`${drug}_notes`]?.message}
              </span>
            )}
          </div>
        ))}

        <div>
          {otherDrugFields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-medium py-6">Substance {index + 1}</p>
                <button
                  type="button"
                  onClick={() => removeOtherDrug(index)}
                  className="font-semibold text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                >
                  - Remove Substance
                </button>
              </div>
              <input
                {...register(`other_drugs.${index}.drug_used`)}
                placeholder="Substance Name"
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                onChange={(e) =>
                  handleDrugDate(`other_drugs.${index}`, e.target.value)
                }
              />
              {errors.other_drugs && errors.other_drugs[index]?.drug_used && (
                <span className="label-text-alt text-red-500">
                  {errors.other_drugs[index]?.drug_used?.message}
                </span>
              )}

              <p className="font-medium">Used during pregnancy?</p>
              <div className="flex space-x-2">
                {["Yes", "No"].map((status) => (
                  <label key={status} className="inline-flex items-center">
                    <input
                      {...register(
                        `other_drugs.${index}.used_during_pregnancy`
                      )}
                      type="radio"
                      value={status}
                      className="mr-2"
                    />
                    {status}
                  </label>
                ))}
              </div>
              {errors.other_drugs &&
                errors.other_drugs[index]?.used_during_pregnancy && (
                  <span className="label-text-alt text-red-500">
                    {errors.other_drugs[index]?.used_during_pregnancy?.message}
                  </span>
                )}

              <p className="font-medium">Date last used</p>
              <input
                {...register(`other_drugs.${index}.date_last_used`, {
                  valueAsDate: true, // Ensures the date is interpreted as an ISO-8601 date object
                })}
                type="date"
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
              {errors.other_drugs &&
                errors.other_drugs[index]?.date_last_used && (
                  <span className="label-text-alt text-red-500">
                    {errors.other_drugs[index]?.date_last_used?.message}
                  </span>
                )}

              <p className="font-medium">Notes</p>
              <textarea
                {...register(`other_drugs.${index}.notes`)}
                placeholder="Notes"
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
              {errors.other_drugs && errors.other_drugs[index]?.notes && (
                <span className="label-text-alt text-red-500">
                  {errors.other_drugs[index]?.notes?.message}
                </span>
              )}
            </div>
          ))}

          <div className="flex justify-center py-4">
            <button
              type="button"
              onClick={addNewSubstance}
              className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
            >
              + Add Substance
            </button>
          </div>
        </div>

        <p className="font-medium">Other Notes</p>
        <textarea
          {...register("notes")}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
        />
        {errors.notes && (
          <span className="label-text-alt text-red-500">
            {errors.notes?.message}
          </span>
        )}

        <p className="font-semibold text-red-700">Complete with MAT Provider</p>
        <div className="w-full h-px bg-gray-300"></div>

        <p className="font-medium">
          Medication Assisted Treatment (MAT) engaged?
        </p>
        {["Never", "Currently", "Previously"].map((status) => (
          <label key={status} className="flex pt-2">
            <input
              {...register("mat_engaged")}
              type="radio"
              value={status}
              className="form-radio"
              onChange={(e) => handleShowMatDetails(e.target.value)}
            />
            <span className="ml-2">{status}</span>
          </label>
        ))}
        {errors.mat_engaged && (
          <span className="label-text-alt text-red-500">
            {errors.mat_engaged.message}
          </span>
        )}

        {showMatDetails && (
          <div className="space-y-4 pt-4">
            <p className="font-medium">Date Last Used</p>
            <input
              {...register("date_used_mat", { valueAsDate: true })}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              type="date"
            />
            {errors.date_used_mat && (
              <span className="label-text-alt text-red-500">
                {errors.date_used_mat.message}
              </span>
            )}

            <p className="font-medium">MAT Clinic Name</p>
            <input
              {...register("mat_clinic_name")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.mat_clinic_name && (
              <span className="label-text-alt text-red-500">
                {errors.mat_clinic_name.message}
              </span>
            )}

            <p className="font-medium">MAT Clinic Phone</p>
            <input
              {...register("mat_clinic_phone")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.mat_clinic_phone && (
              <span className="label-text-alt text-red-500">
                {errors.mat_clinic_phone.message}
              </span>
            )}
          </div>
        )}

        {showMatDetails && (
          <div>
            {medicationFields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <div className="flex justify-between items-center py-6">
                  <p className="font-medium pt-8">Medication {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeMedication(index)}
                    className="text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                  >
                    - Remove Medication
                  </button>
                </div>
                <input
                  {...register(`medications.${index}.medication`)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.medications &&
                  errors.medications[index]?.medication && (
                    <span className="label-text-alt text-red-500">
                      {errors.medications[index]?.medication?.message}
                    </span>
                  )}

                <p className="font-medium">Dose</p>
                <input
                  {...register(`medications.${index}.dose`)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.medications && errors.medications[index]?.dose && (
                  <span className="label-text-alt text-red-500">
                    {errors.medications[index]?.dose?.message}
                  </span>
                )}

                <p className="font-medium">Date</p>
                <input
                  {...register(`medications.${index}.date`, { valueAsDate: true })}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                  type="date"
                />
                {errors.medications && errors.medications[index]?.date && (
                  <span className="label-text-alt text-red-500">
                    {errors.medications[index]?.date?.message}
                  </span>
                )}
              </div>
            ))}

            <div className="flex justify-center py-4">
              <button
                type="button"
                onClick={() => appendMedication({ medication: "", dose: "" })}
                className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
              >
                + Add Medication
              </button>
            </div>
          </div>
        )}

        <p className="font-medium">Used Addiction Medicine Services?</p>
        {["Never", "Currently", "Previously"].map((status) => (
          <label key={status} className="flex items-center pt-2">
            <input
              {...register("used_addiction_medicine_services")}
              type="radio"
              value={status}
              className="form-radio"
              onChange={(e) =>
                handleShowAddictionServiceDetails(e.target.value)
              }
            />
            <span className="ml-2">{status}</span>
          </label>
        ))}
        {errors.used_addiction_medicine_services && (
          <span className="label-text-alt text-red-500">
            {errors.used_addiction_medicine_services.message}
          </span>
        )}

        {showAddictionServiceDetails && (
          <div className="space-y-4 pt-4">
            <p className="font-medium">Date Last Used</p>
            <input
              {...register("date_used_medicine_service", { valueAsDate: true })}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              type="date"
            />
            {errors.date_used_medicine_service && (
              <span className="label-text-alt text-red-500">
                {errors.date_used_medicine_service.message}
              </span>
            )}

            <p className="font-medium">Addiction Medicine Clinic Name</p>
            <input
              {...register("addiction_medicine_clinic")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.addiction_medicine_clinic && (
              <span className="label-text-alt text-red-500">
                {errors.addiction_medicine_clinic.message}
              </span>
            )}

            <p className="font-medium">Addiction Medicine Clinic Phone</p>
            <input
              {...register("addiction_medicine_clinic_phone")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.addiction_medicine_clinic_phone && (
              <span className="label-text-alt text-red-500">
                {errors.addiction_medicine_clinic_phone.message}
              </span>
            )}
          </div>
        )}

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

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md"
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

export default SubstanceUseHistory;
