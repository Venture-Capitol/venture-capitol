import { prisma } from "../../utils/Prisma";
import HttpException from "../../utils/HttpException";

export async function findUserById(userId: string) {
	try {
		const foundUser = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
		return foundUser;
	} catch (e) {
		throw new HttpException(404, e.message);
	}
}
