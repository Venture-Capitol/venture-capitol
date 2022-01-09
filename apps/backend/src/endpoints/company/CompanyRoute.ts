import { Router } from "express";
const companyRouter = Router();

const CompanyService = require("./CompanyService");

companyRouter.post("/", function (req, res, next) {
	const body = req.body;
	CompanyService.addCompany(body.name, body.legalForm);
	res.status(200);
});

companyRouter.get("/:companyId", async function (req, res, next) {
	const companyId = req.params.companyId;
	res.send(CompanyService.findCompanyById(companyId));
});

companyRouter.delete("/:companyId", async function (req, res, next) {
	const companyId = req.params.companyId;
	res.send(CompanyService.deleteCompanyById(companyId));
});

module.exports = companyRouter;
