import express from "express";
import cors from "cors";
import { initializeApp } from "firebase-admin/app";

import * as OpenApiValidator from "express-openapi-validator";

import { router as entryRouter } from "./endpoints/entry/EntryRoute";

initializeApp();

export var app = express();

app.use("*", cors());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Expose-Headers", "Authorization");
	next();
});
app.use(cors({ exposedHeaders: ["Authorization"] }));
app.use(express.json()); //parses json body

app.use(
	OpenApiValidator.middleware({
		apiSpec: "./openapi.yaml",
		validateRequests: true, // (default)
		validateResponses: true, // false by default
	})
);

app.use((err: any, req: any, res: any, next: any) => {
	// format error
	res.status(err.status || 500).json({
		message: err.message,
		errors: err.errors,
	});
});

// Adding Routes
app.use("/dlr/entry", entryRouter);
