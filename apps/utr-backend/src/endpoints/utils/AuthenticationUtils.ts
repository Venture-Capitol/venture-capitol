import { getAuth } from "firebase-admin/auth";

// Checks if the user is logged in and saves the user object in req.user
export function getUser(req: any, res: any, next: any) {
	if (req.headers.authorization !== undefined) {
		const token = req.headers.authorization.split(" ")[1];
		try {
			getAuth()
				.verifyIdToken(token)
				.then(
					tokenResult => {
						// set Custom Claim role as user if custom claim is not set
						if (tokenResult.role == undefined) {
							getAuth()
								.setCustomUserClaims(tokenResult.uid, { role: "user" })
								.then(() => {
									console.log("Custom Claim successfully added to UID.");
								})
								.catch(error => {
									console.log("Error adding Custom Claim: ", error);
								});
							tokenResult.role = "user";
						}
						// save the user object from firebase into the request
						req.user = tokenResult;
						return next();
					},
					// if token could not be verified return 401
					() => {
						res.status(401).end();
					}
				);
		} catch (e) {
			// if an exception occurs return 401
			res.status(500).end();
		}
	} else {
		// if user is not logged in return 401
		res.status(401).end();
	}
}

// Checks if the user is an admin - Can ONLY be used after getUser was used
export async function isAdmin(req: any, res: any, next: any) {
	if (req.user?.role == "admin") {
		return next();
	} else if (req.user?.role == "user") {
		res.status(403).end();
	} else {
		res.status(401).end();
	}
}
