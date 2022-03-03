-- DropForeignKey
ALTER TABLE "CompletedTask" DROP CONSTRAINT "CompletedTask_companyId_fkey";

-- DropForeignKey
ALTER TABLE "MadeDecision" DROP CONSTRAINT "MadeDecision_companyId_fkey";

-- DropForeignKey
ALTER TABLE "UserInCompany" DROP CONSTRAINT "UserInCompany_companyId_fkey";

-- DropForeignKey
ALTER TABLE "UserInCompany" DROP CONSTRAINT "UserInCompany_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserInCompany" ADD CONSTRAINT "UserInCompany_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInCompany" ADD CONSTRAINT "UserInCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedTask" ADD CONSTRAINT "CompletedTask_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MadeDecision" ADD CONSTRAINT "MadeDecision_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
