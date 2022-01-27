/**
 * Generated by orval v6.5.1 🍺
 * Do not edit manually.
 * Venture Capitol API
 * Open API specification for the Venture Capitol API
 * OpenAPI spec version: 1.0.0
 */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import {
	useQuery,
	useMutation,
	UseQueryOptions,
	UseMutationOptions,
	QueryFunction,
	MutationFunction,
	UseQueryResult,
	QueryKey,
} from "react-query";
import type {
	User,
	Company,
	CreateCompanyBody,
	CompletedTask,
	MadeDecision,
	MakeDecisionBody,
} from "./api.schemas";

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
	...args: any
) => Promise<infer R>
	? R
	: any;

/**
 * Returns a user with given id
 * @summary Get a user by id
 */
export const getUserById = (
	userId: string,
	options?: AxiosRequestConfig
): Promise<AxiosResponse<User>> => {
	return axios.get(`/user/${userId}`, options);
};

export const getGetUserByIdQueryKey = (userId: string) => [`/user/${userId}`];

export const useGetUserById = <
	TData = AsyncReturnType<typeof getUserById>,
	TError = AxiosError<void>
>(
	userId: string,
	options?: {
		query?: UseQueryOptions<AsyncReturnType<typeof getUserById>, TError, TData>;
		axios?: AxiosRequestConfig;
	}
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const { query: queryOptions, axios: axiosOptions } = options || {};

	const queryKey = queryOptions?.queryKey ?? getGetUserByIdQueryKey(userId);

	const queryFn: QueryFunction<AsyncReturnType<typeof getUserById>> = () =>
		getUserById(userId, axiosOptions);

	const query = useQuery<AsyncReturnType<typeof getUserById>, TError, TData>(
		queryKey,
		queryFn,
		{ enabled: !!userId, ...queryOptions }
	);

	return {
		queryKey,
		...query,
	};
};

/**
 * Posts a company with given data
 * @summary Adds a new company to Venture Capitol
 */
export const createCompany = (
	createCompanyBody: CreateCompanyBody,
	options?: AxiosRequestConfig
): Promise<AxiosResponse<Company>> => {
	return axios.post(`/company`, createCompanyBody, options);
};

export const useCreateCompany = <
	TError = AxiosError<void>,
	TContext = unknown
>(options?: {
	mutation?: UseMutationOptions<
		AsyncReturnType<typeof createCompany>,
		TError,
		{ data: CreateCompanyBody },
		TContext
	>;
	axios?: AxiosRequestConfig;
}) => {
	const { mutation: mutationOptions, axios: axiosOptions } = options || {};

	const mutationFn: MutationFunction<
		AsyncReturnType<typeof createCompany>,
		{ data: CreateCompanyBody }
	> = props => {
		const { data } = props || {};

		return createCompany(data, axiosOptions);
	};

	return useMutation<
		AsyncReturnType<typeof createCompany>,
		TError,
		{ data: CreateCompanyBody },
		TContext
	>(mutationFn, mutationOptions);
};

/**
 * Returns a company with given id
 * @summary Get a company by id
 */
export const getCompanyCompanyId = (
	companyId: string,
	options?: AxiosRequestConfig
): Promise<AxiosResponse<Company>> => {
	return axios.get(`/company/${companyId}`, options);
};

export const getGetCompanyCompanyIdQueryKey = (companyId: string) => [
	`/company/${companyId}`,
];

export const useGetCompanyCompanyId = <
	TData = AsyncReturnType<typeof getCompanyCompanyId>,
	TError = AxiosError<unknown>
>(
	companyId: string,
	options?: {
		query?: UseQueryOptions<
			AsyncReturnType<typeof getCompanyCompanyId>,
			TError,
			TData
		>;
		axios?: AxiosRequestConfig;
	}
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const { query: queryOptions, axios: axiosOptions } = options || {};

	const queryKey =
		queryOptions?.queryKey ?? getGetCompanyCompanyIdQueryKey(companyId);

	const queryFn: QueryFunction<AsyncReturnType<typeof getCompanyCompanyId>> =
		() => getCompanyCompanyId(companyId, axiosOptions);

	const query = useQuery<
		AsyncReturnType<typeof getCompanyCompanyId>,
		TError,
		TData
	>(queryKey, queryFn, { enabled: !!companyId, ...queryOptions });

	return {
		queryKey,
		...query,
	};
};

