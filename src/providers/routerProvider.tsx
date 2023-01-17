import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CharacterDetails } from "../Pages/CharacterDetails";
import { CharactersPage } from "../Pages/CharactersPage";

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
