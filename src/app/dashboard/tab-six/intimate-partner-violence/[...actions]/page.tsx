"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    IntimatePartnerViolenceFormInputsSchema,
    IIntimatePartnerViolenceFormInputs,
    IPVStatusEnum
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import { createIntimatePartnerViolenceForm, readIntimatePartnerViolenceForm, updateIntimatePartnerViolenceForm } from "../actions";

const IPVForm: React.FC = () => {
    const router = useRouter();
    const { action } = router.query;

    const verb = Array.isArray(action) ? action[0] : action;
    const submissionId = Array.isArray(action) ? action[1] : undefined;

    const user = useAppStore(state => state.user);

    const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
    const setErrorMessage = useAppStore(state => state.setErrorMessage);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IIntimatePartnerViolenceFormInputs>({
        resolver: zodResolver(IntimatePartnerViolenceFormInputsSchema),
    });

    const onSubmit = async (data: IIntimatePartnerViolenceFormInputs) => {
        try {
            if (!user) {
                throw new Error('User not found');
            }
    
            let response;
    
            if (verb === 'new') {
                response = await createIntimatePartnerViolenceForm({...data}, user.id);
            } else if (submissionId) { 
                response = await updateIntimatePartnerViolenceForm(data, submissionId, user.id);
            } else {
                
                console.error("submissionId is undefined");
                setErrorMessage("Invalid submission ID");
                return;
            }
            
            IntimatePartnerViolenceFormInputsSchema.parse(response);
        } catch (error) {
            console.error(error);
            setErrorMessage("Something went wrong! Please try again later");
            return;
        }
    
        setSuccessMessage('Form submitted successfully');
        router.push('/dashboard');
    };

    return (
        // need to redo
        <h1>Hello</h1>
    );
};
export default IPVForm;