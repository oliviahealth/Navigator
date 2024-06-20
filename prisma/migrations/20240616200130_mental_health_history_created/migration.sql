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
CREATE TABLE "MentalHealthHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mentalHealthHistory" JSONB NOT NULL,
    "takingMedication" "YesNo" NOT NULL,
    "medicationDetails" TEXT,
    "notes" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MentalHealthHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EncounterForm" ADD CONSTRAINT "EncounterForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentalHealthHistory" ADD CONSTRAINT "MentalHealthHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
