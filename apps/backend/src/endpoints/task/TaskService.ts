import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findAllTasksByCompanyId(companyId: string) {
	const foundTasks = await prisma.completedTask.findMany({
		where: {
			companyId: companyId,
		},
	});
	return foundTasks;
}

async function addTaskToCompany(companyId: string, taskId: string) {
	const createTask = await prisma.completedTask.create({
		data: {
			companyId: companyId,
			taskId: taskId,
		},
	});
	return createTask;
}

async function deleteTaskFromCompany(companyId: string, taskId: string) {
	const deleteTask = await prisma.completedTask.deleteMany({
		where: {
			companyId: companyId,
			taskId: taskId,
		},
	});
	return deleteTask;
}

module.exports = {
	findAllTasksByCompanyId,
	addTaskToCompany,
	deleteTaskFromCompany,
};
