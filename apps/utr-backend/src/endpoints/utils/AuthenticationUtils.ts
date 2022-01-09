import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import logger = require("../../config/winston");

// Checks if the user is logged in and saves the user object in req.user
export async function getUser(req: Request, res: Response, next: NextFunction) {
	// if user is not logged in return 401
	if (req.headers.authorization == undefined) {
		return res.status(401).end();
	}

	const token = req.headers.authorization.split(" ")[1];

	let tokenResult;

	try {
		tokenResult = await getAuth().verifyIdToken(token);
	} catch {
		return res.status(401).end();
	}

	try {
		if (tokenResult.role == undefined) {
			tokenResult.role = "user";
			await getAuth().setCustomUserClaims(tokenResult.uid, { role: "user" });
			logger.debug(
				"Custom Claim role: 'user' successfully added to UID: " +
					tokenResult.uid
			);
		}
	} catch (e) {
		logger.error(
			"Error on user with UID: " +
				tokenResult.uid +
				" while adding Custom Claim role: 'user': ",
			e
		);
	}

	// save the user object from firebase into the request
	req.user = tokenResult;
	return next();
}

// Checks if the user is an admin - Can ONLY be used after getUser was used
export function isAdmin(req: Request, res: Response, next: NextFunction) {
	if (req.user?.role == "admin") {
		return next();
	} else if (req.user?.role == "user") {
		logger.debug(
			"User with UID: " +
				req.user.uid +
				" tryed to access an admin route but his token has no adminaccess."
		);
		res.status(403).end();
	} else {
		res.status(401).end();
	}
}
