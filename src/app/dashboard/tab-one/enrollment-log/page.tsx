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
})
export type IEmergencyContact = z.infer<typeof EmergencyContactsSchema>

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
    emergencyContacts: z.array(EmergencyContactsSchema)
});
export type IEnrollmentLogInputs = z.infer<typeof EnrollmentLogInputsSchema>;

export const EnrollmentLogResponseSchema = EnrollmentLogInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type EnrollmentLogResponse = z.infer<typeof EnrollmentLogResponseSchema>



const EnrollmentLog: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEnrollmentLogInputs>({
    resolver: zodResolver(EnrollmentLogInputsSchema),
    defaultValues: {
      // emergencyContacts: []
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
    <div className="w-full h-full flex flex-col items-center p-2 mt-2 text-base">
      <div className="flex flex-col items-center">
        <h1 className="text-xl text-center font-bold">
          ENROLLMENT FORM, STANDARD CONSENT, ELIGIBILITY, EMERGENCY CONTACT &
          RELEASE OF INFORMATION
        </h1>

        <p className="text-lg pt-8 text-center">
          GC-MOMS is a free community health care program. The Program provides
          pregnancy and parenting support to first-time mothers from nurses who
          visit their homes beginning in early pregnancy through the child’s
          second birthday.
        </p>

        <p className="text-lg pt-8 text-center font-bold">
          Please complete this form to enroll in the Program.
        </p>

        <p className="text-lg pt-8 text-center font-bold">
          Program Eligibility:
        </p>

        <p className="text-lg pt-1 text-center">
          To participate in the Program, I understand that I must be a resident
          of the counties served by the program. The following rural counties in
          Texas are to be served: Lavaca, DeWitt, Jackson, and Calhoun. I must
          be interested in having a child, pregnant or have a new baby in my
          household less than 1 year old. I can have more than one child in my
          family and be eligible for the program. There is no income
          requirement. By signing below, I confirm that I meet the Program
          eligibility requirements, and I agree to provide the Program with any
          documents necessary to prove my eligibility if that is necessary.
        </p>

        <p className="text-lg pt-8 text-center">Your Contact Information</p>
      </div>

      {/* <div className="flex flex-col items-center"></div> */}
      <form
        onSubmit={handleSubmit((data) => submit(data))}
        className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-1 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
      >
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
          {...register("address")}
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
          {...register("address")}
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
        />
        {errors.datebirth && (
          <span className="label-text-alt text-red-500">
            {errors.datebirth.message}
          </span>
        )}
        <p className="text-lg pt-8 text-center">
          Emergency Contact Information
        </p>{" "}
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex justify-between items-center">
              <p className="font-medium pb-2 pt-8">
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

            <p className="font-medium pb-2 pt-8">Emergency Contact Name</p>
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
              {...register(`emergencyContacts.${index}.emergencyrelationship`)}
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
    </div>
  );
};

export default EnrollmentLog;
