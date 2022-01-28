import { User } from "@vc/auth";
import { API, GPF } from "@vc/api";

export async function getCurrentCompany(
	currUser: User
): Promise<API.Company | undefined> {
	try {
		const user = await GPF.getUserById(currUser.uid);
		return user.data.companies[0];
	} catch (e) {
		return undefined;
	}
}

export async function createCompany(
	legalForm: string,
	currUser: User
): Promise<API.Company> {
	const company = await GPF.createCompany({
		legalForm,
	});
	return company.data;
}

export default {
	getCurrentCompany,
	createCompany,
};
