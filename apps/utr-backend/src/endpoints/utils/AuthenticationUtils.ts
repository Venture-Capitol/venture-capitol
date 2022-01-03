import { getAuth } from "firebase-admin/auth";

export async function isAuthenticatedAsAdmin(req: any, res: any, next: any) {
	if (typeof req.headers.authorization !== "undefined") {
		const token = req.headers.authorization.split(" ")[1];
		try {
			// GET ROLE -> save in req.role
			await getAuth()
				.verifyIdToken(token)
				.then((claims: any) => {
					if (
						claims != undefined &&
						claims.isAdmin != undefined &&
						claims.isAdmin == true
					) {
						req.role = "admin";
					} else {
						req.role = "user";
					}
				});
			if (req.role == "admin") {
				return next();
			} else if (req.role == "user") {
				res.status(403).end();
			} else {
				res.status(401).end();
			}
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
			// GET ROLE -> save in req.role
			await getAuth()
				.verifyIdToken(token)
				.then((claims: any) => {
					if (
						claims != undefined &&
						claims.isAdmin != undefined &&
						claims.isAdmin == true
					) {
						req.role = "admin";
					} else {
						req.role = "user";
					}
				});
			if (req.role == "admin" || req.role == "user") {
				return next();
			} else {
				res.status(401).end();
			}
		} catch (e) {
			res.status(500).end();
		}
	} else {
		req.role = "user";
		return next();
	}
}
