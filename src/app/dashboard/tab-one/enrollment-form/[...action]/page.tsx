"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
  EnrollmentEmergencyContactsSchema,
  IEnrollmentEmergencyContact,
  EnrollmentFormInputsSchema,
  IEnrollmentFormInputs,
  EnrollmentFormResponseSchema,
  IEnrollmentFormResponse
} from "../definitions";

import useAppStore from "@/lib/useAppStore";
import { createEnrollmentForm, readEnrollmentForm, updateEnrollmentForm } from "../actions";

const EnrollmentForm: React.FC = () => {
  const router = useRouter();
  const { action } = useParams();

  const verb = action[0];
  const submissionId = action[1];

  const user = useAppStore(state => state.user);

  const setSuccessMessage = useAppStore(state => state.setSuccessMessage);
  const setErrorMessage = useAppStore(state => state.setErrorMessage);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEnrollmentFormInputs>({
    resolver: zodResolver(EnrollmentFormInputsSchema),
    defaultValues: {
      emergencyContacts: [{
        name: '',
        phone: '',
        relationship: '',
        email: ''
      }]
    },
  });

  // Extract some functions that will allow us to interface with the array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "emergencyContacts",
  });

  const addNewCommunicationEntry = () =>
    append({
      name: "",
      phone: "",
      relationship: "",
      email: "",
    });

  useEffect(() => {
    const fetchAndPopulatePastSubmissionData = async () => {
      try {
        if (verb !== 'edit') return;

        if (!submissionId) throw new Error('Missing submissionId when fetching past submissions');

        if (!user) throw new Error('Missing user');

        const response = await readEnrollmentForm(submissionId, user.id);

        const validResponse = EnrollmentFormResponseSchema.parse(response);

        const formattedData = {
          ...validResponse,
          guardianDate: new Date(validResponse.guardianDate).toISOString().split('T')[0],
          gcMomsDate: new Date(validResponse.gcMomsDate).toISOString().split('T')[0],
          dateOfBirth: new Date(validResponse.dateOfBirth).toISOString().split('T')[0],
          clientDate: new Date(validResponse.clientDate).toISOString().split('T')[0],
        }

        reset(formattedData)
      } catch (error) {
        console.error(error);
        setErrorMessage('Something went wrong! Please try again later');

        router.push('/');
        return;
      }
    }

    fetchAndPopulatePastSubmissionData();
  }, []);

  const submit = async (data: IEnrollmentFormInputs) => {
    try {
      if (!user) {
        throw new Error("User not found");
      }

      let response;

      if (verb === 'new') {
        response = await createEnrollmentForm(data, user.id);
      } else {
        response = await updateEnrollmentForm(data, submissionId, user.id);
      }

      EnrollmentFormResponseSchema.parse(response);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong! Please try again later");

      router.push('/dashboard');

      return;
    }

    setSuccessMessage("Enrollment Form submitted successfully!");
    router.push('/dashboard');
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-2 mt-2 text-base">
      <div className="flex flex-col items-center">
        <h1 className="text-center font-semibold text-2xl">
          ENROLLMENT FORM, STANDARD CONSENT, ELIGIBILITY, EMERGENCY CONTACT &
          RELEASE OF INFORMATION
        </h1>

        <p className="text-lg pt-8 text-center font-semibold max-w-screen-md mx-auto">
          GC-MOMS is a free community health care program. The Program provides
          pregnancy and parenting support to first-time mothers from nurses who
          visit their homes beginning in early pregnancy through the child’s
          second birthday.
        </p>

        <p className="text-lg pt-8 text-center font-semibold">
          Please complete this form to enroll in the Program.
        </p>

        <p className="text-xl pt-8 text-center font-semibold">
          Program Eligibility:
        </p>

        <p className="text-lg pt-5 text-center max-w-screen-md mx-auto">
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

        <p className="text-xl pt-8 text-center font-semibold ">Your Contact Information</p>
      </div>


      <form
        onSubmit={handleSubmit((data) => submit(data))}
        className="w-[40rem] md:w-[30rem] m-5 md:m-0 space-y-1 [&>p]:pt-6 [&>p]:pb-1 [&>input]:px-4"
      >
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
          type="date"

        />
        {errors.dateOfBirth && (
          <span className="label-text-alt text-red-500">
            {errors.dateOfBirth.message}
          </span>
        )}
        <p className="text-xl pt-8 text-center font-semibold ">
          Emergency Contact Information
        </p>{" "}
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold pb-2 pt-8">
                Emergency Contact {index + 1}
              </p>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="font-semibold text-red-600 px-4 py-2 mt-6 rounded-md whitespace-nowrap"
                >
                  - Remove Entry
                </button>
              )}
            </div>

            <p className="pb-2 pt-8 font-semibold">Emergency Contact Name</p>
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
                  {
                    errors.emergencyContacts[index]?.relationship
                      ?.message
                  }
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

        <div className="flex justify-center">
          <button
            type="button"
            onClick={addNewCommunicationEntry}
            className="text-green-500 px-20 py-4 font-medium rounded-md whitespace-nowrap"
          >
            + Add New Contact
          </button>
        </div>

        <div>
          <div className="flex justify-between">
            <div>
              <p className="font-medium pb-2 pt-8">Client Name</p>
              <input
                {...register(`clientName`)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                type="text"
              />
              <span className="label-text-alt text-red-500">
                {errors.clientName?.message}
              </span>
            </div>

            <div>
              <p className="font-medium pb-2 pt-8">Date</p>
              <input
                {...register(`clientDate`)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                type="text"
              />
              <span className="label-text-alt text-red-500">
                {errors.clientDate?.message}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="font-medium pb-2 pt-8">Guardian Name</p>
              <input
                {...register(`guardianName`)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                type="text"
              />
              <span className="label-text-alt text-red-500">
                {errors.guardianName?.message}
              </span>
            </div>

            <div>
              <p className="font-medium pb-2 pt-8">Date</p>
              <input
                {...register(`guardianDate`)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                type="text"
              />
              <span className="label-text-alt text-red-500">
                {errors.guardianDate?.message}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="font-medium pb-2 pt-8">GC-MOMS Name</p>
              <input
                {...register(`gcMomsName`)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                type="text"
              />
              <span className="label-text-alt text-red-500">
                {errors.gcMomsName?.message}
              </span>
            </div>

            <div>
              <p className="font-medium pb-2 pt-8">Date</p>
              <input
                {...register(`gcMomsDate`)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                type="text"
              />
              <span className="label-text-alt text-red-500">
                {errors.gcMomsDate?.message}
              </span>
            </div>
          </div>
        </div>

        {/* </div> */}
        <div><button
          type="submit"
          className="w-full bg-[#AFAFAFAF] text-black px-20 py-2 rounded-md m-auto mt-10"
        >
          Submit
        </button></div>
      </form>
    </div>
  );
};

export default EnrollmentForm;
