import { Router } from "express";
import HttpException from "../../utils/HttpException";

import { User } from "@prisma/client";
const userRouter = Router();

const UserService = require("./UserService");

userRouter.get("/:userId", async function (req, res, next) {
	const userId = req.params.userId;
	res.send(
		UserService.findUserById(
			userId,
			function (error: Error | HttpException, result: User) {
				if (error) {
					if (error instanceof HttpException) {
						res.status(error.status).end(error.message);
					} else {
						res.status(500).end(error.message);
					}
				} else if (result) {
					res.send(result);
				}
			}
		)
	);
});

module.exports = userRouter;
