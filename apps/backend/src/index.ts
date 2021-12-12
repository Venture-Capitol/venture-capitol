import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import mercurius, { IResolvers, MercuriusLoaders } from "mercurius";
import mercuriusCodegen, { loadSchemaFiles } from "mercurius-codegen";
import { buildSchema } from "graphql";
import { initializeApp } from "firebase-admin/app";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";

// initialize firebase
initializeApp();

export const app = Fastify({
	logger: true,
});

const { schema } = loadSchemaFiles(
	process.env.GQL_SCHEMA_DIR ?? "node_modules/@vc/api/src/schema/**/*.gql",
	{
		watchOptions: {
			enabled: process.env.NODE_ENV === "development",
			onChange(schema) {
				app.graphql.replaceSchema(buildSchema(schema.join("\n")));
				app.graphql.defineResolvers(resolvers);

				mercuriusCodegen(app, {
					targetPath: "./src/graphql/generated.ts",
					operationsGlob: "./src/graphql/operations/*.gql",
				}).catch(console.error);
			},
		},
	}
);

const buildContext = async (
	req: FastifyRequest,
	_reply: FastifyReply
): Promise<{
	user?: DecodedIdToken;
}> => {
	let user: DecodedIdToken | undefined;

	try {
		user = await getAuth().verifyIdToken(req.headers.authorization);
	} catch (e) {
		console.log("Error Decoding token:", e);
	}

	return {
		user,
	};
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module "mercurius" {
	interface MercuriusContext
		extends PromiseType<ReturnType<typeof buildContext>> {}
}

const resolvers: IResolvers = {
	Query: {
		userById(root, args, ctx, info) {
			return null;
		},
	},
	Mutation: {},
};

const loaders: MercuriusLoaders = {
	// Dog: {
	// 	async owner(queries, _ctx) {
	// 		return queries.map(({ obj }) => owners[obj.name]);
	// 	},
	// },
};

app.register(mercurius, {
	schema,
	resolvers,
	loaders,
	graphiql: true,
	context: buildContext,
});

mercuriusCodegen(app, {
	targetPath: "./src/graphql/generated.ts",
	operationsGlob: "./src/graphql/operations/*.gql",
	watchOptions: {
		enabled: process.env.NODE_ENV === "development",
	},
}).catch(console.error);

app.listen(process.env.PORT || 8101, process.env.HOST || "127.0.0.1");
