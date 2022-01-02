-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "job" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "email" TEXT NOT NULL,
    "telefon" TEXT,
    "website" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entry_company_key" ON "Entry"("company");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_description_key" ON "Entry"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_email_key" ON "Entry"("email");
