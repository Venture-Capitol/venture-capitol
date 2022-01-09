import { Router } from "express";
import HttpException from "../../exceptions/HttpException";
const companyRouter = Router();

const CompanyService = require("./CompanyService");

companyRouter.post("/", function (req, res, next) {
	const body = req.body;
	try {
		CompanyService.addCompany(body.name, body.legalForm);
		res.status(200).json({
			status: 200,
			message: "Succesfully added company.",
		});
	} catch (e) {
		res.status(e.status || 500).json({
			message: e.message,
			status: e.status,
		});
	}
});

companyRouter.get("/:companyId", async function (req, res, next) {
	const companyId = req.params.companyId;
	try {
		const response = CompanyService.findCompanyById(companyId);
		res.send(response);
	} catch (e) {
		res.status(e.status || 500).json({
			message: e.message,
			status: e.status,
		});
	}
});

companyRouter.delete("/:companyId", async function (req, res, next) {
	const companyId = req.params.companyId;
	try {
		const response = CompanyService.deleteCompanyById(companyId);
		res.send(response);
	} catch (e) {
		res.status(e.status || 500).json({
			message: e.message,
			status: e.status,
		});
	}
});

module.exports = companyRouter;
