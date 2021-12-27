import express = require("express");
import { Router } from "express";
const router = Router();
import { isAuthenticatedAsAdmin } from "../utils/AuthenticationUtils";

const EntryService = require("./EntryService");
const EntryUtils = require("../utils/EntryUtils");

// search all companies for one given job
// note: need to differentiate between different errorcode 400 cases
router.get("/search", function (req, res, next) {
	var query = req.query;
	EntryService.searchEntries(
		query.jobname,
		query.street,
		query.streetnr,
		query.plz,
		query.location,
		function (errorcode: string, result: any) {
			if (errorcode) {
				if (errorcode == "404") {
					console.log(
						"Es exisiert keine Strasse mit der Hausnummer im angegebenen Bereich"
					);
					res.status(404).end();
				} else if (errorcode == "400") {
					console.log(
						"Fehlerhafte Anfrage. Job, Street, StreetNr, Plz und Location müssen vom Typ String sein"
					);
					console.log("oder eventuell auch ungültiger jobname");
					res.status(400).end();
				} else {
					console.log(
						"Es sind unerwartete Probleme bei der Suche aufgetreten."
					);
					res.status(500).end();
				}
			} else {
				res.send(result);
			}
		}
	);
});

// get all companies
// note: how to make query params optional
// note: add isAuthenticated
router.get("/", function (req, res, next) {
	const verifiedAsBoolean = EntryUtils.parseToBoolean(req.query.verified);
	const amountAsNumber = EntryUtils.parseToNumber(req.query.amount);
	const pageAsNumber = EntryUtils.parseToNumber(req.query.page);
	console.log(verifiedAsBoolean);
	console.log(amountAsNumber);
	console.log(pageAsNumber);
	EntryService.getAllEntries(
		function (errorcode: string, result: any) {
			if (errorcode) {
				if (errorcode == "400") {
					console.log(
						"Die Anfrage war fehlerhaft. verified muss keinen Wert oder einen boolean Wert enthalten."
					);
					res.status(400).end();
				} else if (errorcode == "401") {
					console.log(
						"Die Autorisierungsinformationen fehlen oder sind fehlerhaft."
					);
					res.status(401).end();
				} else if (errorcode == "403") {
					console.log(
						"Der anfragende Nutzer hat nicht genug Rechte um diese Anfrage auszuführen."
					);
					res.status(403).end();
				} else {
					console.log(
						"Es sind unerwartete Probleme bei der Suche nach allen Eintraegen aufgetreten."
					);
					res.status(500).end();
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

// add isAuthenticated
// create new entry for a company
router.post("/", function (req, res, next) {
	const body = req.body.entry;
	EntryService.createEntry(
		body.job,
		body.company,
		body.street,
		body.streetnr,
		body.plz,
		body.location,
		body.email,
		function (errorcode: string, result: any) {
			if (errorcode) {
				if (errorcode == "400") {
					console.log(
						"Die Anfrage war fehlerhaft. Company, E-Mail, Job, Street, StreetNr, PLZ & Location sind required."
					);
					res.status(400).end();
				} else {
					console.log(
						"Es sind unerwartete Probleme bei der Erstellung eines Eintrags aufgetreten."
					);
					res.status(500).end();
				}
			} else if (result) {
				res.send(result);
			}
		},
		body.telefon,
		body.website,
		body.description
	);
});

// add isAuthenticated
// get one company by its id
router.get("/:id", function (req, res, next) {
	const idAsNumber = Number(req.params.id);
	EntryService.getEntry(idAsNumber, function (errorcode: string, result: any) {
		if (errorcode) {
			if (errorcode == "400") {
				console.log("Die Anfrage war Fehlerhaft. id muss vom typ number sein.");
				res.status(400).end();
			} else if (errorcode == "404") {
				console.log(
					"Für die angegebene ID " +
						idAsNumber +
						" konnte kein Eintrag gefunden werden."
				);
				res.status(404).end();
			} else {
				console.log(
					"Es ist ein unerwarteter Fehler bei der Suche nach genau einem Eintrag aufgetreten."
				);
				res.status(500).end();
			}
		} else if (result) {
			res.send(result);
		}
	});
});

// add isAuthenticated
// change one company, identified by its id
router.put("/:id", function (req, res, next) {
	EntryService.updateEntry(
		req.params.id,
		req.body.entry,
		function (errorcode: string, result: any) {
			if (errorcode) {
				if (errorcode == "404") {
					console.log("Es exisiert kein Eintrag für diese ID.");
					res.status(404).end();
				} else if (errorcode == "400") {
					console.log(
						"Fehlerhafte Anfrage. ID muss number sein und der requestBody vorhanden."
					);
					res.status(400).end();
				} else if (errorcode == "401") {
					console.log(
						"Die Autorisierungsinformationen fehlen oder sind fehlerhaft."
					);
					res.status(401).end();
				} else if (errorcode == "403") {
					console.log(
						"Der anfragende Nutzer hat nicht genug Rechte um diese Anfrage auszuführen."
					);
					res.status(403).end();
				} else {
					console.log(
						"Es ist ein unerwarteter Fehler beim Aktualisieren eines Eintrags aufgetretren."
					);
					res.status(500).end();
				}
			} else {
				res.send(result);
			}
		}
	);
});

// delete one company, identified by its id
router.delete("/:id", isAuthenticatedAsAdmin, function (req, res, next) {
	EntryService.deleteEntry(req.params.id, function (errorcode: string) {
		if (errorcode) {
			if (errorcode == "404") {
				console.log("Es exisiert kein Eintrag für diese ID");
				res.status(404).end();
			} else if (errorcode == "400") {
				console.log("Fehlerhafte Anfrage. ID muss number sein.");
				res.status(400).end();
			} else if (errorcode == "401") {
				console.log(
					"Die Autorisierungsinformationen fehlen oder sind fehlerhaft."
				);
				res.status(401).end();
			} else if (errorcode == "403") {
				console.log(
					"Der anfragende Nutzer hat nicht genug Rechte um diese Anfrage auszuführen."
				);
				res.status(403).end();
			} else {
				console.log(
					"Es ist ein unerwarteter Fehler beim Loeschen eines Eintrags aufgetreten"
				);
				res.status(500).end();
			}
		} else {
			res.send(req.params.id);
		}
	});
});

// add isAuthenticated
// create new entry for a company
router.post("/addMany", function (req, res, next) {
	EntryUtils.addManyEntries(function (errorcode: string) {
		if (errorcode) {
			if (errorcode == "500") {
				console.log("500 Error beim erstellen sinnvoller Starteintraege.");
				res.status(500).end();
			}
		} else {
			res.status(200).end();
		}
	});
});

module.exports = router;
