import { PrismaClient } from "@prisma/client";
import HttpException from "../../utils/HttpException";

const prisma = new PrismaClient({
	rejectOnNotFound: true,
});

async function findUserById(userId: string) {
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

module.exports = {
	findUserById,
};
