-- CreateTable
CREATE TABLE "CurrentLivingArrangement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "listPeopleLivingWithPatient" JSONB NOT NULL,
    "listChildrentNotLivingWithPatient" JSONB NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrentLivingArrangement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CurrentLivingArrangement" ADD CONSTRAINT "CurrentLivingArrangement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
