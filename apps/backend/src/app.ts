import express, { NextFunction, Request, Response } from "express";
import * as OpenApiValidator from "express-openapi-validator";
import HttpException from "./exceptions/HttpException";
import { initializeApp } from "firebase-admin/app";

const app = express();
const port = parseInt(process.env.PORT) || 8101;

initializeApp();

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

// Define routes using Express
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/task", taskRouter);
app.use("/api/decision", decisionRouter);

export = app;
