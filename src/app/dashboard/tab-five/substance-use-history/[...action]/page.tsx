"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  SubstanceSchema,
  SubstanceUseHistorySchema,
  SubstanceUseHistory,
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import {
  createSubstanceUseHistoryRecord,
  readSubstanceUseHistoryRecord,
  updateSubstanceUseHistoryRecord,
} from "../actions";

const SubstanceUseHistoryPage: React.FC = () => {
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
  } = useForm<SubstanceUseHistory>({
    resolver: zodResolver(SubstanceUseHistorySchema),
  });

  useEffect(() => {
    const fetchAndPopulatePastSubmissionData = async () => {
      try {
        if (!user) {
          throw new Error("User not found");
        }
    
        if (verb !== "edit") {
          return;
        }
    
        const response = await readSubstanceUseHistoryRecord(submissionId, user.id);
    
        if (response) {
          const formattedResponse = {
            ...response,
            dateLastUsed: response.dateLastUsed ? new Date(response.dateLastUsed) : null,
          };
    
          reset(formattedResponse);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Something went wrong! Please try again later");
        router.push("/dashboard");
      }
    };

    fetchAndPopulatePastSubmissionData();
  }, []);

  const submit = async (data: SubstanceUseHistory) => {
    try {
      if (!user) {
        throw new Error("User missing");
      }
  
      let response;
  
      if (verb === "new") {
        response = await createSubstanceUseHistoryRecord(data);
      } else {
        response = await updateSubstanceUseHistoryRecord(submissionId, data);
      }
  
      if (response) {
        setSuccessMessage("Substance Use History submitted successfully!");
        router.push("/dashboard");
      } else {
        throw new Error("Failed to submit Substance Use History");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong! Please try again later");
    }
  };

  return (
    <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
      <form
        onSubmit={handleSubmit(submit)}
        className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
      >
        {/* ... */}
      </form>
    </div>
  );
};

export default SubstanceUseHistoryPage;