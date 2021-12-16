import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// note: NOT TESTED YET
// note: needs implementation of calcDistance to work properly
async function searchEntries(
	jobname: string,
	street: string,
	streetnr: string,
	plz: string,
	location: string,
	callback: Function
) {
	if (
		typeof jobname !== "string" ||
		typeof street !== "string" ||
		typeof streetnr !== "string" ||
		typeof plz !== "string" ||
		typeof location !== "string"
	) {
		return callback("400", null);
	} else if (
		jobname !== "Notar" &&
		jobname !== "Rechtsanwalt" &&
		jobname !== "Steuerberater" &&
		jobname !== "Webagentur"
	) {
		return callback("400", null);
	} else {
		try {
			const searchResults = await prisma.entry.findMany({
				where: {
					job: {
						equals: jobname,
					},
					/*
					verified: {
						equals: true,
					},
					*/
				},
			});
			if (searchResults) {
				/*
				 * somehow calcDistance needs to be called for every entry in searchResults
				 * and might also need to pass the distance back in a callback for error handling & saving
				 * note: ATM THIS DOESNT WORK / DO ANYTHING!
				 */
				searchResults.forEach(element =>
					calcDistance(element, street, streetnr, plz, location)
				);
			}
			return callback(null, searchResults);
		} catch (exception) {
			//if (exception instanceof Prisma.PrismaClientKnownRequestError) {
			return callback("500", null);
			//}
		}
	}
}

// note: used in searchEntries
// note: NOT TESTED YET
function calcDistance(
	element: any,
	street: string,
	streetnr: string,
	plz: string,
	location: string
) {
	// to be implemented - also needs efficient saving of these infos for each element
}

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
			console.log(exception);
			//if (exception instanceof Prisma.PrismaClientKnownRequestError) {
			return callback("500", null);
			//}
		}
	} else {
		return callback("400", null);
	}
}

// note: doesnt differ between prisma errors and other exceptions yet
// note: implement handling for wrong data types using npm express openapi validator
// note: needs implementation of calculateLatLong to work properly
async function createEntry(
	job: string,
	company: string,
	street: string,
	streetnr: string,
	plz: string,
	location: string,
	email: string,
	callback: Function,
	telefon?: string,
	website?: string,
	description?: string
) {
	if (!company || !email || !job || !street || !streetnr || !location || !plz) {
		return callback("400", null);
	} else {
		calculateLatLong(
			street,
			streetnr,
			plz,
			location,
			async function (error: any, latitude: number, longitude: number) {
				if (error) {
					console.log("There was an error calculating latitude and longitude");
				} else {
					try {
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
								description: description,
							},
						});
						// note: PrismaClientValidationError would be wrong data type provided
						return callback(null, createdEntry);
					} catch (exception) {
						//if (exception instanceof Prisma.???) {
						return callback("500", null);
						//}
					}
				}
			}
		);
	}
}

// note: used in createEntry and updateEntry to calculate distance between entry data and user data
// note: NOT TESTED YET
function calculateLatLong(
	street: string,
	streetnr: string,
	plz: string,
	location: string,
	callback: Function
) {
	// to be implemented - need API
	return callback(null, 0.0, 0.0);
}

// note: NOT TESTED YET
async function getEntry(entryID: number, callback: Function) {
	if (isNaN(entryID)) {
		return callback("400", null);
	} else {
		try {
			const foundEntry = await prisma.entry.findUnique({
				where: {
					id: entryID,
				},
			});
			if (foundEntry == null) {
				return callback("404", null);
			} else {
				return callback(null, foundEntry);
			}
		} catch (exception) {
			return callback("500", null);
		}
	}
}

// note: NOT TESTED YET
// note: needs implementation of calculateLatLong to work properly
async function updateEntry(id: number, body: any, callback: Function) {
	if (typeof id !== "number" || !body) {
		return callback("400", null);
	} else {
		calculateLatLong(
			body.street,
			body.streetnr,
			body.plz,
			body.location,
			async function (error: any, latitude: number, longitude: number) {
				if (error) {
					console.log("There was an error calculating latitude and longitude");
				} else {
					try {
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
								description: body.description,
							},
						});
						return callback(null, updatedEntry);
					} catch (exception) {
						if (exception instanceof Prisma.PrismaClientKnownRequestError) {
							if (exception.code === "P2001") {
								// possibly inaccurate errorcode, see prisma ref
								return callback("404", null);
							} else {
								return callback("500", null);
							}
						}
					}
				}
			}
		);
	}
}

// note: NOT TESTED YET
async function deleteEntry(id: number, callback: Function) {
	if (typeof id !== "number") {
		return callback("400");
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
				if (exception.code === "P2001") {
					// possibly inaccurate errorcode, see prisma ref
					return callback("404", null);
				} else {
					return callback("500", null);
				}
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
