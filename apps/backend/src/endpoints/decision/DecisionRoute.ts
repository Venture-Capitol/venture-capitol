import { Router } from "express";
import HttpException from "../../utils/HttpException";
import * as DecisionService from "./DecisionService";

export const decisionRouter = Router();

decisionRouter.get("/:companyId/decisions", async function (req, res, next) {
	const companyId = req.params.companyId;
	try {
		const foundDecisions = await DecisionService.findAllDecisionsByCompanyId(
			companyId
		);
		res.send(foundDecisions);
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});

decisionRouter.post(
	"/:companyId/decisions/:decisionId",
	async function (req, res, next) {
		const companyId = req.params.companyId;
		const decisionId = req.params.decisionId;
		const selectedPath = req.body.selectedPath;
		try {
			await DecisionService.addDecisionToCompany(
				companyId,
				decisionId,
				selectedPath
			);
			res.status(200).end();
		} catch (error) {
			if (error instanceof HttpException) {
				res.status(error.status).end(error.message);
			} else {
				res.status(500).end(error.message);
			}
		}
	}
);

decisionRouter.delete(
	"/:companyId/decisions/:decisionId",
	async function (req, res, next) {
		const companyId = req.params.companyId;
		const decisionId = req.params.decisionId;
		try {
			await DecisionService.deleteDecisionFromCompany(companyId, decisionId);
			res.status(200).end();
		} catch (error) {
			if (error instanceof HttpException) {
				res.status(error.status).end(error.message);
			} else {
				res.status(500).end(error.message);
			}
		}
	}
);
