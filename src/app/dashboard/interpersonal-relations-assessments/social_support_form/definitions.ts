import { z } from "zod";

export const ResponseAnswersEnum = z.enum([
    "Very_strongly_disagree",
    "Strongly_disagree",
    "Disagree",
    "Neither_agree_nor_disagree",
    "Strongly_agree",
    "Very_strongly_agree",
]);

export enum SpecialPersonRelationshipEnum {
    Spouse_Partner = "spouse_partner",
    Boyfriend_Girlfriend = "boyfriend_girlfriend",
    Friend = "friend",
    Professional = "professional",
    Other_Family_Member = "other_family_member"
}

export const labelMapping = {
    responseAnswers: {
      Very_strongly_disagree: {
        en: "Very Strongly Disagree",
        es: "Totalmente en Desacuerdo"
      },
      Strongly_disagree: {
        en: "Strongly Disagree",
        es: "Muy de Desacuerdo"
      },
      Disagree: {
        en: "Disagree",
        es: "En Desacuerdo"
      },
      Neither_agree_nor_disagree: {
        en: "Neither Agree nor Disagree",
        es: "Ni de Acuerdo ni en Desacuerdo"
      },
      Strongly_agree: {
        en: "Strongly Agree",
        es: "Muy de Acuerdo"
      },
      Very_strongly_agree: {
        en: "Very Strongly Agree",
        es: "Totalmente de Acuerdo"
      }
    }
  };

export const SocialSupportFormInputsSchema = z.object({
    specialPersonInNeed: ResponseAnswersEnum,
    specialPersonJoysSorrows: ResponseAnswersEnum,
    familyHelp: ResponseAnswersEnum,
    emotionalHelp: ResponseAnswersEnum,
    specialPersonForComfort: ResponseAnswersEnum,
    friendsHelp: ResponseAnswersEnum,
    canCountOnFriends: ResponseAnswersEnum,
    talkToFamilyAboutProblems: ResponseAnswersEnum,
    friendsJoysSorrows: ResponseAnswersEnum,
    specialPersonToTalkFeelings: ResponseAnswersEnum,
    familyHelpsDecisions: ResponseAnswersEnum,
    talkToFriendsAboutProblems: ResponseAnswersEnum,
    specialPersonInitials: z.string(),
    specialPersonRelationship: z.nativeEnum(SpecialPersonRelationshipEnum),
    comments: z.string().optional()

});

export type ISocialSupportFormInputs = z.infer<typeof SocialSupportFormInputsSchema>;

export const SocialSupportFormResponseSchema = SocialSupportFormInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type SocialSupportFormResponse = z.infer<typeof SocialSupportFormResponseSchema>;