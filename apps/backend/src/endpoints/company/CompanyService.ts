import { Prisma, PrismaClient, LegalForm } from "@prisma/client";
import HttpException from "../../utils/HttpException";

const prisma = new PrismaClient();

async function addCompany(name: string, legalForm: string, callback: Function) {
	try {
		const createCompany = await prisma.company.create({
			data: {
				name: name || undefined,
				legalForm: legalForm as LegalForm,
			},
		});
		return callback(null, createCompany);
	} catch (e) {
		return callback(new HttpException(500, e.message), null);
	}
}

async function findAllCompanies(callback: Function) {
	try {
		const foundCompanies = await prisma.company.findMany({
			select: {
				id: true,
				legalForm: true,
			},
		});
		if (foundCompanies == null) {
			return callback(new HttpException(404, "No companies found."), null);
		} else {
			return callback(null, foundCompanies);
		}
	} catch (e) {
		return callback(new HttpException(500, e.message), null);
	}
}

async function findCompanyById(userId: string, callback: Function) {
	try {
		const foundCompany = await prisma.company.findUnique({
			where: {
				id: userId,
			},
		});
		if (foundCompany == null) {
			return callback(
				new HttpException(404, "No company found under this ID."),
				null
			);
		} else {
			return callback(null, foundCompany);
		}
	} catch (e) {
		return callback(new HttpException(500, e.message), null);
	}
}

async function deleteCompanyById(companyId: string, callback: Function) {
	try {
		await prisma.company.delete({
			where: {
				id: companyId,
			},
		});
		return callback(null);
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code == "P2025") {
				return callback(
					new HttpException(404, "No company found under this ID.")
				);
			}
		} else {
			return callback(new HttpException(500, e.messsage));
		}
	}
}

module.exports = {
	addCompany,
	findAllCompanies,
	findCompanyById,
	deleteCompanyById,
};
