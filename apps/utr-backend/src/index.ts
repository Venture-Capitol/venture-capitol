#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app = require("../app");
import http = require("http");
import logger = require("../config/winston");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT);
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
logger.info("Server listening on port: " + port);

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
