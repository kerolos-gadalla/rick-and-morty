import { app_prefix } from "../consts/env";

export const getRoute = (route: string) => `/${app_prefix}${route}`;

export const getCharacterLink = (id: string | number) => {
  return getRoute(`/characters/${id}/`);
};
