import appRoot from "app-root-path";
import * as winston from "winston";
import path from "path";
var PROJECT_ROOT = path.join(__dirname, "../..");

var options = {
	file: {
		level: "info",
		filename: `${appRoot}/logs/app.log`,
		handleExceptions: true,
		format: winston.format.json(),
		maxsize: 5242880,
		maxFiles: 5,
	},
	console: {
		level: "debug",
		handleExceptions: true,
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.simple()
		),
	},
};

var logger = winston.createLogger({
	transports: [
		new winston.transports.File(options.file),
		new winston.transports.Console(options.console),
	],
	exitOnError: false,
});

function formatLogArguments(args: any) {
	args = Array.prototype.slice.call(args);

	var stackInfo = getStackInfo(1);

	if (stackInfo) {
		var calleeStr = "(" + stackInfo.relativePath + ":" + stackInfo.line + ")";

		if (typeof args[0] === "string") {
			args[0] = calleeStr + " " + args[0];
		} else {
			args.unshift(calleeStr);
		}
	}

	return args;
}

function getStackInfo(stackIndex: any) {
	var stacklist = new Error().stack.split("\n").slice(3);

	var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
	var stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

	var s = stacklist[stackIndex] || stacklist[0];
	var sp = stackReg.exec(s) || stackReg2.exec(s);

	if (sp && sp.length === 5) {
		return {
			method: sp[1],
			relativePath: path.relative(PROJECT_ROOT, sp[2]),
			line: sp[3],
			pos: sp[4],
			file: path.basename(sp[2]),
			stack: stacklist.join("\n"),
		};
	}
}

function debug(...args: any[]) {
	logger.debug.apply(logger, formatLogArguments(args));
}

export { debug as debug };
export { debug as log };

export function info(...args: any[]) {
	logger.info.apply(logger, formatLogArguments(args));
}

export function warn(...args: any[]) {
	logger.warn.apply(logger, formatLogArguments(args));
}

export function error(...args: any[]) {
	logger.error.apply(logger, formatLogArguments(args));
}
