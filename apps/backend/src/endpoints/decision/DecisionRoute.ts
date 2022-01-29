import { Router } from "express";
import HttpException from "../../utils/HttpException";
import * as DecisionService from "./DecisionService";

export const decisionRouter = Router();

decisionRouter.get("/:companyId/decisions", async (req, res) => {
	const companyId = req.params.companyId;
	try {
		const foundDecisions = await DecisionService.findAllDecisionsByCompanyId(
			companyId,
			req.user
		);
		res.json(foundDecisions);
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});

decisionRouter.post("/:companyId/decisions/:decisionId", async (req, res) => {
	const companyId = req.params.companyId;
	const decisionId = req.params.decisionId;
	const selectedPath = req.body.selectedPath;
	try {
		await DecisionService.addDecisionToCompany(
			companyId,
			decisionId,
			selectedPath,
			req.user
		);
		res.status(200).end();
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});

decisionRouter.delete("/:companyId/decisions/:decisionId", async (req, res) => {
	const companyId = req.params.companyId;
	const decisionId = req.params.decisionId;
	try {
		await DecisionService.deleteDecisionFromCompany(
			companyId,
			decisionId,
			req.user
		);
		res.status(200).end();
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});
