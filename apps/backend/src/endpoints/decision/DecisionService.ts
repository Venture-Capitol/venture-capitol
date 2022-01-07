import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findAllDecisionsByCompanyId(companyId: string) {
	const foundDecisions = await prisma.madeDecision.findMany({
		where: {
			companyId: companyId,
		},
	});
	return foundDecisions;
}

async function addDecisionToCompany(
	companyId: string,
	decisionId: string,
	selectedPath: number
) {
	const createDecision = await prisma.madeDecision.create({
		data: {
			decisionId: decisionId,
			companyId: companyId,
			selectedPath: selectedPath,
		},
	});
	return createDecision;
}

async function deleteDecisionFromCompany(
	companyId: string,
	decisionId: string
) {
	const deleteDecision = await prisma.madeDecision.deleteMany({
		where: {
			companyId: companyId,
			decisionId: decisionId,
		},
	});
	return deleteDecision;
}

module.exports = {
	findAllDecisionsByCompanyId,
	addDecisionToCompany,
	deleteDecisionFromCompany,
};
