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
	process.env.GQL_SCHEMA_DIR ?? "node_modules/@vc/common/src/schema/**/*.gql",
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
	let user: DecodedIdToken;

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

/**
 * example graphql usage
 */
const dogs = [
	{ name: "Max" },
	{ name: "Charlie" },
	{ name: "Buddy" },
	{ name: "Max" },
];

const owners: Record<string, { name: string }> = {
	Max: {
		name: "Jennifer",
	},
	Charlie: {
		name: "Sarah",
	},
	Buddy: {
		name: "Tracy",
	},
};

const NOTIFICATION = "notification";

const resolvers: IResolvers = {
	Query: {
		Hello(root, args, ctx, info) {
			// root ~ {}
			root;
			// args ~ {}
			args;
			// info ~ GraphQLResolveInfo
			info;

			const greeting: string = `Hello, ${ctx.user?.email || "Anonymous User"}`;
			return greeting;
		},
		dogs() {
			return dogs;
		},
	},
	Mutation: {
		add(root, { x, y }, ctx, info) {
			// root ~ {}
			root;
			// x ~ string
			x;
			// x ~ string
			y;
			// ctx.authorization ~ string | undefined
			// info ~ GraphQLResolveInfo
			info;

			return x + y;
		},
		createNotification(_root, { message }, { pubsub }) {
			pubsub.publish({
				topic: NOTIFICATION,
				payload: {
					newNotification: message,
				},
			});
			return true;
		},
	},
	Subscription: {
		newNotification: {
			subscribe: (_root, _args, { pubsub }) => {
				return pubsub.subscribe(NOTIFICATION);
			},
		},
	},
};

const loaders: MercuriusLoaders = {
	Dog: {
		async owner(queries, _ctx) {
			return queries.map(({ obj }) => owners[obj.name]);
		},
	},
};

app.register(mercurius, {
	schema,
	resolvers,
	loaders,
	graphiql: true,
	context: buildContext,
	subscription: true,
});

mercuriusCodegen(app, {
	targetPath: "./src/graphql/generated.ts",
	operationsGlob: "./src/graphql/operations/*.gql",
	watchOptions: {
		enabled: process.env.NODE_ENV === "development",
	},
}).catch(console.error);

app.listen(process.env.PORT || 8000, process.env.HOST || "127.0.0.1");
