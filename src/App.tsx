import React, { ComponentClass } from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { graphQLClient } from "./graphQLClient";
import { CharactersPage } from "./CharactersPage";

const App = () => {
  // const results = data?.characters.results;
  return <CharactersPage />;
};

function withAppollo<T>(Component: React.ComponentType<T>) {
  return (props: T & React.Attributes) => (
    <ApolloProvider client={graphQLClient}>
      <Component {...props} />
    </ApolloProvider>
  );
}

export default withAppollo(App);
