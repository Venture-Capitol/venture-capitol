import express from "express";
import { userRouter } from "./routes/user";
import * as OpenApiValidator from "express-openapi-validator";
const app = express();
const port = parseInt(process.env.PORT) || 8101;

// Install the OpenApiValidator onto your express app
app.use(
	OpenApiValidator.middleware({
		apiSpec: "../node_modules/@vc/api/openapi.yaml",
		validateRequests: true,
		validateResponses: true,
	})
);

// Define routes using Express
app.use("/api/user", userRouter);
// app.use("/api/company", userRouter);

// Create an Express error handler
app.use((err, req, res, next) => {
	// format error
	console.error(err);
	res.status(err.status || 500).json({
		message: err.message,
		errors: err.errors,
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
