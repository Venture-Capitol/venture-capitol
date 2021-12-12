-- CreateEnum
CREATE TYPE "LegalForm" AS ENUM ('GMBH', 'UG', 'EINZELUNTERNEHMEN', 'FREIBERUFLER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInCompany" (
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "UserInCompany_pkey" PRIMARY KEY ("userId","companyId")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "legalForm" "LegalForm" NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "completedTask" (
    "companyId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "completedTask_pkey" PRIMARY KEY ("companyId","taskId")
);

-- CreateTable
CREATE TABLE "madeDecision" (
    "decisionId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "selectedPath" INTEGER NOT NULL,

    CONSTRAINT "madeDecision_pkey" PRIMARY KEY ("companyId","decisionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "UserInCompany" ADD CONSTRAINT "UserInCompany_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInCompany" ADD CONSTRAINT "UserInCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completedTask" ADD CONSTRAINT "completedTask_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "madeDecision" ADD CONSTRAINT "madeDecision_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
