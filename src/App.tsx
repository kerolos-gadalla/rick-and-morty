import React, { ComponentClass } from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { graphQLClient } from "./graphQLClient";
import { CharactersPage } from "./CharactersPage";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { rootRouter } from "./providers/routerProvider";

const App = () => {
  return (
    <>
      {/* <CharactersPage /> */}
      <RouterProvider router={rootRouter} />
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

const darkTheme = createTheme({ palette: { mode: "dark" } });
function withTheme<T>(Component: React.ComponentType<T>) {
  return (props: T & React.Attributes) => (
    <ThemeProvider theme={darkTheme}>
      <Component {...props} />
    </ThemeProvider>
  );
}

export default withTheme(withAppollo(App));
