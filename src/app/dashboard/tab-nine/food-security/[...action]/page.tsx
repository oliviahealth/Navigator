'use client';

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { IFoodSecurityInputs, FoodSecurityInputsSchema } from "../definitions";
import useAppStore from "@/lib/useAppStore";
import {
    createFoodSecurityRecord,
    readFoodSecurityRecord,
    updateFoodSecurityRecord
} from '../actions';

const FoodSecurityRecord: React.FC = () => {
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
    } = useForm<IFoodSecurityInputs>({
        resolver: zodResolver(FoodSecurityInputsSchema)
    });

    useEffect(() => {
        const fetchAndPopulatePastSubmissionData = async () => {
            try {
                if (verb !== 'edit') {
                    return
                }

                if (!submissionId) {
                    throw new Error('Missing submissionId when fetching past submission');
                }

                if (!user) {
                    throw new Error('Missing user');
                }

                const validResponse = await readFoodSecurityRecord(submissionId, user.id);

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

    const submit = async (data: IFoodSecurityInputs) => {
        try {
            FoodSecurityInputsSchema.parse(data);

            let response;
            if (!user) {
                throw new Error('User Missing');
            }

            if (verb === 'new') {
                response = await createFoodSecurityRecord(data, user.id);
            } else {
                response = await updateFoodSecurityRecord(data, submissionId, user.id);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            router.push('/dashboard');

            return;
        }

        setSuccessMessage('Food Security submitted successfully!');
        router.push('/dashboard');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Food Security Questionnaire</h1>
            <form onSubmit={handleSubmit(submit)} className="space-y-6">
                <div>
                    <label className="block mb-2">
                        1. In the past four weeks, did you worry that your household would not have enough food?
                    </label>
                    <select {...register("worryHouseholdWithoutFood")} className="w-full p-2 border rounded">
                        <option value="No">No (skip to Q2)</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
    
                <div>
                    <label className="block mb-2">1.a How often did this happen?</label>
                    <select {...register("howOftenWorryHouseholdWithoutFood")} className="w-full p-2 border rounded">
                        <option value="Rarely (once or twice in the past four weeks)">Rarely (once or twice in the past four weeks)</option>
                        <option value="Sometimes (three to ten times in the past four weeks)">Sometimes (three to ten times in the past four weeks)</option>
                        <option value="Often (more than ten times in the past four weeks)">Often (more than ten times in the past four weeks)</option>
                    </select>
                </div>
    
                <div>
                    <label className="block mb-2">
                        2. In the past four weeks, were you or any household member not able to eat the kinds of foods you preferred because of a lack of resources?
                    </label>
                    <select {...register("pastFourWeeksFamilyDidNotEatPreferredFoodResources")} className="w-full p-2 border rounded">
                        <option value="No (skip to Q3)">No (skip to Q3)</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
    
                <div>
                    <label className="block mb-2">2.a How often did this happen?</label>
                    <select {...register("howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResources")} className="w-full p-2 border rounded">
                        <option value="Rarely (once or twice in the past four weeks)">Rarely (once or twice in the past four weeks)</option>
                        <option value="Sometimes (three to ten times in the past four weeks)">Sometimes (three to ten times in the past four weeks)</option>
                        <option value="Often (more than ten times in the past four weeks)">Often (more than ten times in the past four weeks)</option>
                    </select>
                </div>
    
                <div>
                    <label className="block mb-2">
                        3. In the past four weeks, did you or any household member have to eat a limited variety of foods due to a lack of resources?
                    </label>
                    <select {...register("pastFourWeeksFamilyDidNotEatPreferredFoodVariety")} className="w-full p-2 border rounded">
                        <option value="No">No (skip to Q4)</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
    
                <div>
                    <label className="block mb-2">3.a How often did this happen?</label>
                    <select {...register("howOftenPastFourWeeksFamilyDidNotEatPreferredFoodVariety")} className="w-full p-2 border rounded">
                        <option value="Rarely (once or twice in the past four weeks)">Rarely (once or twice in the past four weeks)</option>
                        <option value="Sometimes (three to ten times in the past four weeks)">Sometimes (three to ten times in the past four weeks)</option>
                        <option value="Often (more than ten times in the past four weeks)">Often (more than ten times in the past four weeks)</option>
                    </select>
                </div>
    
                <div>
                    <label className="block mb-2">
                        4. In the past four weeks, did you or any household member have to eat some foods that you really did not want to eat because of a lack of resources to obtain other types of food?
                    </label>
                    <select {...register("pastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood")} className="w-full p-2 border rounded">
                        <option value="No">No (skip to Q5)</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
    
                <div>
                    <label className="block mb-2">4.a How often did this happen?</label>
                    <select {...register("howOftenPastFourWeeksFamilyDidNotEatPreferredFoodResourcesToObtainFood")} className="w-full p-2 border rounded">
                        <option value="Rarely (once or twice in the past four weeks)">Rarely (once or twice in the past four weeks)</option>
                        <option value="Sometimes (three to ten times in the past four weeks)">Sometimes (three to ten times in the past four weeks)</option>
                        <option value="Often (more than ten times in the past four weeks)">Often (more than ten times in the past four weeks)</option>
                    </select>
                </div>
    
                <div className="flex justify-center py-4">
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-x-2 w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto font-semibold"
                    >
                        {isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FoodSecurityRecord;