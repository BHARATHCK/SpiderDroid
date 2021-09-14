import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { createWithApollo } from "./createWithApollo";

const apolloClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_CLIENT_URL,
    credentials: "include",
    headers: {
      cookie: (typeof window === "undefined" ? ctx?.req?.headers.cookie : undefined) || "",
    },
    cache: new InMemoryCache(),
  });

export const withApolloClient = createWithApollo(apolloClient);
