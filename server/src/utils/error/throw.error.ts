import { GraphQLError } from "graphql";

export const throwError = (
  error: any,
  code: string = "BAD_USER_INPUT"
) => {
  const message =
    error?.details?.map((e: any) => e.message) ||
    error?.message ||
    "Something went wrong";
  throw new GraphQLError(message, {
    extensions: { code }
  });
};
