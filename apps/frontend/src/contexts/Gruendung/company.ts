import { Company } from "./Gruendung";

export async function getCurrentCompany(): Promise<Company | undefined> {
	await setTimeout(() => {}, 500);

	return {
		legalForm: "UG",
	};
}

export async function createCompany(legalForm: string): Promise<Company> {
	await setTimeout(() => {}, 500);

	return {
		legalForm: legalForm,
	};
}

export default {
	getCurrentCompany,
	createCompany,
};