/**
 * Deletes a company with given id
 * @summary Delete a company by id
 */
export const deleteCompany = (
	companyId: string,
	options?: AxiosRequestConfig
): Promise<AxiosResponse<void>> => {
	return axios.delete(`/company/${companyId}`, options);
};

export const useDeleteCompany = <
	TError = AxiosError<unknown>,
	TContext = unknown
>(options?: {
	mutation?: UseMutationOptions<
		AsyncReturnType<typeof deleteCompany>,
		TError,
		{ companyId: string },
		TContext
	>;
	axios?: AxiosRequestConfig;
}) => {
	const { mutation: mutationOptions, axios: axiosOptions } = options || {};

	const mutationFn: MutationFunction<
		AsyncReturnType<typeof deleteCompany>,
		{ companyId: string }
	> = props => {
		const { companyId } = props || {};

		return deleteCompany(companyId, axiosOptions);
	};

	return useMutation<
		AsyncReturnType<typeof deleteCompany>,
		TError,
		{ companyId: string },
		TContext
	>(mutationFn, mutationOptions);
};

/**
 * Returns which tasks of a company are done
 * @summary Get all tasks of a company
 */
export const getDoneTasks = (
	companyId: string,
	options?: AxiosRequestConfig
): Promise<AxiosResponse<CompletedTask[]>> => {
	return axios.get(`/company/${companyId}/tasks`, options);
};

export const getGetDoneTasksQueryKey = (companyId: string) => [
	`/company/${companyId}/tasks`,
];

export const useGetDoneTasks = <
	TData = AsyncReturnType<typeof getDoneTasks>,
	TError = AxiosError<void>
>(
	companyId: string,
	options?: {
		query?: UseQueryOptions<
			AsyncReturnType<typeof getDoneTasks>,
			TError,
			TData
		>;
		axios?: AxiosRequestConfig;
	}
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const { query: queryOptions, axios: axiosOptions } = options || {};

	const queryKey = queryOptions?.queryKey ?? getGetDoneTasksQueryKey(companyId);

	const queryFn: QueryFunction<AsyncReturnType<typeof getDoneTasks>> = () =>
		getDoneTasks(companyId, axiosOptions);

	const query = useQuery<AsyncReturnType<typeof getDoneTasks>, TError, TData>(
		queryKey,
		queryFn,
		{ enabled: !!companyId, ...queryOptions }
	);

	return {
		queryKey,
		...query,
	};
};

/**
 * Adds a new finished task to a company
 * @summary Add a checked task to a company
 */
export const markTaskDone = (
	companyId: string,
	taskId: string,
	options?: AxiosRequestConfig
): Promise<AxiosResponse<void>> => {
	return axios.post(
		`/company/${companyId}/tasks/${taskId}`,
		undefined,
		options
	);
};

export const useMarkTaskDone = <
	TError = AxiosError<unknown>,
	TContext = unknown
>(options?: {
	mutation?: UseMutationOptions<
		AsyncReturnType<typeof markTaskDone>,
		TError,
		{ companyId: string; taskId: string },
		TContext
	>;
	axios?: AxiosRequestConfig;
}) => {
	const { mutation: mutationOptions, axios: axiosOptions } = options || {};

	const mutationFn: MutationFunction<
		AsyncReturnType<typeof markTaskDone>,
		{ companyId: string; taskId: string }
	> = props => {
		const { companyId, taskId } = props || {};

		return markTaskDone(companyId, taskId, axiosOptions);
	};

	return useMutation<
		AsyncReturnType<typeof markTaskDone>,
		TError,
		{ companyId: string; taskId: string },
		TContext
	>(mutationFn, mutationOptions);
};

/**
 * Deletes a task from a company
 * @summary Delete a task from a company
 */
export const undoTaskCompletion = (
	companyId: string,
	taskId: string,
	options?: AxiosRequestConfig
): Promise<AxiosResponse<void>> => {
	return axios.delete(`/company/${companyId}/tasks/${taskId}`, options);
};

export const useUndoTaskCompletion = <
	TError = AxiosError<unknown>,
	TContext = unknown
