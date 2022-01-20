import { Prisma, PrismaClient } from "@prisma/client";
import HttpException from "../../utils/HttpException";

const prisma = new PrismaClient({
	rejectOnNotFound: true,
});

async function findAllTasksByCompanyId(companyId: string) {
	try {
		await prisma.company.findUnique({
			where: {
				id: companyId,
			},
		});
		const foundTasks = await prisma.completedTask.findMany({
			where: {
				companyId: companyId,
			},
			select: {
				taskId: true,
			},
		});
		if (Object.keys(foundTasks).length == 0) {
			throw new HttpException(404, "No completed tasks found in this company");
		}
		return foundTasks;
	} catch (e) {
		throw new HttpException(e.status || 500, e.message);
	}
}

async function addTaskToCompany(companyId: string, taskId: string) {
	try {
		await prisma.company.findUnique({
			where: {
				id: companyId,
			},
		});
		const createdTask = await prisma.completedTask.create({
			data: {
				companyId: companyId,
				taskId: taskId,
			},
		});
		return createdTask;
	} catch (e) {
		throw new HttpException(500, e.message);
	}
}

async function deleteTaskFromCompany(companyId: string, taskId: string) {
	try {
		await prisma.company.findUnique({
			where: {
				id: companyId,
			},
		});
		await prisma.completedTask.deleteMany({
			where: {
				companyId: companyId,
				taskId: taskId,
			},
		});
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code == "P2025") {
				throw new HttpException(
					404,
					"No task with this ID found in the specified company"
				);
			}
		} else {
			throw new HttpException(500, e.message);
		}
	}
}

module.exports = {
	findAllTasksByCompanyId,
	addTaskToCompany,
	deleteTaskFromCompany,
};
