import { ApolloServer } from "@apollo/server";
import { schema } from "../graphQl/schema/schema.ts";
import { resolver } from "../graphQl/resolver/index.ts";


interface MyContext {
  token?: string;
}
export const connectGraphQl = async () => {
  const server = new ApolloServer<MyContext>({
    typeDefs: schema,
    resolvers: resolver,
    formatError: (error) => {
      // if (error.extensions?.code === "GRAPHQL_VALIDATION_FAILED" || error.extensions?.code==="BAD_USER_INPUT") {
        return {
          status:400,
          message: error.message,
          code: error.extensions?.code,
        };
      // }
      // return error;
    },
  });
  await server.start();

  return server;
};
