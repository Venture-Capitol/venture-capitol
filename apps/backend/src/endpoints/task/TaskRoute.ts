import { Router } from "express";
const router = Router();

const TaskService = require("./TaskService");

router.get("/company/:companyId/tasks", async function (req, res, next) {
	const companyId = req.params.companyId;
	res.send(TaskService.findAllTasksByCompanyId(companyId));
});

router.post(
	"/company/:companyId/tasks/:taskId",
	async function (req, res, next) {
		const companyId = req.params.companyId;
		const taskId = req.params.taskId;
		res.send(TaskService.addTaskToCompany(companyId, taskId));
	}
);

router.delete(
	"/company/:companyId/tasks/:taskId",
	async function (req, res, next) {
		const companyId = req.params.companyId;
		const taskId = req.params.taskId;
		res.send(TaskService.deleteTaskFromCompany(companyId, taskId));
	}
);

module.exports = router;
