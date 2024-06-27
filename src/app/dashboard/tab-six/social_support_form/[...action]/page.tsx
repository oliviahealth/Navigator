"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  ResponseAnswersEnum,
  SocialSupportFormInputsSchema,
  ISocialSupportFormInputs,
  labelMapping,
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import {
  createSocialSupportForm,
  readSocialSupportForm,
  updateSocialSupportForm,
} from "../actions";

const SocialSupportForm: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "es">("en");
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
  } = useForm<ISocialSupportFormInputs>({
    resolver: zodResolver(SocialSupportFormInputsSchema),
  });

  useEffect(() => {
    const fetchAndPopulatePastSubmissionData = async () => {
      // ... (same as before)
    };

    if (user && verb === "edit" && submissionId) {
      fetchAndPopulatePastSubmissionData();
    }
  }, [user, verb, submissionId, reset, router, setErrorMessage]);

  const submit = async (data: ISocialSupportFormInputs) => {
    // ... (same as before)
  };

  const questions = [
    {
      key: "specialPersonInNeed",
      question: {
        en: "There is a special person who is around when I am in need.",
        es: "Hay una persona especial que está cerca cuando estoy en necesidad.",
      },
    },
    {
      key: "specialPersonJoysSorrows",
      question: {
        en: "There is a special person with whom I can share joys and sorrows.",
        es: "Hay una persona especial con quien puedo compartir alegrías y tristezas.",
      },
    },
    {
      key: "familyHelp",
      question: {
        en: "My family really tries to help me.",
        es: "Mi familia realmente trata de ayudarme.",
      },
    },
    {
      key: "emotionalHelp",
      question: {
        en: "I get the emotional help & support I need from my family.",
        es: "Obtengo la ayuda emocional y el apoyo que necesito de mi familia.",
      },
    },
    {
      key: "specialPersonForComfort",
      question: {
        en: "I have a special person who is a real source of comfort to me.",
        es: "Tengo una persona especial que es una verdadera fuente de consuelo para mí.",
      },
    },
    {
      key: "friendsHelp",
      question: {
        en: "My friends really try to help me.",
        es: "Mis amigos realmente tratan de ayudarme.",
      },
    },
    {
      key: "canCountOnFriends",
      question: {
        en: "I can count on my friends when things go wrong.",
        es: "Puedo contar con mis amigos cuando las cosas van mal.",
      },
    },
    {
      key: "talkToFamilyAboutProblems",
      question: {
        en: "I can talk about my problems with my family.",
        es: "Puedo hablar de mis problemas con mi familia.",
      },
    },
    {
      key: "friendsJoysSorrows",
      question: {
        en: "I have friends with whom I can share my joys and sorrows.",
        es: "Tengo amigos con quienes puedo compartir mis alegrías y tristezas.",
      },
    },
    {
      key: "specialPersonToTalkFeelings",
      question: {
        en: "There is a special person in my life who cares about my feelings.",
        es: "Hay una persona especial en mi vida que se preocupa por mis sentimientos.",
      },
    },
    {
      key: "familyHelpsDecisions",
      question: {
        en: "My family is willing to help me make decisions.",
        es: "Mi familia está dispuesta a ayudarme a tomar decisiones.",
      },
    },
    {
      key: "talkToFriendsAboutProblems",
      question: {
        en: "I can talk about my problems with my friends.",
        es: "Puedo hablar de mis problemas con mis amigos.",
      },
    },
  ];

  return (
    <div className="w-full h-full flex justify-center p-2 mt-2 text-base">
      <form
        onSubmit={handleSubmit((data) => submit(data))}
        className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-2 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
      >
        <div className="pt-6">
          <p className="font-semibold text-2xl">
            {verb === "new"
              ? language === "en"
                ? "New"
                : "Nuevo"
              : language === "en"
              ? "Edit"
              : "Editar"}
            {language === "en"
              ? " Social Support Form"
              : " Formulario de Apoyo Social"}
          </p>
          <small>
            {language === "en"
              ? "This form assesses your perceived social support from family, friends, and significant others."
              : "Este formulario evalúa su percepción de apoyo social de familia, amigos y personas significativas."}
          </small>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            className="text-blue-500"
          >
            {language === "en" ? "Cambiar a Español" : "Switch to English"}
          </button>
        </div>

        <div className="space-y-16 pt-12">
          <div className="space-y-4">
            {questions.map(({ key, question }) => (
              <div key={key} className="space-y-3">
                <p className="font-semibold">{question[language]}</p>
                <div className="space-y-2">
                  {ResponseAnswersEnum.options.map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        {...register(key as keyof ISocialSupportFormInputs)}
                        type="radio"
                        value={option}
                        className="form-radio"
                      />
                      <span className="ml-2">
                        {labelMapping.responseAnswers[option][language]}
                      </span>
                    </label>
                  ))}
                  {errors[key as keyof ISocialSupportFormInputs] && (
                    <span className="label-text-alt text-red-500">
                      {errors[key as keyof ISocialSupportFormInputs]?.message}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 mt-10">
          <p className="font-semibold">
            {language === "en"
              ? "Additional Comments"
              : "Comentarios Adicionales"}
          </p>
          <textarea
            {...register("comments")}
            className="w-full h-32 p-2 border rounded"
            placeholder={
              language === "en"
                ? "Enter any additional comments here..."
                : "Ingrese cualquier comentario adicional aquí..."
            }
          />
          {errors.comments && (
            <span className="label-text-alt text-red-500">
              {errors.comments.message}
            </span>
          )}
        </div>

        <div className="flex justify-center py-4">
          <button
            type="submit"
            className="flex items-center justify-center gap-x-2 w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto font-semibold"
          >
            {isSubmitting && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
            {language === "en" ? "Save" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocialSupportForm;
