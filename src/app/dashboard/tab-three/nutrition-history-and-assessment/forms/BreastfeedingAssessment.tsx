import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { YesNoEnum, getErrorMessage, labelMapping, PregnancyTypeEnum, NotBreastfedDesiredLengthReasonsEnum, BreastfeedingMethodEnum, BreastfeedingMedicalConcernsEnum } from "../definitions";

const BreastfeedingAssessment: React.FC = () => {
    const { register, setValue, formState: { errors }, watch } = useFormContext();

    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionChange = (value: string) => {
        if (value === 'No_concerns') {
            setSelectedOption(prev => prev === value ? '' : value);
        } else {
            setSelectedOption('');
        }
    };

    return (
        <>
            <div className="pt-6">
                <p className="font-semibold text-2xl">Breastfeeding Assessment</p>
            </div>

            <div className="space-y-12 pt-16">
                <div className="space-y-4">
                    <div className="space-y-3">
                        <p className="font-semibold">Are you worried about being able to breastfeed because of any medical conditions or medications?</p>
                        <small>If any of these boxes are checked, provide anticipatory guidance and referral to CLS/CLS/IBCLC.</small>
                        <div className="space-y-2">
                            {BreastfeedingMedicalConcernsEnum.options.map(option => (
                                <label key={option} className="flex items-center">
                                    <input
                                        {...register("breastfeedingMedicalConcerns")}
                                        type="checkbox"
                                        value={option}
                                        className="form-checkbox"
                                        onChange={(e) => handleOptionChange(e.target.value)}
                                        disabled={selectedOption === 'No_concerns' && option !== 'No_concerns'}
                                    />
                                    <span className="ml-2">{labelMapping.breastfeedingMedicalConcerns[option]}</span>
                                </label>
                            ))}
                            {errors.breastfeedingMedicalConcerns && (
                                <span className="label-text-alt text-red-500">
                                    {getErrorMessage(errors.breastfeedingMedicalConcerns)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default BreastfeedingAssessment;