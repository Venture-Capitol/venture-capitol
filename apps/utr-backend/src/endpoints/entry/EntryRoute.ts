import { Router } from "express";
import { getUser, isAdmin } from "../utils/AuthenticationUtils";

import * as logger from "../../config/winston";

import { Entry } from "@prisma/client";
import { DistanceEntry, BatchPayload } from "./EntryService";
import ApplicationError from "../utils/ApplicationError";

import * as EntryService from "./EntryService";

export const router = Router();

router.get("/search", function (req, res, next) {
	EntryService.searchEntries(
		String(req.query.jobname),
		Number(req.query.latitude),
		Number(req.query.longitude),
		Number(req.query.page),
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
	);
});

router.get("/", getUser, isAdmin, function (req, res, next) {
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
		Boolean(req.query.verified),
		Number(req.query.amount),
		Number(req.query.page)
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
		req.user?.role == "admin" ? req.body.verified : false,
		req.user?.role != "admin" ? req.user?.uid : null,
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
	EntryService.getEntry(
		Number(req.params.id),
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

router.put("/:id", getUser, function (req, res, next) {
	EntryService.updateEntry(
		Number(req.params.id),
		req.body.editedEntry,
		req.user,
		function (error: Error | ApplicationError, result: Entry | BatchPayload) {
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

router.delete("/:id", getUser, function (req, res, next) {
	EntryService.deleteEntry(
		Number(req.params.id),
		req.user,
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

router.get("/user", getUser, function (req, res, next) {
	EntryService.getEntryByUID(
		req.user,
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
