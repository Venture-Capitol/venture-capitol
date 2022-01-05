import { Router } from "express";
const router = Router();
import { isAuthenticated } from "../utils/AuthenticationUtils";

import logger = require("../../config/winston");
import { Entry } from "@prisma/client";
import ApplicationError from "../utils/ApplicationError";
const EntryService = require("./EntryService");
const EntryUtils = require("../utils/EntryUtils");

router.get("/search", function (req, res, next) {
	const latAsNumber = EntryUtils.parseToNumber(req.query.lat);
	const longAsNumber = EntryUtils.parseToNumber(req.query.long);
	EntryService.searchEntries(
		req.query.jobname,
		latAsNumber,
		longAsNumber,
		function (error: Error | ApplicationError, result: Entry[]) {
			if (error) {
				logger.error(error.message);
				if (error instanceof ApplicationError) {
					res.status(error.errorCode).end(error.message);
				} else {
					res.status(500).end(error.message);
				}
			} else {
				for (const entry in result) {
					// Array.map -> führt für jedes Element aus
					const { id, job, company, address, description, ...partialObject } =
						result[entry];
					result[entry] = { id, job, company, address, description };
				}
				res.send(result);
			}
		}
	);
});

// add isAuthenticated when ready
router.get("/", function (req, res, next) {
	const verifiedAsBoolean = EntryUtils.parseToBoolean(req.query.verified);
	const amountAsNumber = EntryUtils.parseToNumber(req.query.amount);
	const pageAsNumber = EntryUtils.parseToNumber(req.query.page);
	EntryService.getAllEntries(
		function (error: any, result: any) {
			if (error) {
				logger.error(error.message);
				res.status(error.errorCode).end(error.message);
			} else if (result) {
				res.send(result);
			}
		},
		verifiedAsBoolean,
		amountAsNumber,
		pageAsNumber
	);
});

router.post("/", function (req, res, next) {
	const body = req.body.entry;
	EntryService.createEntry(
		body.job,
		body.company,
		body.address,
		body.latitude,
		body.longitude,
		body.email,
		function (error: any, result: any) {
			if (error) {
				logger.error(error.message);
				res.status(error.errorCode).end(error.message);
			} else if (result) {
				res.status(200).end();
			}
		},
		body.telefon,
		body.website,
		body.description
	);
});

router.get("/:id", function (req, res, next) {
	const idAsNumber = Number(req.params.id);
	EntryService.getEntry(idAsNumber, function (error: any, result: any) {
		if (error) {
			logger.error(error.message);
			res.status(error.errorCode).end(logger.error);
		} else if (result) {
			console.log(result);
			console.log(typeof result);
			res.send(result);
		}
	});
});

// add isAuthenticated when ready
router.put("/:id", function (req, res, next) {
	const idAsNumber = EntryUtils.parseToNumber(req.params.id);
	EntryService.updateEntry(
		idAsNumber,
		req.body.editedEntry,
		function (error: any, result: any) {
			if (error) {
				logger.error(error.message);
				res.status(error.errorCode).end(error.message);
			} else if (result) {
				res.send(result);
			}
		}
	);
});

// add isAuthenticated when ready
router.delete("/:id", function (req, res, next) {
	const idAsNumber = EntryUtils.parseToNumber(req.params.id);
	EntryService.deleteEntry(idAsNumber, function (error: any) {
		if (error) {
			logger.error(error.message);
			res.status(error.errorCode).end(error.message);
		} else {
			res.send("Eintrag mit ID: " + req.params.id + " geloescht.");
		}
	});
});

// could add isAuthenticated when ready, but will be deleted before publish anyways
router.post("/addMany", function (req, res, next) {
	EntryUtils.addManyEntries(function (error: any) {
		if (error) {
			logger.error(error.message);
			res.status(error.errorCode).end(error.message);
		} else {
			res.status(200).end();
		}
	});
});

module.exports = router;
