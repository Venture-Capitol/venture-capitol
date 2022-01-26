export interface Node {
	type: string;
	name: string;
	shortName: string;
	next: string[];
}

export interface Nodes {
	[key: string]: Node;
}

interface ConnectionsData {
	initialNode: string;
	nodes: Nodes;
}

export const taskGraph: ConnectionsData = {
	initialNode: "300_Start",
	nodes: {
		"300_Start": {
			type: "task",
			name: "UG gründen",
			shortName: "Start",
			next: ["301_Namensfindung"],
		},
		"301_Namensfindung": {
			type: "task",
			name: "Wie soll das Unternehmen heißen?",
			shortName: "Namensfindung",
			next: ["302_Entscheidung_Gesellschaftsvertrag"],
		},
		"302_Entscheidung_Gesellschaftsvertrag": {
			type: "decision",
			name: "UG gründen mit Musterprotokoll oder lieber individueller Gesellschaftsvertrag?",
			shortName: "Entscheidung Gesellschaftsvertrag",
			next: ["303_Musterprotokoll", "304_erstellter_Vertrag"],
		},
		"303_Musterprotokoll": {
			type: "task",
			name: "UG gründen mit Musterprotokoll",
			shortName: "Musterprotokoll",
			next: ["305_Notartermin"],
		},
		"304_erstellter_Vertrag": {
			type: "task",
			name: "Wie du einen individuellen Gesellschaftsvertrag für deine UG entwirfst",
			shortName: "Vertrag mit Anwalt",
			next: ["305_Notartermin"],
		},
		"305_Notartermin": {
			type: "task",
			name: "Notartermin UG Gründung",
			shortName: "Notartermin",
			next: ["306_Kontoeröffnung"],
		},
		"306_Kontoeröffnung": {
			type: "task",
			name: "Geschäftskonto für deine UG",
			shortName: "Geschäftskonto eröffnen",
			next: ["307_Einzahlung_Stammkapital"],
		},
		"307_Einzahlung_Stammkapital": {
			type: "task",
			name: "Einzahlung des Stammkapitals bei der UG",
			shortName: "Einzahlung Stammkapital",
			next: ["308_Notarielle_Bestätigung"],
		},
		"308_Notarielle_Bestätigung": {
			type: "task",
			name: "Notarielle Bestätigung der Einzahlung & Eintragung im Handlesregister",
			shortName: "Notarielle Bestätigung der Einzahlung",
			next: ["309_Entscheidung_IHK_oder_HWK"],
		},
		"309_Entscheidung_IHK_oder_HWK": {
			type: "decision",
			name: "Gehört meine Firma zur IHK oder zur Handwerkskammer?",
			shortName: "IHK oder HWK",
			next: ["310_IHK", "311_HWK"],
		},
		"310_IHK": {
			type: "task",
			name: "Die Anmeldung bei der Industrie- und Handelskammer - deine IHK Mitgliedschaft",
			shortName: "IHK Anmeldung",
			next: ["312_Gewerbeanmeldung"],
		},
		"311_HWK": {
			type: "task",
			name: "Die Eintragung in die Handwerkskammer - deine HWK Mitgliedschaft",
			shortName: "HWK Anmeldung",
			next: ["312_Gewerbeanmeldung"],
		},
		"312_Gewerbeanmeldung": {
			type: "task",
			name: "Die Gewerbeanmeldung für deine UG",
			shortName: "Gewerbeanmeldung",
			next: ["313_Rechnungen_und_Buchhaltung"],
		},
		"313_Rechnungen_und_Buchhaltung": {
			type: "task",
			name: "Wie du deine Rechnungen und Buchhaltung organisierst",
			shortName: "Rechnungen und Buchhaltung",
			next: ["314_Entscheidung_Steuerberater"],
		},
		"314_Entscheidung_Steuerberater": {
			type: "decision",
			name: "Brauchst du einen eigenen Steuerberater?",
			shortName: "Entscheidung Steuerberater",
			next: ["315_ohne_Steuerliche_Erfassung", "320_mit_Steuerberater_finden"],
		},
		"315_ohne_Steuerliche_Erfassung": {
			type: "task",
			name: "Steuerliche Erfassung anstoßen",
			shortName: "Steurliche Erfassung",
			next: ["316_ohne_Agentur_für_Arbeit"],
		},
		"316_ohne_Agentur_für_Arbeit": {
			type: "task",
			name: "Anmeldung bei der Agentur für Arbeit",
			shortName: "Anmeldung Agentur für Arbeit",
			next: ["317_ohne_Berufsgenossenschaft"],
		},
		"317_ohne_Berufsgenossenschaft": {
			type: "task",
			name: "Anmeldung bei der Berufsgenossenschaft",
			shortName: "Anmeldung Berufsgenossenschaft",
			next: ["318_ohne_Lohnrechnungen_stellen"],
		},
		"318_ohne_Lohnrechnungen_stellen": {
			type: "task",
			name: "Wie du deine Lohnrechnungen automatisieren kannst",
			shortName: "Lohnrechnungen stellen",
			next: ["319_ohne_Jahresabschluss_etc"],
		},
		"319_ohne_Jahresabschluss_etc": {
			type: "task",
			name: "Jahresabschluss, GuV usw: Welche Pflichten hast du als UG?",
			shortName: "Jahresabschluss und Ähnliches",
			next: ["400_Ende"],
		},
		"320_mit_Steuerberater_finden": {
			type: "task",
			name: "Wie du einen richtig guten Steuerberater findest",
			shortName: "Steuerberater finden",
			next: ["321_mit_Steuerliche_Erfassung"],
		},
		"321_mit_Steuerliche_Erfassung": {
			type: "task",
			name: "Hinweis an Steuerberater: Steuerliche Erfassung beim Finanzamt",
			shortName: "Steuerliche Erfassung Steuerberater",
			next: ["322_mit_Agentur_für_Arbeit"],
		},
		"322_mit_Agentur_für_Arbeit": {
			type: "task",
			name: "Hinweis an Steuerberater: Anmeldung Agentur für Arbeit",
			shortName: "Agentur für Arbeit Steuerberater",
			next: ["323_mit_Berufsgenossenschaft"],
		},
		"323_mit_Berufsgenossenschaft": {
			type: "task",
			name: "Hinweis an Steuerberater: Anmeldung bei der Berufsgenossenschaft",
			shortName: "Berufsgenossenschaft Steuerberater",
			next: ["324_mit_Lohnrechnungen_abgeben"],
		},
		"324_mit_Lohnrechnungen_abgeben": {
			type: "task",
			name: "Wie du deine Lohnrechnungen sinnvoll an deinen Steuerberater abgeben kannst",
			shortName: "Lohnrechnungen Steuerberater",
			next: ["325_mit_Aufgaben_Steuerberater"],
		},
		"325_mit_Aufgaben_Steuerberater": {
			type: "task",
			name: "Welche Aufgaben hat dein Steuerberater in Zukunft im Allgemeinen?",
			shortName: "Zukünftige Aufgaben Steuerberater",
			next: ["400_Ende"],
		},
		"400_Ende": {
			type: "task",
			name: "Hier gehts dann später zur nächsten Route",
			shortName: "Ende",
			next: [],
		},
	},
};
