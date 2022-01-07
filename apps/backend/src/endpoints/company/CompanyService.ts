import { PrismaClient, LegalForm } from "@prisma/client";

const prisma = new PrismaClient();

async function addCompany(name: string, legalForm: string) {
	const createCompany = await prisma.company.create({
		data: {
			name: name,
			legalForm: legalForm as LegalForm,
		},
	});
	return createCompany;
}

async function findCompanyById(userId: string) {
	const foundCompany = await prisma.company.findUnique({
		where: {
			id: userId,
		},
	});
	return foundCompany;
}

async function deleteCompanyById(companyId: string) {
	const deleteCompany = await prisma.company.delete({
		where: {
			id: companyId,
		},
	});
	return deleteCompany;
}

module.exports = {
	addCompany,
	findCompanyById,
	deleteCompanyById,
};
