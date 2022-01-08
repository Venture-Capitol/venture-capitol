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
				const mappedSubset = result.map(entry => {
					const { id, job, company, address, description, ...partialObject } =
						entry;
					return { id, job, company, address, description };
				});
				res.send(mappedSubset);
			}
		}
	);
});

router.get("/", function (req, res, next) {
	const verifiedAsBoolean = EntryUtils.parseToBoolean(req.query.verified);
	const amountAsNumber = EntryUtils.parseToNumber(req.query.amount);
	const pageAsNumber = EntryUtils.parseToNumber(req.query.page);
	EntryService.getAllEntries(
		function (error: Error | ApplicationError, result: Entry[]) {
			if (error) {
				logger.error(error.message);
				if (error instanceof ApplicationError) {
					res.status(error.errorCode).end(error.message);
				} else {
					res.status(500).end(error.message);
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

router.post("/", function (req, res, next) {
	const body = req.body.entry;
	EntryService.createEntry(
		body.job,
		body.company,
		body.address,
		body.latitude,
		body.longitude,
		body.email,
		function (error: Error | ApplicationError, result: Entry) {
			if (error) {
				logger.error(error.message);
				if (error instanceof ApplicationError) {
					res.status(error.errorCode).end(error.message);
				} else {
					res.status(500).end(error.message);
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

router.get("/:id", function (req, res, next) {
	const idAsNumber = Number(req.params.id);
	EntryService.getEntry(
		idAsNumber,
		function (error: Error | ApplicationError, result: Entry) {
			if (error) {
				logger.error(error.message);
				if (error instanceof ApplicationError) {
					res.status(error.errorCode).end(error.message);
				} else {
					res.status(500).end(error.message);
				}
			} else if (result) {
				res.send(result);
			}
		}
	);
});

router.put("/:id", function (req, res, next) {
	const idAsNumber = EntryUtils.parseToNumber(req.params.id);
	EntryService.updateEntry(
		idAsNumber,
		req.body.editedEntry,
		function (error: Error | ApplicationError, result: Entry) {
			if (error) {
				logger.error(error.message);
				if (error instanceof ApplicationError) {
					res.status(error.errorCode).end(error.message);
				} else {
					res.status(500).end(error.message);
				}
			} else if (result) {
				res.status(200).end();
			}
		}
	);
});

router.delete("/:id", function (req, res, next) {
	const idAsNumber = EntryUtils.parseToNumber(req.params.id);
	EntryService.deleteEntry(
		idAsNumber,
		function (error: Error | ApplicationError) {
			if (error) {
				logger.error(error.message);
				if (error instanceof ApplicationError) {
					res.status(error.errorCode).end(error.message);
				} else {
					res.status(500).end(error.message);
				}
			} else {
				res.send("Eintrag mit ID: " + req.params.id + " geloescht.");
			}
		}
	);
});

router.post("/addMany", function (req, res, next) {
	EntryUtils.addManyEntries(function (error: Error | ApplicationError) {
		if (error) {
			logger.error(error.message);
			if (error instanceof ApplicationError) {
				res.status(error.errorCode).end(error.message);
			} else {
				res.status(500).end(error.message);
			}
		} else {
			res.status(200).end();
		}
	});
});

module.exports = router;
