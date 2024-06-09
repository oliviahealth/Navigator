-- CreateTable
CREATE TABLE "CurrentMedicationList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentMedicationList" JSONB[],
    "notes" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrentMedicationList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CurrentMedicationList" ADD CONSTRAINT "CurrentMedicationList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
