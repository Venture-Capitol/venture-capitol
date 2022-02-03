import { User } from "@vc/auth";
import { API, GPF } from "@vc/api";
import { Decision } from "./Gruendung";

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
	existingCompany?: {
		completedTasks: string[];
		madeDecisions: Decision[];
	}
): Promise<API.Company> {
	const company = await GPF.createCompany({
		legalForm,
	});

	if (existingCompany != undefined) {
		existingCompany.completedTasks.forEach(taskId => {
			GPF.markTaskDone(company.data.id, taskId);
		});

		existingCompany.madeDecisions.forEach(decision => {
			GPF.makeDecision(company.data.id, decision.id, {
				selectedPath: decision.path,
			});
		});
	}
	return company.data;
}

export default {
	getCurrentCompany,
	createCompany,
};
