import React, { ComponentClass } from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { graphQLClient } from "./graphQLClient";
import { CharactersPage } from "./CharactersPage";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Button } from "@mui/material";

const App = () => {
  return (
    <>
      <Button variant="contained">Hello World</Button>
      <CharactersPage />
    </>
  );
};

function withAppollo<T>(Component: React.ComponentType<T>) {
  return (props: T & React.Attributes) => (
    <ApolloProvider client={graphQLClient}>
      <Component {...props} />
    </ApolloProvider>
  );
}

export default withAppollo(App);
