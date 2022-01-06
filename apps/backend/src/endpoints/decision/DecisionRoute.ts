import { Router } from "express";
const router = Router();

const DecisionService = require("./DecisionService");

router.get("/company/:companyId/decisions", async function (req, res, next) {
	const companyId = req.params.companyId;
	res.send(DecisionService.findAllDecisionsByCompanyId(companyId));
});

router.post(
	"/company/:companyId/decisions/:decisionId",
	async function (req, res, next) {
		const companyId = req.params.companyId;
		const decisionId = req.params.decisionId;
		const selectedPath = req.body.selectedPath;
		res.send(
			DecisionService.addDecisionToCompany(companyId, decisionId, selectedPath)
		);
	}
);

router.delete(
	"/company/:companyId/decisions/:decisionId",
	async function (req, res, next) {
		const companyId = req.params.companyId;
		const decisionId = req.params.decisionId;
		res.send(DecisionService.deleteDecisionFromCompany(companyId, decisionId));
	}
);

module.exports = router;
