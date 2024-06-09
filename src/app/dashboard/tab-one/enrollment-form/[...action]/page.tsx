"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
  EnrollmentFormInputsSchema,
  EnrollmentFormResponseSchema,
  IEnrollmentFormInputs,
} from "../definitions";
import {
  createEnrollmentForm,
  readEnrollmentForm,
  updateEnrollmentForm,
} from "../actions";
import useAppStore from "@/lib/useAppStore";

const EnrollmentLog: React.FC = () => {
  const router = useRouter();
  const { action } = useParams();

  const verb = action[0];
  const submissionId = action[1];

  const [currentStep, setCurrentStep] = useState(0);

  const user = useAppStore((state) => state.user);

  const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);
  const setErrorMessage = useAppStore((state) => state.setErrorMessage);

  // Array of steps to display in the wizard
  const steps = [
    {
      title: `Welcome & Enrollment & Consent Forms Cover Letter`,
      content: [
        `Dear Mother-to-Be, Welcome to GC-MOMS! Congratulations for taking a bold step for you and your baby’s health and your family’s future by enrolling in the GC-MOMS (Golden Crescent Management of Opioid Risk in Mothers) Program (hereinafter referred to as the Program). 

         Once enrolled, your Maternal-Child Health Navigator (MCHN) will visit you every on a regular basis (approximately one time per month) until your baby is one years old. 

         Your MCHN will link you with community resources and give you information and support at this important time in your life.`,
      ],
    },
    {
      title: `Welcome & Enrollment & Consent Forms Cover Letter`,
      content: [
        `The GC-MOMS Program is an integrated part of the Program of Excellence for Mothers, Children & Families at the Texas A&M College of Nursing.  

      In order to have a successful relationship with our clients, we have some rules that guide our actions. To ensure a shared understanding, we would like you to know the following: 
      
      The MCHN will support you in every way we can that is reasonable and appropriate and within our scope as Nurses and within the parameters of the program and university.`,
      ],
    },
    {
      title: `Welcome & Enrollment & Consent Forms Cover Letter`,
      content: [
        `The MCHN is not allowed to: 

      1. Give or accept gifts. This includes cash, gift certificates and items.  
  
      2. Drive you in their personal vehicle. However, they may refer you to a service available in the community. 
  
      3. Participate in a social network (i.e. Facebook, Twitter, Instagram) with clients. 
  
      4. Give out their personal phone numbers. The nurse will use their work phone which they will turn off after work hours (Monday – Friday, 8 AM – 5 PM). Text messaging will be used for the purpose of scheduling visits - no health teaching/nursing advice will be done through text. 
  
      5. Attend private events like baby showers, christenings or marriage ceremonies. If invited by you and their schedule allows, the MCHN may attend public events like graduation or school ceremonies. 
  
      6. Perform visits in the home when there are potential safety concerns for your MCHN (to be determined with Director/Nurse Supervisor). Visits can be scheduled in a different location.`,
      ],
    },
    {
      title: `Welcome & Enrollment & Consent Forms Cover Letter`,
      content: [
        `The MCHN will work with your and their calendars to determine the best dates/times to meet. They will work with your calendar when they need to schedule or reschedule to meet with you (due to vacation, training, etc).  

      Other MCHNs may also work with you. Our Navigator Supervisor / Team Lead and an Administrative and Clinical Team will be closely involved. 
      
      We appreciate your choice to enroll in the GC-MOMS program. We look forward to partnering with you and helping you reach your goals for a healthy pregnancy, healthy child and increasing self-sufficiency for you and your family. 
      
      Communication is essential. Reach out to us if we can answer any questions or support you in any way.`,
      ],
    },
    {
      title: `Enrollment Form, Standard Consent, Eligiblity, Emergency Contact & Release of Information`,
      content: [
        ` GC-MOMS is a free community health care program. The Program provides pregnancy and parenting support to first-time mothers from nurses who visit their homes beginning in early pregnancy through the child’s second birthday. 

          Please complete this form to enroll in the Program.`,
      ],
    },
    {
      title: `Program Eligiblity`,
      content: [
        `To participate in the Program, I understand that I must be a resident of the counties served by the program. The following rural counties in Texas are to be served: Lavaca, DeWitt, Jackson, and Calhoun. 

         I must be interested in having a child, pregnant or have a new baby in my household less than 1 year old. I can have more than one child in my family and be eligible for the program. There is no income requirement. 

         By signing below, I confirm that I meet the Program eligibility requirements, and I agree to provide the Program with any documents necessary to prove my eligibility if that is necessary. `,
      ],
    },
    {
      title: `Permission to Share Health Information (Release of Information - ROI)`,
      content: [
        `I allow the Program and Texas A&M University College of Nursing (TAMU-CON) to share health information about me, my child and my family collected during my participation in the GC-MOMS Program as described below. 
        
        This health information may include names, contact information, birth dates, medical history, treatment records, information from surveys and during visits with my MCHN, and other information collected about me, my child and my family in the Program. `
      ]
    }
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
    reset,
    formState: { errors },
  } = useForm<IEnrollmentFormInputs>({
    resolver: zodResolver(EnrollmentFormInputsSchema),
    defaultValues: {},
  });

  // Extract some functions that will allow us to interface with the array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "emergencyContacts",
  });

  const addNewEmergencyContact = () =>
    append({
      name: "",
      phone: "",
      relationship: "",
      email: "",
    });

  useEffect(() => {
    const fetchAndPopulatePastSubmissionData = async () => {
      try {
        if (verb !== "edit") return;

        if (!submissionId)
          throw new Error(
            "Missing submissionId when fetching past submissions"
          );

        if (!user) throw new Error("Missing user");

        const response = await readEnrollmentForm(submissionId, user.id);

        const validResponse = EnrollmentFormResponseSchema.parse(response);

        const formattedData = {
          ...validResponse,
          guardianDate: new Date(validResponse.guardianDate)
            .toISOString()
            .split("T")[0],
          gcMomsDate: new Date(validResponse.gcMomsDate)
            .toISOString()
            .split("T")[0],
          dateOfBirth: new Date(validResponse.dateOfBirth)
            .toISOString()
            .split("T")[0],
          clientDate: new Date(validResponse.clientDate)
            .toISOString()
            .split("T")[0],
        };

        reset(formattedData);
      } catch (error) {
        console.error(error);
        setErrorMessage("Something went wrong! Please try again later");

        router.push("/");
        return;
      }
    };

    fetchAndPopulatePastSubmissionData();
  }, []);

  const submit = async (data: IEnrollmentFormInputs) => {
    try {
      if (!user) {
        throw new Error("User not found");
      }

      let response;

      if (verb === "new") {
        response = await createEnrollmentForm(data, user.id);
      } else {
        response = await updateEnrollmentForm(data, submissionId, user.id);
      }

      EnrollmentFormResponseSchema.parse(response);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong! Please try again later");

      router.push("/dashboard");

      return;
    }

    setSuccessMessage("Enrollment Form submitted successfully!");
    router.push("/dashboard");
  };

  return (
    <div className="w-full h-full flex flex-col items-center mt-2 text-base pt-20 ">
      <div className="flex flex-col items-center max-w-7xl">
        <div>
          <div className="mb-2 pl-24 pr-24">
            <h2 className="text-3xl font-semibold pl-8">
              {steps[currentStep].title}
            </h2>
            <div className="p-8">
              {steps[currentStep].content[0]
                .split("\n")
                .map((line: string, lineIndex: number) => (
                  <p key={lineIndex} className="mt-4 mb-4">
                    {line.trim()}
                  </p>
                ))}
            </div>
          </div>

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

      <div className="mt-10"> 
      {currentStep === steps.length - 1 && ( // Display form on last step
        <form
          onSubmit={handleSubmit((data) => submit(data))}
          className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-1 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4 mt-10" // Adjust the value as needed
        >
          <p className="text-2xl pt-8 font-semibold text-left">
            Your Contact Information
          </p>
          <p className="font-medium pb-2 pt-8">First Name</p>
          <input
            {...register("firstName")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.firstName && (
            <span className="label-text-alt text-red-500">
              {errors.firstName.message}
            </span>
          )}
          <p className="font-medium pb-2 pt-8">Last Name</p>
          <input
            {...register("lastName")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.lastName && (
            <span className="label-text-alt text-red-500">
              {errors.lastName.message}
            </span>
          )}
          <p className="font-medium pb-2 pt-8">Address</p>
          <input
            {...register("address")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.address && (
            <span className="label-text-alt text-red-500">
              {errors.address.message}
            </span>
          )}
          <p className="font-medium pb-2 pt-8">City</p>
          <input
            {...register("city")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.city && (
            <span className="label-text-alt text-red-500">
              {errors.city.message}
            </span>
          )}
          <p className="font-medium pb-2 pt-8">State</p>
          <input
            {...register("state")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.state && (
            <span className="label-text-alt text-red-500">
              {errors.state.message}
            </span>
          )}
          <p className="font-medium pb-2 pt-8">Zip Code</p>
          <input
            {...register("zip")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.zip && (
            <span className="label-text-alt text-red-500">
              {errors.zip.message}
            </span>
          )}
          <p className="font-medium pb-2 pt-8">Home Phone Number</p>
          <input
            {...register("homePhone")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.homePhone && (
            <span className="label-text-alt text-red-500">
              {errors.homePhone.message}
            </span>
          )}
          <p className="font-medium pb-2 pt-8">Cell Phone Number</p>
          <input
            {...register("cellPhone")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.cellPhone && (
            <span className="label-text-alt text-red-500">
              {errors.cellPhone.message}
            </span>
          )}
          <p className="font-medium pb-2 pt-8">Email</p>
          <input
            {...register("email")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
            type="email"
          />
          {errors.email && (
            <span className="label-text-alt text-red-500">
              {errors.email.message}
            </span>
          )}
          <p className="font-medium pb-2 pt-8">Date of Birth</p>
          <input
            {...register("dateOfBirth")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.dateOfBirth && (
            <span className="label-text-alt text-red-500">
              {errors.dateOfBirth.message}
            </span>
          )}

          <div className="mt-4">
          <p className="text-2xl pt-8 font-semibold text-left">
              Emergency Contact Information
            </p>
            {fields.map((field, index) => (
              <div key={field.id}>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold pb-2 pt-8">
                    Emergency Contact {index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                  >
                    - Remove Emergency Contact
                  </button>
                </div>

                <p className="pb-2 pt-8 font-semibold">
                  Emergency Contact Name
                </p>
                <input
                  {...register(`emergencyContacts.${index}.name`)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                  type="text"
                />
                {errors.emergencyContacts &&
                  errors.emergencyContacts[index]?.name && (
                    <span className="label-text-alt text-red-500">
                      {errors.emergencyContacts[index]?.name?.message}
                    </span>
                  )}

                <p className="font-medium pb-2 pt-8">
                  Emergency Contact Phone Number
                </p>
                <input
                  {...register(`emergencyContacts.${index}.phone`)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                  type="text"
                />
                {errors.emergencyContacts &&
                  errors.emergencyContacts[index]?.phone && (
                    <span className="label-text-alt text-red-500">
                      {errors.emergencyContacts[index]?.phone?.message}
                    </span>
                  )}

                <p className="font-medium pb-2 pt-8">Relationship to Patient</p>
                <input
                  {...register(`emergencyContacts.${index}.relationship`)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                  type="text"
                />
                {errors.emergencyContacts &&
                  errors.emergencyContacts[index]?.relationship && (
                    <span className="label-text-alt text-red-500">
                      {errors.emergencyContacts[index]?.relationship?.message}
                    </span>
                  )}

                <p className="font-medium pb-2 pt-8">Emergency Contact Email</p>
                <input
                  {...register(`emergencyContacts.${index}.email`)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                  type="text"
                />
                {errors.emergencyContacts &&
                  errors.emergencyContacts[index]?.email && (
                    <span className="label-text-alt text-red-500">
                      {errors.emergencyContacts[index]?.email?.message}
                    </span>
                  )}
              </div>
              
            ))}
           <div className="flex justify-center ml-[-0px]"> 
              <button
                type="button"
                onClick={addNewEmergencyContact}
                className="text-green-500 px-20 py-4 font-medium rounded-md whitespace-nowrap"
                
              >
                + Add New Contact
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto mt-[-20px]" // Adjust the value as needed
          >
            Submit
          </button>
          <p></p>
        </form>
        
      )}
    </div>
    </div>
  );
};

export default EnrollmentLog;