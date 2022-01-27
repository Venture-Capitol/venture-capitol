import { DecodedIdToken } from "firebase-admin/auth";
import { API } from "packages/api";
import HttpException from "../../utils/HttpException";
import { prisma } from "../../utils/Prisma";

export async function findAllTasksByCompanyId(
	companyId: string,
	requestingUser: DecodedIdToken
): Promise<API.CompletedTask[]> {
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

	let foundTasks: API.CompletedTask[] = [];

	try {
		foundTasks = await prisma.completedTask.findMany({
			where: {
				companyId: companyId,
			},
			select: {
				taskId: true,
			},
		});
	} catch (e) {}

	return foundTasks;
}

export async function addTaskToCompany(
	companyId: string,
	taskId: string,
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
		await prisma.completedTask.create({
			data: {
				companyId: companyId,
				taskId: taskId,
			},
		});
	} catch (e) {
		throw new HttpException(500, e.message);
	}
}

export async function deleteTaskFromCompany(
	companyId: string,
	taskId: string,
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
		await prisma.completedTask.deleteMany({
			where: {
				companyId: companyId,
				taskId: taskId,
			},
		});
	} catch (e) {}
}
