import { app } from "./app";
import { DecodedIdToken } from "firebase-admin/auth";

declare global {
	namespace Express {
		export interface Request {
			user?: DecodedIdToken;
		}
	}
}

const port = parseInt(process.env.PORT) || 8101;
const hostname = process.env.HOST || "localhost";
const server = app.listen(port, hostname, () => {
	console.log(`VC GPF API listening on http://${hostname}:${port}`);
});

process.on("SIGINT", () => {
	console.log("Received SIGINT, stopping...");
	server.close();
	process.exit(0);
});
