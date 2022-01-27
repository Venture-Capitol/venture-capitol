import { DecodedIdToken } from "firebase-admin/auth";
import { API } from "packages/api";
import HttpException from "../../utils/HttpException";
import { prisma } from "../../utils/Prisma";

export async function findAllDecisionsByCompanyId(
	companyId: string,
	requestingUser: DecodedIdToken
): Promise<API.MadeDecision[]> {
	let company;
	try {
		company = await prisma.company.findUnique({
			where: {
				id: companyId,
			},
			include: {
				users: true,
			},
		});
	} catch (e) {
		throw new HttpException(404, "Company not found");
	}

	if (company.users.find(user => user.userId === requestingUser.uid)) {
		throw new HttpException(403, "You are not allowed to view this company");
	}

	try {
		const foundDecisions = await prisma.madeDecision.findMany({
			where: {
				companyId: companyId,
			},
			select: {
				selectedPath: true,
				decisionId: true,
			},
		});
		return foundDecisions;
	} catch (e) {
		return [];
	}
}

export async function addDecisionToCompany(
	companyId: string,
	decisionId: string,
	selectedPath: number,
	requestingUser: DecodedIdToken
) {
	let company;
	try {
		company = await prisma.company.findUnique({
			where: {
				id: companyId,
			},
			include: {
				users: true,
			},
		});
	} catch (e) {
		throw new HttpException(404, "Company not found");
	}

	if (company.users.find(user => user.userId === requestingUser.uid)) {
		throw new HttpException(403, "You are not allowed to view this company");
	}

	await prisma.madeDecision.create({
		data: {
			decisionId: decisionId,
			companyId: companyId,
			selectedPath: selectedPath,
		},
	});
}

export async function deleteDecisionFromCompany(
	companyId: string,
	decisionId: string,
	requestingUser: DecodedIdToken
) {
	let company;
	try {
		company = await prisma.company.findUnique({
			where: {
				id: companyId,
			},
			include: {
				users: true,
			},
		});
	} catch (e) {
		throw new HttpException(404, "Company not found");
	}

	if (company.users.find(user => user.userId === requestingUser.uid)) {
		throw new HttpException(403, "You are not allowed to view this company");
	}

	try {
		await prisma.madeDecision.deleteMany({
			where: {
				companyId: companyId,
				decisionId: decisionId,
			},
		});
	} catch (e) {}
}
