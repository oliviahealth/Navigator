'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { SmokingTobaccoPregnancyInputs, SmokingTobaccoPregnancyResponseSchema } from '../definitions';
import useAppStore from '@/lib/useAppStore';
import {
    createSmokingTobaccoPregnancyRecord,
    readSmokingTobaccoPregnancyRecord,
    updateSmokingTobaccoPregnancyRecord,
} from '../actions';

const SmokingTobaccoPregnancyRecord: React.FC = () => {
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
    } = useForm<SmokingTobaccoPregnancyInputs>({
        resolver: zodResolver(SmokingTobaccoPregnancyResponseSchema),
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

                if (!user) {
                    throw new Error('Missing user');
                }

                const response = await readSmokingTobaccoPregnancyRecord(submissionId, user.id);

                const validResponse = SmokingTobaccoPregnancyResponseSchema.parse(response);

                reset(validResponse);
            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');

                router.push('/');

                return;
            }
        };

        fetchAndPopulatePastSubmissionData();
    }, []);

    const submit = async (data: SmokingTobaccoPregnancyInputs) => {
        try {
            let response;

            if (!user) {
                throw new Error('User missing');
            }

            if (verb === 'new') {
                response = await createSmokingTobaccoPregnancyRecord(data, user.id);
            } else {
                response = await updateSmokingTobaccoPregnancyRecord(submissionId, data, user.id);
            }

            SmokingTobaccoPregnancyResponseSchema.parse(response);
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            router.push('/dashboard');

            return;
        }

        setSuccessMessage('Smoking and Tobacco Use during Pregnancy submitted successfully!');
        router.push('/dashboard');
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <p className="font-medium text-xl">Smoking and Tobacco Use during Pregnancy</p>

                <p className="font-medium pt-6">Have you ever used drugs other than those required for medical reasons?</p>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="Yes"
                            {...register('drugsOtherThanMedicines')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="No"
                            {...register('drugsOtherThanMedicines')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">No</span>
                    </label>
                </div>
                {errors.drugsOtherThanMedicines && (
                    <span className="label-text-alt text-red-500">
                        {errors.drugsOtherThanMedicines?.message}
                    </span>
                )}

                <p className="font-medium pt-6">Do you abuse more than one drug at a time?</p>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="Yes"
                            {...register('abuseMoreThanOneDrug')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="No"
                            {...register('abuseMoreThanOneDrug')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">No</span>
                    </label>
                </div>
                {errors.abuseMoreThanOneDrug && (
                    <span className="label-text-alt text-red-500">
                        {errors.abuseMoreThanOneDrug?.message}
                    </span>
                )}

                <p className="font-medium pt-6">Are you always able to stop using drugs when you want to? (If never used drugs, answer “Yes.”)</p>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="Yes"
                            {...register('ableToStopUsingDrugs')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="No"
                            {...register('ableToStopUsingDrugs')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">No</span>
                    </label>
                </div>
                {errors.ableToStopUsingDrugs && (
                    <span className="label-text-alt text-red-500">
                        {errors.ableToStopUsingDrugs?.message}
                    </span>
                )}

                <p className="font-medium pt-6">Have you had “blackouts” or“flashbacks” as a result of drug use?</p>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="Yes"
                            {...register('haveBlackoutsFlashbacksFromDrugs')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="No"
                            {...register('haveBlackoutsFlashbacksFromDrugs')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">No</span>
                    </label>
                </div>
                {errors.haveBlackoutsFlashbacksFromDrugs && (
                    <span className="label-text-alt text-red-500">
                        {errors.haveBlackoutsFlashbacksFromDrugs?.message}
                    </span>
                )}

                <p className="font-medium pt-6">Do you ever feel bad or guilty about your drug use? (If never used drugs, choose “No.”)</p>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="Yes"
                            {...register('guiltFromDrugUse')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="No"
                            {...register('guiltFromDrugUse')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">No</span>
                    </label>
                </div>
                {errors.guiltFromDrugUse && (
                    <span className="label-text-alt text-red-500">
                        {errors.guiltFromDrugUse?.message}
                    </span>
                )}

                <p className="font-medium pt-6">Does your spouse or (or parents) ever complain about your involvement with drugs?</p>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="Yes"
                            {...register('spouseParentsComplainAboutUsage')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="No"
                            {...register('spouseParentsComplainAboutUsage')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">No</span>
                    </label>
                </div>
                {errors.spouseParentsComplainAboutUsage && (
                    <span className="label-text-alt text-red-500">
                        {errors.spouseParentsComplainAboutUsage?.message}
                    </span>
                )}

                <p className="font-medium pt-6">Have you neglected your family because of your use of drugs?</p>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="Yes"
                            {...register('neglectedFamily')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="No"
                            {...register('neglectedFamily')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">No</span>
                    </label>
                </div>
                {errors.neglectedFamily && (
                    <span className="label-text-alt text-red-500">
                        {errors.neglectedFamily?.message}
                    </span>
                )}

                <p className="font-medium pt-6">Have you engaged in illegal activities in order to obtain drugs?</p>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="Yes"
                            {...register('illegalActivitiesToObtainDrugs')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="No"
                            {...register('illegalActivitiesToObtainDrugs')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">No</span>
                    </label>
                </div>
                {errors.illegalActivitiesToObtainDrugs && (
                    <span className="label-text-alt text-red-500">
                        {errors.illegalActivitiesToObtainDrugs?.message}
                    </span>
                )}

                <p className="font-medium pt-6">Have you ever experienced withdrawal symptoms (felt sick) when you stopped taking drugs?</p>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="Yes"
                            {...register('withdrawalsWhenStoppedDrugs')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="No"
                            {...register('withdrawalsWhenStoppedDrugs')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">No</span>
                    </label>
                </div>
                {errors.withdrawalsWhenStoppedDrugs && (
                    <span className="label-text-alt text-red-500">
                        {errors.withdrawalsWhenStoppedDrugs?.message}
                    </span>
                )}

                <p className="font-medium pt-6">Have you had medical problems as a result of your drug use (e.g., memory loss, hepatitis, convulsions, bleeding, etc.)?</p>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="Yes"
                            {...register('medicalProblemsFromUsage')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="No"
                            {...register('medicalProblemsFromUsage')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">No</span>
                    </label>
                </div>
                {errors.medicalProblemsFromUsage && (
                    <span className="label-text-alt text-red-500">
                        {errors.medicalProblemsFromUsage?.message}
                    </span>
                )}

                <p className="font-medium pt-6">Tobacco Use Screening and Documentation</p>
                <div className="flex flex-col space-y-2">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="NEVER_SMOKED"
                            {...register('tobaccoUseScreeningAndDocumentation')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">I have NEVER smoked or have smoked less than 100 cigarettes in my lifetime.</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="STOPPED_BEFORE_PREGNANCY"
                            {...register('tobaccoUseScreeningAndDocumentation')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">I stopped smoking BEFORE I found out I was pregnant and am not smoking now.</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="STOPPED_AFTER_PREGNANCY"
                            {...register('tobaccoUseScreeningAndDocumentation')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">I stopped smoking AFTER I found out I was pregnant and am not smoking now.</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="STOPPED_DURING_PREGNANCY_BUT_SMOKING_NOW"
                            {...register('tobaccoUseScreeningAndDocumentation')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">I stopped smoking during pregnancy but I am smoking now.</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="SMOKED_DURING_PREGNANCY_AND_SMOKING_NOW"
                            {...register('tobaccoUseScreeningAndDocumentation')}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">I smoked during pregnancy and I am smoking now.</span>
                    </label>
                </div>
                {errors.tobaccoUseScreeningAndDocumentation && (
                    <span className="label-text-alt text-red-500">
                        {errors.tobaccoUseScreeningAndDocumentation?.message}
                    </span>
                )}

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-white bg-blue-500 px-20 py-2 mt-6 rounded-md whitespace-nowrap"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SmokingTobaccoPregnancyRecord;