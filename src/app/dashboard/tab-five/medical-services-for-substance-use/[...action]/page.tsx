'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IMedicalServicesSubstanceUseInputs, MedicalServicesSubstanceUseInputsSchema, MedicalServicesSubstanceUseResponseSchema } from '../definitions';
import { createMedicalServicesSubstanceUseRecord, updateMedicalServicesSubstanceUseRecord, getMedicalServicesSubstanceUseRecord } from '../actions';

const MedicalServicesForSubstanceUse: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const submissionId = searchParams.get('submissionId');

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [showMatDetails, setShowMatDetails] = useState(false);
  const [showAddictionServiceDetails, setShowAddictionServiceDetails] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<IMedicalServicesSubstanceUseInputs>({
    resolver: zodResolver(MedicalServicesSubstanceUseInputsSchema),
    defaultValues: {
      date_used_mat: '',
      date_used_medicine_service: '',
      medications: [{ medication: '', dose: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'medications',
  });

  const handleShowMatDetails = (value: string) => {
    setShowMatDetails(value === 'Prior MAT use');
    if (value !== 'Prior MAT use') {
      setValue('date_used_mat', null);
      setValue('mat_clinic_name', null);
      setValue('mat_clinic_phone', null);
    }
  };

  const handleShowAddictionServiceDetails = (value: string) => {
    setShowAddictionServiceDetails(value === 'Prior Use');
    if (value !== 'Prior Use') {
      setValue('date_used_medicine_service', null);
      setValue('addiction_medicine_clinic', null);
      setValue('addiction_medicine_clinic_phone', null);
    }
  };

  useMemo(async () => {
    if (submissionId) {
      try {
        const response = await getMedicalServicesSubstanceUseRecord(submissionId);
        if (response) {
          MedicalServicesSubstanceUseResponseSchema.parse(response);
          Object.entries(response).forEach(([key, value]) => {
            if (key !== 'id' && key !== 'userId') {
              setValue(key as keyof IMedicalServicesSubstanceUseInputs, value);
            }
          });
          setShowMatDetails(response.mat_engaged === 'Prior MAT use');
          setShowAddictionServiceDetails(response.used_addiction_medicine_services === 'Prior Use');
        }
      } catch (error) {
        console.error('Error fetching Medical Services For Substance Use data:', error);
        setError('Something went wrong! Please try again later');
      }
    }
  }, [submissionId]);

  const onSubmit = async (data: IMedicalServicesSubstanceUseInputs) => {
    try {
      let response;
      if (submissionId) {
        response = await updateMedicalServicesSubstanceUseRecord(data, submissionId, 'userId'); // Replace 'userId' with the actual user ID
        setSuccessMessage('Medical Services For Substance Use updated successfully!');
      } else {
        response = await createMedicalServicesSubstanceUseRecord(data, 'userId'); // Replace 'userId' with the actual user ID
        setSuccessMessage('Medical Services For Substance Use added successfully!');
      }
      console.log('Medical Services For Substance Use data submitted successfully.', response);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting Medical Services For Substance Use data:', error);
      setError('Something went wrong! Please try again later');
    }
  };

  return (
    <div className="flex justify-center w-full p-2 mt-2 text-base font-OpenSans">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-1 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4">
        <p className="font-semibold text-red-700">Complete with MAT Provider</p>
        <div className="w-full h-px bg-gray-300"></div>

        <p className="font-medium">Medication Assisted Treatment (MAT) engaged?</p>
        {['Never', 'Currently', 'Prior MAT use'].map((status) => (
          <label key={status} className="flex pt-2">
            <input
              {...register('mat_engaged')}
              type="radio"
              value={status}
              className="form-radio"
              onChange={(e) => handleShowMatDetails(e.target.value)}
            />
            <span className="ml-2">{status}</span>
          </label>
        ))}
        {errors.mat_engaged && <span className="label-text-alt text-red-500">{errors.mat_engaged.message}</span>}

          <div className='space-y-4 pt-4'>
            <p className="font-medium">Date Last Used</p>
            <input
              {...register('date_used_mat')}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              type="date"
            />
            {errors.date_used_mat && <span className="label-text-alt text-red-500">{errors.date_used_mat.message}</span>}

            <p className="font-medium">MAT Clinic Name</p>
            <input
              {...register('mat_clinic_name')}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.mat_clinic_name && <span className="label-text-alt text-red-500">{errors.mat_clinic_name.message}</span>}

            <p className="font-medium">MAT Clinic Phone</p>
            <input
              {...register('mat_clinic_phone')}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.mat_clinic_phone && <span className="label-text-alt text-red-500">{errors.mat_clinic_phone.message}</span>}
          </div>

        {fields.map((field, index) => (
          <div key={field.id} className="py-6 space-y-6">
            <div className="flex justify-between items-center py-6">
              <p className="font-medium pb-2 pt-8">Medication {index + 1}</p>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
              >
                - Remove Medication
              </button>
            </div>
            <input
              {...register(`medications.${index}.medication`)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.medications && errors.medications[index]?.medication && (
              <span className="label-text-alt text-red-500">{errors.medications[index]?.medication?.message}</span>
            )}

            <p className="font-medium">Dose</p>
            <input
              {...register(`medications.${index}.dose`)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.medications && errors.medications[index]?.dose && (
              <span className="label-text-alt text-red-500">{errors.medications[index]?.dose?.message}</span>
            )}
          </div>
        ))}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => append({ medication: '', dose: '' })}
            className="text-black px-20 py-2 mt-6 rounded-md whitespace-nowrap"
          >
            + Add Medication
          </button>
        </div>

        <p className="font-medium">Used Addiction Medicine Services?</p>
        {['Never', 'Currently', 'Prior Use'].map((status) => (
          <label key={status} className="flex items-center pt-2">
            <input
              {...register('used_addiction_medicine_services')}
              type="radio"
              value={status}
              className="form-radio"
              onChange={(e) => handleShowAddictionServiceDetails(e.target.value)}
            />
            <span className="ml-2">{status}</span>
          </label>
        ))}
        {errors.used_addiction_medicine_services && (
          <span className="label-text-alt text-red-500">{errors.used_addiction_medicine_services.message}</span>
        )}

          <div className='space-y-4 pt-4'>
            <p className="font-medium">Date Last Used</p>
            <input
              {...register('date_used_medicine_service')}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              type="date"
            />
            {errors.date_used_medicine_service && (
              <span className="label-text-alt text-red-500">{errors.date_used_medicine_service.message}</span>
            )}

            <p className="font-medium">Addiction Medicine Clinic Name</p>
            <input
              {...register('addiction_medicine_clinic')}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.addiction_medicine_clinic && (
              <span className="label-text-alt text-red-500">{errors.addiction_medicine_clinic.message}</span>
            )}

            <p className="font-medium">Addiction Medicine Clinic Phone</p>
            <input
              {...register('addiction_medicine_clinic_phone')}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.addiction_medicine_clinic_phone && (
              <span className="label-text-alt text-red-500">{errors.addiction_medicine_clinic_phone.message}</span>
            )}
          </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#AFAFAFAF] text-black px-20 py-2 mt-6 rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicalServicesForSubstanceUse;