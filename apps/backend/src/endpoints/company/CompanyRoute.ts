import { Router } from "express";
import HttpException from "../../exceptions/HttpException";

import { Company } from "@prisma/client";

const companyRouter = Router();

const CompanyService = require("./CompanyService");

companyRouter.post("/", function (req, res, next) {
	const body = req.body;
	CompanyService.addCompany(
		body.name,
		body.legalForm,
		function (error: Error | HttpException, result: Company) {
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

companyRouter.get("/", async function (req, res, next) {
	CompanyService.findAllCompanies(function (
		error: Error | HttpException,
		result: Company[]
	) {
		if (error) {
			if (error instanceof HttpException) {
				res.status(error.status).end(error.message);
			} else {
				res.status(500).end(error.message);
			}
		} else if (result) {
			res.send(result);
		}
	});
});

companyRouter.get("/:companyId", async function (req, res, next) {
	const companyId = req.params.companyId;
	CompanyService.findCompanyById(
		companyId,
		function (error: Error | HttpException, result: Company) {
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

companyRouter.delete("/:companyId", async function (req, res, next) {
	const companyId = req.params.companyId;
	CompanyService.deleteCompanyById(
		companyId,
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

module.exports = companyRouter;
