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
	const foundCompany = await prisma.company.findUnique({
		where: {
			id: companyId,
		},
	});
	const createTasks = await prisma.completedTask.create({
		data: {
			companyId: companyId,
			taskId: taskId,
		},
	});
	return createTasks;
}

async function deleteTaskFromCompany(companyId: string, taskId: string) {
	const deleteTasks = await prisma.completedTask.delete({
		where: {
			companyId: companyId,
			taskId: taskId,
		},
	});
	return deleteTasks;
}

module.exports = {
	findAllTasksByCompanyId,
	addTaskToCompany,
	deleteTaskFromCompany,
};
