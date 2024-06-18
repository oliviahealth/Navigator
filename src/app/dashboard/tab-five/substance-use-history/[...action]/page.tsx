'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { createSubstanceUseHistory, readSubstanceUseHistory, updateSubstanceUseHistory } from "../actions";
import { ISubstanceUseHistoryInput, SubstanceUseHistoryInputSchema, SubstanceUseHistoryResponseSchema } from "../definitions";
import useAppStore from '@/lib/useAppStore';

const SubstanceUseHistory: React.FC = () => {
  const router = useRouter();
  const { action } = useParams();

  const verb = action[0];
  const submissionId = action[1];

  const user = useAppStore(state => state.user);
  const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
  const setErrorMessage = useAppStore(state => state.setErrorMessage);

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
      [drug]: value === 'Yes',
    }));
    if (value === 'No') {
      setValue(`${drug}.ever_used` as keyof ISubstanceUseHistoryInput, 'No')
      setValue(`${drug}_date_last_used` as keyof ISubstanceUseHistoryInput, null);
      setValue(`${drug}_used_during_pregnancy` as keyof ISubstanceUseHistoryInput, null)
    }
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ISubstanceUseHistoryInput>({
    resolver: zodResolver(SubstanceUseHistoryInputSchema),
    defaultValues: {
      other_drugs: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'other_drugs',
  });

  const submit = async (data: ISubstanceUseHistoryInput) => {
    try {
      if (!user) {
        throw new Error('User not found');
      }

      let response;

      if (verb === 'new') {
        response = await createSubstanceUseHistory(data, user.id);
      } else {
        response = await updateSubstanceUseHistory(data, submissionId, user.id);
      }

      SubstanceUseHistoryResponseSchema.parse(response);
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong! Please try again later');

      router.push('/dashboard');

      return;
    }

    setSuccessMessage('Substance Use History submitted successfully!');
    router.push('/dashboard');
  };

  const addNewSubstance = () => {
    append({
      drug_used: '',
      used_during_pregnancy: null,
      date_last_used: '',
      notes: '',
    })
  };

  return (
    <div className="flex justify-center w-full p-2 mt-2 text-base font-OpenSans">
      <form
        onSubmit={handleSubmit((data) => submit(data))}
        className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-1 [&>p]:pt-6 [&>p]:pb-1 [&>input,&>textarea]:px-4"
      >
        <div className="pb-4 pt-4 flex flex-col">
          <p className="font-medium text-xl">Substance Use History</p>
          <small className="text-gray-500">Update at each encounter/visit</small>
          <small className="text-gray-500">Complete with participant</small>
          <small className="text-gray-500">Follow up as indicated with provider, social worker, case manager, recovery coach etc..</small>
        </div>

        <div className="w-full h-px bg-gray-300"></div>
        {(
          [
            'alcohol',
            'benzodiazepines',
            'cocaine',
            'heroin',
            'kush',
            'marijuana',
            'methamphetamine',
            'prescription_drugs',
            'tobacco',
          ] as const
        ).map((drug) => (
          <div key={drug} className="py-6">
            <div className="flex flex-nowrap space-x-4">
              <div className="flex flex-col space-y-2 flex-grow">
                <p className="font-medium">
                  Have they used{' '}
                  {drug === 'prescription_drugs'
                    ? 'Prescription Drugs'
                    : drug.charAt(0).toUpperCase() + drug.slice(1)}
                  ?
                </p>
                {['Yes', 'No'].map((status) => (
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
                  {['Yes', 'No'].map((status) => (
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
                    valueAsDate: true,  // Ensures the date is interpreted as an ISO-8601 date object
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
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-medium py-6">Substance {index + 1}</p>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="font-semibold text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                >
                  - Remove Substance
                </button>
              </div>
              <input
                {...register(`other_drugs.${index}.drug_used`)}
                placeholder="Substance Name"
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                onChange={(e) => handleDrugDate(`other_drugs.${index}`, e.target.value)}
              />
              {errors.other_drugs && errors.other_drugs[index]?.drug_used && (
                <span className="label-text-alt text-red-500">
                  {errors.other_drugs[index]?.drug_used?.message}
                </span>
              )}

              <p className="font-medium">Used during pregnancy?</p>
              <div className="flex space-x-2">
                {['Yes', 'No'].map((status) => (
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
                  valueAsDate: true,  // Ensures the date is interpreted as an ISO-8601 date object
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
          {...register('notes')}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
        />
        {errors.notes && (
          <span className="label-text-alt text-red-500">
            {errors.notes?.message}
          </span>
        )}

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md"
          >
            {isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubstanceUseHistory;