import { Router } from "express";
const taskRouter = Router();

const TaskService = require("./TaskService");

taskRouter.get("/company/:companyId/tasks", async function (req, res, next) {
	const companyId = req.params.companyId;
	res.send(TaskService.findAllTasksByCompanyId(companyId));
});

taskRouter.post(
	"/company/:companyId/tasks/:taskId",
	async function (req, res, next) {
		const companyId = req.params.companyId;
		const taskId = req.params.taskId;
		res.send(TaskService.addTaskToCompany(companyId, taskId));
	}
);

taskRouter.delete(
	"/company/:companyId/tasks/:taskId",
	async function (req, res, next) {
		const companyId = req.params.companyId;
		const taskId = req.params.taskId;
		res.send(TaskService.deleteTaskFromCompany(companyId, taskId));
	}
);

module.exports = taskRouter;
