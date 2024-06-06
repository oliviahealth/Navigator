"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

const MediaReleaseFormSchema = z.object({
  participantName: z.string().min(1, "Participant Name is required"),
  // added participant age as if participant is under 18 years old, legal guardian name is required and will pop up on form
  // tranforms string into integer and checks if it is a number and greater than 1
  participantAge: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((age) => !isNaN(age) && age >= 1, {
      message:
        "Participant Age is required and should be a number greater than 0",
      path: ["participantAge"],
    }),
  date: z.string().min(1, "Date is required"),
  legalGuardianName: z.string().min(1, "Legal Guardian Name is required"),
});

export type IMediaReleaseForm = z.infer<typeof MediaReleaseFormSchema>;

const MediaReleaseForm: React.FC = () => {
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
    {
      title: ``,
      content: [``],
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
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IMediaReleaseForm>({
    resolver: zodResolver(MediaReleaseFormSchema),
    defaultValues: {},
  });

  const submit = (data: IMediaReleaseForm) => {
    alert("Media Release form submitted successfully");
    console.log(data);
  };

  return (
    // Wizard to display text with back/continue buttons
    // change padding based on whether text is displayed or form
    <div className={`w-full h-full flex flex-col items-center p-2 mt-2 text-base ${currentStep < steps.length - 1 ? 'pt-20' : 'pt-4'} px-32`}>
      <div className="flex flex-col items-center">
        <div>
          <div className="mb-2 pl-24 pr-24">
            <h2 className="text-3xl font-semibold pl-8">
              {steps[currentStep].title}
            </h2>
            <div className="p-8">
              {steps[currentStep].content[0]
                .split("\n")
                .map((line: string, lineIndex: number) => (
                  <p key={lineIndex} className="mt-4 mb-4 text-xl">
                    {line.trim()}
                  </p>
                ))}
            </div>
          </div>
          {currentStep < steps.length - 1 && (
            <div className="flex justify-end space-x-4 mr-12">
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
      {currentStep < steps.length - 1 && (
        <div className="flex justify-center space-x-4 mt-4">
          {steps.map((_, index) => (
            <button
              key={index}
              className="focus:outline-none button"
              onClick={() => setCurrentStep(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {currentStep === steps.length - 1 && ( // Form
        <form
          onSubmit={handleSubmit((data) => submit(data))}
          className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-1 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4 mt-[-96] mt-[-20]"
        >
          <p className="text-xl pt-8 text-center font-semibold ">
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
          <p className="font-medium pb-2 pt-8">Date</p>
          <input
            {...register("date")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            type="date"
          />
          {errors.date && (
            <span className="label-text-alt text-red-500">
              {errors.date.message}
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
                {...register("legalGuardianName")}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
              {errors.legalGuardianName && (
                <span className="label-text-alt text-red-500">
                  {errors.legalGuardianName.message}
                </span>
              )}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto mt-10"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default MediaReleaseForm;
