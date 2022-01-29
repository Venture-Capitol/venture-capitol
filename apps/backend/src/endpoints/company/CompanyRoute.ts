import { Router } from "express";
import HttpException from "../../utils/HttpException";
import * as CompanyService from "./CompanyService";

export const companyRouter = Router();

companyRouter.post("/", async (req, res) => {
	try {
		const createdCompany = await CompanyService.addCompany(
			req.body.name,
			req.body.legalForm,
			req.user
		);
		res.json(createdCompany);
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});

companyRouter.get("/:companyId", async (req, res) => {
	const companyId = req.params.companyId;
	try {
		const foundCompany = await CompanyService.findCompanyById(
			companyId,
			req.user
		);
		res.json(foundCompany);
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});

companyRouter.delete("/:companyId", async (req, res) => {
	const companyId = req.params.companyId;
	try {
		await CompanyService.deleteCompanyById(companyId, req.user);
		res.status(200).end();
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});
