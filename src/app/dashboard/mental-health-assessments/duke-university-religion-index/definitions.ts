import { z } from "zod";

export const ChurchAttendanceEnum = z.enum([
    "Never",
    "Once_a_year",
    "Few_times_a_year",
    "Few_times_a_month",
    "Once_a_week",
    "More_than_once_a_week",
]);

export const TimeSpentReligiouslyEnum = z.enum([
    "Rarely_or_never",
    "Once_a_month",
    "Once_a_week",
    "Few_times_a_week",
    "Once_a_day",
    "More_than_once_a_day",
]);

export const TruthLevelEnum = z.enum([
    "Definitely_not_true",
    "Somewhat_not_true",
    "Neutral",
    "Somewhat_true",
    "Definitely_true",
]);

export const dukeLabelMapping = {
    churchAttendance: {
        Never: "Never",
        Once_a_year: "Once a year or less",
        Few_times_a_year: "A few times a year",
        Few_times_a_month: "A few times a month",
        Once_a_week: "Once a week",
        More_than_once_a_week: "More than once a week"
    },
    timeSpentReligiously: {
        Rarely_or_never: "Rarely or never",
        Once_a_month: "Once a month or less",
        Once_a_week: "Once a week",
        Few_times_a_week: "Few times a week",
        Once_a_day: "Once a day",
        More_than_once_a_day: "More than once a day"
    },
    truthLevel: {
        Definitely_not_true: "Definitely not true",
        Somewhat_not_true: "Somewhat not true",
        Neutral: "Neutral",
        Somewhat_true: "Somewhat true",
        Definitely_true: "Definitely true"
    }
};

export const DukeUniversityReligionIndexInputsSchema = z.object({
    churchAttendance: ChurchAttendanceEnum,
    timeSpentReligiously: TimeSpentReligiouslyEnum,
    divineExperience: TruthLevelEnum,
    beliefLifeInfluence: TruthLevelEnum,
    religiousIntegrationEffort: TruthLevelEnum,
    label: z.string().min(1, "Label required."),
    staffNotes: z.string().min(1, "Label required.")
});
export type IDukeUniversityReligionIndexInputs = z.infer<typeof DukeUniversityReligionIndexInputsSchema>;

export const DukeUniversityReligionIndexResponseSchema = DukeUniversityReligionIndexInputsSchema.extend({
    id: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateModified: z.date()
});
export type IDukeUniversityReligionIndexResponse = z.infer<typeof DukeUniversityReligionIndexResponseSchema>;