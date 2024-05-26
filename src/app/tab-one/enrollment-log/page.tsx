"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { lstat } from "fs";

// Define the schema of each row in the enrollment form log
const EnrollmentEntrySchema = z.object({
  firstname: z.string().min(1, "First Name is required"),
  lastname: z.string().min(1, "Last Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "Zip is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().min(1, "Email is required"),
  datebirth: z.string().min(1, "Date of Birth is required"),
});
export type IEnrollmentEntry = z.infer<typeof EnrollmentEntrySchema>;

// Define the overall schema of the enrollment form log which is an array of objects from above
const EnrollmentLogInputsSchema = z.object({
  enrollmentEntries: z.array(EnrollmentEntrySchema),
});
export type IEnrollmentLogInputs = z.infer<typeof EnrollmentLogInputsSchema>;

const EnrollmentLog: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IEnrollmentLogInputs>({
    resolver: zodResolver(EnrollmentLogInputsSchema),
    defaultValues: {
      enrollmentEntries: [
        {
          firstname: "",
          lastname: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          phone: "",
          email: "",
          datebirth: "",
        },
      ],
    },
  });

  // Extract some functions that will allow us to interface with the array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "enrollmentEntries",
  });

  // Temporary submit function while we work to get db setup
  const submit = (data: IEnrollmentLogInputs) => {
    alert("Communication Log submitted successfully");

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

      
    </div>
  );
};

export default EnrollmentLog;
