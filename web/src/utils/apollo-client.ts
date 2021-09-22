import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { PaginatedPosts } from "../generated/graphql";
import { withApollo } from "./createWithApollo";

const apolloClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_CLIENT_URL,
    credentials: "include",
    headers: {
      cookie: (typeof window === "undefined" ? ctx?.req?.headers.cookie : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            findCars: {
              keyArgs: ["findCarsLimit", "findCarsSkipVariable"],
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts,
              ): PaginatedPosts {
                console.log("CHECK THIS ********* incoming ", incoming);
                console.log("CHECK THIS ********* existing ", existing);
                return {
                  ...incoming,
                  posts: [...(existing?.posts || []), ...incoming.posts],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApolloClient = withApollo(apolloClient);
