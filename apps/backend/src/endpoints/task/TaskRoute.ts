import { Router } from "express";
import HttpException from "../../utils/HttpException";

import { CompletedTask } from "@prisma/client";

const taskRouter = Router();

const TaskService = require("./TaskService");

taskRouter.get("/:companyId/tasks", async function (req, res, next) {
	const companyId = req.params.companyId;
	TaskService.findAllTasksByCompanyId(
		companyId,
		function (error: Error | HttpException, result: CompletedTask[]) {
			if (error) {
				if (error instanceof HttpException) {
					res.status(error.status).end(error.message);
				} else {
					res.status(500).end(error.message);
				}
			} else if (result) {
				res.send(result);
			}
		}
	);
});

taskRouter.post("/:companyId/tasks/:taskId", async function (req, res, next) {
	const companyId = req.params.companyId;
	const taskId = req.params.taskId;
	TaskService.addTaskToCompany(
		companyId,
		taskId,
		function (error: Error | HttpException, result: CompletedTask) {
			if (error) {
				if (error instanceof HttpException) {
					res.status(error.status).end(error.message);
				} else {
					res.status(500).end(error.message);
				}
			} else if (result) {
				res.status(200).end();
			}
		}
	);
});

taskRouter.delete("/:companyId/tasks/:taskId", async function (req, res, next) {
	const companyId = req.params.companyId;
	const taskId = req.params.taskId;
	TaskService.deleteTaskFromCompany(
		companyId,
		taskId,
		function (error: Error | HttpException) {
			if (error) {
				if (error instanceof HttpException) {
					res.status(error.status).end(error.message);
				} else {
					res.status(500).end(error.message);
				}
			} else {
				res.status(200).end();
			}
		}
	);
});

module.exports = taskRouter;
