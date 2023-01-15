import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CharacterDetails } from "../CharacterDetails";
import { CharactersPage } from "../CharactersPage";

export const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <CharactersPage />,
  },
  {
    path: "/characters",
    element: <CharactersPage />,
  },
  
  {
    path: "/characters/:id",
    element: <CharacterDetails />,
  },

]);
