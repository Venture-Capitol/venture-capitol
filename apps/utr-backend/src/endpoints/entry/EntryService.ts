import { PrismaClient, Prisma, Entry } from "@prisma/client";
import { DecodedIdToken } from "firebase-admin/auth";

import ApplicationError from "../utils/ApplicationError";

const prisma = new PrismaClient();

export interface DistanceEntry extends Entry {
	distance: number;
}

export interface BatchPayload {
	count: number;
}

export async function searchEntries(
	jobname: string,
	lat: number,
	long: number,
	page: number,
	callback: Function
) {
	if (
		typeof jobname !== "string" ||
		typeof lat !== "number" ||
		typeof long !== "number"
	) {
		return callback(
			new ApplicationError(
				"Fehlerhafte Anfrage. Job muss vom Typ String, longitude und latitude müssen vom Typ number sein.",
				400
			),
			null
		);
	} else if (
		jobname !== "Notar" &&
		jobname !== "Rechtsanwalt" &&
		jobname !== "Steuerberater" &&
		jobname !== "Webagentur"
	) {
		return callback(
			new ApplicationError("Jobname ist ungueltig.", 400),
			null,
			null
		);
	} else {
		try {
			const searchResults = await prisma.entry.findMany({
				where: {
					job: {
						equals: jobname,
					},
					verified: {
						equals: true,
					},
				},
			});
			if (searchResults) {
				const offset = (page - 1) * 10;
				const query = await prisma.$queryRaw<
					{ id: number; distance: number }[]
				>(
					Prisma.sql`SELECT id, ST_DistanceSphere(ST_MakePoint(longitude, latitude), ST_MakePoint(${long}, ${lat})) as distance FROM "Entry" WHERE job=${jobname} AND verified ORDER BY distance ASC LIMIT 10 OFFSET ${offset}`
				);
				const map = query.map(result => {
					let found = searchResults.find(x => {
						return x.id == result.id;
					});
					let rounded = Math.round(result?.distance || -1);
					return {
						...found,
						distance: rounded,
					};
				});
				return callback(null, map);
			} else {
				return callback(
					new ApplicationError(
						"Es existieren keine Einträge die diesen Job ausführen",
						404
					),
					null
				);
			}
		} catch (exception) {
			return callback(
				new ApplicationError(
					"Es sind unerwartete Probleme bei der Suche aufgetreten. ",
					500
				),
				null
			);
		}
	}
}

export async function getEntryByUID(user: DecodedIdToken, callback: Function) {
	try {
		const foundEntry = await prisma.entry.findUnique({
			where: {
				ownedBy: user.uid,
			},
		});
		if (foundEntry == null) {
			return callback(
				new ApplicationError(
					"Der Nutzer hat noch keinen Eintrag angelegt.",
					404
				),
				null
			);
		} else {
			return callback(null, foundEntry);
		}
	} catch (exception) {
		return callback(
			new ApplicationError(
				"Es ist ein unerwarteter Fehler bei der Suche nach genau einem Eintrag aufgetreten.",
				500
			),
			null
		);
	}
}

export async function getAllEntries(
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
				new ApplicationError(
					"Es sind unerwartete Probleme bei der Suche nach allen Eintraegen aufgetreten.",
					500
				),
				null
			);
		}
	} else {
		return callback(
			new ApplicationError(
				"Die Anfrage war fehlerhaft. verified muss keinen Wert oder einen boolean Wert enthalten.",
				400
			),
			null
		);
	}
}

