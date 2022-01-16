/*
  Warnings:

  - The values [EINZELUNTERNEHMEN] on the enum `LegalForm` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `completedTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `madeDecision` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LegalForm_new" AS ENUM ('EINZELUNTERNEHMER', 'GBR', 'FREIBERUFLER', 'PARTG', 'UG', 'GMBH');
ALTER TABLE "Company" ALTER COLUMN "legalForm" TYPE "LegalForm_new" USING ("legalForm"::text::"LegalForm_new");
ALTER TYPE "LegalForm" RENAME TO "LegalForm_old";
ALTER TYPE "LegalForm_new" RENAME TO "LegalForm";
DROP TYPE "LegalForm_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "completedTask" DROP CONSTRAINT "completedTask_companyId_fkey";

-- DropForeignKey
ALTER TABLE "madeDecision" DROP CONSTRAINT "madeDecision_companyId_fkey";

-- DropTable
DROP TABLE "completedTask";

-- DropTable
DROP TABLE "madeDecision";

-- CreateTable
CREATE TABLE "CompletedTask" (
    "companyId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "CompletedTask_pkey" PRIMARY KEY ("companyId","taskId")
);

-- CreateTable
CREATE TABLE "MadeDecision" (
    "decisionId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "selectedPath" INTEGER NOT NULL,

    CONSTRAINT "MadeDecision_pkey" PRIMARY KEY ("companyId","decisionId")
);

-- AddForeignKey
ALTER TABLE "CompletedTask" ADD CONSTRAINT "CompletedTask_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MadeDecision" ADD CONSTRAINT "MadeDecision_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
