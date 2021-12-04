import express = require("express");
import { Router } from "express";
const router = Router();
import { isAuthenticated } from "../utils/AuthenticationUtils";
import { response } from "apps/utr-backend/app";

const EntryService = require("./EntryService");

// search all companies for one given job
router.get(
	"/search?jobname={job}&street={street}&streetnr{nr}&plz={plz}&location={location}",
	function (req, res, next) {
		var query = req.query;
		EntryService.searchEntries(
			query.jobname,
			query.street,
			query.streetnr,
			query.plz,
			query.location,
			function (errorcode, result) {
				if (errorcode) {
					if (errorcode == "404") {
						console.log(
							"Es exisiert keine Strasse mit der Hausnummer im angegebenen Bereich"
						);
						res.status(404).end();
					} else if (errorcode == "400") {
						console.log(
							"Fehlerhafte Anfrage. Die Postzeitzahl darf keine Buchstaben enthalten"
						);
						res.status(400).end();
					}
				} else {
					response.send(result);
				}
			}
		);
		res.status(200).end();
	}
);

// get all companies
// note: how to make query params optional
router.get(
	"/company?verified={verified}&amount={amount}&page={page}",
	isAuthenticated,
	function (req, res, next) {
		var query = req.query;
		EntryService.getAllEntries(
			query.verified,
			query.amount,
			query.page,
			function (error, result) {
				if (error) {
					console.log(error);
					res.status(400).end();
				} else if (result) {
					res.send(result);
				}
			}
		);
		res.status(200).end();
	}
);

// create new entry for a company
router.post("/company", isAuthenticated, function (req, res, next) {
	const body = req.body.entry;
	EntryService.createEntry(
		body.job,
		body.company,
		body.street,
		body.streetnr,
		body.plz,
		body.location,
		body.email,
		body.telefon,
		body.website,
		function (error, result) {
			if (error) {
				console.log(error);
				res.status(400).end();
			} else {
				res.send(result);
			}
		}
	);
	res.status(200).end();
});

// get one company by its id
router.get("/company:id", isAuthenticated, function (req, res, next) {
	EntryService.getEntry(req.params.id, function (error, result) {
		if (error) {
			console.log(error);
			res.status(400).end();
		} else if (result) {
			res.send(result);
		}
	});
	res.status(200).end();
});

// change one company, identified by its id
router.put("/company:id", isAuthenticated, function (req, res, next) {
	EntryService.updateEntry(
		req.params.id,
		req.body.entry,
		function (errorcode, result) {
			if (errorcode) {
				if (errorcode == "404") {
					console.log("Es exisiert kein Eintrag für diese ID");
					res.status(404).end();
				} else if (errorcode == "400") {
					console.log(
						"Fehlerhafte Anfrage. ID muss number sein und der requestBody vorhanden"
					);
					res.status(400).end();
				}
			} else {
				response.send(result);
			}
		}
	);

	res.status(200).end();
});

// delete one company, identified by its id
router.delete("/company:id", isAuthenticated, function (req, res, next) {
	EntryService.deleteEntry(req.params.id, function (errorcode) {
		if (errorcode) {
			if (errorcode == "404") {
				console.log("Es exisiert kein Eintrag für diese ID");
				res.status(404).end();
			} else if (errorcode == "400") {
				console.log("Fehlerhafte Anfrage. ID muss number sein.");
				res.status(400).end();
			}
		} else {
			response.send(req.params.id);
		}
	});

	res.status(200).end();
});

module.exports = router;
