import express, { NextFunction, Request, Response } from "express";
import * as OpenApiValidator from "express-openapi-validator";

const app = express();
const port = parseInt(process.env.PORT) || 8101;

const userRouter = require("./endpoints/user/UserRoute");
const companyRouter = require("./endpoints/company/CompanyRoute");
const taskRouter = require("./endpoints/task/TaskRoute");
const decisionRouter = require("./endpoints/decision/DecisionRoute");

// Install the OpenApiValidator onto your express app
app.use(
	OpenApiValidator.middleware({
		apiSpec: "../../../packages/api/openapi.yaml",
		validateRequests: true,
		validateResponses: true,
	})
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).json({
		message: err.message,
		errors: err.name,
	});
});

// Define routes using Express
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/task", taskRouter);
app.use("/api/decision", decisionRouter);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
