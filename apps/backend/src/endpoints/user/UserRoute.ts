import { Router } from "express";
import HttpException from "../../utils/HttpException";
import * as UserService from "./UserService";

export const userRouter = Router();

userRouter.get("/:userId", async function (req, res, next) {
	const userId = req.params.userId;
	try {
		const foundUser = await UserService.findUserById(userId);
		res.send(foundUser);
	} catch (error) {
		if (error) {
			if (error instanceof HttpException) {
				res.status(error.status).end(error.message);
			} else {
				res.status(500).end(error.message);
			}
		}
	}
});
