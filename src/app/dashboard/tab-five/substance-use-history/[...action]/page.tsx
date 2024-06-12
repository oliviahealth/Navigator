'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ISubstanceUseHistoryInputs, SubstanceUseHistoryResponseSchema, SubstanceUseHistoryInputsSchema, SubstanceSchema } from '../definitions';
import useAppStore from '@/lib/useAppStore';
import {
    createSubstanceUseHistoryRecord,
    readSubstanceUseHistoryRecord,
    updateSubstanceUseHistoryRecord,
    deleteSubstanceUseHistoryRecord,
} from '../actions';

const SubstanceUseHistoryForm: React.FC = () => {
    const router = useRouter();
    const user = useAppStore((state) => state.user);
    const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);
    const setErrorMessage = useAppStore((state) => state.setErrorMessage);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ISubstanceUseHistoryInputs>({
        resolver: zodResolver(SubstanceUseHistoryInputsSchema),
    });

    const [otherSubstances, setOtherSubstances] = useState<{ name: string; everUsed: boolean; usedDuringPregnancy: boolean; dateLastUsed: string }[]>([]);

    useEffect(() => {
        reset();
    }, [reset]);

    const onSubmit = async (data: ISubstanceUseHistoryInputs) => {
        try {
            if (!user) {
                throw new Error('User missing');
            }

            const response = await createSubstanceUseHistoryRecord({
                ...data,
                userId: user.id,
            });

            SubstanceUseHistoryResponseSchema.parse(response);

            setSuccessMessage('Substance use history submitted successfully!');
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');
        }
    };

    const handleOtherSubstanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if (value && !otherSubstances.some((substance) => substance.name === value)) {
            setOtherSubstances([...otherSubstances, { name: value, everUsed: false, usedDuringPregnancy: false, dateLastUsed: '' }]);
        }
    };

    const handleCheckboxChange = (index: number, field: 'everUsed' | 'usedDuringPregnancy', value: boolean) => {
        setOtherSubstances((prevSubstances) => {
            const updatedSubstances = [...prevSubstances];
            updatedSubstances[index][field] = value;
            return updatedSubstances;
        });
    };

    const handleDateChange = (index: number, value: string) => {
        setOtherSubstances((prevSubstances) => {
            const updatedSubstances = [...prevSubstances];
            updatedSubstances[index].dateLastUsed = value;
            return updatedSubstances;
        });
    };

    const removeOtherSubstance = (index: number) => {
        setOtherSubstances((prevSubstances) => prevSubstances.filter((_, i) => i !== index));
    };

    const predefinedSubstances = [
        'Alcohol',
        'Amphetamines',
        'Benzodiazepines',
        'Cannabis',
        'Cocaine',
        'Heroin',
        'Kush',
        'Prescription Drugs',
        'Tobacco',
    ];

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="flex justify-center">
                  <div className="pb-4 pt-4 flex flex-col">
                      <p className="font-semibold text-2xl">Substance Use History</p>
                  </div>
                </div>

                <table className="w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Ever Used</th>
                            <th>Used During Pregnancy</th>
                            <th>Date Last Used</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...predefinedSubstances, ...otherSubstances.map((substance) => substance.name)].map((substance, index) => (
                            <tr key={substance}>
                                <td className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                                    {substance}
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        {...register('everUsed')}
                                        checked={otherSubstances[index]?.everUsed || false}
                                        onChange={(e) => handleCheckboxChange(index, 'everUsed', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        {...register('usedDuringPregnancy')}
                                        checked={otherSubstances[index]?.usedDuringPregnancy || false}
                                        onChange={(e) => handleCheckboxChange(index, 'usedDuringPregnancy', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        {...register('dateLastUsed')}
                                        value={otherSubstances[index]?.dateLastUsed || ''}
                                        onChange={(e) => handleDateChange(index, e.target.value)}
                                    />
                                </td>
                                <td>
                                    {otherSubstances.some((s) => s.name === substance) && (
                                        <button type="button" onClick={() => removeOtherSubstance(index)}>
                                            Remove
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-white bg-[#AFAFAFAF] px-20 py-2 mt-6 rounded-md whitespace-nowrap"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubstanceUseHistoryForm;