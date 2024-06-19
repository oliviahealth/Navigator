-- CreateEnum
CREATE TYPE "ChurchAttendance" AS ENUM ('Never', 'Once_a_year', 'Few_times_a_year', 'Few_times_a_month', 'Once_a_week', 'More_than_once_a_week');

-- CreateEnum
CREATE TYPE "TimeSpentReligiously" AS ENUM ('Rarely_or_never', 'Once_a_month', 'Once_a_week', 'Few_times_a_week', 'Once_a_day', 'More_than_once_a_day');

-- CreateEnum
CREATE TYPE "TruthLevel" AS ENUM ('Definitely_not_true', 'Somewhat_not_true', 'Neutral', 'Somewhat_true', 'Definitely_true');

-- CreateTable
CREATE TABLE "EncounterForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "participantName" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "monthYear" TEXT NOT NULL,
    "encounterEntries" JSONB[],
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EncounterForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DukeUniversityReligionIndex" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "churchAttendance" "ChurchAttendance" NOT NULL,
    "timeSpentReligiously" "TimeSpentReligiously" NOT NULL,
    "divineExperience" "TruthLevel" NOT NULL,
    "beliefLifeInfluence" "TruthLevel" NOT NULL,
    "religiousIntegrationEffort" "TruthLevel" NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DukeUniversityReligionIndex_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EncounterForm" ADD CONSTRAINT "EncounterForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DukeUniversityReligionIndex" ADD CONSTRAINT "DukeUniversityReligionIndex_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
