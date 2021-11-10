#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app = require("../app");
import https = require("https");
import fs = require("fs");
console.log("1");

const key = fs.readFileSync("./cert/key.pem");
const cert = fs.readFileSync("./cert/cert.pem");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "8080");
app.set("port", port);
console.log("2");

/**
 * Create HTTP server.
 */

var server = https.createServer({ key: key, cert: cert }, app);
console.log("3");

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
console.log("4");

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}
