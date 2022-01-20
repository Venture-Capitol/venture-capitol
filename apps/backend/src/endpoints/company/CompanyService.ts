import { Prisma, PrismaClient, LegalForm } from "@prisma/client";
import HttpException from "../../utils/HttpException";

const prisma = new PrismaClient({
	rejectOnNotFound: true,
});

async function addCompany(name: string, legalForm: string) {
	try {
		const createdCompany = await prisma.company.create({
			data: {
				name: name || undefined,
				legalForm: legalForm as LegalForm,
			},
		});
		return createdCompany;
	} catch (e) {
		throw new HttpException(500, e.message);
	}
}

async function findAllCompanies() {
	try {
		const foundCompanies = await prisma.company.findMany({
			select: {
				id: true,
				legalForm: true,
			},
		});
		if (Object.keys(foundCompanies).length == 0) {
			throw new HttpException(404, "No companies found");
		}
		return foundCompanies;
	} catch (e) {
		throw new HttpException(e.status || 500, e.message);
	}
}

async function findCompanyById(userId: string) {
	try {
		const foundCompany = await prisma.company.findUnique({
			where: {
				id: userId,
			},
		});
		return foundCompany;
	} catch (e) {
		throw new HttpException(404, e.message);
	}
}

async function deleteCompanyById(companyId: string) {
	try {
		await prisma.company.delete({
			where: {
				id: companyId,
			},
		});
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code == "P2025") {
				throw new HttpException(404, "No company found");
			}
		} else {
			throw new HttpException(500, e.messsage);
		}
	}
}

module.exports = {
	addCompany,
	findAllCompanies,
	findCompanyById,
	deleteCompanyById,
};
