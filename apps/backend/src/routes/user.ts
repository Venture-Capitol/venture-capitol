import express from "express";
export const userRouter = express.Router();

// localhost:8101/api/user?x=123434
userRouter.get("/", async function (req, res) {
	if (typeof req.query.x == "string" && isNaN(parseInt(req.query.x))) {
		res.status(400).json({ error: "x is not a number" });
		return;
	}
	if (typeof req.query.x == "string") {
		let x = parseInt(req.query.x);
		res.json({ x });
		return;
	}
	res.status(400).json({ error: "x is not a string" });
});
