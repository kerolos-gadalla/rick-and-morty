import { ApolloClient, InMemoryCache } from "@apollo/client";

export const graphQLClient = new ApolloClient({
  uri: "https://rickandmortyapi.graphcdn.app/",
  cache: new InMemoryCache(),
});
