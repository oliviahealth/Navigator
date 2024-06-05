"use client"

import React, { useEffect } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {

} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import { createParticipantDemographicsRecord, readParticipantDemographicsRecord, updateParticipantDemographicsRecord } from "../actions";

const ParticipantDemographicsRecord: React.FC = () => {
    const router = useRouter();
    const { action } = useParams();

    const verb = action[0]
    const submissionId = action[1]

    const user = useAppStore(state => state.user);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<IParticipantDemographicsFormInputs>({
        resolver: zodResolver(ParticipantDemographicsFormInputsSchema),
    });

    // useEffect(() => {
    //     const fetchAndPopulatePastSubmissionData = async () => {
    //         try {
    //             if (verb !== 'edit') {
    //                 return;
    //             }

    //             if (!submissionId) {
    //                 throw new Error('Missing submissionId when fetching past submission');
    //             }

    //             if (!user) {
    //                 throw new Error('Missing user');
    //             }

    //             const response = await readParticipantDemographicsRecord(submissionId, user.id);

    //             const validResponse = ParticipantDemographicsFormResponseSchema.parse(response);

    //             reset(validResponse);

    //         } catch (error) {
    //             console.error(error);
    //             setErrorMessage('Something went wrong! Please try again later');

    //             router.push('/');

    //             return;
    //         }
    //     }

    //     fetchAndPopulatePastSubmissionData()
    // }, [])

    const submit = async (data: IParticipantDemographicsFormInputs) => {
        console.log(data)
        // try {
        //     let response;

        //     if (!user) {
        //         throw new Error("User missing");
        //     }

        //     if (verb === 'new') {
        //         response = await createParticipantDemographicsRecord(ParticipantDemographicsRecordData, user.id);
        //     } else {
        //         response = await updateParticipantDemographicsRecord(ParticipantDemographicsRecordData, submissionId, user.id)
        //     }

        //     ParticipantDemographicsFormResponseSchema.parse(response);
        // } catch (error) {
        //     console.error(error);
        //     setErrorMessage('Something went wrong! Please try again later');

        //     router.push('/dashboard');

        //     return;
        // }

        // setSuccessMessage('Participant Demographics Record submitted successfully!')
        // router.push('/dashboard');
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Current Medication List</p>
                    <small className="text-gray-500"></small>
                </div>

                <div className="space-y-16 pt-12">
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
    )

}

export default ParticipantDemographicsRecord;