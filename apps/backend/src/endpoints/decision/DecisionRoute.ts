import { Router } from "express";
const decisionRouter = Router();

const DecisionService = require("./DecisionService");

decisionRouter.get("/:companyId/decisions", async function (req, res, next) {
	const companyId = req.params.companyId;
	res.send(DecisionService.findAllDecisionsByCompanyId(companyId));
});

decisionRouter.post(
	"/:companyId/decisions/:decisionId",
	async function (req, res, next) {
		const companyId = req.params.companyId;
		const decisionId = req.params.decisionId;
		const selectedPath = req.body.selectedPath;
		res.send(
			DecisionService.addDecisionToCompany(companyId, decisionId, selectedPath)
		);
	}
);

decisionRouter.delete(
	"/:companyId/decisions/:decisionId",
	async function (req, res, next) {
		const companyId = req.params.companyId;
		const decisionId = req.params.decisionId;
		res.send(DecisionService.deleteDecisionFromCompany(companyId, decisionId));
	}
);

module.exports = decisionRouter;
