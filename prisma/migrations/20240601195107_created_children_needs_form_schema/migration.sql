-- CreateEnum
CREATE TYPE "ChildrenNeeds" AS ENUM ('status', 'notes');

-- CreateTable
CREATE TABLE "ChildrenNeedsForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "breastPump" "ChildrenNeeds" NOT NULL,
    "breastfeedingSupport" "ChildrenNeeds" NOT NULL,
    "carSeat" "ChildrenNeeds" NOT NULL,
    "childcare" "ChildrenNeeds" NOT NULL,
    "clothing" "ChildrenNeeds" NOT NULL,
    "bed" "ChildrenNeeds" NOT NULL,
    "diapers" "ChildrenNeeds" NOT NULL,
    "infantFormula" "ChildrenNeeds" NOT NULL,
    "infantStroller" "ChildrenNeeds" NOT NULL,
    "schoolSupplies" "ChildrenNeeds" NOT NULL,
    "specializedMedEquipment" "ChildrenNeeds" NOT NULL,
    "other" JSONB NOT NULL,
    "notes" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChildrenNeedsForm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChildrenNeedsForm" ADD CONSTRAINT "ChildrenNeedsForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
