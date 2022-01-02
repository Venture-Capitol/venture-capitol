import { PrismaClient, Prisma } from "@prisma/client";
import logger = require("../../config/winston");

const prisma = new PrismaClient();

// note: needs implementation of calcDistance to work properly
// note: needs differenciation between different 400 cases
// needs stronger differenciation for internal logging (not responses, should all be 500)
async function searchEntries(
	jobname: string,
	lat: number,
	long: number,
	callback: Function
) {
	if (
		typeof jobname !== "string" ||
		typeof lat !== "number" ||
		typeof long !== "number"
	) {
		return callback(
			new Error(
				"Fehlerhafte Anfrage. Job muss vom Typ String, longitude und latitude müssen vom Typ number sein."
			),
			"400",
			null
		);
	} else if (
		jobname !== "Notar" &&
		jobname !== "Rechtsanwalt" &&
		jobname !== "Steuerberater" &&
		jobname !== "Webagentur"
	) {
		return callback(new Error("Jobname ist ungueltig."), "400", null);
	} else {
		try {
			const searchResults = await prisma.entry.findMany({
				where: {
					job: {
						equals: jobname,
					},
					verified: {
						equals: false,
					},
				},
			});
			if (searchResults) {
				/*
				 * somehow calcDistance needs to be called for every entry in searchResults
				 * and might also need to pass the distance back in a callback for error handling & saving
				 * note: ATM THIS DOESNT WORK / DO ANYTHING!
				 */
				searchResults.forEach(element => {
					calcDistance(element, lat, long);
				});
				return callback(null, null, searchResults);
			} else {
				return callback(
					new Error("Es existieren keine Einträge die diesen Job ausführen"),
					"404",
					null
				);
			}
		} catch (exception) {
			return callback(
				new Error("Es sind unerwartete Probleme bei der Suche aufgetreten."),
				"500",
				null
			);
		}
	}
}

// note: used in searchEntries
// note: NOT TESTED YET
function calcDistance(element: any, lat: number, long: number) {
	// to be implemented - also needs efficient saving of these infos for each element
}

// needs stronger differenciation for internal logging (not responses, should all be 500)
async function getAllEntries(
	callback: Function,
	verified?: boolean,
	amount?: number,
	page?: number
) {
	if (typeof verified == "boolean" || !verified) {
		try {
			// needed if case, otherwise multiplication with 'undefined' in skip param would fail
			if (!page || !amount) {
				const allEntries = await prisma.entry.findMany({
					where: {
						verified: {
							equals: verified,
						},
					},
					take: amount,
				});
				return callback(null, allEntries);
			} else {
				const allEntries = await prisma.entry.findMany({
					where: {
						verified: {
							equals: verified,
						},
					},
					skip: page * amount,
					take: amount,
				});
				return callback(null, allEntries);
			}
		} catch (exception) {
			return callback(
				new Error(
					"Es sind unerwartete Probleme bei der Suche nach allen Eintraegen aufgetreten."
				),
				"500",
				null
			);
		}
	} else {
		return callback(
			new Error(
				"Die Anfrage war fehlerhaft. verified muss keinen Wert oder einen boolean Wert enthalten."
			),
			"400",
			null
		);
	}
}

// note: doesnt differ between prisma errors and other exceptions yet
// note: implement handling for wrong data types using npm express openapi validator
async function createEntry(
	job: string,
	company: string,
	address: string,
	latitude: number,
	longitude: number,
	email: string,
	callback: Function,
	telefon?: string,
	website?: string,
	description?: string
) {
	if (!company || !email || !job || !address || !latitude || !longitude) {
		return callback(
			new Error(
				"Die Anfrage war fehlerhaft. Company, E-Mail, Job & Addresse sind required."
			),
			"400",
			null
		);
	} else {
		try {
			const createdEntry = await prisma.entry.create({
				data: {
					job: job,
					company: company,
					address: address,
					latitude: latitude,
					longitude: longitude,
					email: email,
					telefon: telefon,
					website: website,
					description: description,
				},
			});
			return callback(null, createdEntry);
		} catch (exception) {
			//if (exception instanceof Prisma.???) {
			return callback(
				new Error(
					"Es sind unerwartete Probleme bei der Erstellung eines Eintrags aufgetreten."
				),
				"500",
				null
			);
			//}
		}
	}
}

async function getEntry(entryID: number, callback: Function) {
	if (isNaN(entryID)) {
		return callback(
			new Error("Die Anfrage war Fehlerhaft. id muss vom typ number sein."),
			"400",
			null
		);
	} else {
		try {
			const foundEntry = await prisma.entry.findUnique({
				where: {
					id: entryID,
				},
			});
			if (foundEntry == null) {
				return callback(
					new Error(
						"Für die angegebene ID " +
							entryID +
							" konnte kein Eintrag gefunden werden."
					),
					"404",
					null
				);
			} else {
				return callback(null, foundEntry);
			}
		} catch (exception) {
			return callback(
				new Error(
					"Es ist ein unerwarteter Fehler bei der Suche nach genau einem Eintrag aufgetreten."
				),
				"500",
				null
			);
		}
	}
}

// note: NOT TESTED YET
async function updateEntry(id: number, body: any, callback: Function) {
	if (isNaN(id) || !body) {
		return callback(
			new Error(
				"Fehlerhafte Anfrage. ID muss number sein und der requestBody vorhanden."
			),
			"400",
			null
		);
	} else {
		try {
			const updatedEntry = await prisma.entry.update({
				where: {
					id: id,
				},
				data: {
					job: body.job,
					company: body.company,
					address: body.address,
					latitude: body.latitude,
					longitude: body.longitude,
					email: body.email,
					telefon: body.telefon,
					website: body.website,
					description: body.description,
				},
			});
			return callback(null, updatedEntry);
		} catch (exception) {
			if (exception instanceof Prisma.PrismaClientKnownRequestError) {
				if (exception.code == "P2025") {
					return callback(
						new Error("Es exisiert kein Eintrag für diese ID."),
						"404",
						null
					);
				}
			} else {
				return callback(
					new Error(
						"Es ist ein unerwarteter Fehler beim Aktualisieren eines Eintrags aufgetretren."
					),
					"500",
					null
				);
			}
		}
	}
}

async function deleteEntry(id: number, callback: Function) {
	if (isNaN(id)) {
		return callback(
			new Error("Fehlerhafte Anfrage. ID muss number sein."),
			"400"
		);
	} else {
		try {
			const deleteUser = await prisma.entry.delete({
				where: {
					id: id,
				},
			});
			return callback(null);
		} catch (exception) {
			if (exception instanceof Prisma.PrismaClientKnownRequestError) {
				if (exception.code == "P2025") {
					return callback(
						new Error("Es exisiert kein Eintrag für diese ID"),
						"404"
					);
				}
			} else {
				return callback(
					new Error(
						"Es ist ein unerwarteter Fehler beim Loeschen eines Eintrags aufgetreten"
					),
					"500"
				);
			}
		}
	}
}

module.exports = {
	searchEntries,
	getAllEntries,
	createEntry,
	getEntry,
	updateEntry,
	deleteEntry,
};
