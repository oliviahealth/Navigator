-- CreateTable
CREATE TABLE "ParentalMedicalHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gestationalAge" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "plannedModeDelivery" "DeliveryMode" NOT NULL,
    "actualModeDelivery" "DeliveryMode" NOT NULL,
    "attendedPostpartumVisit" "YesNo",
    "postpartumVisitLocation" TEXT,
    "postpartumVisitDate" TIMESTAMP(3) NOT NULL,
    "totalNumPregnancies" TEXT NOT NULL,
    "numChildrenWithMother" TEXT NOT NULL,
    "priorPregnancyDates" TEXT NOT NULL,
    "priorPregnancyOutcomes" TEXT NOT NULL,
    "gravida" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "preterm" TEXT NOT NULL,
    "abortions" TEXT NOT NULL,
    "living" TEXT NOT NULL,
    "priorComplications" TEXT NOT NULL,
    "ongoingMedicalProblems" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParentalMedicalHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParentalMedicalHistory" ADD CONSTRAINT "ParentalMedicalHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
