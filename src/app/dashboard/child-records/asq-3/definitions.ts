import { z } from "zod";

export const YesNoEnum = z.enum(["Yes", "No"]);

export const FollowUpActionEnum = z.enum([
  "Provide_support",
  "Rescreen",
  "Refer_to_early_steps",
  "Refer_to_agency",
  "No_further_action",
]);

export const labelMapping = {
  followUpAction: {
    Provide_support:
      "Provide developmental support activities -> Describe activities below (required)",
    Rescreen: "Rescreen at next interval (Record rescreen in OLIVIA-NAVIGATOR)",
    Refer_to_early_steps:
      "Refer to Early Steps or Child Find (Record in OLIVIA-NAVIGATOR Referral)",
    Refer_to_agency:
      "Refer to other community agency/provider (Record in OLIVIA-NAVIGATOR Referral)",
    No_further_action: "No further action taken at this time",
  },
};

export const months = [
  2, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54, 60,
];

export const ASQ3InputsSchema = z.object({
  participantName: z.string().min(1, "Participant name required."),
  caseId: z.string().min(1, "Case ID required."),
  dateCompleted: z.union([
    z.date(),
    z.string().min(1, "Date completed required"),
  ]),
  staffName: z.string().min(1, "Staff name required."),
  childName: z.string().min(1, "Child name required."),
  questionnaireUsed: z.string().min(1, "Questionnaire used required."),
  ageAdjusted: YesNoEnum,
  communicationScore: z.string().nullable(),
  communicationScoreNotRecorded: YesNoEnum,
  grossMotorScore: z.string().nullable(),
  grossMotorScoreNotRecorded: YesNoEnum,
  fineMotorScore: z.string().nullable(),
  fineMotorScoreNotRecorded: YesNoEnum,
  problemSolvingScore: z.string().nullable(),
  problemSolvingScoreNotRecorded: YesNoEnum,
  personalSocialScore: z.string().nullable(),
  personalSocialScoreNotRecorded: YesNoEnum,
  followUpAction: z.array(FollowUpActionEnum),
  describeActivitiesProvided: z.string().nullish(),
  label: z.string().min(1, "Label required."),
  staffNotes: z.string().min(1, "Staff notes required."),
});
export type IASQ3Inputs = z.infer<typeof ASQ3InputsSchema>;

export const ASQ3ResponseSchema = ASQ3InputsSchema.extend({
  id: z.string(),
  userId: z.string(),
  dateCreated: z.date(),
  dateModified: z.date(),
});
export type IASQ3Response = z.infer<typeof ASQ3ResponseSchema>;
