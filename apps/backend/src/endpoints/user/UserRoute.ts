import { Router } from "express";
const userRouter = Router();

const UserService = require("./UserService");

userRouter.get("/:userId", async function (req, res, next) {
	const userId = req.params.userId;
	res.send(UserService.findUserById(userId));
});

module.exports = userRouter;
