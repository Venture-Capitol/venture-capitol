import { prisma } from "../../utils/Prisma";
import { API } from "@vc/api";

export async function findUserById(userId: string): Promise<API.User> {
	try {
		const foundUser = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				id: true,
				companies: {
					select: {
						company: {
							include: {
								completedTask: true,
								madeDecision: true,
							},
						},
					},
				},
			},
		});
		return {
			id: foundUser.id,
			companies: foundUser.companies.map(company => ({
				id: company.company.id,
				legalForm: company.company.legalForm,
				name: company.company.name,
				completedTasks: company.company.completedTask,
				madeDecisions: company.company.madeDecision,
			})),
		};
	} catch (e) {
		return {
			id: userId,
			companies: [],
		};
	}
}
