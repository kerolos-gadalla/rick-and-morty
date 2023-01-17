import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CharacterDetails } from "../Pages/CharacterDetails";
import { CharactersPage } from "../Pages/CharactersPage";
import { getRoute } from "../routes/routeHelpers";



export const rootRouter = createBrowserRouter([
  {
    path: getRoute("/"),
    element: <CharactersPage />,
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
