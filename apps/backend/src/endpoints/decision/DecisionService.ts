import { PrismaClient } from "@prisma/client";
import HttpException from "../../exceptions/HttpException";

const prisma = new PrismaClient();

async function findAllDecisionsByCompanyId(
	companyId: string,
	callback: Function
) {
	try {
		const foundCompany = await prisma.company.findUnique({
			where: {
				id: companyId,
			},
		});
		if (foundCompany == null) {
			return callback(
				new HttpException(404, "No company found under this ID."),
				null
			);
		}
		const foundDecisions = await prisma.madeDecision.findMany({
			where: {
				companyId: companyId,
			},
			select: {
				selectedPath: true,
				decisionId: true,
			},
		});
		if (foundDecisions == null) {
			return callback(
				new HttpException(404, "No completed tasks found in this company."),
				null
			);
		} else {
			return callback(null, foundDecisions);
		}
	} catch (e) {
		throw new HttpException(500, e.message);
	}
}

async function addDecisionToCompany(
	companyId: string,
	decisionId: string,
	selectedPath: number,
	callback: Function
) {
	try {
		const foundCompany = await prisma.company.findUnique({
			where: {
				id: companyId,
			},
		});
		if (foundCompany == null) {
			return callback(
				new HttpException(404, "No company found under this ID."),
				null
			);
		}
		const createDecision = await prisma.madeDecision.create({
			data: {
				decisionId: decisionId,
				companyId: companyId,
				selectedPath: selectedPath,
			},
		});
		return callback(null, createDecision);
	} catch (e) {
		throw new HttpException(500, e.message);
	}
}

async function deleteDecisionFromCompany(
	companyId: string,
	decisionId: string
) {
	try {
		const foundCompany = await prisma.company.findUnique({
			where: {
				id: companyId,
			},
		});
		if (foundCompany == null) {
			throw new HttpException(404, "No company found under this ID.");
		}
		const deleteDecision = await prisma.madeDecision.deleteMany({
			where: {
				companyId: companyId,
				decisionId: decisionId,
			},
		});
		return deleteDecision;
	} catch (e) {
		throw new HttpException(500, e.message);
	}
}

module.exports = {
	findAllDecisionsByCompanyId,
	addDecisionToCompany,
	deleteDecisionFromCompany,
};
