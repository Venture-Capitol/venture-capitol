import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addManyEntries(callback: Function) {
	try {
		const createMany = await prisma.entry.createMany({
			data: [
				{
					job: "Notar",
					company: "NotareDE",
					street: "Notarstraße",
					streetnr: "17",
					plz: "12932",
					location: "Berlin",
					email: "notare@deutschland.de",
					telefon: "01520494293",
					website: "notare.de",
					description:
						"Sehr coole Notare in Deutschland mit klasse Dienstleistungen",
				},
				{
					job: "Rechtsanwalt",
					company: "RechtsanwaltDE",
					street: "Rechtsanwaltstraße",
					streetnr: "18A",
					plz: "12392",
					location: "Bremen",
					email: "rechtsanwalt@deutschland.de",
					telefon: "9283921012",
					description:
						"Sehr coole Rechtsanwälte in Deutschland mit guten Diensten",
				},
				{
					job: "Steuerberater",
					company: "SteuerberaterDE",
					street: "Steuerberaterstraße",
					streetnr: "7C",
					plz: "128391",
					location: "Hamburg",
					email: "Steuerberater@deutschland.de",
					website: "steuerberater-deutschland.de",
					description: "Sehr coole Steuerberater in DE mit tollen Leistungen",
				},
				{
					job: "Webagentur",
					company: "WebagenturDE",
					street: "webagenturstraße",
					streetnr: "1",
					plz: "92301",
					location: "Bielefeld",
					email: "Web@agentur.org",
					description:
						"Mega gute Webagentur in Deutschland mit absolut coolen Dienstleistungen",
				},
				{
					job: "Webagentur",
					company: "DeineWebagentur",
					street: "Heiserstr.",
					streetnr: "29",
					plz: "12839",
					location: "Dänemark",
					email: "webagentur@meetup.com",
					description:
						"Deine Webagentur die dich ab jetzt bei so circa allem was du machst mega gut unterstützen wird",
				},
				{
					job: "Notar",
					company: "NotareGermany",
					street: "Eythstr.",
					streetnr: "16",
					plz: "823912",
					location: "Berin",
					email: "Notare@germany.org",
					description:
						"Eine weitere Notarfirma die aber deutlich besser als der Rest ist",
				},
				{
					job: "Notar",
					company: "Notare4You",
					street: "Bessemerstraße",
					streetnr: "29",
					plz: "12939",
					location: "München",
					email: "foryou@notare.de",
				},
				{
					job: "Rechtsanwalt",
					company: "deinRechtsanwalt",
					street: "Rechtestraße",
					streetnr: "292",
					plz: "1829A",
					location: "Wiesbaden",
					email: "dein@rechtsanwalt.org",
				},
				{
					job: "Steuerberater",
					company: "trustedTaxes",
					street: "Hakler Zeile",
					streetnr: "2A",
					plz: "23891",
					location: "Berlin",
					email: "trust@taxes.com",
				},
				{
					job: "Rechtsanwalt",
					company: "RechteCheck",
					street: "Weiterestraße",
					streetnr: "92A",
					plz: "128392",
					location: "Osnabrück",
					email: "organization@rechte-check.org",
					telefon: "239201232",
					description:
						"Wir checken deine Rechte bei allem rund um Rechte und so",
				},
			],
			skipDuplicates: true, // skips entries with duplicate unique queues
		});
		return callback(null);
	} catch (exception) {
		//if (exception instanceof Prisma.PrismaClientKnownRequestError) {
		return callback("500");
		//}
	}
}

function parseToBoolean(value) {
	if (value === undefined) {
		return value;
	} else if (value === "true" || value === "false") {
		return value === "true";
	} else {
		return null;
	}
}

function parseToNumber(value) {
	if (value === undefined) {
		return value;
	} else {
		return parseInt(value);
	}
}

module.exports = {
	addManyEntries,
	parseToBoolean,
	parseToNumber,
};
