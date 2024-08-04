"use client"

import React, { useEffect } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    AgreementLevelEnum,
    labelMapping,
    PerceivedMaternalPlanningSelfEfficacyToolInputsSchema,
    IPerceivedMaternalPlanningSelfEfficacyToolInputs
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import {
    createPerceivedMaternalPlanningSelfEfficacyTool,
    readPerceivedMaternalPlanningSelfEfficacyTool,
    updatePerceivedMaternalPlanningSelfEfficacyTool
} from "../actions";

const PerceivedMaternalPlanningSelfEfficacyTool: React.FC = () => {
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
    } = useForm<IPerceivedMaternalPlanningSelfEfficacyToolInputs>({
        resolver: zodResolver(PerceivedMaternalPlanningSelfEfficacyToolInputsSchema),
    });

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

                const response = await readPerceivedMaternalPlanningSelfEfficacyTool(submissionId, user.id);
                reset(response);
            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');
                router.push('/dashboard');
            }
        };

        if (user && verb === 'edit' && submissionId) {
            fetchAndPopulatePastSubmissionData();
        }
    }, [user, verb, submissionId, reset, router, setErrorMessage]);

    const submit = async (data: IPerceivedMaternalPlanningSelfEfficacyToolInputs) => {
        try {
            let response;

            if (!user) {
                throw new Error("User missing");
            }

            if (verb === 'new') {
                response = await createPerceivedMaternalPlanningSelfEfficacyTool(data, user.id);
            } else {
                response = await updatePerceivedMaternalPlanningSelfEfficacyTool(data, submissionId, user.id)
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');
            return;
        }

        setSuccessMessage('Perceived Maternal Planning Self Efficacy Tool submitted successfully!')
        router.push('/dashboard')
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <div className="pt-6">
                    <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Perceived Maternal Planning Self Efficacy Tool</p>
                    <small> This tool helps identify how confident you feel in parenting your baby. It can allow healthcare workers to understand where they could provide advice or help. Please rate how strongly you agree with each of the following statements.</small>
                </div>

                <div className="space-y-16 pt-12">

                    <div className="space-y-4">
                        <div className="space-y-3">
                            <p className="font-semibold">1. I am good at keeping my baby occupied</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("keepingBabyOccupied")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.keepingBabyOccupied && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.keepingBabyOccupied.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">2. I am good at feeding my baby</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("feedingBaby")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.feedingBaby && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.feedingBaby.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">3. I am good at changing my baby</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("changingBaby")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.changingBaby && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.changingBaby.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">4. I am good at bathing my baby</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("bathingBaby")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.bathingBaby && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.bathingBaby.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">5. I can make my baby happy</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("makingBabyHappy")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.makingBabyHappy && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.makingBabyHappy.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">6. I can make my baby calm when he/she has been crying</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("calmingCryingBaby")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.calmingCryingBaby && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.calmingCryingBaby.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">7. I am good at soothing my baby when he/she becomes upset</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("soothingUpsetBaby")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.soothingUpsetBaby && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.soothingUpsetBaby.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">8. I am good at soothing my baby when he/she becomes fussy</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("soothingFussyBaby")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.soothingFussyBaby && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.soothingFussyBaby.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">9. I am good at soothing my baby when he/she continually cries</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("soothingCryingBaby")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.soothingCryingBaby && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.soothingCryingBaby.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">10. I am good at soothing my baby when he/she becomes more restless</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("soothingRestlessBaby")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.soothingRestlessBaby && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.soothingRestlessBaby.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">11. I am good at getting my babies attention</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("gettingBabiesAttention")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.gettingBabiesAttention && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.gettingBabiesAttention.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">12. I believe that I can tell when my baby is tired and needs to sleep</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("recognizingTiredness")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.recognizingTiredness && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.recognizingTiredness.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">12. I believe that I can tell when my baby is tired and needs to sleep</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("recognizingTiredness")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.recognizingTiredness && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.recognizingTiredness.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">13. I believe that I have control over my baby</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("havingControlOverBaby")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.havingControlOverBaby && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.havingControlOverBaby.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">14. I can tell when my baby is sick</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("recognizingSickness")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.recognizingSickness && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.recognizingSickness.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">15. I can read my baby’s cues</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("readingBabysCues")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.readingBabysCues && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.readingBabysCues.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">16. I am good at understanding what my baby wants</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("understandingBabyWants")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.understandingBabyWants && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.understandingBabyWants.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">17. I am good at knowing what activities my baby does not enjoy</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("knowingDislikedActivities")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.knowingDislikedActivities && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.knowingDislikedActivities.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">18. I believe that my baby responds well to me</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("babyRespondsWell")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.babyRespondsWell && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.babyRespondsWell.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">19. I believe that my baby and I have a good interaction with each other</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("goodInteraction")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.goodInteraction && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.goodInteraction.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">20. I can show affection to my baby</p>
                            <div className="space-y-2">
                                {AgreementLevelEnum.options.map(option => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            {...register("showingAffection")}
                                            type="radio"
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{labelMapping[option]}</span>
                                    </label>
                                ))}
                                {errors.showingAffection && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.showingAffection.message}
                                    </span>
                                )}
                            </div>
                        </div>

                    </div>
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
            </form >
        </div >
    );
};

export default PerceivedMaternalPlanningSelfEfficacyTool;