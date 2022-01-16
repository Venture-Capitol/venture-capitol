import { PrismaClient } from "@prisma/client";
import HttpException from "../../exceptions/HttpException";

const prisma = new PrismaClient();

async function findUserById(userId: string, callback: Function) {
	try {
		const foundUser = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
		if (foundUser == null) {
			return callback(
				new HttpException(404, "No company found under this ID"),
				null
			);
		} else {
			return callback(null, foundUser);
		}
	} catch (e) {
		return callback(new HttpException(500, e.message), null);
	}
}

module.exports = {
	findUserById,
};
