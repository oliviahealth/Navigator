/*
  Warnings:

  - The values [mail] on the enum `CommunicationMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CommunicationMethod_new" AS ENUM ('Phone', 'Mail', 'In_Person', 'Video_Call', 'Other');
ALTER TABLE "CommunicationEntry" ALTER COLUMN "method" TYPE "CommunicationMethod_new" USING ("method"::text::"CommunicationMethod_new");
ALTER TYPE "CommunicationMethod" RENAME TO "CommunicationMethod_old";
ALTER TYPE "CommunicationMethod_new" RENAME TO "CommunicationMethod";
DROP TYPE "CommunicationMethod_old";
COMMIT;
