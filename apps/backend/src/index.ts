#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app = require("./app");
declare global {
	namespace Express {
		export interface Request {
			user?: DecodedIdToken;
		}
	}
}
import http = require("http");
import { DecodedIdToken } from "firebase-admin/auth";

/**
 * Get port from environment and store in Express.
 */

var port = 8101;
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
