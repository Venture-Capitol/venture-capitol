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
						company: true,
					},
				},
			},
		});
		return {
			id: foundUser.id,
			companies: foundUser.companies.map(company => company.company),
		};
	} catch (e) {
		return {
			id: userId,
			companies: [],
		};
	}
}
