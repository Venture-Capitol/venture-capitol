import { Router } from "express";
const router = Router();

import { DecodedIdToken, getAuth } from "firebase-admin/auth";

router.post("/testLogin", function (req, res, next) {
	const testToken = "";
	res.send(testToken);
});

export async function isAuthenticated(req: any, res: any, next: any) {
	if (typeof req.headers.authorization !== "undefined") {
		const token = req.headers.authorization.split(" ")[1];
		try {
			const decodeValue = await getAuth().verifyIdToken(token);
			if (decodeValue) {
				return next();
			}
			res.status(401).end();
		} catch (e) {
			res.status(500).end();
		}
	} else {
		res.status(401).end();
		return;
	}
}
