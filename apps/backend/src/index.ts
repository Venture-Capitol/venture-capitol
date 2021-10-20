import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import mercurius, { IResolvers, MercuriusLoaders } from "mercurius";
import mercuriusCodegen, { loadSchemaFiles } from "mercurius-codegen";
import { buildSchema } from "graphql";

export const app = Fastify({
	logger: true,
});

const { schema } = loadSchemaFiles(
	"node_modules/@vc/common/src/schema/**/*.gql",
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

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
	return {
		authorization: req.headers.authorization,
	};
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module "mercurius" {
	interface MercuriusContext
		extends PromiseType<ReturnType<typeof buildContext>> {}
}

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
			// ctx.authorization ~ string | undefined
			ctx.authorization;
			// info ~ GraphQLResolveInfo
			info;

			return "world";
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
			ctx.authorization;
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

app.listen(8000);
