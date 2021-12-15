/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Entry_description_key" ON "Entry"("description");
