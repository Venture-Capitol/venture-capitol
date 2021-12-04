import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
 * 1. doesn't return distance to given location yet
 * 2. no error handling with code 400 for findMany when no entries found
 */
async function searchEntries(
	jobname,
	street,
	streetnr,
	plz,
	location,
	callback
) {
	if (typeof plz !== "number") {
		callback(404, null);
	} else {
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
		return callback(null, searchResults);
	}
}

/*
 * 1. check for cases where verified not given in combination with other params
 * -> find more efficient way than 3 dozens if-cases
 * 2. no error handling for findMany with code 400
 */
async function getAllEntries(verified, amount, page, callback) {
	if (typeof verified == "boolean" || !verified) {
		if ((!verified && !amount && !page) || (!verified && !amount && page)) {
			const allEntries = await prisma.entry.findMany();
			return callback(null, allEntries);
		} else if (
			(verified && !amount && !page) ||
			(verified && !amount && page)
		) {
			const verifiedEntries = await prisma.entry.findMany({
				where: {
					verified: {
						equals: true,
					},
				},
			});
			return callback(null, verifiedEntries);
		} else if (!verified && amount && !page) {
			const firstPageEntries = await prisma.entry.findMany({
				where: {
					verified: {
						equals: true,
					},
				},
				take: amount,
			});
			return callback(null, firstPageEntries);
		} else if (verified && amount && !page) {
			const verifiedFirstPageEntries = await prisma.entry.findMany({
				where: {
					verified: {
						equals: true,
					},
				},
				take: amount,
			});
			return callback(null, verifiedFirstPageEntries);
		} else if (verified && amount && page) {
			const verifiedPagedEntries = await prisma.entry.findMany({
				where: {
					verified: {
						equals: true,
					},
				},
				skip: page * amount,
				take: amount,
			});
			return callback(null, verifiedPagedEntries);
		}
	} else {
		callback(
			"Die Anfrage war fehlerhaft. verified muss keinen Wert oder einen boolean Wert enthalten.",
			null
		);
	}
}

async function createEntry(
	job,
	company,
	street,
	streetnr,
	plz,
	location,
	email,
	telefon,
	website,
	callback
) {
	if (!company || !email || !job || !street || !streetnr || !location || plz) {
		callback(
			"Die Anfrage war fehlerhaft. Company, E-Mail, Job, Street, StreetNr, PLZ & Location sind required."
		);
	} else {
		calculateLatLong(
			street,
			streetnr,
			plz,
			location,
			async function (error, latitude, longitude) {
				if (error) {
					console.log("There was an error calculating latitude and longitude");
				} else {
					// note: latitude and longitude will always be 0.0 atm, implement calculateLatLong to change
					const createdEntry = await prisma.entry.create({
						data: {
							job: job,
							company: company,
							street: street,
							streetnr: streetnr,
							plz: plz,
							location: location,
							latitude: latitude,
							longitude: longitude,
							email: email,
							telefon: telefon,
							website: website,
						},
					});
					return callback(null, createdEntry);
				}
			}
		);
	}
}

// note: used in createEntry and searchEntries to calculate distance between entry data and user data
function calculateLatLong(street, streetnr, plz, location, callback) {
	// to be implemented - need API
	return callback(null, 0.0, 0.0);
}

// note: no error handling for prisma findUnique with 400 if no entry found
async function getEntry(entryID, callback) {
	if (typeof entryID !== "number") {
		callback("Die Anfrage war Fehlerhaft. id muss vom typ number sein.", null);
	} else {
		const foundEntry = await prisma.entry.findUnique({
			where: {
				id: entryID,
			},
		});
		return callback(null, foundEntry);
	}
}

// note: no error handling for prisma update with code 400 yet
async function updateEntry(id, body, callback) {
	if (typeof id !== "number" || !body) {
		callback("400", null);
	} else {
		calculateLatLong(
			body.street,
			body.streetnr,
			body.plz,
			body.location,
			async function (error, latitude, longitude) {
				if (error) {
					console.log("There was an error calculating latitude and longitude");
				} else {
					// note: latitude and longitude will always be 0.0 atm, implement calculateLatLong to change
					const updatedEntry = await prisma.entry.update({
						where: {
							id: id,
						},
						data: {
							job: body.job,
							company: body.company,
							street: body.street,
							streetnr: body.streetnr,
							plz: body.plz,
							location: body.location,
							latitude: latitude,
							longitude: longitude,
							email: body.email,
							telefon: body.telefon,
							website: body.website,
						},
					});
					return callback(null, updatedEntry);
				}
			}
		);
	}
}

// note: no error handling for prisma delete with code 404 yet
async function deleteEntry(id, callback) {
	if (typeof id !== "number") {
		return callback("400");
	} else {
		const deleteUser = await prisma.entry.delete({
			where: {
				id: id,
			},
		});
		return callback(null);
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
