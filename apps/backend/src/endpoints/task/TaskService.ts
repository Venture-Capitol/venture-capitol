import { PrismaClient } from "@prisma/client";
import HttpException from "../../exceptions/HttpException";

const prisma = new PrismaClient();

async function findAllTasksByCompanyId(companyId: string, callback: Function) {
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
		const foundTasks = await prisma.completedTask.findMany({
			where: {
				companyId: companyId,
			},
			select: {
				taskId: true,
			},
		});
		if (foundTasks == null) {
			return callback(
				new HttpException(404, "No completed tasks found in this company."),
				null
			);
		} else {
			return callback(null, foundTasks);
		}
	} catch (e) {
		throw new HttpException(500, e.message);
	}
}

async function addTaskToCompany(
	companyId: string,
	taskId: string,
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
		const createTask = await prisma.completedTask.create({
			data: {
				companyId: companyId,
				taskId: taskId,
			},
		});
		return callback(null, createTask);
	} catch (e) {
		throw new HttpException(500, e.message);
	}
}

async function deleteTaskFromCompany(companyId: string, taskId: string) {
	try {
		const foundCompany = await prisma.company.findUnique({
			where: {
				id: companyId,
			},
		});
		if (foundCompany == null) {
			throw new HttpException(404, "No company found under this ID.");
		}
		const deleteTask = await prisma.completedTask.deleteMany({
			where: {
				companyId: companyId,
				taskId: taskId,
			},
		});
		return deleteTask;
	} catch (e) {
		throw new HttpException(500, e.message);
	}
}

module.exports = {
	findAllTasksByCompanyId,
	addTaskToCompany,
	deleteTaskFromCompany,
};
