import { User } from "@vc/auth";
import { Company } from "./Gruendung";

export async function getCurrentCompany(
	currUser: User
): Promise<Company | undefined> {
	try {
		const companyRes = await fetch("/api/user/" + currUser.uid, {
			headers: {
				Authorization: `Bearer ${await currUser.getIdToken()}`,
			},
		});
		const company = await companyRes.json();
		return company;
	} catch (e) {
		return undefined;
	}
}

export async function createCompany(
	legalForm: string,
	currUser: User
): Promise<Company> {
	const companyRes = await fetch("/api/company", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${await currUser.getIdToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ legalForm }),
	});

	const company = await companyRes.json();
	console.log(company);
	return company;
}

export default {
	getCurrentCompany,
	createCompany,
};
