import { Router } from "express";
import HttpException from "../../utils/HttpException";
import * as TaskService from "./TaskService";

export const taskRouter = Router();

taskRouter.get("/:companyId/tasks", async (req, res) => {
	const companyId = req.params.companyId;

	try {
		const foundTasks = await TaskService.findAllTasksByCompanyId(
			companyId,
			req.user
		);
		res.json(foundTasks);
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});

taskRouter.post("/:companyId/tasks/:taskId", async (req, res) => {
	const companyId = req.params.companyId;
	const taskId = req.params.taskId;

	try {
		await TaskService.addTaskToCompany(companyId, taskId, req.user);
		res.status(200).end();
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});

taskRouter.delete("/:companyId/tasks/:taskId", async (req, res) => {
	const companyId = req.params.companyId;
	const taskId = req.params.taskId;

	try {
		await TaskService.deleteTaskFromCompany(companyId, taskId, req.user);
		res.status(200).end();
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});
