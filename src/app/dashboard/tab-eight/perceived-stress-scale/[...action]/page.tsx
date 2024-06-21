"use client"

import React, { useEffect } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// import {
//     ChurchAttendanceEnum,
//     DukeUniversityReligionIndexInputsSchema,
//     IDukeUniversityReligionIndexInputs,
//     TimeSpentReligiouslyEnum,
//     TruthLevelEnum,
//     labelMapping
// } from "../definitions";

import useAppStore from "@/lib/useAppStore";
// import {
//     createDukeUniversityReligionIndex,
//     readDukeUniversityReligionIndex,
//     updatedukeUniversityReligionIndex
// } from "../actions";

const PerceivedStressScale: React.FC = () => {
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
    } = useForm<any>({
        // resolver: zodResolver(DukeUniversityReligionIndexInputsSchema),
    });

    // useEffect(() => {
    //     const fetchAndPopulatePastSubmissionData = async () => {
    //         try {
    //             if (verb !== 'edit') {
    //                 return;
    //             }

    //             if (!user) {
    //                 throw new Error("User not found");
    //             }

    //             if (!submissionId) {
    //                 throw new Error('Missing submissionId when fetching past submission');
    //             }

    //             const response = await readDukeUniversityReligionIndex(submissionId, user.id);
    //             reset(response);
    //         } catch (error) {
    //             console.error(error);
    //             setErrorMessage('Something went wrong! Please try again later');
    //             router.push('/dashboard');
    //         }
    //     };

    //     if (user && verb === 'edit' && submissionId) {
    //         fetchAndPopulatePastSubmissionData();
    //     }
    // }, [user, verb, submissionId, reset, router, setErrorMessage]);

    const submit = async (data: any) => {
        console.log(data)
        // try {
        //     let response;

        //     if (!user) {
        //         throw new Error("User missing");
        //     }

        //     if (verb === 'new') {
        //         response = await createDukeUniversityReligionIndex(data, user.id);
        //     } else {
        //         response = await updatedukeUniversityReligionIndex(data, submissionId, user.id)
        //     }
        // } catch (error) {
        //     console.error(error);
        //     setErrorMessage('Something went wrong! Please try again later');
        //     return;
        // }

        // setSuccessMessage('Duke University Religion Index submitted successfully!')
        // router.push('/dashboard')
    };

    const options = [
        "Never", "Almost Never", "Sometimes", "Fairly Often", "Very Often"
    ];

    return (
        // <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
        //     <form
        //         onSubmit={handleSubmit((data) => submit(data))}
        //         className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
        //     >
        //         <div className="pt-6">
        //             <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Duke University Religion Index</p>
        //             <small>This is a short assessment to better understand how you are involved (if at all) in religion or religious practices.</small>
        //         </div>

        //         <div className="space-y-16 pt-12">
        //         </div>

        //         <div className="flex justify-center py-4">
        //             <button
        //                 type="submit"
        //                 className="flex items-center justify-center gap-x-2 w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto font-semibold"
        //             >
        //                 {/* {isSubmitting && <span className="loading loading-spinner loading-sm"></span>} */}
        //                 Save
        //             </button>
        //         </div>
        //     </form >
        // </div >
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <table className="w-full max-w-3xl bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">Question</th>
                        {options.map((option, index) => (
                            <th key={index} className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-center text-sm font-medium text-gray-500">{option}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b border-gray-200">In the last month, how often have you been upset because of something that happened unexpectedly?</td>
                        {["", "", "e", "f", ""].map((option, index) => (
                            <td key={index} className="py-2 px-4 border-b border-gray-200 text-center">
                                <label className="block text-sm text-gray-700">
                                    <input
                                        {...register(`upsetFrequency${index}`)}
                                        type="radio"
                                        value={option}
                                        className="form-radio"
                                    />
                                    {option}
                                </label>
                            </td>
                        ))}
                    </tr>
                    {/* Additional rows */}
                    {Array.from({ length: 9 }, (_, i) => (
                        <tr className="hover:bg-gray-100" key={i}>
                            <td className="py-2 px-4 border-b border-gray-200">{`Row ${i + 2} Question`}</td>
                            {["", "", "", "", ""].map((option, index) => (
                                <td key={index} className="py-2 px-4 border-b border-gray-200 text-center">
                                    <label className="block text-sm text-gray-700">
                                        <input
                                            {...register(`row${i + 2}Frequency${index}`)}
                                            type="radio"
                                            value={option}
                                            className="form-radio custom-radio"
                                        />
                                        {option}
                                    </label>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default PerceivedStressScale;