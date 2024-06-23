-- CreateEnum
CREATE TYPE "GADAnswers" AS ENUM ('Not_at_all', 'Several_days', 'More_than_half', 'Everyday');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Not_at_all', 'Somewhat', 'Very', 'Extremely');

-- CreateTable
CREATE TABLE "GeneralizedAnxietyDisorder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "feelingNervous" "GADAnswers" NOT NULL,
    "unableToControlWorrying" "GADAnswers" NOT NULL,
    "worryingTooMuch" "GADAnswers" NOT NULL,
    "troubleRelaxing" "GADAnswers" NOT NULL,
    "restlessness" "GADAnswers" NOT NULL,
    "easilyAnnoyed" "GADAnswers" NOT NULL,
    "feelingAfraid" "GADAnswers" NOT NULL,
    "problemsDifficulty" "Difficulty" NOT NULL,
    "totalScore" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneralizedAnxietyDisorder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GeneralizedAnxietyDisorder" ADD CONSTRAINT "GeneralizedAnxietyDisorder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
