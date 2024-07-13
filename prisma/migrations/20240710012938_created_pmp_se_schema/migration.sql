-- CreateEnum
CREATE TYPE "AgreementLevel" AS ENUM ('Strongly_disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly_agree');

-- CreateTable
CREATE TABLE "PerceivedMaternalPlanningSelfEfficacyTool" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "keepingBabyOccupied" "AgreementLevel" NOT NULL,
    "feedingBaby" "AgreementLevel" NOT NULL,
    "changingBaby" "AgreementLevel" NOT NULL,
    "bathingBaby" "AgreementLevel" NOT NULL,
    "makingBabyHappy" "AgreementLevel" NOT NULL,
    "calmingCryingBaby" "AgreementLevel" NOT NULL,
    "soothingUpsetBaby" "AgreementLevel" NOT NULL,
    "soothingFussyBaby" "AgreementLevel" NOT NULL,
    "soothingCryingBaby" "AgreementLevel" NOT NULL,
    "soothingRestlessBaby" "AgreementLevel" NOT NULL,
    "gettingBabiesAttention" "AgreementLevel" NOT NULL,
    "recognizingTiredness" "AgreementLevel" NOT NULL,
    "havingControlOverBaby" "AgreementLevel" NOT NULL,
    "recognizingSickness" "AgreementLevel" NOT NULL,
    "readingBabysCues" "AgreementLevel" NOT NULL,
    "understandingBabyWants" "AgreementLevel" NOT NULL,
    "knowingDislikedActivities" "AgreementLevel" NOT NULL,
    "babyRespondsWell" "AgreementLevel" NOT NULL,
    "goodInteraction" "AgreementLevel" NOT NULL,
    "showingAffection" "AgreementLevel" NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PerceivedMaternalPlanningSelfEfficacyTool_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PerceivedMaternalPlanningSelfEfficacyTool" ADD CONSTRAINT "PerceivedMaternalPlanningSelfEfficacyTool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
