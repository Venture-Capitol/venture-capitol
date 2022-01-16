import { PrismaClient, LegalForm } from "@prisma/client";
import HttpException from "../../exceptions/HttpException";

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
