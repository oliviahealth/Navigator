"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import useAppStore from "@/lib/useAppStore";
import { MediaAppearanceFormInputSchema, IMediaAppearanceFormInput } from "../definitions";
import { createMediaAppearanceForm, readMediaAppearanceForm, updateMediaAppearanceForm } from "../actions";


const MediaAppearanceForm: React.FC = () => {
  const router = useRouter();
  const { action } = useParams();

  const verb = action[0];
  const submissionId = action[1];

  const user = useAppStore((state) => state.user);

  const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
  const setErrorMessage = useAppStore(state => state.setErrorMessage);

  const [currentStep, setCurrentStep] = useState(0);
  // Array of steps to display in the wizard
  const steps = [
    {
      title: `Media Appearance Release`,
      content: [
        `1. The Participant consents to the use by Texas A&M University and assigns and grants to System Member the  irrevocable and unconditional power, right, privilege and permission to make, record, produce, edit, modify, reproduce, exhibit,  distribute, publish, publicly or privately display, publicly or privately perform, create derivative works, and transmit by the  means of still photography, live or recorded broadcast, cablecast, webcast, or Internet streaming, broadband, wireless, mobile,  film, videotape, or any other similar mechanical or electronic method (whether now known or invented later) the Participant’s  performance, contribution, appearance, name, voice, picture, likeness, poses, actions and any combination of any of these (the  “Appearance”) in connection with the Program of Excellence for Mothers, Children & Families production conducted by  System Member (the “Project”) which is generally for the purposes of education, instruction, research, publicity, advertising,  and promotion in connection with the Project. 
        Participant also waives any moral or similar rights Participant may have in the Project relating to the Appearance.  `,
      ],
    },
    {
      title: `Media Appearance Release`,
      content: [
        `2. Participant understands that System Member shall have the absolute power and right to copyright the recorded  production (and System Member shall be the owner of such copyright), in whole or in part, of the Project involving Participant  and the Appearance and that such recorded production may be subsequently used, in whole or in part (including but not limited  to any still recordings, images, or screen shots) for any purpose, including but not limited to the purposes described above at any  time and from time to time hereafter throughout the world. `,
      ],
    },
    {
      title: `Media Appearance Release`,
      content: [
        `3. Participant also understands that there is no compensation or other consideration for appearance or participation in the Project, or for the grant of rights described in this document and that the opportunity to potentially appear in the recorded production related to the Project is sufficient consideration received for this Appearance Release.  `,
      ],
    },
    {
      title: `Media Appearance Release`,
      content: [
        `4. Participant releases and discharges System Member, The Texas A&M University System and/or any affiliated  organization, and their respective, regents, officers, employees, agents, and representatives from any and all claims, demands,  causes of action, or liabilities arising out of or in connection with the Appearance or the making, producing, reproducing,  processing, exhibiting, distributing, publishing, transmitting by any means described above or otherwise using the recorded  production relating to the Project or the Appearance (e.g., violation of privacy rights; rights of publicity; false light; libel,  slander, or disparagement; or copyright or trademark infringement). `,
      ],
    },
    {
      title: `Media Appearance Release`,
      content: [
        `5. Participant represents and warrants that Participant has not granted any similar rights to any third party that would conflict with the rights granted to System Member in this Appearance Release. Participant certifies and warrants that Participant is of legal age, has full power, right and authority to enter into this consent and release, has read same in its entirety, understands all of its terms and provisions, and voluntarily and knowingly executes this Appearance Release.  

        `,
      ],
    },
  ];

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    unregister,
    reset,
    formState: { errors },
  } = useForm<IMediaAppearanceFormInput>({
    resolver: zodResolver(MediaAppearanceFormInputSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (watch("participantAge") >= 18) {
      unregister("guardianName");
    }
  }, [watch("participantAge"), unregister]);

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

        const validResponse = await readMediaAppearanceForm(submissionId, user.id);
        const formattedData = {
          ...validResponse,
          participantDate: new Date(validResponse.participantDate).toISOString().split("T")[0],
          guardianDate: validResponse.guardianDate
            ? new Date(validResponse.guardianDate).toISOString().split("T")[0]
            : undefined,
        }
        reset(formattedData);
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

  const submit = async (data: IMediaAppearanceFormInput) => {
    try {
      if (!user) {
        throw new Error('User not found');
      }

      let response;

      if (verb === "new") {
        response = await createMediaAppearanceForm({ ...data, guardianDate: data.guardianName ? data.participantDate : null }, user.id);
      } else {
        response = await updateMediaAppearanceForm(data, submissionId, user.id);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong! Please try again later");

      router.push('/dashboard');

      return;
    }

    setSuccessMessage('Media Appearance Form submitted successfully');
    router.push('/dashboard');
  };

  return (
    // Wizard to display text with back/continue buttons
    // change padding based on whether text is displayed or form
    <div className="w-full h-full flex flex-col items-center mt-2 text-base pt-20 ">
      <div className="flex flex-col items-center max-w-7xl">
        <div>
          <div className="mb-2 px-24">
            <h2 className="text-3xl font-semibold pl-8">
              {steps[currentStep].title}
            </h2>
            <div className="p-8">
              {steps[currentStep].content[0]
                .split("\n")
                .map((line: string, lineIndex: number) => (
                  <p key={lineIndex} className="mt-4 mb-4 text-base">
                    {line.trim()}
                  </p>
                ))}
            </div>
          </div>

          {currentStep !== 4 && (
            <div className="flex justify-end space-x-4 px-24">
              <button
                className="block md:flex button md:button-filled md:rounded-full gap-x-2"
                onClick={goBack}
                disabled={currentStep === 0}
              >
                Back
              </button>
              <button
                className="block md:flex button md:button-filled md:rounded-full gap-x-2"
                onClick={goForward}
                disabled={currentStep === steps.length - 1}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        {steps.map((_, index) => (
          <button
            key={index}
            className={`focus:outline-none button ${currentStep === index ? "button-filled" : ""
              }`}
            onClick={() => setCurrentStep(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {currentStep === steps.length - 1 && ( // Form
        <form
          onSubmit={handleSubmit((data) => submit(data))}
          className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-1 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4 pb-4"
        >
          <p className="text-2xl pt-8 text-left font-semibold ">
            Media Release Form
          </p>
          <p className="font-medium pb-2 pt-8">Participant Name</p>
          <input
            {...register("participantName")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.participantName && (
            <span className="label-text-alt text-red-500">
              {errors.participantName.message}
            </span>
          )}
          <p className="font-medium pb-2 pt-8">Participant Age</p>
          <input
            {...register("participantAge")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            type="number"
          />
          {errors.participantAge && (
            <span className="label-text-alt text-red-500">
              {errors.participantAge.message}
            </span>
          )}

          <p className="font-medium pb-2 pt-8">Address</p>
          <input
            {...register("address")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            type="text"
          />
          {errors.address && (
            <span className="label-text-alt text-red-500">
              {errors.address.message}
            </span>
          )}

          <p className="font-medium pb-2 pt-8">Date</p>
          <input
            {...register("participantDate", { valueAsDate: true })}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            type="date"
          />
          {errors.participantDate && (
            <span className="label-text-alt text-red-500">
              {errors.participantDate.message}
            </span>
          )}
          {watch("participantAge") < 18 && (
            <div className="space-y-4">
              <p className="font-medium pb-2 pt-8">Legal Guardian Name</p>
              <div className="mt-4 p-4 bg-blue-100 rounded-md">
                <p className="font-medium text-center">
                  IF PARTICIPANT IS UNDER THE AGE OF 18 YEARS, A PARENT OR LEGAL
                  GUARDIAN MUST SIGN BELOW:
                </p>
                <p className="text-sm text-center mt-2">
                  I agree to all the terms and conditions of this Appearance
                  Release on behalf of myself and my child/ward.
                </p>
              </div>
              <input
                {...register("guardianName", {
                  required: watch("participantAge") < 18,
                })}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
              {errors.guardianName && (
                <span className="label-text-alt text-red-500">
                  {errors.guardianName.message}
                </span>
              )}
            </div>
          )}
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
          <div className="mb-2">
            <button
              type="submit"
              className="w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto mt-4"
            >
              Submit
            </button>
            <div className="flex justify-start space-x-4 mr-12 w-full mt-4">
              <button
                className="block md:flex button md:button-filled md:rounded-full gap-x-2"
                onClick={goBack}
              >
                Back
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default MediaAppearanceForm;