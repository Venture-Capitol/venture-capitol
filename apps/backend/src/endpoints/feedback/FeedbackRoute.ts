import { Router } from "express";
import HttpException from "../../utils/HttpException";
import * as FeedbackService from "./FeedbackService";

export const feedbackRouter = Router();

feedbackRouter.post("/like", async (req, res) => {
	try {
		await FeedbackService.sendFeedback(req.body.taskId, "like");
		res.status(200).end();
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});

feedbackRouter.post("/dislike", async (req, res) => {
	try {
		await FeedbackService.sendFeedback(req.body.taskId, "dislike");
		res.status(200).end();
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});

feedbackRouter.post("/message", async (req, res) => {
	try {
		await FeedbackService.sendMessage(
			req.body.taskId,
			req.body.name,
			req.body.email,
			req.body.message
		);
		res.status(200).end();
	} catch (error) {
		if (error instanceof HttpException) {
			res.status(error.status).end(error.message);
		} else {
			res.status(500).end(error.message);
		}
	}
});
