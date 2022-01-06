import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addManyEntries(callback: Function) {
	try {
		/* const createMany = await prisma.entry.createMany({
			data: [
				{
					job: "Notar",
					company: "NotareDE",
					address: "Luxemburger Str. 10, 15193 Berlin, Deutschland",
					latitude: 2399.23,
					longitude: 12.122323,
					email: "notare@deutschland.de",
					telefon: "01520494293",
					website: "notare.de",
					description:
						"Sehr coole Notare in Deutschland mit klasse Dienstleistungen",
				},
				{
					job: "Rechtsanwalt",
					company: "RechtsanwaltDE",
					address: "Luxemburger Str. 8, 15193 Berlin, Deutschland",
					latitude: 1.23231,
					longitude: 334,
					email: "rechtsanwalt@deutschland.de",
					telefon: "9283921012",
					description:
						"Sehr coole Rechtsanwälte in Deutschland mit guten Diensten",
				},
				{
					job: "Steuerberater",
					company: "SteuerberaterDE",
					address: "Luxemburger Str. 10, 15193 Berlin, Deutschland",
					latitude: 23823.23242323,
					longitude: 23.343423,
					email: "Steuerberater@deutschland.de",
					website: "steuerberater-deutschland.de",
					description: "Sehr coole Steuerberater in DE mit tollen Leistungen",
				},
				{
					job: "Webagentur",
					company: "WebagenturDE",
					address: "Luxemburger Str. 6, 15193 Berlin, Deutschland",
					latitude: 237.23231,
					longitude: 8384.232321,
					email: "Web@agentur.org",
					description:
						"Mega gute Webagentur in Deutschland mit absolut coolen Dienstleistungen",
				},
				{
					job: "Webagentur",
					company: "DeineWebagentur",
					address: "Luxemburger Str. 4, 15193 Berlin, Deutschland",
					latitude: 293.38482,
					longitude: 239.32323434,
					email: "webagentur@meetup.com",
					description:
						"Deine Webagentur die dich ab jetzt bei so circa allem was du machst mega gut unterstützen wird",
				},
				{
					job: "Notar",
					company: "NotareGermany",
					address: "Luxemburger Str. 3, 15193 Berlin, Deutschland",
					latitude: 12.238293,
					longitude: 98.232423,
					email: "Notare@germany.org",
					description:
						"Eine weitere Notarfirma die aber deutlich besser als der Rest ist",
				},
				{
					job: "Notar",
					company: "Notare4You",
					address: "Luxemburger Str. 19, 15193 Berlin, Deutschland",
					latitude: 122.232231,
					longitude: 293.2382492,
					email: "foryou@notare.de",
				},
				{
					job: "Rechtsanwalt",
					company: "deinRechtsanwalt",
					address: "Luxemburger Str. 18, 15193 Berlin, Deutschland",
					latitude: 9293.238239,
					longitude: 128.2384,
					email: "dein@rechtsanwalt.org",
				},
				{
					job: "Steuerberater",
					company: "trustedTaxes",
					address: "Luxemburger Str. 5, 15193 Berlin, Deutschland",
					latitude: 293.23242,
					longitude: 392.3232312,
					email: "trust@taxes.com",
				},
				{
					job: "Rechtsanwalt",
					company: "RechteCheck",
					address: "Luxemburger Str. 17, 15193 Berlin, Deutschland",
					latitude: 463.239934,
					longitude: 349.2323423,
					email: "organization@rechte-check.org",
					telefon: "239201232",
					description:
						"Wir checken deine Rechte bei allem rund um Rechte und so",
				},
			],
			skipDuplicates: true, // skips entries with duplicate unique queues
		}); */
		return callback(null);
	} catch (exception) {
		//if (exception instanceof Prisma.PrismaClientKnownRequestError) {
		return callback(
			new Error("Fehler beim Erstellen sinnvoller Starteintraege."),
			"500"
		);
		//}
	}
}

function parseToBoolean(value: string) {
	if (value === undefined) {
		return value;
	} else if (value === "true" || value === "false") {
		return value === "true";
	} else {
		return null;
	}
}

function parseToNumber(value: string) {
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
