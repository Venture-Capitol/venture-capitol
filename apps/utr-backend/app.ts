import express = require("express");
import cors = require("cors");
import { initializeApp } from "firebase-admin/app";

var indexRouter = require("./endpoints/index/IndexRoute");
var entryRouter = require("./endpoints/entry/EntryRoute");

initializeApp();

var app = express();

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

// Adding Routes
app.use("/", indexRouter);
app.use("/entry", entryRouter);

export = app;
