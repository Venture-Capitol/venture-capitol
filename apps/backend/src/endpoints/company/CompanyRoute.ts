import { Router } from "express";
const companyRouter = Router();

const CompanyService = require("./CompanyService");

companyRouter.post("/company", async function (req, res, next) {
	const body = req.body.company;
	res.send(CompanyService.addCompany(body.name, body.LegalForm));
});

companyRouter.get("/company/:companyId", async function (req, res, next) {
	const companyId = req.params.companyId;
	res.send(CompanyService.findCompanyById(companyId));
});

companyRouter.delete("/company/:companyId", async function (req, res, next) {
	const companyId = req.params.companyId;
	res.send(CompanyService.deleteCompanyById(companyId));
});

module.exports = companyRouter;