>(options?: {
	mutation?: UseMutationOptions<
		AsyncReturnType<typeof undoTaskCompletion>,
		TError,
		{ companyId: string; taskId: string },
		TContext
	>;
	axios?: AxiosRequestConfig;
}) => {
	const { mutation: mutationOptions, axios: axiosOptions } = options || {};

	const mutationFn: MutationFunction<
		AsyncReturnType<typeof undoTaskCompletion>,
		{ companyId: string; taskId: string }
	> = props => {
		const { companyId, taskId } = props || {};

		return undoTaskCompletion(companyId, taskId, axiosOptions);
	};

	return useMutation<
		AsyncReturnType<typeof undoTaskCompletion>,
		TError,
		{ companyId: string; taskId: string },
		TContext
	>(mutationFn, mutationOptions);
};

/**
 * Returns all decisions of a company
 * @summary Get all decisions of a company
 */
export const getMadeDecisions = (
	companyId: string,
	options?: AxiosRequestConfig
): Promise<AxiosResponse<MadeDecision[]>> => {
	return axios.get(`/company/${companyId}/decisions`, options);
};

export const getGetMadeDecisionsQueryKey = (companyId: string) => [
	`/company/${companyId}/decisions`,
];

export const useGetMadeDecisions = <
	TData = AsyncReturnType<typeof getMadeDecisions>,
	TError = AxiosError<unknown>
>(
	companyId: string,
	options?: {
		query?: UseQueryOptions<
			AsyncReturnType<typeof getMadeDecisions>,
			TError,
			TData
		>;
		axios?: AxiosRequestConfig;
	}
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const { query: queryOptions, axios: axiosOptions } = options || {};

	const queryKey =
		queryOptions?.queryKey ?? getGetMadeDecisionsQueryKey(companyId);

	const queryFn: QueryFunction<AsyncReturnType<typeof getMadeDecisions>> = () =>
		getMadeDecisions(companyId, axiosOptions);

	const query = useQuery<
		AsyncReturnType<typeof getMadeDecisions>,
		TError,
		TData
	>(queryKey, queryFn, { enabled: !!companyId, ...queryOptions });

	return {
		queryKey,
		...query,
	};
};

/**
 * Adds a new decision to a company
 * @summary Add a decision to a company
 */
export const makeDecision = (
	companyId: string,
	decisionId: string,
	makeDecisionBody: MakeDecisionBody,
	options?: AxiosRequestConfig
): Promise<AxiosResponse<void>> => {
	return axios.post(
		`/company/${companyId}/decisions/${decisionId}`,
		makeDecisionBody,
		options
	);
};

export const useMakeDecision = <
	TError = AxiosError<unknown>,
	TContext = unknown
>(options?: {
	mutation?: UseMutationOptions<
		AsyncReturnType<typeof makeDecision>,
		TError,
		{ companyId: string; decisionId: string; data: MakeDecisionBody },
		TContext
	>;
	axios?: AxiosRequestConfig;
}) => {
	const { mutation: mutationOptions, axios: axiosOptions } = options || {};

	const mutationFn: MutationFunction<
		AsyncReturnType<typeof makeDecision>,
		{ companyId: string; decisionId: string; data: MakeDecisionBody }
	> = props => {
		const { companyId, decisionId, data } = props || {};

		return makeDecision(companyId, decisionId, data, axiosOptions);
	};

	return useMutation<
		AsyncReturnType<typeof makeDecision>,
		TError,
		{ companyId: string; decisionId: string; data: MakeDecisionBody },
		TContext
	>(mutationFn, mutationOptions);
};

/**
 * Deletes a decision from a company
 * @summary Delete a decision from a company
 */
export const undoDecision = (
	companyId: string,
	decisionId: string,
	options?: AxiosRequestConfig
): Promise<AxiosResponse<void>> => {
	return axios.delete(`/company/${companyId}/decisions/${decisionId}`, options);
};

export const useUndoDecision = <
	TError = AxiosError<unknown>,
	TContext = unknown
>(options?: {
	mutation?: UseMutationOptions<
		AsyncReturnType<typeof undoDecision>,
		TError,
		{ companyId: string; decisionId: string },
		TContext
	>;
	axios?: AxiosRequestConfig;
}) => {
	const { mutation: mutationOptions, axios: axiosOptions } = options || {};

	const mutationFn: MutationFunction<
		AsyncReturnType<typeof undoDecision>,
		{ companyId: string; decisionId: string }
	> = props => {
		const { companyId, decisionId } = props || {};

		return undoDecision(companyId, decisionId, axiosOptions);
	};

	return useMutation<
		AsyncReturnType<typeof undoDecision>,
		TError,
		{ companyId: string; decisionId: string },
		TContext
	>(mutationFn, mutationOptions);
};