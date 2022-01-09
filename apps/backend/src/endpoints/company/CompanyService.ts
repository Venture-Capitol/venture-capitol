import { PrismaClient, LegalForm } from "@prisma/client";
import HttpException from "../../exceptions/HttpException";

const prisma = new PrismaClient();

async function addCompany(name: string, legalForm: string) {
	try {
		const createCompany = await prisma.company.create({
			data: {
				name: name || undefined,
				legalForm: legalForm as LegalForm,
			},
		});
		if (createCompany == null) {
			return new HttpException(400, "Creation failed. Suck it.");
		}
		return createCompany;
	} catch (e) {
		return new HttpException(500, e.message);
	}
}

async function findCompanyById(userId: string) {
	try {
		const foundCompany = await prisma.company.findUnique({
			where: {
				id: userId,
			},
		});
		if (foundCompany == null) {
			throw new HttpException(
				404,
				"Search failed. No company found under this ID."
			);
		}
		return foundCompany;
	} catch (e) {
		throw new HttpException(500, e.message);
	}
}

async function deleteCompanyById(companyId: string) {
	try {
		const deleteCompany = await prisma.company.delete({
			where: {
				id: companyId,
			},
		});
		if (deleteCompany == null) {
			throw new HttpException(
				404,
				"Deletion failed. No company found under this ID."
			);
		}
		return deleteCompany;
	} catch (e) {
		throw new HttpException(500, e.message);
	}
}

module.exports = {
	addCompany,
	findCompanyById,
	deleteCompanyById,
};
