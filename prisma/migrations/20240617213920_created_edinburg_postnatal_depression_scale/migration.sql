-- CreateEnum
CREATE TYPE "Laugh" AS ENUM ('As_much_as_always', 'Not_quite_so_much', 'Definitely_not_so_much', 'Not_at_all');

-- CreateEnum
CREATE TYPE "Enjoyment" AS ENUM ('As_much_as_ever', 'Rather_less', 'Definitely_less', 'Hardly');

-- CreateEnum
CREATE TYPE "SelfBlame" AS ENUM ('Yes_mostly', 'Yes_some', 'Not_often', 'Never');

-- CreateEnum
CREATE TYPE "Anxiety" AS ENUM ('Not_at_all', 'Hardly_ever', 'Yes_sometimes', 'Yes_often');

-- CreateEnum
CREATE TYPE "Scared" AS ENUM ('Yes_a_lot', 'Yes_sometimes', 'Not_much', 'Not_at_all');

-- CreateEnum
CREATE TYPE "CopeInability" AS ENUM ('Yes_mostly_have_not', 'Yes_sometimes_have_not', 'No_mostly_have', 'No_always_have');

-- CreateEnum
CREATE TYPE "Unhappiness" AS ENUM ('Yes_mostly', 'Yes_sometimes', 'Not_often', 'Not_at_all');

-- CreateEnum
CREATE TYPE "Sadness" AS ENUM ('Yes_mostly', 'Yes_often', 'Not_often', 'Not_at_all');

-- CreateEnum
CREATE TYPE "Crying" AS ENUM ('Yes_mostly', 'Yes_often', 'Occasionally', 'Never');

-- CreateEnum
CREATE TYPE "SelfHarmThoughts" AS ENUM ('Yes_often', 'Sometimes', 'Hardly_ever', 'Never');

-- CreateEnum
CREATE TYPE "Timeframe" AS ENUM ('Prenatal', 'Postnatal');

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
CREATE TABLE "EdinburgPostnatalDepressionScale" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "laugh" "Laugh" NOT NULL,
    "enjoyment" "Enjoyment" NOT NULL,
    "selfBlame" "SelfBlame" NOT NULL,
    "anxiety" "Anxiety" NOT NULL,
    "scared" "Scared" NOT NULL,
    "copeInability" "CopeInability" NOT NULL,
    "unhappiness" "Unhappiness" NOT NULL,
    "sadness" "Sadness" NOT NULL,
    "crying" "Crying" NOT NULL,
    "selfHarmThoughts" "SelfHarmThoughts" NOT NULL,
    "participantName" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "dateCompleted" TIMESTAMP(3) NOT NULL,
    "staffName" TEXT NOT NULL,
    "timeframe" "Timeframe" NOT NULL,
    "answerToTen" "SelfHarmThoughts" NOT NULL,
    "totalScore" TEXT NOT NULL,
    "notes" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EdinburgPostnatalDepressionScale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EncounterForm" ADD CONSTRAINT "EncounterForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EdinburgPostnatalDepressionScale" ADD CONSTRAINT "EdinburgPostnatalDepressionScale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
