-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "job" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "streetnr" TEXT NOT NULL,
    "plz" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
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
CREATE UNIQUE INDEX "Entry_email_key" ON "Entry"("email");
