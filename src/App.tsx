import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { graphQLClient } from "./graphQLClient";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { rootRouterConfig } from "./providers/routerProvider";
import PrimarySearchAppBar from "./hooks/AppBar";

import {
  useCreateSearchContext,
  SearchContext,
} from "./providers/useCreateSearchContext";
import { useDepartmentContext, withDepartment } from "./withDepartment";

const CharacterSearchContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useCreateSearchContext();
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

const App = () => {

  return (
    <>
      {/* <CharactersPage /> */}
      <CharacterSearchContext>
        <Container maxWidth="sm">
          <PrimarySearchAppBar />
          <h1>{useDepartmentContext()}</h1>
          <Routes>
            {rootRouterConfig.map((conf, index) => (
              <Route key={index} path={conf.path} element={conf.element} />
            ))}
          </Routes>
        </Container>
      </CharacterSearchContext>
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

function withRootRouter<T>(Component: React.ComponentType<T>) {
  return (props: T & React.Attributes) => {
    return (
      <Router>
        <Component {...props} />
      </Router>
    );
  };
}

export default withRootRouter(withDepartment(withTheme(withAppollo(App))));
