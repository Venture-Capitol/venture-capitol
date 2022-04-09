import axios, { AxiosRequestConfig } from "axios";
import HttpException from "../../utils/HttpException";

export async function sendFeedback(
	taskId: string,
	feedback: "like" | "dislike"
) {
	try {
		const data = {
			text: "Neues Feedback\nTask: " + taskId + "\nFeedback: " + feedback,
		};

		const options: AxiosRequestConfig = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		};
		await axios.post(process.env.SLACK_WEBHOOK_URL, data, options);
	} catch (e) {
		throw new HttpException(500, e.message);
	}
}

export async function sendMessage(
	taskId: string,
	name: string,
	email: string,
	message: string
) {
	try {
		const data = {
			text:
				"Neue Nachricht\nTask: " +
				taskId +
				"\nName: " +
				name +
				"\nEmail: " +
				email +
				"\nNachricht: " +
				message,
		};

		const options: AxiosRequestConfig = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		};
		await axios.post(process.env.SLACK_WEBHOOK_URL, data, options);
	} catch (e) {
		throw new HttpException(500, e.message);
	}
}