export async function createEntry(
	job: string,
	company: string,
	address: string,
	latitude: number,
	longitude: number,
	email: string,
	verified: boolean,
	uid: string,
	callback: Function,
	telefon?: string,
	website?: string,
	description?: string
) {
	if (!company || !email || !job || !address || !latitude || !longitude) {
		return callback(
			new ApplicationError(
				"Die Anfrage war fehlerhaft. Company, E-Mail, Job & Addresse sind required.",
				400
			),
			null
		);
	}
	try {
		const createdEntry = await prisma.entry.create({
			data: {
				job: job,
				company: company,
				address: address,
				latitude: latitude,
				longitude: longitude,
				email: email,
				verified: verified,
				ownedBy: uid,
				telefon: telefon,
				website: website,
				description: description != "" ? description : null,
			},
		});
		return callback(null, createdEntry);
	} catch (exception) {
		return callback(
			new ApplicationError(
				"Es sind unerwartete Probleme bei der Erstellung eines Eintrags aufgetreten.",
				500
			),
			null
		);
	}
}

export async function getEntry(entryID: number, callback: Function) {
	if (isNaN(entryID)) {
		return callback(
			new ApplicationError(
				"Die Anfrage war Fehlerhaft. id muss vom typ number sein.",
				400
			),
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
					new ApplicationError(
						"Für die angegebene ID " +
							entryID +
							" konnte kein Eintrag gefunden werden.",
						404
					),
					null
				);
			} else {
				return callback(null, foundEntry);
			}
		} catch (exception) {
			return callback(
				new ApplicationError(
					"Es ist ein unerwarteter Fehler bei der Suche nach genau einem Eintrag aufgetreten.",
					500
				),
				null
			);
		}
	}
}

export async function updateEntry(
	id: number,
	body: any,
	user: DecodedIdToken,
	callback: Function
) {
	if (isNaN(id) || !body) {
		return callback(
			new ApplicationError(
				"Fehlerhafte Anfrage. ID muss number sein und der requestBody vorhanden.",
				400
			),
			null
		);
	}
	try {
		if (user.role == "admin") {
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
					description: body.description != "" ? body.description : null,
					verified: body.verified,
				},
			});
			return callback(null, updatedEntry);
		} else {
			const updatedEntries = await prisma.entry.updateMany({
				where: {
					id: id,
					ownedBy: user.uid,
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
			if (updatedEntries.count == 1) {
				return callback(null, updatedEntries);
			} else {
				return callback(
					new ApplicationError(
						"Es exisiert kein Eintrag mit dieser ID von diesem Nutzer.",
						400
					),
					null
				);
			}
		}
	} catch (exception) {
		if (exception instanceof Prisma.PrismaClientKnownRequestError) {
			if (exception.code == "P2025") {
				return callback(
					new ApplicationError("Es exisiert kein Eintrag für diese ID.", 404),
					null
				);
			}
		} else {
			return callback(
				new ApplicationError(
					"Es ist ein unerwarteter Fehler beim Aktualisieren eines Eintrags aufgetretren.",
					500
				),
				null
			);
		}
	}
}

export async function deleteEntry(
	id: number,
	user: DecodedIdToken,
	callback: Function
) {
	if (isNaN(id)) {
		return callback(
			new ApplicationError("Fehlerhafte Anfrage. ID muss number sein.", 400)
		);
	}
	try {
		if (user.role == "admin") {
			const deleteUser = await prisma.entry.delete({
				where: {
					id: id,
				},
			});
			return callback(null);
		} else {
			const deletedUsers = await prisma.entry.deleteMany({
				where: {
					id: id,
					ownedBy: user.uid,
				},
			});
			if (deletedUsers.count == 1) {
				return callback(null);
			} else {
				return callback(
					new ApplicationError(
						"Es exisiert kein Eintrag mit dieser ID von diesem Nutzer.",
						400
					)
				);
			}
		}
	} catch (exception) {
		if (exception instanceof Prisma.PrismaClientKnownRequestError) {
			if (exception.code == "P2025") {
				return callback(
					new ApplicationError("Es exisiert kein Eintrag für diese ID", 404)
				);
			}
		} else {
			return callback(
				new ApplicationError(
					"Es ist ein unerwarteter Fehler beim Loeschen eines Eintrags aufgetreten",
					500
				)
			);
		}
	}
}
