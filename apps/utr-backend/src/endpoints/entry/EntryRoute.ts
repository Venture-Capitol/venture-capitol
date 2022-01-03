import express = require("express");
import { Router } from "express";
const router = Router();
import { isAuthenticatedAsAdmin, getRole } from "../utils/AuthenticationUtils";

import logger = require("../../config/winston");
const EntryService = require("./EntryService");
const EntryUtils = require("../utils/EntryUtils");

router.get("/search", function (req, res, next) {
	const latAsNumber = EntryUtils.parseToNumber(req.query.lat);
	const longAsNumber = EntryUtils.parseToNumber(req.query.long);
	EntryService.searchEntries(
		req.query.jobname,
		latAsNumber,
		longAsNumber,
		function (error: any, errorcode: string, result: any) {
			if (error) {
				logger.error(error.message);
				if (errorcode) {
					if (errorcode == "404") {
						res.status(404).end(error.message);
					} else if (errorcode == "400") {
						res.status(400).end(error.message);
					} else {
						res.status(500).end(error.message);
					}
				}
			} else {
				for (const entry in result) {
					const { id, job, company, address, description, ...partialObject } =
						result[entry];
					result[entry] = { id, job, company, address, description };
				}
				res.send(result);
			}
		}
	);
});

// get all companies
// note: how to make query params optional
// note: add isAuthenticated - done, only lets admins pass
router.get("/", isAuthenticatedAsAdmin, function (req, res, next) {
	const verifiedAsBoolean = EntryUtils.parseToBoolean(req.query.verified);
	const amountAsNumber = EntryUtils.parseToNumber(req.query.amount);
	const pageAsNumber = EntryUtils.parseToNumber(req.query.page);
	EntryService.getAllEntries(
		function (error: any, errorcode: string, result: any) {
			if (error) {
				logger.error(error.message);
				if (errorcode) {
					if (errorcode == "400") {
						res.status(400).end(error.message);
					} else if (errorcode == "401") {
						res.status(401).end(error.message);
					} else if (errorcode == "403") {
						res.status(403).end(error.message);
					} else {
						res.status(500).end(error.message);
					}
				}
			} else if (result) {
				res.send(result);
			}
		},
		verifiedAsBoolean,
		amountAsNumber,
		pageAsNumber
	);
});

// add isAuthenticated - no, used getRole which lets admins and users pass
// create new entry for a company
router.post("/", getRole, function (req, res, next) {
	const body = req.body.entry;
	EntryService.createEntry(
		body.job,
		body.company,
		body.address,
		body.latitude,
		body.longitude,
		body.email,
		function (error: any, errorcode: string, result: any) {
			if (error) {
				logger.error(error.message);
				if (errorcode) {
					if (errorcode == "400") {
						res.status(400).end(error.message);
					} else {
						res.status(500).end(error.message);
					}
				}
			} else if (result) {
				res.status(200).end();
			}
		},
		body.telefon,
		body.website,
		body.description
	);
});

// add isAuthenticated - no, because everybody should be able to get one entry
// get one company by its id
router.get("/:id", function (req, res, next) {
	const idAsNumber = Number(req.params.id);
	EntryService.getEntry(
		idAsNumber,
		function (error: any, errorcode: string, result: any) {
			if (error) {
				logger.error(error.message);
				if (errorcode) {
					if (errorcode == "400") {
						res.status(400).end(logger.error);
					} else if (errorcode == "404") {
						res.status(404).end(logger.error);
					} else {
						res.status(500).end(logger.error);
					}
				}
			} else if (result) {
				res.send(result);
			}
		}
	);
});

// add isAuthenticated - done, only lets admins pass
// change one company, identified by its id
router.put("/:id", isAuthenticatedAsAdmin, function (req, res, next) {
	const idAsNumber = EntryUtils.parseToNumber(req.params.id);
	EntryService.updateEntry(
		idAsNumber,
		req.body.editedEntry,
		function (error: any, errorcode: string, result: any) {
			if (error) {
				logger.error(error.message);
				if (errorcode) {
					if (errorcode == "404") {
						res.status(404).end(error.message);
					} else if (errorcode == "400") {
						res.status(400).end(error.message);
					} else if (errorcode == "401") {
						res.status(401).end(error.message);
					} else if (errorcode == "403") {
						res.status(403).end(error.message);
					} else {
						res.status(500).end(error.message);
					}
				}
			} else if (result) {
				res.send(result);
			}
		}
	);
});

// delete one company, identified by its id
router.delete("/:id", isAuthenticatedAsAdmin, function (req, res, next) {
	const idAsNumber = EntryUtils.parseToNumber(req.params.id);
	EntryService.deleteEntry(
		idAsNumber,
		function (error: any, errorcode: string) {
			if (error) {
				logger.error(error.message);
				if (errorcode) {
					if (errorcode == "404") {
						res.status(404).end(error.message);
					} else if (errorcode == "400") {
						res.status(400).end(error.message);
					} else if (errorcode == "401") {
						res.status(401).end(error.message);
					} else if (errorcode == "403") {
						res.status(403).end(error.message);
					} else {
						res.status(500).end(error.message);
					}
				}
			} else {
				res.send("Eintrag mit ID: " + req.params.id + " geloescht.");
			}
		}
	);
});

// could add isAuthenticated when ready, but will be deleted before publish anyways
router.post("/addMany", function (req, res, next) {
	EntryUtils.addManyEntries(function (error: any, errorcode: string) {
		if (error) {
			logger.error(error.message);
			if (errorcode) {
				if (errorcode == "500") {
					res.status(500).end(error.message);
				}
			}
		} else {
			res.status(200).end();
		}
	});
});

module.exports = router;
