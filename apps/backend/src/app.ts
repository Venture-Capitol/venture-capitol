import express, { NextFunction, Request, Response } from "express";
import * as OpenApiValidator from "express-openapi-validator";
import HttpException from "./exceptions/HttpException";
import cors from "cors";

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const userRouter = require("./endpoints/user/UserRoute");
const companyRouter = require("./endpoints/company/CompanyRoute");
const taskRouter = require("./endpoints/task/TaskRoute");
const decisionRouter = require("./endpoints/decision/DecisionRoute");

// Install the OpenApiValidator onto your express app
app.use(
	OpenApiValidator.middleware({
		apiSpec: "../../packages/api/openapi.yaml",
		validateRequests: true,
		validateResponses: true,
	})
);

app.use(
	(err: HttpException, req: Request, res: Response, next: NextFunction) => {
		const status = err.status || 500;
		const message = err.message || "Something went wrong.";
		res.status(status).json({
			message: message,
			errors: status,
		});
	}
);

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

// Define routes using Express
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/company", taskRouter);
app.use("/api/company", decisionRouter);

export = app;
