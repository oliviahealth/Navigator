'use client';

import React, { useEffect, useState } from 'react';
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
            setValue(`${drug}.date_last_used` as keyof ISubstanceUseHistoryInput, null);
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
                response = await updateSubstanceUseHistory(data, submissionId);
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

    useEffect(() => {
        const fetchAndPopulatePastSubmissionData = async () => {
            try {
                if (verb !== 'edit') {
                    return;
                }

                if (!user) {
                    throw new Error('User not found');
                }

                if (!submissionId) {
                    throw new Error('Missing submissionId when fetching past submission');
                }

                const response = await readSubstanceUseHistory(submissionId, user.id);

                SubstanceUseHistoryResponseSchema.parse(response);

                Object.keys(response).forEach((key) => {
                    if (key === 'id' || key === 'user_id') return;

                    const formKey = key as keyof ISubstanceUseHistoryInput;

                    setValue(formKey, response[formKey]);

                    setShowDrugDate((prevState) => ({
                        ...prevState,
                        [key]: response[formKey]?.ever_used === 'Yes',
                    }));
                });
            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');

                router.push('/dashboard');

                return;
            }
        };

        if (!user) return;

        fetchAndPopulatePastSubmissionData();
    }, []);

    return (
    <div className="flex justify-center w-full p-2 mt-2 text-base font-OpenSans">
      <form
        onSubmit={handleSubmit((data) => submit(data))}
        className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-1 [&>p]:pt-6 [&>p]:pb-1 [&>input,&>textarea]:px-4"
      >
        <p className="font-semibold text-red-700">
          Complete with Treatment Case Manager or Recovery Coach
        </p>
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
          <div key={drug} className="pt-10">
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
            </div>
            {showDrugDate[drug] && (
              <>
                <p className="font-medium pt-6">Date Last Used</p>
                <input
                  {...register(`${drug}_date_last_used`)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                  type="date"
                />
                {errors[`${drug}_date_last_used`] && (
                  <span className="label-text-alt text-red-500">
                    {errors[`${drug}_date_last_used`]?.message}
                  </span>
                )}
              </>
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

        <div className="pt-10">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-medium py-6">Substance {index + 1}</p>
                <button
                  type="button"
                  onClick={() => fields.length > 0 && remove(fields.length - 1)}
                  className="text-red-600 px-4 py-2 rounded-md"
                >
                  - Remove Substance
                </button>
              </div>
              <input
                {...register(`other_drugs.${index}.drug_used`)}
                placeholder="Substance Name"
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
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
                {...register(`other_drugs.${index}.date_last_used`)}
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

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() =>
                fields.length < 2 &&
                append({
                  drug_used: '',
                  used_during_pregnancy: '',
                  date_last_used: '',
                  notes: '',
                })
              }
              className="text-black px-4 py-2 rounded-md"
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