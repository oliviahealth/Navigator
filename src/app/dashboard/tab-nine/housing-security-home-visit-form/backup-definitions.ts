import { z } from "zod";

export const HousingSecurityHomeVisitFormSchema = z.object({
id: z.number().optional(), 
participantName: z.string(),
dateOfVisit: z.date(),
caseId: z.bigint(),
staffName: z.string(),
healthInsurance: z.number(),
concerns: z.number(),
erVisit: z.number(),
wellChild: z.number(),
userId: z.string().optional(), 
});


export const ErVisitsSchema = z.object({
id: z.number().optional(), 
visitId: z.bigint(),
date: z.date(),
reason: z.number(),
});

export const WellChildVisitsSchema = z.object({
id: z.number().optional(),
visitId: z.bigint(),
childName: z.string(),
visitsCompleted: z.array(z.string()), // Validate as an array of strings
});

export type IHousingSecurityHomeVisitForm = z.infer<typeof HousingSecurityHomeVisitFormSchema>;
export type IErVisits = z.infer<typeof ErVisitsSchema>;
export type IWellChildVisits = z.infer<typeof WellChildVisitsSchema>;

// Composite schema for the entire form
export const CompleteFormSchema = z.object({
    homeVisitForm: HousingSecurityHomeVisitFormSchema,
    erVisits: z.array(ErVisitsSchema), // Assuming there can be multiple ER visits
    wellChildVisits: z.array(WellChildVisitsSchema) // Assuming there can be multiple Well Child visits
  });
  
  export type ICompleteFormData = z.infer<typeof CompleteFormSchema>;


// we can use something like this in the main page.tsx in the housing-security-home-visit-form:

// export const FormComponent = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm<ICompleteFormData>({
//       resolver: zodResolver(CompleteFormSchema)
//     });
  
//     const onSubmit = (data: ICompleteFormData) => {
//       console.log(data); // Data validated against the composite schema
//       // Submit data to the database or handle it as needed
//     };