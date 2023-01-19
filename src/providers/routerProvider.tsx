import { Container } from "@mui/material";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrimarySearchAppBar from "../hooks/AppBar";
import { CharacterDetails } from "../Pages/CharacterDetails";
import { CharactersPage } from "../Pages/CharactersPage";
import { getRoute } from "../routes/routeHelpers";
import { useCreateSearchContext, SearchContext } from "./useCreateSearchContext";

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

export const rootRouter = createBrowserRouter([
  {
    path: getRoute("/"),
    element: (
      <>
        <CharacterSearchContext>
          <Container maxWidth="sm">
            <PrimarySearchAppBar />
            <CharactersPage />
          </Container>
        </CharacterSearchContext>
      </>
    ),
  },
  {
    path: getRoute("/characters"),
    element: <CharactersPage />,
  },

  {
    path: getRoute("/characters/:id"),
    element: <CharacterDetails />,
  },
]);
