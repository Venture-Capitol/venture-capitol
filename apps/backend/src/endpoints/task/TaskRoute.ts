import { Router } from "express";
import HttpException from "../../utils/HttpException";
import * as TaskService from "./TaskService";

export const taskRouter = Router();

taskRouter.get("/:companyId/tasks", async function (req, res, next) {
	const companyId = req.params.companyId;
	try {
		const foundTasks = await TaskService.findAllTasksByCompanyId(companyId);
		res.send(foundTasks);
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});

taskRouter.post("/:companyId/tasks/:taskId", async function (req, res, next) {
	const companyId = req.params.companyId;
	const taskId = req.params.taskId;
	try {
		await TaskService.addTaskToCompany(companyId, taskId);
		res.status(200).end();
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});

taskRouter.delete("/:companyId/tasks/:taskId", async function (req, res, next) {
	const companyId = req.params.companyId;
	const taskId = req.params.taskId;
	try {
		await TaskService.deleteTaskFromCompany(companyId, taskId);
		res.status(200).end();
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});
