import { Router } from "express";
import HttpException from "../../exceptions/HttpException";

import { MadeDecision } from "@prisma/client";

const decisionRouter = Router();

const DecisionService = require("./DecisionService");

decisionRouter.get("/:companyId/decisions", async function (req, res, next) {
	const companyId = req.params.companyId;
	DecisionService.findAllDecisionsByCompanyId(
		companyId,
		function (error: Error | HttpException, result: MadeDecision[]) {
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

decisionRouter.post(
	"/:companyId/decisions/:decisionId",
	async function (req, res, next) {
		const companyId = req.params.companyId;
		const decisionId = req.params.decisionId;
		const selectedPath = req.body.selectedPath;
		DecisionService.addDecisionToCompany(
			companyId,
			decisionId,
			selectedPath,
			function (error: Error | HttpException, result: MadeDecision) {
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
	}
);

decisionRouter.delete(
	"/:companyId/decisions/:decisionId",
	async function (req, res, next) {
		const companyId = req.params.companyId;
		const decisionId = req.params.decisionId;
		DecisionService.deleteDecisionFromCompany(
			companyId,
			decisionId,
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
	}
);

module.exports = decisionRouter;
