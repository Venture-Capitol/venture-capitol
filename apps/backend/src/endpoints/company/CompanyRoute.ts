import { Router } from "express";
const router = Router();

const CompanyService = require("./CompanyService");

router.post("/company", async function (req, res, next) {
	const body = req.body.company;
	res.send(CompanyService.addCompany(body.name, body.LegalForm));
});

router.get("/company/:companyId", async function (req, res, next) {
	const companyId = req.params.companyId;
	res.send(CompanyService.findCompanyById(companyId));
});

router.delete("/company/:companyId", async function (req, res, next) {
	const companyId = req.params.companyId;
	res.send(CompanyService.deleteCompanyById(companyId));
});

module.exports = router;
