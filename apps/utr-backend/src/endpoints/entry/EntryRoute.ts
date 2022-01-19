import { Router } from "express";
const router = Router();
import { getUser, isAdmin } from "../utils/AuthenticationUtils";

import logger = require("../../config/winston");

import { Entry } from "@prisma/client";
import { DistanceEntry } from "./EntryService";
import ApplicationError from "../utils/ApplicationError";

import EntryService from "./EntryService";
import EntryUtils from "../utils/EntryUtils";

router.get("/search", function (req, res, next) {
	console.log(req.query.jobname);
	console.log(req.query.latitude);
	console.log(req.query.longitude);
	console.log(req.query.page);
	/* EntryService.searchEntries(
		req.query.jobname as string,
		req.query.latitude as string,
		req.query.longitude,
		req.query.page,
		function (error: Error | ApplicationError, result: DistanceEntry[]) {
			if (error) {
				logger.error(error.message);
				if (error instanceof ApplicationError) {
					res.status(error.errorCode).end(error.message);
				} else {
					res.status(500).end(error.message);
				}
			} else {
				const mappedSubset = result.map(entry => {
					const {
						id,
						job,
						company,
						address,
						description,
						distance,
						...partialObject
					} = entry;
					return { id, job, company, address, description, distance };
				});
				res.send(mappedSubset);
			}
		}
	); */
});

/* router.get("/", getUser, isAdmin, function (req, res, next) {
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
		req.query.verified,
		req.query.amount,
		req.query.page
	);
});

router.post("/", getUser, function (req, res, next) {
	EntryService.createEntry(
		req.body.job,
		req.body.company,
		req.body.address,
		req.body.latitude,
		req.body.longitude,
		req.body.email,
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
		req.body.telefon,
		req.body.website,
		req.body.description
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

router.put("/:id", getUser, isAdmin, function (req, res, next) {
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

router.delete("/:id", getUser, isAdmin, function (req, res, next) {
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
}); */

/* WILL BE DELETED AFTER ALL TESTS ARE COMPLETE
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
*/

module.exports = router;
