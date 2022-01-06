import { Router } from "express";
const router = Router();

const UserService = require("./UserService");

router.get("/user/:userId", async function (req, res, next) {
	const userId = req.params.userId;
	res.send(UserService.findUserById(userId));
});

module.exports = router;
