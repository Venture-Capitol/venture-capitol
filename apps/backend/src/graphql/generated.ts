import type { GraphQLResolveInfo } from "graphql";
import type { MercuriusContext } from "mercurius";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) =>
	| Promise<import("mercurius-codegen").DeepPartial<TResult>>
	| import("mercurius-codegen").DeepPartial<TResult>;
export type RequireFields<T, K extends keyof T> = {
	[X in Exclude<keyof T, K>]?: T[X];
} & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	_FieldSet: any;
};

export type User = {
	__typename?: "User";
	id: Scalars["ID"];
	companies: Array<Company>;
};

export type Company = {
	__typename?: "Company";
	id: Scalars["ID"];
	name?: Maybe<Scalars["String"]>;
	users: Array<User>;
	completedTasks: Array<Task>;
	decisions: Array<Decision>;
};

export enum LegalForm {
	GMBH = "GMBH",
	UG = "UG",
	EINZELUNTERNEHMEN = "EINZELUNTERNEHMEN",
	FREIBERUFLER = "FREIBERUFLER",
}

export type Task = {
	__typename?: "Task";
	id: Scalars["ID"];
};

export type Decision = {
	__typename?: "Decision";
	id: Scalars["ID"];
	selectedTask?: Maybe<Task>;
};

export type Query = {
	__typename?: "Query";
	userById?: Maybe<User>;
	companyById?: Maybe<Company>;
};

export type QueryuserByIdArgs = {
	id: Scalars["ID"];
};

export type QuerycompanyByIdArgs = {
	id: Scalars["ID"];
};

export type CreateCompanyInput = {
	name?: InputMaybe<Scalars["String"]>;
	legalForm: LegalForm;
};

export type Mutation = {
	__typename?: "Mutation";
	createCompany: Company;
	markTaskComplete: Company;
	markTaskIncomplete: Company;
	makeDecision: Decision;
	removeDecision: Decision;
};

export type MutationcreateCompanyArgs = {
	input: CreateCompanyInput;
};

export type MutationmarkTaskCompleteArgs = {
	companyId: Scalars["ID"];
	taskId: Scalars["ID"];
};

export type MutationmarkTaskIncompleteArgs = {
	companyId: Scalars["ID"];
	taskId: Scalars["ID"];
};

export type MutationmakeDecisionArgs = {
	companyId: Scalars["ID"];
	decisionId: Scalars["ID"];
	selectedTaskId: Scalars["ID"];
};

