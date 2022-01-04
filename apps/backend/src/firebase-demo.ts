import { initializeApp } from "firebase-admin/app";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";

// initialize firebase
initializeApp();

const userMiddleware = async (
	req: any,
	res: any
): Promise<{
	user?: DecodedIdToken;
}> => {
	let user: DecodedIdToken;

	try {
		user = await getAuth().verifyIdToken(req.headers.authorization);
	} catch (e) {
		console.log("Error Decoding token:", e);
	}

	return {
		user,
	};
};
