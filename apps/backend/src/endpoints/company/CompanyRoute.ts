import { Router } from "express";
import HttpException from "../../utils/HttpException";
import * as CompanyService from "./CompanyService";

export const companyRouter = Router();

companyRouter.post("/", async function (req, res, next) {
	const body = req.body;
	try {
		const createdCompany = await CompanyService.addCompany(
			body.name,
			body.legalForm
		);
		res.send(createdCompany);
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});

companyRouter.get("/", async function (req, res, next) {
	try {
		const foundCompanies = await CompanyService.findAllCompanies();
		res.send(foundCompanies);
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});

companyRouter.get("/:companyId", async function (req, res, next) {
	const companyId = req.params.companyId;
	try {
		const foundCompany = await CompanyService.findCompanyById(companyId);
		res.send(foundCompany);
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});

companyRouter.delete("/:companyId", async function (req, res, next) {
	const companyId = req.params.companyId;
	try {
		await CompanyService.deleteCompanyById(companyId);
		res.status(200).end();
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});
