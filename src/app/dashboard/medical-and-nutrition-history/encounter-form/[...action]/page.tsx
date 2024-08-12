"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Control,
    FieldArrayWithId,
    FieldErrors,
    UseFieldArrayRemove,
    UseFormRegister,
    UseFormSetValue,
    useFieldArray,
    useForm
} from "react-hook-form";

import {
    IEncounterFormInputs,
    EncounterFormInputsSchema,
    ParentConcernsEnum,
    YesNoEnum,
    ReasonsEnum,
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import { createEncounterForm, readEncounterForm, updateEncounterForm } from "../actions";

interface EncounterEntryProps {
    control: Control<IEncounterFormInputs>;
    register: UseFormRegister<IEncounterFormInputs>;
    errors: FieldErrors<IEncounterFormInputs>;
    index: number;
    field: FieldArrayWithId<IEncounterFormInputs, "encounterEntries", "id">;
    removeEncounterEntry: UseFieldArrayRemove;
    setValue: UseFormSetValue<IEncounterFormInputs>;
    showCareVisitsList: boolean;
    setShowCareVisitsList: React.Dispatch<React.SetStateAction<boolean[]>>;
    showWellchildVisits: boolean;
    setShowWellchildVisits: React.Dispatch<React.SetStateAction<boolean[]>>;
    showOtherReason: boolean[][];
    setShowOtherReason: React.Dispatch<React.SetStateAction<boolean[][]>>;
}

const EncounterEntry: React.FC<EncounterEntryProps> = ({
    control,
    register,
    errors,
    index,
    field,
    removeEncounterEntry,
    setValue,
    showCareVisitsList,
    setShowCareVisitsList,
    showWellchildVisits,
    setShowWellchildVisits,
    showOtherReason,
    setShowOtherReason
}) => {
    const {
        fields: careVisitsDatesAndReasonsFields,
        append: appendCareVisitsDatesAndReasons,
        remove: removeCareVisitsDatesAndReasons,
    } = useFieldArray({
        control,
        name: `encounterEntries.${index}.careVisitsDatesAndReasonsList`,
    });

    const handleShowCareVisitsList = (value: string, fieldIndex: number) => {
        setShowCareVisitsList(prev => {
            const newState = [...prev];
            if (value === 'Yes') {
                newState[fieldIndex] = true;
            } else {
                newState[fieldIndex] = false;
                setValue(`encounterEntries.${fieldIndex}.careVisitsDatesAndReasonsList`, []);
            }
            return newState;
        });
    };

    const handleShowWellchildVisits = (value: string, fieldIndex: number) => {
        setShowWellchildVisits(prev => {
            const newState = [...prev];
            if (value === 'Yes') {
                newState[fieldIndex] = true;
            } else {
                newState[fieldIndex] = false;
                setValue(`encounterEntries.${fieldIndex}.wellchildVisitsCompleted`, '');
            }
            return newState;
        });
    };

    // const [showOtherReason, setShowOtherReason] = useState<boolean[][]>([]);
    const handleShowOtherReason = (value: string, fieldIndex: number, visitIndex: number) => {
        setShowOtherReason(prev => {
            // Ensure the outer array exists
            const newState = [...prev];
            while (newState.length <= fieldIndex) {
                newState.push([]);
            }
            // Ensure the inner array exists
            while (newState[fieldIndex].length <= visitIndex) {
                newState[fieldIndex].push(false);
            }

            newState[fieldIndex][visitIndex] = value === 'Other';

            // Clear the value if "Other" is not selected
            if (value !== 'Other') {
                setValue(`encounterEntries.${fieldIndex}.careVisitsDatesAndReasonsList.${visitIndex}.otherReason`, '');
            }

            return newState;
        });
    }

    return (
        <div key={field.id} className="py-6 space-y-4">
            <div className="flex justify-between">
                <p className="text-xl font-bold">Encounter Entry {index + 1}</p>
                <button
                    type="button"
                    onClick={() => removeEncounterEntry(index)}
                    className="font-semibold text-red-600 rounded-md whitespace-nowrap"
                >
                    - Remove Entry
                </button>
            </div>

            <div className="space-y-3">
                <p className="font-semibold">Date Of Visit</p>
                <input
                    {...register(`encounterEntries.${index}.dateOfVisit`)}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    type="date"
                />
                {errors.encounterEntries && errors.encounterEntries[index]?.dateOfVisit && (
                    <span className="label-text-alt text-red-500">
                        {errors.encounterEntries[index]?.dateOfVisit?.message}
                    </span>
                )}
            </div>

            <div className="space-y-3">
                <p className="font-semibold">Staff</p>
                <input
                    {...register(`encounterEntries.${index}.staff`)}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    type="text"
                />
                {errors.encounterEntries && errors.encounterEntries[index]?.staff && (
                    <span className="label-text-alt text-red-500">
                        {errors.encounterEntries[index]?.staff?.message}
                    </span>
                )}
            </div>

            <div className="space-y-3">
                <p className="font-semibold">Health Insurance</p>
                <div className="space-y-2">
                    {YesNoEnum.options.map(option => (
                        <label key={option} className="flex items-center">
                            <input
                                {...register(`encounterEntries.${index}.healthInsurance`)}
                                className="form-radio"
                                type="radio"
                                value={option}
                            />
                            <span className="ml-2">{option}</span>
                        </label>
                    ))}
                    {errors.encounterEntries && errors.encounterEntries[index]?.healthInsurance && (
                        <span className="label-text-alt text-red-500">
                            {errors.encounterEntries[index]?.healthInsurance?.message}
                        </span>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                <p className="font-semibold">Parent Concerns</p>
                <div className="space-y-2">
                    {ParentConcernsEnum.options.map(option => (
                        <label key={option} className="flex items-center">
                            <input
                                {...register(`encounterEntries.${index}.parentConcerns`)}
                                className="form-radio"
                                type="radio"
                                value={option}
                            />
                            {option === "Did_not_ask" ? (
                                <span className="ml-2">Did not ask</span>
                            ) : (
                                <span className="ml-2">{option}</span>
                            )}
                        </label>
                    ))}
                    {errors.encounterEntries && errors.encounterEntries[index]?.parentConcerns && (
                        <span className="label-text-alt text-red-500">
                            {errors.encounterEntries[index]?.parentConcerns?.message}
                        </span>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                <p className="font-semibold">Care Visits</p>
                <div className="space-y-2">
                    {YesNoEnum.options.map(option => (
                        <label key={option} className="flex items-center">
                            <input
                                {...register(`encounterEntries.${index}.careVisits`)}
                                className="form-radio"
                                type="radio"
                                value={option}
                                onChange={(e) => handleShowCareVisitsList(e.target.value, index)}
                            />
                            <span className="ml-2">{option}</span>
                        </label>
                    ))}
                    {errors.encounterEntries && errors.encounterEntries[index]?.careVisits && (
                        <span className="label-text-alt text-red-500">
                            {errors.encounterEntries[index]?.careVisits?.message}
                        </span>
                    )}
                </div>
            </div>

            {showCareVisitsList && (
                <div className="space-y-3">
                    <p className="font-bold text-xl">Care Visits Dates and Reasons</p>
                    {careVisitsDatesAndReasonsFields?.map((visit, visitIndex) => (
                        <div key={visit.id} className="space-y-3">
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">
                                    Care Visit Date and Reasons {visitIndex + 1}
                                </p>

                                {careVisitsDatesAndReasonsFields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeCareVisitsDatesAndReasons(visitIndex)}
                                        className="font-semibold text-red-600 rounded-md whitespace-nowrap"
                                    >
                                        - Remove Entry
                                    </button>
                                )}
                            </div>
                            <div className="space-y-3">
                                <p className="font-semibold">Visit Date</p>
                                <input
                                    {...register(`encounterEntries.${index}.careVisitsDatesAndReasonsList.${visitIndex}.visitDate`)}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="date"
                                />
                                {errors.encounterEntries && errors.encounterEntries[index]?.careVisitsDatesAndReasonsList?.[visitIndex]?.visitDate && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.encounterEntries[index]?.careVisitsDatesAndReasonsList?.[visitIndex]?.visitDate?.message}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="font-semibold">Reason</p>
                                <div className="space-y-2">
                                    {ReasonsEnum.options.map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                {...register(`encounterEntries.${index}.careVisitsDatesAndReasonsList.${visitIndex}.reason`)}
                                                className="form-radio"
                                                type="radio"
                                                value={option}
                                                onChange={(e) => handleShowOtherReason(e.target.value, index, visitIndex)}
                                            />
                                            <span className="ml-2">{option}</span>
                                        </label>
                                    ))}
                                    {errors.encounterEntries && errors.encounterEntries[index]?.careVisitsDatesAndReasonsList?.[visitIndex]?.reason && (
                                        <span className="label-text-alt text-red-500">
                                            {errors.encounterEntries[index]?.careVisitsDatesAndReasonsList?.[visitIndex]?.reason?.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {showOtherReason[index]?.[visitIndex] && (<div className="space-y-3">
                                <p className="font-semibold">Other Reason</p>
                                <input
                                    {...register(`encounterEntries.${index}.careVisitsDatesAndReasonsList.${visitIndex}.otherReason`)}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                    type="text"
                                />
                                {errors.encounterEntries && errors.encounterEntries[index]?.careVisitsDatesAndReasonsList?.[visitIndex]?.otherReason && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.encounterEntries[index]?.careVisitsDatesAndReasonsList?.[visitIndex]?.otherReason?.message}
                                    </span>
                                )}
                            </div>
                            )}
                        </div>
                    ))}

                    <div className="flex justify-center py-4">
                        <button
                            type="button"
                            onClick={() => appendCareVisitsDatesAndReasons({
                                visitDate: "",
                                reason: null,
                                otherReason: null
                            })}
                            className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                        >
                            + Add Care Visit Date and Reason
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                <p className="font-semibold">Wellchild Visits</p>
                <div className="space-y-2">
                    {YesNoEnum.options.map(option => (
                        <label key={option} className="flex items-center">
                            <input
                                {...register(`encounterEntries.${index}.wellchildVisits`)}
                                className="form-radio"
                                type="radio"
                                value={option}
                                onChange={(e) => handleShowWellchildVisits(e.target.value, index)}
                            />
                            <span className="ml-2">{option}</span>
                        </label>
                    ))}
                    {errors.encounterEntries && errors.encounterEntries[index]?.wellchildVisits && (
                        <span className="label-text-alt text-red-500">
                            {errors.encounterEntries[index]?.wellchildVisits?.message}
                        </span>
                    )}
                </div>
            </div>

            {showWellchildVisits && (
                <>
                    <div className="space-y-3">
                        <p className="font-semibold">Visit(s) Completed</p>
                        <textarea
                            {...register(`encounterEntries.${index}.wellchildVisitsCompleted`)}
                            className="border border-gray-300 px-4 py-2 rounded-md w-full"
                        />
                        {errors.encounterEntries && errors.encounterEntries[index]?.wellchildVisitsCompleted && (
                            <span className="label-text-alt text-red-500">
                                {errors.encounterEntries[index]?.wellchildVisitsCompleted?.message}
                            </span>
                        )}
                    </div>

                    <div>
                        Well-child visits (write in any new visits completed above)
                        <div className="flex flex-wrap justify-between">
                            <div className="flex flex-col">
                                <small >Newborn</small>
                                <small>3-7 days old</small>
                                <small>2-4 weeks old</small>
                                <small>2-3 months old</small>
                            </div>
                            <div className="flex flex-col">
                                <small>4-5 months old</small>
                                <small>6-7 months old</small>
                                <small>9-10 months old</small>
                                <small>12-13 months old</small>
                            </div>
                            <div className="flex flex-col">
                                <small>15-16 months old</small>
                                <small>18-19 months old</small>
                                <small>2-2.5 years old</small>
                                <small>3-3.5 years old</small>
                                <small>4-4.5 years old</small>
                            </div>
                        </div>
                    </div>

                </>
            )}

        </div>
    );
};

const EncounterForm: React.FC = () => {
    const router = useRouter();
    const { action } = useParams();

    const verb = action[0];
    const submissionId = action[1];
    const user = useAppStore(state => state.user);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue
    } = useForm<IEncounterFormInputs>({
        resolver: zodResolver(EncounterFormInputsSchema),
        defaultValues: {
            encounterEntries: [
                {
                    dateOfVisit: undefined,
                    staff: "",
                    healthInsurance: undefined,
                    parentConcerns: null,
                    careVisits: undefined,
                    careVisitsDatesAndReasonsList: [
                        {
                            visitDate: undefined,
                            reason: undefined,
                            otherReason: null,
                        }
                    ],
                    wellchildVisits: null,
                    wellchildVisitsCompleted: ""
                },
            ],
        },
    });

    const [showCareVisitsList, setShowCareVisitsList] = useState<boolean[]>([]);
    const [showWellchildVisits, setShowWellchildVisits] = useState<boolean[]>([]);
    const [showOtherReason, setShowOtherReason] = useState<boolean[][]>([]);

    const {
        fields: encounterEntriesFields,
        append: appendEncounterEntry,
        remove: removeEncounterEntry
    } = useFieldArray({
        control,
        name: "encounterEntries",
    });

    const addNewEncounterEntry = () => {
        appendEncounterEntry({
            dateOfVisit: "",
            staff: "",
            healthInsurance: null,
            parentConcerns: null,
            careVisits: null,
            careVisitsDatesAndReasonsList: [
                {
                    visitDate: "",
                    reason: null,
                    otherReason: null,
                }
            ],
            wellchildVisits: null,
            wellchildVisitsCompleted: ""
        });
    };

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

                const validResponse = await readEncounterForm(submissionId, user.id);

                reset(validResponse);

                setShowCareVisitsList(
                    validResponse.encounterEntries.map(entry => entry.careVisits === 'Yes')
                );
                setShowWellchildVisits(
                    validResponse.encounterEntries.map(entry => entry.wellchildVisits === 'Yes')
                );
                setShowOtherReason(
                    validResponse.encounterEntries.map(entry =>
                        entry.careVisitsDatesAndReasonsList ? entry.careVisitsDatesAndReasonsList.map(visit => visit.reason === 'Other') : []
                    )
                );

            } catch (error) {
                console.error(error);
                setErrorMessage('Something went wrong! Please try again later');
                router.push('/dashboard');
            }
        };

        if (user && verb === 'edit' && submissionId) {
            fetchAndPopulatePastSubmissionData();
        }
    }, [user, verb, submissionId, reset, router, setErrorMessage, setShowCareVisitsList, setShowWellchildVisits, setShowOtherReason]);

    const submit = async (encounterFormData: IEncounterFormInputs) => {
        try {
            let response;

            if (!user) {
                throw new Error("User missing");
            }

            EncounterFormInputsSchema.parse(encounterFormData);

            if (verb === 'new') {
                response = await createEncounterForm(encounterFormData, user.id);
            } else {
                response = await updateEncounterForm(encounterFormData, submissionId, user.id)
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong! Please try again later');

            return;
        }

        setSuccessMessage('Encounter Form submitted successfully!')
        router.push('/dashboard');
    };

    return (
        <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
            <form
                onSubmit={handleSubmit((data) => submit(data))}
                className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
            >
                <p className="font-semibold text-2xl">{verb === 'new' ? 'New' : 'Edit'} Encounter Form</p>

                <div className="space-y-16 pt-12">
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <p className="font-semibold">Participant Name</p>
                            <input
                                {...register("participantName")}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                type="text"
                            />
                            {errors.participantName && (
                                <span className="label-text-alt text-red-500">
                                    {errors.participantName.message}
                                </span>
                            )}
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">Case ID</p>
                            <input
                                {...register("caseId")}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                type="text"
                            />
                            {errors.caseId && (
                                <span className="label-text-alt text-red-500">
                                    {errors.caseId.message}
                                </span>
                            )}
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">Month/Year</p>
                            <input
                                {...register("monthYear")}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                type="text"
                            />
                            {errors.monthYear && (
                                <span className="label-text-alt text-red-500">
                                    {errors.monthYear.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {encounterEntriesFields.map((field, index) => (
                            <EncounterEntry
                                key={field.id}
                                control={control}
                                register={register}
                                errors={errors}
                                index={index}
                                field={field}
                                removeEncounterEntry={removeEncounterEntry}
                                setValue={setValue}
                                showCareVisitsList={showCareVisitsList[index]}
                                setShowCareVisitsList={setShowCareVisitsList}
                                showWellchildVisits={showWellchildVisits[index]}
                                setShowWellchildVisits={setShowWellchildVisits}
                                showOtherReason={showOtherReason}
                                setShowOtherReason={setShowOtherReason}
                            />
                        ))}

                        <div className="flex justify-center py-4">
                            <button
                                type="button"
                                onClick={addNewEncounterEntry}
                                className="text-green-500 px-20 py-4 font-semibold rounded-md whitespace-nowrap"
                            >
                                + Add Encounter Entry
                            </button>
                        </div>
                    </div>

                    <div className="pt-6">
                        <hr className="border-t-1 border-gray-400 my-4" />
                        <div>
                            <p className="font-semibold pb-2 pt-8">Submission Label</p>
                            <textarea
                                {...register("label")}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            />
                            {errors.label && (
                                <span className="label-text-alt text-red-500">
                                    {errors.label.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <p className="font-semibold pb-2 pt-8">Staff Notes</p>
                            <textarea
                                {...register("staffNotes")}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            />
                            {errors.staffNotes && (
                                <span className="label-text-alt text-red-500">
                                    {errors.staffNotes.message}
                                </span>
                            )}
                        </div>
                    </div>

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
};

export default EncounterForm;