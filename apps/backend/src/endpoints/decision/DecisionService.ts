import { Prisma } from "@prisma/client";
import HttpException from "../../utils/HttpException";
import { prisma } from "../../utils/Prisma";

export async function findAllDecisionsByCompanyId(companyId: string) {
	try {
		await prisma.company.findUnique({
			where: {
				id: companyId,
			},
		});
		const foundDecisions = await prisma.madeDecision.findMany({
			where: {
				companyId: companyId,
			},
			select: {
				selectedPath: true,
				decisionId: true,
			},
		});
		if (Object.keys(foundDecisions).length == 0) {
			throw new HttpException(404, "No decisions made for this company");
		}
		return foundDecisions;
	} catch (e) {
		throw new HttpException(e.status || 500, e.message);
	}
}

export async function addDecisionToCompany(
	companyId: string,
	decisionId: string,
	selectedPath: number
) {
	try {
		await prisma.company.findUnique({
			where: {
				id: companyId,
			},
		});
		const createdDecision = await prisma.madeDecision.create({
			data: {
				decisionId: decisionId,
				companyId: companyId,
				selectedPath: selectedPath,
			},
		});
		return createdDecision;
	} catch (e) {
		throw new HttpException(500, e.message);
	}
}

export async function deleteDecisionFromCompany(
	companyId: string,
	decisionId: string
) {
	try {
		await prisma.company.findUnique({
			where: {
				id: companyId,
			},
		});
		await prisma.madeDecision.deleteMany({
			where: {
				companyId: companyId,
				decisionId: decisionId,
			},
		});
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code == "P2025") {
				throw new HttpException(
					404,
					"No decision with this ID found in the specified company"
				);
			}
		} else {
			throw new HttpException(500, e.message);
		}
	}
}
