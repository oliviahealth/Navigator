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
      try {
        if (verb !== "edit") {
          return;
        }

        if (!user) {
          throw new Error("User not found");
        }

        if (!submissionId) {
          throw new Error("Missing submissionId when fetching past submission");
        }

        const response = await readSocialSupportForm(submissionId, user.id);
        reset(response);
      } catch (error) {
        console.error(error);
        setErrorMessage("Something went wrong! Please try again later");
        router.push("/dashboard");
      }
    };

    if (user && verb === "edit" && submissionId) {
      fetchAndPopulatePastSubmissionData();
    }
  }, [user, verb, submissionId, reset, router, setErrorMessage]);

  const submit = async (data: ISocialSupportFormInputs) => {
    try {
      let response;

      if (!user) {
        throw new Error("User missing");
      }

      if (verb === "new") {
        response = await createSocialSupportForm(data, user.id);
      } else {
        response = await updateSocialSupportForm(data, submissionId, user.id);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong! Please try again later");
      return;
    }

    setSuccessMessage("Social Support Form submitted successfully!");
    router.push("/dashboard");
  };

  const questions = [
    {
      key: "specialPersonInNeed",
      question: {
        en: "There is a special person who is around when I am in need.",
        es: "Hay una persona en especial que esta cerca cuando yo estoy en necesidad.",
      },
    },
    {
      key: "specialPersonJoysSorrows",
      question: {
        en: "There is a special person with whom I can share my joys and sorrows.",
        es: "Hay una persona en especial con la cual yo puedo compartir mis alegrías y mis penas (lamentos).",
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
        es: "Yo recibo la ayuda emocional y el apoyo que necesito de mi familia.",
      },
    },
    {
      key: "specialPersonForComfort",
      question: {
        en: "I have a special person who is a real source of comfort to me.",
        es: "Yo tengo una persona en especial la cual es verdaderamente una fuente de consuelo para mí.",
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
        es: "Yo puedo contar con mis amistades cuando las cosas salen mal.",
      },
    },
    {
      key: "talkToFamilyAboutProblems",
      question: {
        en: "I can talk about my problems with my family.",
        es: "Yo puedo hablar de mis problemas con mi familia.",
      },
    },
    {
      key: "friendsJoysSorrows",
      question: {
        en: "I have friends with whom I can share my joys and sorrows.",
        es: "Yo tengo amistades con las cuales yo puedo compartir mis alegrías y mis penas (lamentos).",
      },
    },
    {
      key: "specialPersonToTalkFeelings",
      question: {
        en: "There is a special person in my life who cares about my feelings.",
        es: "Hay una persona en especial en mi vida a quien le importa mis sentimientos.",
      },
    },
    {
      key: "familyHelpsDecisions",
      question: {
        en: "My family is willing to help me make decisions.",
        es: "Mi familia esta dispuesta a ayudarme ha hacer decisiones.",
      },
    },
    {
      key: "talkToFriendsAboutProblems",
      question: {
        en: "I can talk about my problems with my friends.",
        es: "Yo puedo hablar de mis problemas con mis amistades",
      },
    },
  ];

  return (
    <div className="w-full h-full flex justify-center p-2 mt-4 text-base">
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

          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            className="text-blue-500 mt-4"
          >
            {language === "en" ? "Cambiar a Español" : "Switch to English"}
          </button>
        </div>
        <div className="space-y-16 pt-6">
          <div className="space-y-4">
            {questions.map(({ key, question }, index) => (
              <div key={key} className="space-y-3">
                <p className="font-semibold">{`${index + 1}. ${
                  question[language]
                }`}</p>
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
        <div className="space-y-4 mt-10" style={{ marginTop: '50px' }}>
          <p className="font-semibold">
            {language === "en"
              ? 'Please identify that "special person":'
              : 'Por favor identifique esa "persona en especial"'}
          </p>
          <div>
            <label className="block text-sm font-medium mb-1">
              {language === "en" ? "Initials:" : "Iniciales:"}
            </label>
            <input
              {...register("specialPersonInitials")}
              type="text"
              className="w-full border rounded p-2"
              placeholder={language === "en" ? "Initials" : "Iniciales"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {language === "en" ? "Relationship:" : "Relación:"}
            </label>
            <select
              {...register("specialPersonRelationship")}
              className="w-full border rounded p-2"
            >
              <option value="spouse_partner">
                {language === "en" ? "Spouse/Partner" : "Esposo(a)/pareja"}
              </option>
              <option value="boyfriend_girlfriend">
                {language === "en" ? "Boyfriend/Girlfriend" : "Novio/novia"}
              </option>
              <option value="friend">
                {language === "en" ? "Friend" : "Amigo(a)"}
              </option>
              <option value="professional">
                {language === "en"
                  ? "Professional (e.g., teacher, doctor, counselor, pastor)"
                  : "Profesional (e.g., maestro(a), doctor/médico, consejero(a), pastor)"}
              </option>
              <option value="other_family_member">
                {language === "en"
                  ? "Other family member"
                  : "Otro miembro de la familia"}
              </option>
            </select>
          </div>
        </div>

        <div className="space-y-4 mt-16" style={{ marginTop: '50px' }}>
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
        <div>
            <hr className="border-t-1 border-gray-400 my-4" />
            <div>
                <p className="font-semibold pb-2 pt-8">Submission Label</p>
                <textarea {...register("label")} className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                {errors.label && (<span className="label-text-alt text-red-500">{errors.label.message}</span>)}
            </div>
            <div>
                <p className="font-semibold pb-2 pt-8">Staff Notes</p>
                <textarea {...register("staffNotes")} className="border border-gray-300 px-4 py-2 rounded-md w-full" />
                {errors.staffNotes && (<span className="label-text-alt text-red-500">{errors.staffNotes.message}</span>)}
            </div>
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
