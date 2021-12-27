import { DecodedIdToken, getAuth } from "firebase-admin/auth";

export async function isAuthenticatedAsAdmin(req: any, res: any, next: any) {
	if (typeof req.headers.authorization !== "undefined") {
		const token = req.headers.authorization.split(" ")[1];
		try {
			const decodeValue = await getAuth().verifyIdToken(token);
			if (decodeValue) {
				// GET ROLE -> save in req.role
				if (req.role == "admin") {
					return next();
				} else {
					res.status(403).end();
				}
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

export async function getRole(req: any, res: any, next: any) {
	if (typeof req.headers.authorization !== "undefined") {
		const token = req.headers.authorization.split(" ")[1];
		try {
			const decodeValue = await getAuth().verifyIdToken(token);
			if (decodeValue) {
				// GET ROLE -> save in req.role
				return next();
			}
			res.status(401).end();
		} catch (e) {
			res.status(500).end();
		}
	} else {
		req.role = "user";
		return next();
	}
}