export type MutationremoveDecisionArgs = {
	companyId: Scalars["ID"];
	decisionId: Scalars["ID"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> {
	subscribe: SubscriptionSubscribeFn<
		{ [key in TKey]: TResult },
		TParent,
		TContext,
		TArgs
	>;
	resolve?: SubscriptionResolveFn<
		TResult,
		{ [key in TKey]: TResult },
		TContext,
		TArgs
	>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = {},
	TContext = {},
	TArgs = {}
> =
	| ((
			...args: any[]
	  ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
	TResult = {},
	TParent = {},
	TContext = {},
	TArgs = {}
> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	User: ResolverTypeWrapper<User>;
	ID: ResolverTypeWrapper<Scalars["ID"]>;
	Company: ResolverTypeWrapper<Company>;
	String: ResolverTypeWrapper<Scalars["String"]>;
	LegalForm: LegalForm;
	Task: ResolverTypeWrapper<Task>;
	Decision: ResolverTypeWrapper<Decision>;
	Query: ResolverTypeWrapper<{}>;
	CreateCompanyInput: CreateCompanyInput;
	Mutation: ResolverTypeWrapper<{}>;
	Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	User: User;
	ID: Scalars["ID"];
	Company: Company;
	String: Scalars["String"];
	Task: Task;
	Decision: Decision;
	Query: {};
	CreateCompanyInput: CreateCompanyInput;
	Mutation: {};
	Boolean: Scalars["Boolean"];
};

export type UserResolvers<
	ContextType = MercuriusContext,
	ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	companies?: Resolver<
		Array<ResolversTypes["Company"]>,
		ParentType,
		ContextType
	>;
	isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<
	ContextType = MercuriusContext,
	ParentType extends ResolversParentTypes["Company"] = ResolversParentTypes["Company"]
> = {
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
	completedTasks?: Resolver<
		Array<ResolversTypes["Task"]>,
		ParentType,
		ContextType
	>;
	decisions?: Resolver<
		Array<ResolversTypes["Decision"]>,
		ParentType,
		ContextType
	>;
	isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<
	ContextType = MercuriusContext,
	ParentType extends ResolversParentTypes["Task"] = ResolversParentTypes["Task"]
> = {
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DecisionResolvers<
	ContextType = MercuriusContext,
	ParentType extends ResolversParentTypes["Decision"] = ResolversParentTypes["Decision"]
> = {
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	selectedTask?: Resolver<
		Maybe<ResolversTypes["Task"]>,
		ParentType,
		ContextType
	>;
	isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
	ContextType = MercuriusContext,
	ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
	userById?: Resolver<
		Maybe<ResolversTypes["User"]>,
		ParentType,
		ContextType,
		RequireFields<QueryuserByIdArgs, "id">
	>;
	companyById?: Resolver<
		Maybe<ResolversTypes["Company"]>,
		ParentType,
		ContextType,
		RequireFields<QuerycompanyByIdArgs, "id">
	>;
};

export type MutationResolvers<
	ContextType = MercuriusContext,
	ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
	createCompany?: Resolver<
		ResolversTypes["Company"],
		ParentType,
		ContextType,
		RequireFields<MutationcreateCompanyArgs, "input">
	>;
	markTaskComplete?: Resolver<
		ResolversTypes["Company"],
		ParentType,
		ContextType,
		RequireFields<MutationmarkTaskCompleteArgs, "companyId" | "taskId">
	>;
	markTaskIncomplete?: Resolver<
		ResolversTypes["Company"],
		ParentType,
		ContextType,
		RequireFields<MutationmarkTaskIncompleteArgs, "companyId" | "taskId">
	>;
	makeDecision?: Resolver<
		ResolversTypes["Decision"],
		ParentType,
		ContextType,
		RequireFields<
			MutationmakeDecisionArgs,
			"companyId" | "decisionId" | "selectedTaskId"
		>
	>;
	removeDecision?: Resolver<
		ResolversTypes["Decision"],
		ParentType,
		ContextType,
		RequireFields<MutationremoveDecisionArgs, "companyId" | "decisionId">
	>;
};

export type Resolvers<ContextType = MercuriusContext> = {
	User?: UserResolvers<ContextType>;
	Company?: CompanyResolvers<ContextType>;
	Task?: TaskResolvers<ContextType>;
	Decision?: DecisionResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	Mutation?: MutationResolvers<ContextType>;
};

type Loader<TReturn, TObj, TParams, TContext> = (
	queries: Array<{
		obj: TObj;
		params: TParams;
	}>,
	context: TContext & {
		reply: import("fastify").FastifyReply;
	}
) => Promise<Array<import("mercurius-codegen").DeepPartial<TReturn>>>;
type LoaderResolver<TReturn, TObj, TParams, TContext> =
	| Loader<TReturn, TObj, TParams, TContext>
	| {
			loader: Loader<TReturn, TObj, TParams, TContext>;
			opts?: {
				cache?: boolean;
			};
	  };
export interface Loaders<
	TContext = import("mercurius").MercuriusContext & {
		reply: import("fastify").FastifyReply;
	}
> {
	User?: {
		id?: LoaderResolver<Scalars["ID"], User, {}, TContext>;
		companies?: LoaderResolver<Array<Company>, User, {}, TContext>;
	};

	Company?: {
		id?: LoaderResolver<Scalars["ID"], Company, {}, TContext>;
		name?: LoaderResolver<Maybe<Scalars["String"]>, Company, {}, TContext>;
		users?: LoaderResolver<Array<User>, Company, {}, TContext>;
		completedTasks?: LoaderResolver<Array<Task>, Company, {}, TContext>;
		decisions?: LoaderResolver<Array<Decision>, Company, {}, TContext>;
	};

	Task?: {
		id?: LoaderResolver<Scalars["ID"], Task, {}, TContext>;
	};

	Decision?: {
		id?: LoaderResolver<Scalars["ID"], Decision, {}, TContext>;
		selectedTask?: LoaderResolver<Maybe<Task>, Decision, {}, TContext>;
	};
}
declare module "mercurius" {
	interface IResolvers
		extends Resolvers<import("mercurius").MercuriusContext> {}
	interface MercuriusLoaders extends Loaders {}
}
