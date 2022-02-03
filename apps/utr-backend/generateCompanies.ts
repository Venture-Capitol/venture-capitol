import { PrismaClient } from "@prisma/client";

let p = new PrismaClient();

async function c() {
	await p.entry.createMany({
		data: [
			{
				job: "Webagentur",
				company: "Webagentur",
				email: "wdwa@example.com",
				verified: true,
				address: "",
				latitude: 23,
				longitude: 15,
			},
			{
				job: "Webagentur",
				company: "awdaadwaodwad",
				email: "awdwaawdwad@example.com",
				verified: true,
				address: "",
				latitude: 23,
				longitude: 15,
			},
			{
				job: "Webagentur",
				company: "awdaodwawdawdad",
				email: "awaadwad@example.com",
				verified: true,
				address: "",
				latitude: 23,
				longitude: 15,
			},
			{
				job: "Webagentur",
				company: "awdaoijkjdwad",
				email: "awdjnjnkjbwad@example.com",
				verified: true,
				address: "",
				latitude: 23,
				longitude: 15,
			},
			{
				job: "Webagentur",
				company: "awdaowqdacdwad",
				email: "awdgsgsrfwad@example.com",
				verified: true,
				address: "",
				latitude: 23,
				longitude: 15,
			},
			{
				job: "Webagentur",
				company: "adgffdgfdgwdaodwad",
				email: "awdwfggfdgfad@example.com",
				verified: true,
				address: "",
				latitude: 23,
				longitude: 15,
			},
			{
				job: "Webagentur",
				company: "awdaodsdgsgwad",
				email: "awdwdsvcxad@example.com",
				verified: true,
				address: "",
				latitude: 23,
				longitude: 15,
			},
			{
				job: "Webagentur",
				company: "awdaoasdwredwad",
				email: "awgfgfddwad@example.com",
				verified: true,
				address: "",
				latitude: 23,
				longitude: 15,
			},
		],
	});
}

c();
