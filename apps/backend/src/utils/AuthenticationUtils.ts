import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

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
			console.log(
				"Custom Claim role: 'user' successfully added to UID: " +
					tokenResult.uid
			);
		}
	} catch (e) {
		console.log(
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
