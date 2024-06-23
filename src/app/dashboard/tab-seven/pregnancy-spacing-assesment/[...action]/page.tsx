'use client';

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { IPregnancySpacingAssesmentInputs, PregnancySpacingAssesmentInputsSchema } from "../definitions";
import useAppStore from "@/lib/useAppStore";
import {
    createPregnancySpacingAssesmentRecord,
    readPregnancySpacingAssesmentRecord,
    updatePregnancySpacingAssesmentRecord
} from '../actions';

const PregnancySpacingAssesmentRecord: React.FC = () => {
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
        formState: { errors, isSubmitting }
    } = useForm<IPregnancySpacingAssesmentInputs>({
        resolver: zodResolver(PregnancySpacingAssesmentInputsSchema),
    });

    useEffect(() => {
        const fetchAndPopulatePastSubmissionData = async () => {
            try {
                if (verb !== 'edit') {
                    return;
                }

                if (!submissionId) {
                    throw new Error('Missing submissionId when fetching past submission');
                }

                if(!user) {
                    throw new Error('Missing user');
                }

                const validResponse = await readPregnancySpacingAssesmentRecord(submissionId, user.id);

                reset(validResponse);
            } catch(error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');

                router.push('/');
                return;
            }
        };

        fetchAndPopulatePastSubmissionData();
    }, []);

    const submit = async (data: IPregnancySpacingAssesmentInputs) => {
        try {
            PregnancySpacingAssesmentInputsSchema.parse(data);

            let response;
            if(!user) {
                throw new Error('User Missing');
            }

            if (verb === 'new') {
                response = await createPregnancySpacingAssesmentRecord(data, user.id);
            } else {
                response = await updatePregnancySpacingAssesmentRecord(data, submissionId, user.id);
            }
        } catch(error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            router.push('/dashboard');

            return;
        }

        setSuccessMessage('Pregnancy Spacing Assesment submitted successfully!');
        router.push('/dashboard');
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form 
            onSubmit={handleSubmit((data) => submit(data))} 
            className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4" 
            >
                <p className="font-medium pt-6">Ask the following questions regarding Pregnancy Spacing:</p>

                <p className="font-medium pt-6">1. Have you had any pregnancies less than 12 months apart?</p>
                <textarea
                    {...register('hadPregnanciesLessThan12MoApart')}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                 />

                <p className="font-medium pt-6">2. Are you interest in discussing family planning?</p>
                <textarea
                    {...register('discussFamilyPlanningInterest')}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                 />

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
    )
};

export default PregnancySpacingAssesmentRecord;