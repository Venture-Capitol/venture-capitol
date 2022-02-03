import Axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export const axiosInstance = Axios.create({}); // use your own URL here or environment variable

export const makeAxiosFn = <T>(config: AxiosRequestConfig): AxiosPromise<T> => {
	// const source = Axios.CancelToken.source();
	const promise = axiosInstance({ ...config });
	// .then(
	//   ({ data }) => data,
	// );

	// @ts-ignore
	// promise.cancel = () => {
	//   source.cancel('Query was cancelled');
	// };

	return promise;
};
