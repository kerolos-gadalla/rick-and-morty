import React, { useCallback, useMemo } from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { graphQLClient } from "./graphQLClient";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { rootRouterConfig } from "./providers/routerProvider";
import PrimarySearchAppBar from "./hooks/AppBar";

import {
  SearchContext,
} from "./providers/useCreateSearchContext";
import { useDepartmentContext, withDepartment } from "./withDepartment";
import { withRedux } from "./redux/withRedux";
import { useAppDispatch, useAppSelector } from "./redux/AppDispatch";
import { rootActions } from "./redux/rootReducer";

const CharacterSearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const department = useDepartmentContext();

  const charactersState = useAppSelector((state) => {
    if (department === "characters") return state.characters;
    return null;
  });
  const name = charactersState?.filter.name;
  const dispatch = useAppDispatch();

  const { setName } = useMemo(() => {
    if (department === "characters") {
      return {
        setName: (newName: string | Function) => {
          if (typeof newName === "function") {
            newName = newName(name) as string;
          }
          return dispatch(
            rootActions.characters.setFilterValue({
              key: "name",
              value: newName,
            })
          );
        },
      };
    }
    return {};
  }, [department]);

  return (
    <SearchContext.Provider
      value={{ searchQuery: name, setSearchQuery: setName }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const App = () => {
  return (
    <>
      {/* <CharactersPage /> */}
      <CharacterSearchContextProvider>
        <Container maxWidth="sm">
          <PrimarySearchAppBar />
          <h1>{useDepartmentContext()}</h1>
          <Routes>
            {rootRouterConfig.map((conf, index) => (
              <Route key={index} path={conf.path} element={conf.element} />
            ))}
          </Routes>
        </Container>
      </CharacterSearchContextProvider>
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

export default withRedux(
  withRootRouter(withDepartment(withTheme(withAppollo(App))))
);
