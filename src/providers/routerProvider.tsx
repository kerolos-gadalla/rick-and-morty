import { Container } from "@mui/material";
import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { CharacterDetails } from "../Pages/CharacterDetails";
import { CharactersPage } from "../Pages/CharactersPage";
import { getCharacterLink, getDimensionsLink, getRoute } from "../routes/routeHelpers";

export const rootRouterConfig: RouteObject[] = [
  {
    path: getRoute("/"),
    element: <Navigate to={getCharacterLink()} replace />,
  },
  {
    path: getCharacterLink(),
    element: <CharactersPage />,
  },
  {
    path: getCharacterLink(":id"),
    element: <CharacterDetails />,
  },
  {
    path: getDimensionsLink(),
    element: <h1>DIMENSIONS LIST</h1>,
  },
  {
    path: getDimensionsLink("id"),
    element: <h1>DIMENSION DETAILS</h1>,
  },
];
