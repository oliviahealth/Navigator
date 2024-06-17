import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompleteFormSchema, ICompleteFormData } from "../backup-definitions";

const HomeVisitLog: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICompleteFormData>({
    resolver: zodResolver(CompleteFormSchema),
    defaultValues: {
      homeVisitForm: {}, // Make sure to provide defaults for all nested structures
      erVisits: [],
      wellChildVisits: [],
    }
  });

  const { fields: erVisitFields, append: appendErVisit } = useFieldArray({
    control,
    name: "erVisits",
  });

  const { fields: wellChildFields, append: appendWellChildVisit } = useFieldArray({
    control,
    name: "wellChildVisits",
  });

  const onSubmit = async (data: ICompleteFormData) => {
    console.log(data);
    // API call to submit the complete form data
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("homeVisitForm.participantName")} placeholder="Participant Name" />
      {errors.homeVisitForm?.participantName && <p>{errors.homeVisitForm.participantName.message}</p>}

      {/* Additional fields for homeVisitForm can be added similarly */}

      <div>
        {erVisitFields.map((field, index) => (
          <div key={field.id}>
            <input {...register(`erVisits.${index}.reason`)} placeholder="ER Visit Reason" />
            {/* Additional fields for each ER visit */}
          </div>
        ))}
        <button type="button" onClick={() => appendErVisit({})}>Add ER Visit</button>
      </div>

      <div>
        {wellChildFields.map((field, index) => (
          <div key={field.id}>
            <input {...register(`wellChildVisits.${index}.childName`)} placeholder="Child Name" />
            {/* Additional fields for each Well Child visit */}
          </div>
        ))}
        <button type="button" onClick={() => appendWellChildVisit({})}>Add Well Child Visit</button>
      </div>

      <button type="submit">Submit Form</button>
    </form>
  );
};

export default HomeVisitLog;
