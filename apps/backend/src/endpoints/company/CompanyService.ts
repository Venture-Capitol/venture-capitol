import { Prisma, LegalForm } from "@prisma/client";
import HttpException from "../../utils/HttpException";
import { prisma } from "../../utils/Prisma";
import { DecodedIdToken } from "firebase-admin/auth";
import { API } from "@vc/api";

export async function addCompany(
	name: string,
	legalForm: string,
	requestingUser: DecodedIdToken
): Promise<API.Company> {
	try {
		const createdCompany = await prisma.company.create({
			data: {
				name: name || undefined,
				legalForm: legalForm as LegalForm,
				users: {
					create: {
						user: {
							connectOrCreate: {
								create: {
									id: requestingUser.uid,
								},
								where: {
									id: requestingUser.uid,
								},
							},
						},
					},
				},
			},
		});
		return createdCompany;
	} catch (e) {
		throw new HttpException(500, e.message);
	}
}

export async function findCompanyById(
	companyId: string,
	requestingUser: DecodedIdToken
): Promise<API.Company> {
	try {
		const foundCompany = await prisma.company.findUnique({
			where: {
				id: companyId,
			},
			include: {
				users: {
					select: {
						userId: true,
					},
				},
			},
		});
		const company: API.Company = {
			id: foundCompany.id,
			legalForm: foundCompany.legalForm,
			name: foundCompany.name,
			users: foundCompany.users.map(user => user.userId),
		};

		if (!company.users.find(user => user == requestingUser.uid) == undefined) {
			throw new HttpException(
				403,
				"You are not allowed to access this company"
			);
		}

		return company;
	} catch (e) {
		throw new HttpException(404, e.message);
	}
}

export async function deleteCompanyById(
	companyId: string,
	requestingUser: DecodedIdToken
) {
	let foundCompany;
	try {
		foundCompany = await prisma.company.findUnique({
			where: {
				id: companyId,
			},
			include: {
				users: true,
			},
		});
	} catch (e) {
		throw new HttpException(404, e.message);
	}

	if (
		foundCompany.users.find(user => user.userId == requestingUser.uid) ==
		undefined
	) {
		throw new HttpException(403, "You are not allowed to delete this company");
	}

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
