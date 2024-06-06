"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

export const EmergencyContactsSchema = z.object({
  emergencyname: z.string().min(1, "Emergency Name is required"),
  emergencyphone: z.string().min(1, "Emergency Phone is required"),
  emergencyrelationship: z
    .string()
    .min(1, "Relationship to patient is required"),
  emergencyemail: z.string().min(1, "Emergency Email is required"),
});
export type IEmergencyContact = z.infer<typeof EmergencyContactsSchema>;

export const EnrollmentLogInputsSchema = z.object({
  firstname: z.string().min(1, "First Name is required"),
  lastname: z.string().min(1, "Last Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "Zip is required"),
  homephone: z.string().min(1, "Home phone is required"),
  cellphone: z.string().min(1, "Cell phone is required"),
  email: z.string().min(1, "Email is required"),
  datebirth: z.string().min(1, "Date of Birth is required"),
  emergencyContacts: z.array(EmergencyContactsSchema),
});
export type IEnrollmentLogInputs = z.infer<typeof EnrollmentLogInputsSchema>;

export const EnrollmentLogResponseSchema = EnrollmentLogInputsSchema.extend({
  id: z.string(),
  userId: z.string(),
  dateCreated: z.date(),
  dateModified: z.date(),
});
export type EnrollmentLogResponse = z.infer<typeof EnrollmentLogResponseSchema>;

const EnrollmentLog: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
      
      Communication is essential. Reach out to us if we can answer any questions or support you in any way.`]
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
    formState: { errors },
  } = useForm<IEnrollmentLogInputs>({
    resolver: zodResolver(EnrollmentLogInputsSchema),
    defaultValues: {
      
    },
  });

  // Extract some functions that will allow us to interface with the array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "emergencyContacts",
  });

  const addNewCommunicationEntry = () =>
    append({
      emergencyname: "",
      emergencyphone: "",
      emergencyrelationship: "",
      emergencyemail: "",
    });

  // Temporary submit function while we work to get db setup
  const submit = (data: IEnrollmentLogInputs) => {
    alert("Enrollment Log submitted successfully");

    console.log(data);
  };

  return (
    // Wizard to display text with back/continue buttons
    <div
      className={`w-full h-full flex flex-col items-center p-2 mt-2 text-base ${
        currentStep < steps.length - 1 ? "pt-20" : "pt-4"
      } px-32`}
    >
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
          className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-1 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
        >
          <p className="text-xl pt-8 text-center font-semibold ">
            Your Contact Information
          </p>
          <p className="font-medium pb-2 pt-8">First Name</p>
          <input
            {...register("firstname")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.firstname && (
            <span className="label-text-alt text-red-500">
              {errors.firstname.message}
            </span>
          )}
          <p className="font-medium pb-2 pt-8">Last Name</p>
          <input
            {...register("lastname")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.lastname && (
            <span className="label-text-alt text-red-500">
              {errors.lastname.message}
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
            {...register("homephone")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.homephone && (
            <span className="label-text-alt text-red-500">
              {errors.homephone.message}
            </span>
          )}
          <p className="font-medium pb-2 pt-8">Cell Phone Number</p>
          <input
            {...register("cellphone")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.cellphone && (
            <span className="label-text-alt text-red-500">
              {errors.cellphone.message}
            </span>
          )}
          <p className="font-medium pb-2 pt-8">Email</p>
          <input
            {...register("email")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.email && (
            <span className="label-text-alt text-red-500">
              {errors.email.message}
            </span>
          )}
          <p className="font-medium pb-2 pt-8">Date of Birth</p>
          <input
            {...register("datebirth")}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {errors.datebirth && (
            <span className="label-text-alt text-red-500">
              {errors.datebirth.message}
            </span>
          )}
          <p className="text-xl pt-8 text-center font-semibold ">
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

              <p className="pb-2 pt-8 font-semibold">Emergency Contact Name</p>
              <input
                {...register(`emergencyContacts.${index}.emergencyname`)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                type="text"
              />
              {errors.emergencyContacts &&
                errors.emergencyContacts[index]?.emergencyname && (
                  <span className="label-text-alt text-red-500">
                    {errors.emergencyContacts[index]?.emergencyname?.message}
                  </span>
                )}

              <p className="font-medium pb-2 pt-8">
                Emergency Contact Phone Number
              </p>
              <input
                {...register(`emergencyContacts.${index}.emergencyphone`)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                type="text"
              />
              {errors.emergencyContacts &&
                errors.emergencyContacts[index]?.emergencyphone && (
                  <span className="label-text-alt text-red-500">
                    {errors.emergencyContacts[index]?.emergencyphone?.message}
                  </span>
                )}

              <p className="font-medium pb-2 pt-8">Relationship to Patient</p>
              <input
                {...register(
                  `emergencyContacts.${index}.emergencyrelationship`
                )}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                type="text"
              />
              {errors.emergencyContacts &&
                errors.emergencyContacts[index]?.emergencyrelationship && (
                  <span className="label-text-alt text-red-500">
                    {
                      errors.emergencyContacts[index]?.emergencyrelationship
                        ?.message
                    }
                  </span>
                )}

              <p className="font-medium pb-2 pt-8">Emergency Contact Email</p>
              <input
                {...register(`emergencyContacts.${index}.emergencyemail`)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                type="text"
              />
              {errors.emergencyContacts &&
                errors.emergencyContacts[index]?.emergencyemail && (
                  <span className="label-text-alt text-red-500">
                    {errors.emergencyContacts[index]?.emergencyemail?.message}
                  </span>
                )}
            </div>
          ))}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={addNewCommunicationEntry}
              className="text-green-500 px-20 py-4 font-medium rounded-md whitespace-nowrap"
            >
              + Add New Contact
            </button>
          </div>
          {/* </div> */}

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

export default EnrollmentLog;
