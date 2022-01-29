import express, { NextFunction, Request, Response } from "express";
import * as OpenApiValidator from "express-openapi-validator";
import { getUser } from "./utils/AuthenticationUtils";
import { initializeApp } from "firebase-admin/app";

import { userRouter } from "./endpoints/user/UserRoute";
import { companyRouter } from "./endpoints/company/CompanyRoute";
import { taskRouter } from "./endpoints/task/TaskRoute";
import { decisionRouter } from "./endpoints/decision/DecisionRoute";
import { HttpError } from "express-openapi-validator/dist/framework/types";

initializeApp();
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Install the OpenApiValidator onto your express app
app.use(
	OpenApiValidator.middleware({
		apiSpec:
			process.env.API_DEFINITION_FILE || "../../packages/api/openapi.yaml",
		validateRequests: true,
		validateResponses: true,
	})
);

app.use(getUser);

// Define routes using Express
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/company", taskRouter);
app.use("/api/company", decisionRouter);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
	// 7. Customize errors
	console.error(err); // dump error to console for debug
	res.status(err.status || 500).json({
		message: err.message,
		errors: err.errors,
	});
});
