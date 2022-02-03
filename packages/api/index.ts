import * as GPF_API from "./api";
import { axiosInstance } from "./axios";

export const GPF = {
	...GPF_API,
	axiosInstance,
};

export * as API from "./api.schemas";
