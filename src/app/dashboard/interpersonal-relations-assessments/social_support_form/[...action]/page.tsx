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

      console.log("User:", user);
      console.log("Verb:", verb);

      if (verb === "new") {
        console.log("Attempting to create new form");
        response = await createSocialSupportForm(data, user.id);
      } else {
        console.log("Attempting to update form");
        response = await updateSocialSupportForm(data, submissionId, user.id);
      }

      console.log("Form submitted successfully:", response);
      setSuccessMessage("Social Support Form submitted successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Something went wrong! Please try again later");
    }
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
        <p className="font-semibold text-2xl text-center">
          Multidimensional Scale
        </p>
        <div className="space-y-4">
          <div className="mt-4 p-4 bg-blue-100 rounded-md">
            <p className="font-medium text-center">
              MEASURE OF PERCEIVED ADEQUACY OF SOCIAL SUPPORT FROM THREE SOURCES
            </p>
            <p className="text-sm text-center mt-2">
              The Multidimensional Scale of Perceived Social Support (Zimet et
              al., 1988) is a 12-item measure of perceived adequacy of social
              support from three sources: family, friends, & significant other.
            </p>
            <p className="text-sm text-center mt-2">
              It uses a 5-point Likert scale (0 = strongly disagree, 5 =
              strongly agree).
            </p>
          </div>
        </div>
        <div className="py-2 space-y-4">
          {/* Assessment Date */}
          <div className="flex flex-col justify-between">
            <label htmlFor="assessmentDate" className="font-semibold pb-2 pt-2">
              Assessment Date (mm/dd/yyyy)
            </label>
            <input
              type="date"
              {...register("assessmentDate")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.assessmentDate && (
              <span className="label-text-alt text-red-500">
                {errors.assessmentDate.message}
              </span>
            )}
          </div>

          {/* Site ID */}
          <div className="flex flex-col justify-between">
            <label htmlFor="siteId" className="font-semibold pb-2 pt-2">
              Site ID (01-00 format)
            </label>
            <input
              type="text"
              {...register("siteId")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              placeholder="01-00"
            />
            {errors.siteId && (
              <span className="label-text-alt text-red-500">
                {errors.siteId.message}
              </span>
            )}
          </div>

          {/* Participant ID */}
          <div className="flex flex-col justify-between">
            <label htmlFor="participantId" className="font-semibold pb-2 pt-2">
              Participant ID
            </label>
            <input
              type="text"
              {...register("participantId")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
            {errors.participantId && (
              <span className="label-text-alt text-red-500">
                {errors.participantId.message}
              </span>
            )}
          </div>

          {/* Relation */}
          <div className="flex flex-col justify-between">
            <label htmlFor="relation" className="font-semibold pb-2 pt-2">
              Relation (01-00 format)
            </label>
            <input
              type="text"
              {...register("relation")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              placeholder="01-00"
            />
            {errors.relation && (
              <span className="label-text-alt text-red-500">
                {errors.relation.message}
              </span>
            )}
          </div>

          {/* Form Completion Status */}
          <div className="flex flex-col justify-between">
            <label
              htmlFor="formCompletionStatus"
              className="font-semibold pb-2 pt-2"
            >
              Form Completion Status
            </label>
            <div className="flex items-center">
              <select
                {...register("formCompletionStatus")}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              >
                <option value="">Select status</option>
                <option value="1">1 = Form completed as required</option>
                <option value="2">2 = Participant refused</option>
                <option value="4">4 = Not enough time at the visit</option>
                <option value="5">5 = Participant did not attend visit</option>
              </select>
            </div>
            {errors.formCompletionStatus && (
              <span className="label-text-alt text-red-500">
                {errors.formCompletionStatus.message}
              </span>
            )}
          </div>

          {/* Phase */}
          <div className="flex flex-col justify-between">
            <label htmlFor="phase" className="font-semibold pb-2 pt-2">
              Phase
            </label>
            <div className="flex">
              <label className="mr-4">
                <input
                  type="radio"
                  {...register("phase")}
                  value="Baseline"
                  className="mr-2"
                />
                Baseline
              </label>
              <label>
                <input
                  type="radio"
                  {...register("phase")}
                  value="Post Randomization"
                  className="mr-2"
                />
                Post Randomization
              </label>
            </div>
            {errors.phase && (
              <span className="label-text-alt text-red-500">
                {errors.phase.message}
              </span>
            )}
          </div>

          {/* Segment */}
          <div className="flex flex-col justify-between">
            <label htmlFor="segment" className="font-semibold pb-2 pt-2">
              Segment (2 digit number)
            </label>
            <input
              type="text"
              {...register("segment")}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
              placeholder="00"
            />
            {errors.segment && (
              <span className="label-text-alt text-red-500">
                {errors.segment.message}
              </span>
            )}
          </div>

          {/* Form Completion Language */}
          <div className="flex flex-col justify-between">
            <label
              htmlFor="formCompletionLanguage"
              className="font-semibold pb-2 pt-2"
            >
              Form Completion Language
            </label>
            <div className="flex">
              <label className="mr-4">
                <input
                  type="radio"
                  {...register("formCompletionLanguage")}
                  value="English"
                  className="mr-2"
                />
                English
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  {...register("formCompletionLanguage")}
                  value="Spanish"
                  className="mr-2"
                />
                Spanish
              </label>
              <label>
                <input
                  type="radio"
                  {...register("formCompletionLanguage")}
                  value="Both"
                  className="mr-2"
                />
                Both
              </label>
            </div>
            {errors.formCompletionLanguage && (
              <span className="label-text-alt text-red-500">
                {errors.formCompletionLanguage.message}
              </span>
            )}
          </div>
        </div>

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
          <div className="flex flex-col justify-between space-y-4 pt-6">
            {questions.map(({ key, question }, index) => (
              <div key={key} className="flex flex-col space-y-3">
                <label htmlFor={key} className="font-semibold pb-2 pt-2">
                  {`${index + 1}. ${question[language]}`}
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    {...register(key as keyof ISocialSupportFormInputs)}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                  >
                    <option value="">Select response</option>
                    {ResponseAnswersEnum.options.map((option) => (
                      <option key={option} value={option}>
                        {labelMapping.responseAnswers[option][language]}
                      </option>
                    ))}
                  </select>
                </div>
                {errors[key as keyof ISocialSupportFormInputs] && (
                  <span className="label-text-alt text-red-500">
                    {errors[key as keyof ISocialSupportFormInputs]?.message}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 mt-10" style={{ marginTop: "50px" }}>
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

        <div className="space-y-4 mt-16" style={{ marginTop: "50px" }}>
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