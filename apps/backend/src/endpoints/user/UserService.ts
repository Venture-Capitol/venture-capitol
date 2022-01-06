import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findUserById(userId: string) {
	const foundUser = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
	return foundUser;
}

module.exports = {
	findUserById,
};
