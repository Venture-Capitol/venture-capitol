/*
  Warnings:

  - A unique constraint covering the columns `[ownedBy]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "ownedBy" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Entry_ownedBy_key" ON "Entry"("ownedBy");
